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
            <button :disabled="product.stock === 0" @click="sendToCart()" >Agregar al carrito</button>
        </section>
    
    `,

    props: {
        product : {
            type: Object,
            default: () => {},
        }
    },

    emits:["sendtocart"],

    data(){
        return {
            activeImage: 0,
            disccountCodes: ["platzi20","descuento50"],
            disccount : 0,
            /* price_color : "rgb(104, 104, 209)" */
        }
    },

    computed: {
        price_color(){
            if(this.product.stock >= 1)
                return "rgb(104, 104, 209)";

            return "rgb(188, 30, 67)";
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

        sendToCart(){
            this.$emit("sendtocart", this.product);            
        }
    },


    watch:{
       
        /* "product.stock"(stock) {
            if(stock <= 1)
                this.price_color = "rgb(188, 30, 67)";
        } */
    }
});