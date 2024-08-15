<template>
  <div>
    <BaseAside/>
   
    <main
      class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
    >

    <BaseNav :page="page" :modulo="modulo" />
      <div class="container-fluid py-4">
        <slot name="body" />
        
        <BaseFooter/>


      </div>
    </main>

  </div>
</template>
<script>
  export default{
    name:'AdminTemplate',
    props:{

   page:{
     type:String,
     default:''
   },
   modulo:{
     type:String,
     default:''
   },
 },
 data(){
    return {
      inactivityTimer: null,
      image:0,
      user:{}
    }
  },
  methods: {
    resetTimer() {
      // Limpiar el temporizador anterior
      clearTimeout(this.inactivityTimer);

      // Establecer un nuevo temporizador
      this.inactivityTimer = setTimeout(() => {
        this.handleInactivity();
      }, 10 * 60 * 1000); // 10 minutos
    },
    handleInactivity() {
      localStorage.clear();
      console.log('LocalStorage ha sido borrado por inactividad.');
      this.$router.push('/auth/login'); // Asegúrate de que la ruta 'inicio' exista en tu router
    }
  },
 mounted() {
  this.resetTimer(); // Inicializar el temporizador al montar el componente
    // También puedes agregar más eventos si lo deseas
    window.addEventListener('mousemove', this.resetTimer);
    window.addEventListener('keypress', this.resetTimer);
  let user = localStorage.getItem('userAuth')
  this.user = JSON.parse(user)
      if(user==null){
        this.$router.push('/auth/login')
      }
    this.$nextTick(()=>{
    })
  },
  beforeDestroy() {
    // Limpiar el temporizador y remover los listeners al destruir el componente
    clearTimeout(this.inactivityTimer);
    window.removeEventListener('mousemove', this.resetTimer);
    window.removeEventListener('keypress', this.resetTimer);
  }
  }
</script>

