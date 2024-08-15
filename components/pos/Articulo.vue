<template>
    <div class="card p-0" @click="AgregarCarrito">
        <div class="card-header pt-0 p-1 text-center">
            <div class="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg">
                <i class="fas fa-archive opacity-10" aria-hidden="true"></i>
            </div>
        </div>
        <div class="card-body pt-0 p-1 text-center">
            <span class="text-xs">{{ articulo.nombre }}-{{ articulo.medida.codigo }}</span>

            <hr class="horizontal dark my-2" />
            <hr class="horizontal dark my-2" />
            <h5 class="mb-0 text-sm">{{articulo.compra | format_number}}</h5>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        articulo: {
            type: Object,
            default: () => { }
        }
    },
    methods: {
        AgregarCarrito(){
           this.$emit('AddCarrito',this.articulo)
        }
    },
    filters: {
    format_number: function (value){
   return parseInt(value).toLocaleString("de-DE")
   
  },
  format_decimal: function (value){
   return parseInt(value).toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
   
  }
  },
}
</script>