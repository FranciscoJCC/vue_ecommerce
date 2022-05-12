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

    props: {
        product : {
            type: Object,
            default: () => {},
        }
    },

    data(){
        return {
            activeImage: 0,
            disccountCodes: ["platzi20","descuento50"],
            disccount : 0,
        }
    },

    methods: {
        priceNumber(value){
            return new Intl.NumberFormat("es-MX").format(value);
        },
        
        applyDiscount(){
            let disccountCodeIndex = this.disccountCodes.indexOf(this.disccount);
            console.log(disccountCodeIndex);
            if(disccountCodeIndex >= 0){
                this.product.price *= 50 / 100;
                this.disccountCodes.splice(disccountCodeIndex, 1);
            }
        },

        addToCart(){
            const prodIndex = this.cart.findIndex(prod => prod.name === this.product.name);

            if(prodIndex >= 0){
                this.cart[prodIndex].quantity += 1;
            }else{
                this.cart.push(this.product);
            }
            this.product.stock -= 1;
        }
    },
});