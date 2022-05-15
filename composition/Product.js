app.component("product",{
    template:/*vue-html*/`
        <section class="product">
            <div class="product__thumbnails">
                <div
                    v-for="(image, index) in product.images"
                    :key="index"
                    class="thumb" 
                    :class="{active: activeImage === index}"
                    :style="{backgroundImage: 'url(' + product.images[index].thumbnail + ')'}"
                    @click="activeImage = index"
                >
                </div>
            </div>
            <div class="product__image">
                <img :src="product.images[activeImage].image" :alt="product.name">
            </div>
        </section >

        <section class="description">
            <h4>{{product.name.toUpperCase()}} {{product.stock === 0 ? "😢" : "😊"}}</h4>
            <badge :product="product"></badge>
            <p class="description__status" v-if="product.stock <= 3"> Quedan pocas unidades</p>
            <p class="description__price" :style="{ color: price_color }"> {{ priceNumber(product.price) }}</p>
            <p class="description__content">
                {{product.content}}
            </p>
            <div class="discount">
                <span>Código de descuento</span>
                <input type="text" placeholder="Ingresa tu código" v-model="disccount" @keyup.enter="applyDiscount">
            </div>
            <button :disabled="product.stock === 0" @click="sendToCart()">Agregar al carrito</button>
        </section>
    `,

    props: ["product"],

    emits: ["sendtocart"],

    setup(props, context){

        const productState = reactive({
            activeImage: 0,
            price_color: "rgb(104, 104, 209)",
        });

        

        const disccount = ref('');
        const disccountCodes = ref(["platzi20", "descuento50"]);
        function applyDiscount() {
            
            let disccountCodeIndex = disccountCodes.value.indexOf(
              disccount.value
            );

            if (disccountCodeIndex >= 0) {
              props.product.price *= 50 / 100;
              disccountCodes.value.splice(disccountCodeIndex, 1);
            }
        }

        function sendToCart(){
            context.emit("sendtocart", props.product)
        }

        function priceNumber(value){
            return new Intl.NumberFormat("es-MX").format(value);
        }

        //Cuando el watcher es una propiedad plana (numero o texto) se debe pasar una funcion anonima que retorna el tipo plano
        watch(() => props.product.stock, (stock) => { 
            if(stock <= 1)
                productState.price_color = "rgb(188 30 67)";
        });

        return {
            ...toRefs(productState),
            priceNumber,
            applyDiscount,
            disccount,
            sendToCart,
        }
    }
});