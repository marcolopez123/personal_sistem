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
                    <th class="py-0 px-1">Trabajador</th>
                    <th class="py-0 px-1">Tipo Documento</th>
                    <th class="py-0 px-1">Descripccion</th>
                    <th class="py-0 px-1">Acciones</th>
                  </thead>
                  <tbody>
                    <tr v-for="(m, i) in datosPaginados">
                      <td data-label="N" class="py-0 px-1">{{ i + 1 }}</td>
                      <td data-label="Nombre" class="py-0 px-1">{{ m.trabajador.nombre }}</td>
                      <td data-label="Nombre" class="py-0 px-1">{{ m.tipoArchivo.nombre }}</td>
                      <td data-label="Nombre" class="py-0 px-1">{{ m.comentario }}</td>
                      <td data-label="Acciones" class="py-0 px-1">
                        <div class="btn-group">
                          <button type="button" @click="abrirEditar(m)"
                            class="btn btn-info btn-sm py-1 px-2">
                            <i class="fas fa-pen"></i>
                          </button>
                          <button v-if="user.rol_id == 1" class="btn btn-success btn-sm py-1 px-2" type="button"
                            @click="archivo(m.id), drop()">
                            <i class="fas fa-image"></i>
                          </button>
                          <button v-if="m.documento !== null" type="button" @click="AbrirLink(m.documento.url)"
                            class="btn btn-primary btn-sm py-1 px-2">
                            <i class="fas fa-search"></i>
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
                <div class="clas-12">
                  <div class="form-group">
                    <label for="">Tipo Archivo</label>
                    <select name="" id="" class="form-control" v-model="tipo_archivo_id">
                      <option v-for="m in tipo_archivos" :value="m.id">{{ m.nombre }}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group col-12">
                  <label for="">Comentario</label>
                  <input type="text" name="" v-model="comentario" class="form-control" id="" />
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
                    <label for="">Tipo Archivo</label>
                    <select name="" id="" class="form-control" v-model="tipo_archivo_id" disabled>
                      <option v-for="m in tipo_archivos" :value="m.id">{{ m.nombre }}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group col-12">
                  <label for="">Comentario</label>
                  <input type="text" name="" v-model="comentario" class="form-control" id="" />
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
          <div class="modal fade" :class="modalArchivos ? 'showModal' : ''" id="AjusteModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Editar artículo
                  </h5>
                  <button type="button" class="btn-close text-dark" @click="modalArchivos = false, desdrop()"
                    data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="card-body">
                  <div class="form-control dropzone" id="fileDrop">
                    <div class="fallback">
                      <input name="file" type="file" multiple />
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" @click="modalArchivos = false, desdrop()"
                    class="btn bg-gradient-secondary w-100" data-bs-dismiss="modal">
                    Cerrar
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
      modalArchivos: false,
      modalIngreso: false,
      modalEditar: false,
      buscar: "",
      list: [],
      trabajador_id:'',
      tipo_archivos:[],
      area_id: 3,
      tipo_archivo_id: '',
      comentario:'',
      apiUrl: 'archivos/area?trabajador=',
      apiUrlArchivo: 'archivos',
      page: 'Trabajadores',
      modulo: 'Archivos',
      url_documento: "/configuracion/trabajadores/archivos/archivo/",
      elementosPorPagina: 20,
      datosPaginados: [],
      paginaActual: 1,
      user: {},
      sl: {}

    };
  },
  filters: {
    format_number: function (value) {
      return parseInt(value).toLocaleString("de-DE")

    },
    format_decimal: function (value) {
      return parseInt(value).toLocaleString("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })

    }
  },
  computed: {
    listFilter() {
      let buscar = this.buscar
      if (buscar != '') {
        return this.list.filter((a) => {
          let trabajador = a.trabajador != null ? a.trabajador : ''
          return trabajador.toLowerCase().indexOf(buscar.toLowerCase()) != -1
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
      if (!localStorage.getItem("selector1")) {
        id = { sl_id: id };
        localStorage.setItem("selector1", JSON.stringify(id));
        let dataStorage = JSON.parse(localStorage.getItem("selector1"));
        localStorage.setItem("selector1", JSON.stringify(dataStorage));
      } else {
        let dataStorage = JSON.parse(localStorage.getItem("selector1"));
        dataStorage.sl_id = id;
        localStorage.setItem("selector1", JSON.stringify(dataStorage));
      }
    },
    async AbrirEditar() {
      window.open(this.url_editar, "_self");
    },
    drop() {
      Dropzone.autoDiscover = false;
      let self = this;
      let url =
        this.$api.url + this.doc + this.docid;

      new Dropzone("div#fileDrop", {
        url: url,
        headers: {
          Authorization: '',
          // remove Cache-Control and X-Requested-With
          // to be sent along with the request
          "Cache-Control": null,
          "X-Requested-With": null,
        },
      }).on("complete", async function (file) {
        this.removeFile(file);
        this.desdrop1();

      });
    },
    archivo(id) {
      this.modalArchivos = true,
        this.doc = "archivoDoctos/archivo/",
        this.docid = id
    },
    desdrop() {
      if (Dropzone.instances.length > 0) Dropzone.instances.forEach(bz => bz.destroy());
    },
    desdrop1() {
      if (Dropzone.instances.length > 0) Dropzone.instances.forEach(bz => bz.destroy());
      this.liquidacionActualizar()
      this.archivoActualizar()
    },
    async Save() {
      this.load = true
      let self = this
      try {
        const operacion = {
          trabajador_id: this.sl.sl_id,
          area_id: this.area_id,
          tipo_archivo_id: this.tipo_archivo_id,
          comentario: this.comentario,
        }
        const res = await this.$api.$post(this.apiUrlArchivo, operacion);
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
                const res = await this.$api.$put(this.apiUrlArchivo + "/" + this.id,{
                    'comentario':this.comentario,
                    'tipo_archivo_id':this.tipo_archivo_id,
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
          await Promise.all([this.GET_DATA(this.apiUrl + this.sl.sl_id)]).then((v) => {
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
    async AbrirLink(url) {
      window.open(url, '_blank');
    },
    abrirEditar(m){
      this.modalEditar = true,
      this.id = m.id
      this.tipo_archivo_id = m.tipo_archivo_id
      this.comentario = m.comentario
        },
        cleanModal(){
      this.tipo_archivo_id = ''
      this.comentario = ''
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
    async EliminarItem(id) {
      this.load = true
      try {
        const res = await this.$api.$delete("archivos/" + id);
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
    async AbrirLink(url) {
      window.open(url, '_blank');
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
        this.archivoActualizar()
      })
    }
  },
  mounted() {
    this.$nextTick(async () => {

      let user = localStorage.getItem('userAuth')
      this.user = JSON.parse(user)
      let sl = localStorage.getItem('selector')
      this.sl = JSON.parse(sl)
      Dropzone.autoDiscover = false;
      let self = this;
      try {
        await Promise.all([this.GET_DATA(this.apiUrl + this.sl.sl_id), this.GET_DATA('/area/filtro?area=' + this.area_id)]).then((v) => {
          this.list = v[0]
          this.tipo_archivos = v[1]
  
        })
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
      this.getDataPagina(1);
    });
  },
};
</script>
<style>
.showModal {
  visibility: visible;
  display: block;
  opacity: 1 !important;
}
</style>