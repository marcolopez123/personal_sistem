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
                    <th class="py-0 px-1">Empresa</th>
                    <th class="py-0 px-1">P Nombre</th>
                    <th class="py-0 px-1">S Nombre</th>
                    <th class="py-0 px-1">A Paterno</th>
                    <th class="py-0 px-1">A Materno</th>
                    <th class="py-0 px-1">Telefono</th>
                    <th class="py-0 px-1">Email</th>
                    <th class="py-0 px-1">Participacion</th>
                    <th class="py-0 px-1">Acciones</th>
                  </thead>
                  <tbody>
                    <tr v-for="(m, i) in list">
                      <td data-label="N" class="py-0 px-1">{{ i + 1 }}</td>
                      <td data-label="Empresa" class="py-0 px-1">{{ m.empresa.nombre }}</td>
                      <td data-label="p Nombre" class="py-0 px-1">{{ m.p_nombre }}</td>
                      <td data-label="s Nombre" class="py-0 px-1">{{ m.s_nombre }}</td>
                      <td data-label="A Paterno" class="py-0 px-1">{{ m.a_paterno }}</td>
                      <td data-label="A Materno" class="py-0 px-1">{{ m.a_materno }}</td>
                      <td data-label="telefono" class="py-0 px-1">{{ m.telefono }}</td>
                      <td data-label="Email" class="py-0 px-1">{{ m.email }}</td>
                      <td data-label="Participacion" class="py-0 px-1">{{ m.participacion * 100 | format_number}}%</td>
                      <td data-label="Acciones" class="py-0 px-1">
                        <div class="btn-group">
                          <button type="button" @click="abrirEditar(m)"
                            class="btn btn-info btn-sm py-1 px-2">
                            <i class="fas fa-pen"></i>
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
                <div slot="body" class="row">
                <div class="clas-6">
                  <div class="form-group">
                    <label for="">Empresa</label>
                    <select name="" id="" class="form-control" v-model="empresa_id">
                      <option v-for="m in empresas" :value="m.id">{{ m.nombre }}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label for="">Primer Nombre</label>
                  <input type="text" name="" v-model="p_nombre" class="form-control" id="" />
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
                  <label for="">Telefono</label>
                  <input type="text" name="" v-model="telefono" class="form-control" id="" />
                </div>
                <div class="form-group col-md-6">
                  <label for="">Email</label>
                  <input type="text" name="" v-model="email" class="form-control" id="" />
                </div>
                <div class="form-group col-md-6">
                  <label for="">Participacion</label>
                  <input type="text" name="" v-model="participacion" class="form-control" id="" />
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
                <div slot="body" class="row">
                <div class="clas-6">
                  <div class="form-group">
                    <label for="">Empresa</label>
                    <select name="" id="" class="form-control" v-model="empresa_id">
                      <option v-for="m in empresas" :value="m.id">{{ m.nombre }}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label for="">Primer Nombre</label>
                  <input type="text" name="" v-model="p_nombre" class="form-control" id="" />
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
                  <label for="">Telefono</label>
                  <input type="text" name="" v-model="telefono" class="form-control" id="" />
                </div>
                <div class="form-group col-md-6">
                  <label for="">Email</label>
                  <input type="text" name="" v-model="email" class="form-control" id="" />
                </div>
                <div class="form-group col-md-6">
                  <label for="">Participacion</label>
                  <input type="text" name="" v-model="participacion" class="form-control" id="" />
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
    };
  },
  data() {
    return {
      load: true,
      modalIngreso: false,
      modalEditar: false,
      list: [],
      empresas:[],
      id:'',
      empresa_id:'',
      p_nombre:'',
      s_nombre:'',
      a_paterno:'',
      a_materno:'',
      telefono:'',
      email:'',
      participacion:'',
      buscar:"",
      apiUrl: 'tSocios',
      page: 'Empresa',
      modulo: 'Socios',
      elementosPorPagina: 20,
      datosPaginados: [],
      paginaActual: 1,
      user: {},
      sl: {}
    };
  },
  filters: {
format_number: function (value){
 return parseInt(value).toLocaleString("de-DE")
}
},
  computed: {
    listFilter() {
      let buscar = this.buscar
      if (buscar != '') {
        return this.list.filter((a) => {
          let nombre = a.nombre != null ? a.nombre : ''
          return nombre.toLowerCase().indexOf(buscar.toLowerCase()) != -1
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

    isActive(noPagina) {
      return noPagina == this.paginaActual ? 'active' : ''
    },
  
    totalPaginas() {
      return Math.ceil(this.listFilter.length / this.elementosPorPagina)
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
    async Save() {
      this.load = true
      let self = this
      try {
        const operacion = {
          empresa_id: this.empresa_id,
          p_nombre: this.p_nombre,
          s_nombre: this.s_nombre,
          a_paterno: this.a_paterno,
          a_materno: this.a_materno,
          telefono: this.telefono,
          email: this.email,
          participacion: this.participacion,
          
        }
        const res = await this.$api.$post(this.apiUrl, operacion);
        console.log(res);
        this.$swal
          .fire({
            title: "Socio Guardado !",
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
                    'p_nombre': this.p_nombre,
                    's_nombre': this.s_nombre,
                    'a_paterno': this.a_paterno,
                    'a_materno': this.a_materno,
                    'telefono': this.telefono,
                    'email': this.email,
                    'participacion': this.participacion,
                    'id':this.id,
                });
                console.log(res)
                this.$swal.fire({
                    title: 'Socio Actualizado',
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
    abrirEditar(m){
      this.modalEditar = true,
      this.id = m.id
      this.empresa_id = m.empresa_id
      this.p_nombre = m.p_nombre
      this.s_nombre = m.s_nombre,
      this.a_paterno = m.a_paterno
      this.a_materno = m.a_materno
      this.telefono = m.telefono
      this.email = m.email
      this.participacion = m.participacion
        },
        cleanModal(){
      this.id = ''
      this.empresa_id = ''
      this.p_nombre = ''
      this.s_nombre = ''
      this.a_paterno = ''
      this.a_materno = ''
      this.telefono = ''
      this.email = ''
      this.participacion = ''

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
      })
    }
    
  },
  mounted() {
    let user = localStorage.getItem('userAuth')
    this.user = JSON.parse(user)
    this.$nextTick(async () => {
      try {
        await Promise.all([this.GET_DATA(this.apiUrl), this.GET_DATA('empresas')]).then((v) => {
          this.list = v[0]
          this.empresas = v[1]
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
