<template>
  <div>
    <JcLoader :load="load"></JcLoader>
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="row justify-content-end">
          <div class="col-12">
            <div class="card bg-gradient-dark">
              <div class="card-header bg-transparent py-1 px-3">
                <div class="row">
                  <div class="col-lg-4 col-md-4 col-12">
                    <div class="input-group input-group-lg">
                      <span class="input-group-text text-white bg-transparent border-0">
                        <i class="ni ni-archive-2 text-lg" aria-hidden="true"></i>
                      </span>
                      <input type="text" class="form-control bg-transparent border-0 text-white" placeholder="Buscar..."
                        v-model="buscar" v-on:keyup="getDataPagina(1)" />
                    </div>
                  </div>
                  <div class="col-lg-2 col-md-2 py-2 ms-auto">
                    <a v-if="user.rol_id == 1 || user.rol_id == 2" href="javascript:void(0);" class="cta"
                      @click="[modalIngreso = true]">
                      <span>Nuevo</span>
                      <svg width="13px" height="10px" viewBox="0 0 13 10">
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="tabla" class="col-12">
            <div class="card">
              <div class="card-body">
                <table class="table">
                  <thead>
                    <th class="py-0 px-1">#</th>
                    <th class="py-0 px-1">Nombre</th>
                    <th class="py-0 px-1">Email</th>
                    <th class="py-0 px-1">username</th>
                    <th class="py-0 px-1"></th>
                  </thead>
                  <tbody>
                    <tr v-for="(m, i) in datosPaginados">
                      <td data-label="N" class="py-0 px-1">{{ i + 1 }}</td>
                      <td data-label="Nombre" class="py-0 px-1">{{ m.nombre }} {{ m.a_paterno }}</td>
                      <td data-label="Mail" class="py-0 px-1">{{ m.email }}</td>
                      <td data-label="User Name" class="py-0 px-1">{{ m.username }}</td>
                      <td data-label="Acciones" class="py-0 px-1">
                        <div class="btn-group">
                          <button type="button"  @click="sucursal(m.empresa_id),abrirEditar(m)"
                            class="btn btn-info btn-sm py-1 px-2">
                            <i class="fas fa-pen"></i>
                          </button>
                          <button type="button" @click="localSelect(m.id), AbrirEmpresa()"
                            class="btn btn-success btn-sm py-1 px-2">
                            <i class="fa fa-city"></i>
                          </button>
                          <button type="button" @click="localSelect(m.id), AbrirSucursal()"
                            class="btn btn-primary btn-sm py-1 px-2">
                            <i class="fa fa-building"></i>
                          </button>
                          <button type="button" @click="Eliminar(m.id)" class="btn btn-danger btn-sm py-1 px-2">
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-center">
                    <li class="page-item"><a class="page-link" v-on:click="getPreviousPage()" href="#">Pre</a></li>
                    <li class="page-item"><a class="page-link" v-on:click="getNextPage()" href="#">Next</a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div class="modal fade" :class="modalIngreso ? 'showModal' : ''" id="AjusteModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Crear
                  </h5>
                  <button type="button" class="btn-close text-dark" @click="modalIngreso = false, cleanModal()"
                    data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div slot="body" class="modal-body row">
                <div class="form-group col-md-6">
                  <label for="">Primer Nombre</label>
                  <input type="text" name="" v-model="nombre" class="form-control" id="" />
                </div>
                <div class="form-group col-md-6">
                  <label for="">Segundo Nombre</label>
                  <input type="text" name="" v-model="s_nombre" class="form-control" id="" />
                </div>
                <div class="form-group col-md-6">
                  <label for="">Apellido Paterno</label>
                  <input type="text" name="" v-model="a_paterno" class="form-control" id="" />
                </div>
                <div class="form-group col-md-6">
                  <label for="">Apellido Materno</label>
                  <input type="text" name="" v-model="a_materno" class="form-control" id="" />
                </div>
                <div class="form-group col-md-6">
                  <label for="">Nombre de Usuario</label>
                  <input type="text" name="" v-model="username" class="form-control" id="" />
                </div>
                <div class="form-group col-md-6">
                  <label for="">Email</label>
                  <input type="text" name="" v-model="email" class="form-control" id="" />
                </div>
                <div class="form-group col-6">
                        <label for="">Rol</label>
                        <select name="" id="" class="form-control" v-model="rol_id">
                          <option value="" disabled selected>Seleccione rol</option>
                          <option v-for="m in roles" :value="m.id">{{ m.nombre }}</option>
                        </select>
                      </div>
                      <div class="form-group col-6">
                        <label for="">Empresa</label>
                        <select name="" id="" class="form-control" v-model="empresa_id"
                          @change="sucursal(empresa_id), empresaid(empresa_id)">
                          <option value="" disabled selected>Seleccione empresa</option>
                          <option v-for="m in empresas" :value="m.id">{{ m.nombre }}</option>
                        </select>
                      </div>
                      <div class="form-group col-6">
                        <label for="">Sucursal</label>
                        <select name="" id="" class="form-control" v-model="sucursal_id" @change="sucursalid(sucursal_id)">
                          <option value="" disabled selected>Seleccione sucursal</option>
                          <option v-for="m in sucursals" :value="m.id">{{ m.nombre }}</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="">Passwors</label>
                        <input type="password" name="" v-model="password" class="form-control" id="">
                      </div>
                 <div class="modal-footer">
                  <button type="button" @click="modalIngreso = false, Save()" class="btn bg-gradient-secondary w-100"
                    data-bs-dismiss="modal">
                    Guardar
                  </button>
                </div>
              </div>
            </div>
            </div>
          </div>
          <div class="modal fade" :class="modalEditar ? 'showModal' : ''" id="AjusteModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Modificar
                  </h5>
                  <button type="button" class="btn-close text-dark" @click="modalEditar = false, cleanModal()"
                    data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div slot="body" class="modal-body row">
                <div class="form-group col-md-6">
                  <label for="">Primer Nombre</label>
                  <input type="text" name="" v-model="nombre" class="form-control" id="" />
                </div>
                <div class="form-group col-md-6">
                  <label for="">Segundo Nombre</label>
                  <input type="text" name="" v-model="s_nombre" class="form-control" id="" />
                </div>
                <div class="form-group col-md-6">
                  <label for="">Apellido Paterno</label>
                  <input type="text" name="" v-model="a_paterno" class="form-control" id="" />
                </div>
                <div class="form-group col-md-6">
                  <label for="">Apellido Materno</label>
                  <input type="text" name="" v-model="a_materno" class="form-control" id="" />
                </div>
                <div class="form-group col-md-6">
                  <label for="">Nombre de Usuario</label>
                  <input type="text" name="" v-model="username" class="form-control" id="" />
                </div>
                <div class="form-group col-md-6">
                  <label for="">Email</label>
                  <input type="text" name="" v-model="email" class="form-control" id="" />
                </div>
                <div class="form-group col-6">
                        <label for="">Rol</label>
                        <select name="" id="" class="form-control" v-model="rol_id">
                          <option v-for="m in roles" :value="m.id">{{ m.nombre }}</option>
                        </select>
                      </div>
                      <div class="form-group col-6">
                        <label for="">Empresa</label>
                        <select name="" id="" class="form-control" v-model="empresa_id"
                          @change="sucursal(empresa_id), empresaid(empresa_id)">
                          <option v-for="m in empresas" :value="m.id">{{ m.nombre }}</option>
                        </select>
                      </div>
                      <div class="form-group col-6">
                        <label for="">Sucursal</label>
                        <select name="" id="" class="form-control" v-model="sucursal_id" @change="sucursalid(sucursal_id)">
                          <option v-for="m in sucursals" :value="m.id">{{ m.nombre }}</option>
                        </select>
                      </div>
                      <div class="form-group col-6">
                        <label for="">Colaborador</label>
                        <select name="" id="" class="form-control" v-model="trabajador_id">
                          <option value="" disabled selected>Seleccione colaborador</option>
                          <option v-for="m in colaboradores" :value="m.id">{{ m.nombre }}</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="">Passwors</label>
                        <input type="password" name="" v-model="password" class="form-control" id="">
                      </div>
                <div class="modal-footer">
                  <button type="button" @click="modalEditar = false, Update()" class="btn bg-gradient-secondary w-100"
                    data-bs-dismiss="modal">
                    Actualizar
                  </button>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </AdminTemplate>
  </div>
</template>

<script>
import JcLoader from '../../../components/JcLoader.vue';
export default {
  name: "IndexPage",
  head() {
    return {
      title: this.apiUrl,
    };;
  },
  data() {
    return {
      load: true,
      modalIngreso: false,
      modalEditar: false,
      buscar: '',
      list: [],
      empresas: [],
      sucursals: [],
      bodegas: [],
      colaboradores: [],
      trabajador_id:'',
      roles: [],
      nombre: '',
      s_nombre: '',
      a_paterno: '',
      a_materno: '',
      email: '',
      n_empresa:'',
      n_sucursal:'',
      username: '',
      password: '',
      empresa_id: '',
      sucursal_id: '',
      bodega_id: '',
      tipo: '',
      rol_id:'',
      apiUrl: 'users',
      page: 'Usuarios',
      modulo: 'Usuario',
      url_empresa: '/usuarios/usuario/usuarioempresa/',
      url_sucursal: '/usuarios/usuario/usuariosucursal/',
      elementosPorPagina: 20,
      datosPaginados: [],
      paginaActual: 1,
      user:{},
      eid:[],
      sid:[]
    };
  },
  computed: {
    listFilter() {
      let buscar = this.buscar
      if (buscar != '') {
        return this.list.filter((a) => {
          let nombre = a.nombre != null ? a.nombre : ''
          let email = a.email != null ? a.email : ''
          let username = a.username != null ? a.username : ''
          return nombre.toLowerCase().indexOf(buscar.toLowerCase()) != -1 || email.toLowerCase().indexOf(buscar.toLowerCase()) != -1 || username.toLowerCase().indexOf(buscar.toLowerCase()) != -1
        })

      }
      return this.list
    },
  },
  methods: {
    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res
    },
    localSelect(id) {
      if (!localStorage.getItem("selector")) {
        id = { sl_id: id };
        localStorage.setItem("selector", JSON.stringify(id));
        let dataStorage = JSON.parse(localStorage.getItem("selector"));
        localStorage.setItem("selector", JSON.stringify(dataStorage));
      } else {
        let dataStorage = JSON.parse(localStorage.getItem("selector"));
        dataStorage.sl_id = id;
        localStorage.setItem("selector", JSON.stringify(dataStorage));
      }

    },
    async EliminarItem(id) {
      this.load = true
      try {
        const res = await this.$api.$delete(this.apiUrl + "/" + id);
        console.log(res)
        await Promise.all([this.GET_DATA(this.apiUrl)]).then((v) => {
          this.list = v[0]
        })
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
    },
    totalPaginas() {
      return Math.ceil(this.listFilter.length / this.elementosPorPagina)
    },

    getDataPagina(noPagina) {
      this.paginaActual = noPagina;
      this.datosPaginados = [];
      let ini = (noPagina * this.elementosPorPagina) - this.elementosPorPagina;
      let fin = (noPagina * this.elementosPorPagina);
      this.datosPaginados = this.listFilter.slice(ini, fin);
    },

    getPreviousPage() {
      if (this.paginaActual > 1) {
        this.paginaActual--;
      }
      this.getDataPagina(this.paginaActual);


    },

    getNextPage() {
      if (this.paginaActual < this.totalPaginas()) {
        this.paginaActual++;
      }
      this.getDataPagina(this.paginaActual);


    },
    async AbrirEmpresa() {
      window.open(this.url_empresa, "_self");
    },
    async AbrirSucursal() {
      window.open(this.url_sucursal, "_self");
    },
    async AbrirEditar() {
      window.open(this.url_editar, "_self");
    },
    isActive(noPagina) {
      return noPagina == this.paginaActual ? 'active' : ''
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
      this.n_empresa = this.eid.nombre
      this.n_sucursal = this.sid.nombre
    },
    async Save() {
      this.load = true
      let self = this
      try {
        const operacion = {
          empresa_id: this.empresa_id,
          n_empresa: this.n_empresa,
          sucursal_id: this.sucursal_id,
          n_sucursal: this.n_sucursal,
          nombre: this.nombre,
          s_nombre: this.s_nombre,
          a_paterno: this.a_paterno,
          a_materno: this.a_materno,
          password: this.password,
          email: this.email,
          username: this.username,
          rol_id: this.rol_id,
          
        }
        const res = await this.$api.$post(this.apiUrl, operacion);
        console.log(res);
        this.$swal
          .fire({
            title: "Representante Guardado !",
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "Ok",
          })
          .then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.archivoActualizar()
              this.cleanModal()
            }
          });

      } catch (e) {
        console.log(e)
      } finally {
        this.load = false
      };
    },
    async Update() {
      {
            this.load = true
            try {
                const res = await this.$api.$put(this.apiUrl + "/" + this.id,{
                    'empresa_id':this.empresa_id,
                    'n_empresa':this.n_empresa,
                    'sucursal_id':this.sucursal_id,
                    'trabajador_id':this.trabajador_id,
                    'n_sucursal':this.n_sucursal,
                    'nombre': this.nombre,
                    's_nombre': this.s_nombre,
                    'a_paterno': this.a_paterno,
                    'a_materno': this.a_materno,
                    'password': this.password,
                    'email': this.email,
                    'rol_id': this.rol_id,
                    'username': this.username,
                    'id':this.id,
                });
                console.log(res)
                this.$swal.fire({
                    title: 'Representante Actualizado',
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'Ok',
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      this.archivoActualizar()
                      this.cleanModal()
                    }
                })
            } catch (e) {
                console.log(e)
            } finally {
                this.load = false
            };
        }
    },
    archivoActualizar() {
      this.$nextTick(async () => {
        try {
          await Promise.all([this.GET_DATA(this.apiUrl)]).then((v) => {
            this.list = v[0];
          });
        } catch (e) {
          console.log(e);
        } finally {
          this.load = false
        }
        this.getDataPagina(1);
      });
    },
    sucursal(empresa_id) {
      this.$nextTick(async () => {
        try {
          await Promise.all([this.GET_DATA('/sucursal/empresa?empresa=' + empresa_id)]).then((v) => {
            this.sucursals = v[0];
          });
        } catch (e) {
          console.log(e);
        } finally {
          this.load = false
        }
      });
    },
    abrirEditar(m){
      this.modalEditar = true,
      this.id = m.id
      this.empresa_id = m.empresa_id
      this.sucursal_id = m.sucursal_id
      this.trabajador_id = m.trabajador_id
      this.nombre = m.nombre
      this.s_nombre = m.s_nombre,
      this.a_paterno = m.a_paterno
      this.a_materno = m.a_materno
      this.password = m.password
      this.email = m.email
      this.rol_id = m.rol_id
      this.username = m.username
        },
        cleanModal(){
      this.id = ''
      this.empresa_id = ''
      this.sucursal_id = ''
      this.nombre = ''
      this.trabajador_id = ''
      this.s_nombre = ''
      this.a_paterno = ''
      this.a_materno = ''
      this.password = ''
      this.email = ''
      this.rol_id = ''
      this.username = ''

        },
    Eliminar(id) {
      let self = this
      this.$swal.fire({
        title: 'Deseas Eliminar?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: `Cancelar`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          await self.EliminarItem(id)
        }
      });
    },
  },
  mounted() {
    this.$nextTick(async () => {
      let user = localStorage.getItem('userAuth')
      this.user = JSON.parse(user)
      try {
        await Promise.all([this.GET_DATA(this.apiUrl), this.GET_DATA('empresas'), this.GET_DATA('roles'),this.GET_DATA('trabajadors/empresa?filtro=' + this.user.empresa_id + "&sucursal=" + this.user.sucursal_id)]).then((v) => {
          this.list = v[0]
          this.empresas = v[1]
          this.roles = v[2]
          this.colaboradores = v[3]
        })
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
      this.getDataPagina(1);
    });
  },
  components: { JcLoader }
};
</script>
<style>
.showModal {
  visibility: visible;
  display: block;
  opacity: 1 !important;
}
</style>