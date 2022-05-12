app.component("badge",{
    template : /* vue-html */`
        <span class="badge new" v-if="product.new">Nuevo</span>
        <span class="badge offer" v-show="product.offer">Oferta</span>
    `,

    props : {
        product : {
            type : Object,
        }
    },

    mounted(){
        console.log(this.product);
    },
});