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
                    <th class="py-0 px-1">Perido</th>
                    <th class="py-0 px-1">Tipo de Honorario</th>
                    <th class="py-0 px-1">Monto</th>
    
                  </thead>
                  <tbody>
                    <tr v-for="(m, i) in datosPaginados">
                      <td data-label="N" class="py-0 px-1">{{ i + 1 }}</td>
                      <td data-label="Empresa" class="py-0 px-1">{{ m.empresa.nombre }}</td>
                      <td data-label="Periodo" class="py-0 px-1">{{ m.t_periodo.nombre }}</td>
                      <td data-label="Tipo Honorario" class="py-0 px-1">{{ m.t_tipo_honorario.nombre }}</td>
                      <td data-label="Monto" class="py-0 px-1">{{ m.monto | format_number}}</td>
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
                <div class="clas-12">
                  <div class="form-group">
                    <label for="">Empresa</label>
                    <select name="" id="" class="form-control" v-model="empresa_id">
                      <option v-for="m in empresas" :value="m.id">{{ m.nombre }}</option>
                    </select>
                  </div>
                </div>
                <div class="clas-12">
                  <div class="form-group">
                    <label for="">Periodo</label>
                    <select name="" id="" class="form-control" v-model="t_periodo_id">
                      <option v-for="m in periodos" :value="m.id">{{ m.nombre }}</option>
                    </select>
                  </div>
                </div>
                <div class="clas-12">
                  <div class="form-group">
                    <label for="">Tipo Honorario</label>
                    <select name="" id="" class="form-control" v-model="t_tipo_honorario_id">
                      <option v-for="m in t_t_honorarios" :value="m.id">{{ m.nombre }}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group col-12">
                  <label for="">Monto</label>
                  <input type="text" name="" v-model="monto" class="form-control" id="" />
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
                    Modificar
                  </h5>
                  <button type="button" class="btn-close text-dark" @click="modalEditar = false, cleanModal()"
                    data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div><div class="clas-12">
                  <div class="form-group">
                    <label for="">Empresa</label>
                    <select name="" id="" class="form-control" v-model="empresa_id">
                      <option v-for="m in empresas" :value="m.id">{{ m.nombre }}</option>
                    </select>
                  </div>
                </div>
                <div class="clas-12">
                  <div class="form-group">
                    <label for="">Periodo</label>
                    <select name="" id="" class="form-control" v-model="t_periodo_id">
                      <option v-for="m in periodos" :value="m.id">{{ m.nombre }}</option>
                    </select>
                  </div>
                </div>
                <div class="clas-12">
                  <div class="form-group">
                    <label for="">Impuesto</label>
                    <select name="" id="" class="form-control" v-model="t_tipo_honorario_id">
                      <option v-for="m in t_t_honorarios  " :value="m.id">{{ m.nombre }}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group col-12">
                  <label for="">Monto</label>
                  <input type="text" name="" v-model="monto" class="form-control" id="" />
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
      periodos:[],
      impuestos:[],
      empresas:[],
      t_t_honorarios:[],
      id:'',
      empresa_id:'',
      t_periodo_id:'',
      t_tipo_honorario_id:'',
      monto:'',
      buscar:"",
      nombre: '',
      apiUrl: 'tGHonorarios',
      apiUrlFiltro: 'tGHonorario/filtro?filtro=',
      page: 'Gestion del Contador',
      modulo: 'Honorarios',
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
          let nombre = a.empresa.nombre != null ? a.empresa.nombre : ''
          let periodo = a.t_periodo.nombre != null ? a.t_periodo.nombre : ''
          let honorario = a.t_tipo_honorario.nombre != null ? a.t_tipo_honorario.nombre : ''
          return nombre.toLowerCase().indexOf(buscar.toLowerCase()) != -1 || periodo.toLowerCase().indexOf(buscar.toLowerCase()) != -1 || honorario.toLowerCase().indexOf(buscar.toLowerCase()) != -1
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
          t_tipo_honorario_id: this.t_tipo_honorario_id,
          empresa_id: this.empresa_id,
          t_periodo_id: this.t_periodo_id,
          monto: this.monto,
        }
        const res = await this.$api.$post(this.apiUrl, operacion);
        console.log(res);
        this.$swal
          .fire({
            title: "Proceso Guardado !",
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
                    't_periodo_id':this.t_periodo_id,
                    't_tipo_honorario_id':this.t_tipo_honorario_id,
                    'monto': this.monto,
                    'id':this.id,
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
          await Promise.all([this.GET_DATA(this.apiUrlFiltro + this.user.empresa_id)]).then((v) => {
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
      this.t_periodo_id = m.t_periodo_id
      this.t_tipo_honorario_id = m.t_tipo_honorario_id,
      this.monto = m.monto
        },
        cleanModal(){
      this.id = ''
      this.empresa_id = ''
      this.t_periodo_id = ''
      this.t_tipo_honorario_id = ''
      this.monto = ''
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
        await Promise.all([this.GET_DATA(this.apiUrl), this.GET_DATA('tPeriodos'), this.GET_DATA('tTipoHonorarios'), this.GET_DATA('empresas')]).then((v) => {
          this.list = v[0]
          this.periodos = v[1]
          this.t_t_honorarios = v[2]
          this.empresas = v[3]
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
