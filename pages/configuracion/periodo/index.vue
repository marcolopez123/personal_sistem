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
                    <th class="py-0 px-1">Mes</th>
                    <th class="py-0 px-1">Año</th>
                  </thead>
                  <tbody>
                    <tr v-for="(m, i) in list">
                      <td data-label="N" class="py-0 px-1">{{ i + 1 }}</td>
                      <td data-label="R Social" class="py-0 px-1">{{ m.nombre }}</td>
                      <td data-label="Rut" class="py-0 px-1">{{ m.ano.nro }}</td>
                      <td data-label="Direccion" class="py-0 px-1">{{ m.mese.nombre }}</td>
                      <td data-label="Acciones" class="py-0 px-1">
                        <div class="btn-group">
                          <button type="button" @click="abrirEditar(m)" class="btn btn-info btn-sm py-1 px-2">
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
                    Crear Periodo
                  </h5>
                  <button type="button" class="btn-close text-dark" @click="modalIngreso = false"
                    data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="clas-12">
                  <div class="form-group">
                    <label for="">Mes</label>
                    <select name="" id="" class="form-control" v-model="mese_id" @change="nroMes(meses)">
                      <option v-for="m in meses" :value="m.id">{{ m.nombre }}</option>
                    </select>
                  </div>
                </div>
                <div class="clas-12">
                  <div class="form-group">
                    <label for="">Año</label>
                    <select name="" id="" class="form-control" v-model="ano_id">
                      <option v-for="m in anos" :value="m.id">{{ m.nro }}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group col-12">
                  <label for="">Nombre</label>
                  <input type="text" name="" v-model="nombre" class="form-control" id="" />
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
          <div class="modal fade" :class="modalEditar ? 'showModal' : ''" id="AjusteModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Actualizar Perido
                  </h5>
                  <button type="button" class="btn-close text-dark" @click="modalEditar = false" data-bs-dismiss="modal"
                    aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="clas-12">
                  <div class="form-group">
                    <label for="">Mes</label>
                    <select name="" id="" class="form-control" v-model="mese_id" disabled>
                      <option v-for="m in meses" :value="m.id">{{ m.nombre }}</option>
                    </select>
                  </div>
                </div>
                <div class="clas-12">
                  <div class="form-group">
                    <label for="">Año</label>
                    <select name="" id="" class="form-control" v-model="ano_id" disabled>
                      <option v-for="m in anos" :value="m.id">{{ m.nro }}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group col-12">
                  <label for="">Nombre</label>
                  <input type="text" name="" v-model="nombre" class="form-control" id="" />
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
      buscar: "",
      id: '',
      id1: '',
      meses: [],
      anos: [],
      impuestos: [],
      remu: [],
      ano_id: '',
      mese_id: '',
      nombre: '',
      apiUrl: 'tPeriodos',
      page: 'Empresas',
      modulo: 'Empresas',
      elementosPorPagina: 20,
      datosPaginados: [],
      paginaActual: 1,
      user: {},
      sl: {}
    };
  },
  computed: {
    listFilter() {
      let buscar = this.buscar
      if (buscar != '') {
        return this.list.filter((a) => {
          let tipo = a.tipoArchivo.nombre != null ? a.tipoArchivo.nombre : ''
          let comentario = a.comentario != null ? a.comentario : ''
          return tipo.toLowerCase().indexOf(buscar.toLowerCase()) != -1 | comentario.toLowerCase().indexOf(buscar.toLowerCase()) != -1
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
          mese_id: this.mese_id,
          ano_id: this.ano_id,
          nombre: this.nombre,
          mes_ano: this.mese_id + "-" + this.ano_id,
          impuestos: this.impuestos,
          remu: this.remu
        }
        const res = await this.$api.$post('tPeriodos', operacion);
        console.log(res);
        this.$swal
          .fire({
            title: "Respaldo Guardada !",
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "Ok",
          })
          .then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.archivoActualizar()
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
          const res = await this.$api.$put('tPeriodos' + "/" + this.id1, {
            'nombre': this.nombre,
            'mese_id': this.mese_id,
            'ano_id': this.ano_id,
            'id': this.id
          });
          console.log(res)
          this.$swal.fire({
            title: 'Actualizado',
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: 'Ok',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.archivoActualizar()
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
          await Promise.all([this.GET_DATA('tPeriodos')]).then((v) => {
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
    abrirEditar(m) {
      this.modalEditar = true,
        this.id1 = m.id
      this.mese_id = m.mese_id,
        this.ano_id = m.ano_id
      this.nombre = m.nombre
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
        await Promise.all([this.GET_DATA(this.apiUrl), this.GET_DATA('meses'), this.GET_DATA('anos'), this.GET_DATA('tImpAutomaticos'), this.GET_DATA('tRemuAutomaticos')]).then((v) => {
          this.list = v[0]
          this.meses = v[1]
          this.anos = v[2]
          this.impuestos = v[3]
          this.remu = v[4]
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