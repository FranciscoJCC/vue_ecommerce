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
            <p class="description__price"> {{ priceNumber(product.price) }}</p>
            <p class="description__content">
                {{product.content}}
            </p>
            <div class="discount">
                <span>Código de descuento</span>
                <input type="text" placeholder="Ingresa tu código" v-model="disccount" @keyup.enter="applyDiscount">
            </div>
            <button :disabled="product.stock === 0" @click="addToCart" >Agregar al carrito</button>
        </section>
    `,

    props: ["product"],

    setup(props){

        const productState = reactive({
            activeImage: 0
        });

        function addToCart(){
            const prodIndex = cart.findIndex(prod => prod.name === props.product.name);

            (prodIndex >= 0)
               ? cart[prodIndex].quantity += 1
               : cart.push(product);

            props.product.stock -= 1;
        }

        const disccount = ref('');
        const disccountCodes = ref(["platzi20", "descuento50"]);
        function applyDiscount() {
            
            let disccountCodeIndex = disccountCodes.value.indexOf(
              disccount.value
            );
            console.log(disccountCodeIndex);
            if (disccountCodeIndex >= 0) {
              props.product.price *= 50 / 100;
              disccountCodes.value.splice(disccountCodeIndex, 1);
            }
        }

        function priceNumber(value){
            return new Intl.NumberFormat("es-MX").format(value);
        }

        return {
            ...toRefs(productState),
            addToCart,
            priceNumber,
            applyDiscount,
            disccount,
        }
    }
});