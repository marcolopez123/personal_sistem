<template>
   <nav
        class="navbar navbar-main navbar-expand-lg position-sticky mt-4 top-1 px-0 mx-4 shadow-none border-radius-xl z-index-sticky blur shadow-blur"
        id="navbarBlur"
        data-scroll="true"
      >
        <div class="container-fluid py-1 px-3">
          <nav aria-label="breadcrumb">
            <ol
              class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5"
            >
              <li class="breadcrumb-item text-sm">
                <a class="opacity-3 text-dark" href="javascript:;">
                  <svg
                    width="12px"
                    height="12px"
                    class="mb-1"
                    viewBox="0 0 45 40"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <title>shop</title>
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        transform="translate(-1716.000000, -439.000000)"
                        fill="#252f40"
                        fill-rule="nonzero"
                      >
                        <g transform="translate(1716.000000, 291.000000)">
                          <g transform="translate(0.000000, 148.000000)">
                            <path
                              d="M46.7199583,10.7414583 L40.8449583,0.949791667 C40.4909749,0.360605034 39.8540131,0 39.1666667,0 L7.83333333,0 C7.1459869,0 6.50902508,0.360605034 6.15504167,0.949791667 L0.280041667,10.7414583 C0.0969176761,11.0460037 -1.23209662e-05,11.3946378 -1.23209662e-05,11.75 C-0.00758042603,16.0663731 3.48367543,19.5725301 7.80004167,19.5833333 L7.81570833,19.5833333 C9.75003686,19.5882688 11.6168794,18.8726691 13.0522917,17.5760417 C16.0171492,20.2556967 20.5292675,20.2556967 23.494125,17.5760417 C26.4604562,20.2616016 30.9794188,20.2616016 33.94575,17.5760417 C36.2421905,19.6477597 39.5441143,20.1708521 42.3684437,18.9103691 C45.1927731,17.649886 47.0084685,14.8428276 47.0000295,11.75 C47.0000295,11.3946378 46.9030823,11.0460037 46.7199583,10.7414583 Z"
                            ></path>
                            <path
                              d="M39.198,22.4912623 C37.3776246,22.4928106 35.5817531,22.0149171 33.951625,21.0951667 L33.92225,21.1107282 C31.1430221,22.6838032 27.9255001,22.9318916 24.9844167,21.7998837 C24.4750389,21.605469 23.9777983,21.3722567 23.4960833,21.1018359 L23.4745417,21.1129513 C20.6961809,22.6871153 17.4786145,22.9344611 14.5386667,21.7998837 C14.029926,21.6054643 13.533337,21.3722507 13.0522917,21.1018359 C11.4250962,22.0190609 9.63246555,22.4947009 7.81570833,22.4912623 C7.16510551,22.4842162 6.51607673,22.4173045 5.875,22.2911849 L5.875,44.7220845 C5.875,45.9498589 6.7517757,46.9451667 7.83333333,46.9451667 L19.5833333,46.9451667 L19.5833333,33.6066734 L27.4166667,33.6066734 L27.4166667,46.9451667 L39.1666667,46.9451667 C40.2482243,46.9451667 41.125,45.9498589 41.125,44.7220845 L41.125,22.2822926 C40.4887822,22.4116582 39.8442868,22.4815492 39.198,22.4912623 Z"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </a>
              </li>
              <li class="breadcrumb-item text-sm">
                <a class="opacity-5 text-dark" href="javascript:void(0);">{{page}}</a>
              </li>
              <li
                class="breadcrumb-item text-sm text-dark active"
                aria-current="page"
              >
                {{modulo}}
              </li>
            </ol>
            
            <h6 class="font-weight-bolder mb-0">{{user.n_empresa}} / {{user.n_sucursal}}</h6>
          </nav>
         
          <div
            class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 collapse-nb"
            id="navbar"
          >
            <div class="ms-md-auto pe-md-3 d-flex align-items-center">

            </div>
            
            <ul class="navbar-nav justify-content-end flex-row">
              <li class="nav-item d-flex align-items-center">
                <a
                  href="javascript:void(0)"
                  class="nav-link text-body font-weight-bold px-0"
                 @click="Logout()"
                >
                  <i class="fa fa-user me-sm-1"></i>
                  <span class="d-sm-inline d-none">Cerrar sesion</span>
                </a>
              </li>
              <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
                <a
                  href="javascript:;"
                  class="nav-link text-body p-0"
                  @click="hideSideNav()"
                  id="iconNavbarSidenav"
                >
                  <div class="sidenav-toggler-inner">
                    <i class="sidenav-toggler-line"></i>
                    <i class="sidenav-toggler-line"></i>
                    <i class="sidenav-toggler-line"></i>
                  </div>
                </a>
              </li>
              <li class="nav-item px-3 d-flex align-items-center">
                <a href="javascript:;" @click="DarkMode()" class="nav-link text-body p-0">
                  <i v-if="theme=='light-version'"
                    class="fa fa-moon fixed-plugin-button-nav cursor-pointer"
                  ></i>
                  <i v-else
                    class="fa fa-sun fixed-plugin-button-nav cursor-pointer"
                  ></i>
                </a>
              </li>
              <li class="nav-item dropdown  pe-2 d-flex align-items-center">
                <a
                  href="javascript:;"
                  class="nav-link text-body p-0"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                <i class="fa fa-building"></i>
                </a>
                <ul
                  class="dropdown-menu dropdown-menu-end px-2 py-3 me-sm-n4"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li class="mb-2">
                    <a
                      class="dropdown-item border-radius-md"
                      href="javascript:;"
                    > <span class="font-weight-bold">Empresa</span>
                      <div class="d-flex py-1">
                        
                        <div class="form-group">
                        <select name="" id="" class="form-control" v-model="user.empresa_id" @change="sucursalActualizar(user.empresa_id), empresaid(user.empresa_id)">
                          <option v-for="m in empresas" :value="m.empresa_id" >{{ m.empresa.nombre }}</option>
                        </select>
                      </div>  
                      </div>
                    </a>
                  </li>
                  <li class="mb-3">
                    <a
                      class="dropdown-item border-radius-md"
                      href="javascript:;"
                    > <span class="font-weight-bold">Sucursal</span>
                      <div class="d-flex py-1">
                        
                        <div class="form-group">
                          <select name="" id="" class="form-control" v-model="user.sucursal_id" @change="sucursalid(user.sucursal_id)">
                          <option v-for="m in sucursales" :value="m.sucursal_id" >{{ m.sucursal.nombre }}</option>
                        </select>
                      </div>
                      </div>
                    </a>
                  </li>
                  <li class="mb-3">
                  <div class="form-group">
                              <a href="javascript:void(0);" class="cta black nv" @click="empresa()">
                                <span>CAMBIAR</span>
                                <svg width="10%" height="10px" viewBox="0 0 13 10">
                                  <path d="M1,5 L11,5"></path>
                                  <polyline points="8 1 12 5 8 9"></polyline>
                                </svg>
                              </a>
                            </div>
                  </li>
                  
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
</template>

<script>
export default {
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
      theme:'light-version',
      user:{},
      empresas:[],
      sucursales:[],
      emp:'',
      suc:'',
      eid:[],
      sid:[]
    }
  },
  methods:{
    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res
    },
    empresa(){
      let dataStorage = JSON.parse(localStorage.getItem("userAuth"));
    dataStorage.empresa_id = this.user.empresa_id
    dataStorage.n_empresa = this.eid.nombre
    dataStorage.sucursal_id = this.user.sucursal_id;
    dataStorage.n_sucursal = this.sid.nombre;
    localStorage.setItem("userAuth", JSON.stringify(dataStorage));
    location.reload();
    },
    sucursalActualizar(empresa_id) {
            this.$nextTick(async () => {
                try {
                    await Promise.all([this.GET_DATA('usersSucursal/empresa?usuario=' + this.user.id + "&empresa=" + empresa_id)]).then((v) => {
                        this.sucursales = v[0];
                    });
                } catch (e) {
                    console.log(e);
                } finally {
                    this.load = false
                }
            });
        },
        empresaid(empresa_id) {
            this.$nextTick(async () => {
                try {
                    await Promise.all([this.GET_DATA('empresas/' + empresa_id)]).then((v) => {
                        this.eid = v[0];
                    });
                } catch (e) {
                    console.log(e);
                } finally {
                    this.load = false
                }
                this.nempresa()
            });
        },
        sucursalid(sucursal_id) {
            this.$nextTick(async () => {
                try {
                    await Promise.all([this.GET_DATA('sucursals/' + sucursal_id)]).then((v) => {
                        this.sid = v[0];
                    });
                } catch (e) {
                    console.log(e);
                } finally {
                    this.load = false
                }
                this.nempresa()
            });
        },
    nempresa(){
      emp = this.eid.nombre
      suc = this.sid.nombre
    },
    sucursal(sucursal_id){
      let dataStorage = JSON.parse(localStorage.getItem("userAuth"));
    dataStorage.sucursal_id = sucursal_id
    localStorage.setItem("userAuth", JSON.stringify(dataStorage));
    location.reload();
    },
    SideToggle(){
      let body = document.body
      body.classList.add("g-sidenav-show", "bg-gray-100");
      body.classList.contains("g-sidenav-hidden")? body.classList.remove("g-sidenav-hidden"): body.classList.add("g-sidenav-hidden");
    },
    Logout(){
      localStorage.removeItem('userAuth');
      this.$router.push('/auth/login')
    },
    hideSideNav(){
      let side = document.getElementById('sidenav-main')
      side.classList.contains("d-none")? side.classList.remove("d-none"): side.classList.add("d-none");
      document.getElementById('sidenav-main').classList.remove(this.theme=='dark-version'?'bg-white':'bg-dark')
      document.getElementById('sidenav-main').classList.add(this.theme=='dark-version'?'bg-dark':'bg-white')
    },
    DarkMode(){
      let theme = localStorage.getItem('theme.pos')
      let body = document.body
      if(theme!=null){
        if(body.classList.contains("dark-version")){
          body.classList.remove("dark-version")
          theme="light-version"
          localStorage.setItem('theme.pos',theme)
        }else{
          body.classList.remove("light-version")
          theme="dark-version"
          localStorage.setItem('theme.pos',theme)
        }
        this.theme = theme
        body.classList.add(theme)
        document.getElementById('sidenav-main').classList.remove(this.theme=='dark-version'?'bg-white':'bg-dark')
        document.getElementById('sidenav-main').classList.add(this.theme=='dark-version'?'bg-dark':'bg-white')
      }else{
        localStorage.setItem('theme.pos',"dark-version")
      }
    }
  },mounted() {
    this.$nextTick(async () => {
      let user = localStorage.getItem('userAuth')
      this.user = JSON.parse(user)
      let body = document.body
      let theme = localStorage.getItem('theme.pos')
      if(theme!=null){
        body.classList.add(theme);
        this.theme = theme
      }
      if (window.innerWidth <= 1180) {
        document.getElementById('navbar').classList.add('collapse-nb')
        body.classList.add('g-sidenav-pinned')
        document.getElementById('iconSidenav').classList.remove('d-none')
        document.getElementById('sidenav-main').classList.add('d-none',this.theme=='dark-version'?'bg-dark':'bg-white')
      }
      try {
        await Promise.all([this.GET_DATA('usersEmpresa/usuario?usuario=' + this.user.id),this.GET_DATA('usersSucursal/empresa?usuario=' + this.user.id + "&empresa=" + this.user.empresa_id)]).then((v) => {
          this.empresas = v[0];
          this.sucursales = v[1];
       
        });

      } catch (e) {
        console.log(e);
      } finally {
        this.load=false

      }
    });
  },

}
</script>
<style>
  .side_togle{
    cursor:pointer;
  }
  .navbar-vertical.navbar-expand-xs .navbar-collapse{
    overflow: hidden;
  }
  .navbar-vertical.navbar-expand-xs.fixed-start{
    overflow: scroll;
  }
  .flex-row{
    flex-direction: row;
  }
  .collapse-nb{
    display: block !important;
  }
  #iconNavbarSidenav{
    cursor: pointer;
  }
</style>
