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
                  <div class="col-lg-2 col-md-2 col-2">
                    <div class="input-group input-group-lg">
                       <date-picker v-model="fecha1" name="fecha1" valueType="format" lang="es"></date-picker>
                    </div>
                  </div>  
                  <div class="col-lg-2 col-md-2 col-2">
                    <div class="input-group input-group-lg">
                       <date-picker v-model="fecha2" name="fecha2" valueType="format" lang="es"></date-picker>
                    </div>
                  </div>  
                  <div class="col-lg-2 col-md-2 col-2">
                    <button class="btn bg-gradient-primary mb-0 mt-lg-auto w-100" type="button" name="button"
                         @click="Buscar()">
                          <i class="fa fa-refresh"></i>
                          BUSCAR
                        </button>
                      </div> 
                  <div class="col-lg-2 col-md-2 py-2 ms-auto">
                    <a v-if="user.rol_id == 1 || user.rol_id == 2" href="javascript:void(0);" class="cta"
                      @click="[modalDocumento = true]">
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
                <i class="fa fa-file-excel-o fa-2x" aria-hidden="true" @click="descargarExcel()"></i>
                <table class="table">
                  <thead>
                    <th class="py-0 px-1">#</th>
                    <th class="py-0 px-1">Cliente</th>
                    <th class="py-0 px-1">Nro Dcto</th>
                    <th class="py-0 px-1">Orden</th>
                    <th class="py-0 px-1">Fecha</th>
                    <th class="py-0 px-1">Monto</th>
                    <th class="py-0 px-1">Estado</th>
                  </thead>
                  <tbody>
                    <tr v-for="(m, i) in datosPaginados">
                      <td data-label="N" class="py-0 px-1">{{ i + 1 }}</td>
                      <td data-label="Cliente" class="py-0 px-1">{{ m.cliente.nombre }}</td>
                      <td data-label="Nro Dcto" class="py-0 px-1">{{ m.nro }}</td>
                      <td data-label="Orden" class="py-0 px-1">{{ m.orden }}</td>
                      <td data-label="Fecha" class="py-0 px-1">{{ m.fecha }}</td>
                      <td data-label="Monto" class="py-0 px-1">{{ m.monto | format_number }}</td>
                      <td data-label="Estado" class="py-0 px-1">{{ m.t_estado_pago.nombre }}</td>
                      <td data-label="Acciones" class="py-0 px-1">
                        <div class="btn-group">
                          <button v-if="m.documento !== null" type="button"
                            @click="[modalArchivos = true], localSelect(m.id, m.cliente_id), archivoActualizar()"
                            class="btn btn-primary btn-sm py-1 px-2">
                            <i class="fas fa-search"></i>
                          </button>
                          <button type="button" @click="abrirEditar(m)"
                            class="btn btn-info btn-sm py-1 px-2">
                            <i class="fas fa-pen"></i>
                          </button>
                          <button v-if="user.rol_id == 1 || user.rol_id == 2" type="button" @click="Eliminar2(m.id)"
                            class="btn btn-danger btn-sm py-1 px-2">
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
          <div class="modal fade" :class="modalDocumento ? 'showModal' : ''" id="DatosModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Nuevo Documento
                  </h5>
                  <button type="button" class="btn-close text-dark" @click="modalDocumento = false"
                    data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-6">
                      <label for="">Fecha</label>
                      <date-picker v-model="fecha" lang="es" format="YYYY-MM-DD" valueType="format"
                        placeholder="Selecciona una fecha"></date-picker>
                    </div>
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="">Cliente</label>
                        <select name="" id="" class="form-control bg-transparent border-0 text-dark"
                          v-model="cliente_id">
                          <!-- Placeholder -->
                          <option value="" disabled selected>Seleccione cliente</option>
                          <!-- Opciones -->
                          <option class="text-dark" v-for="m in clientes" :key="m.id" :value="m.id">{{ m.nombre }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group col-6">
                      <div class="form-group">
                        <label for="">Nro Dcto</label>
                        <input type="text" name="" v-model="nro" class="form-control" id="">
                      </div>
                    </div>
                    <div class="form-group col-6">
                      <div class="form-group">
                        <label for="">Orden de Compra</label>
                        <input type="text" name="" v-model="orden" class="form-control" id="">
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="">Estado de Pago</label>
                        <select name="" id="" class="form-control bg-transparent border-0 text-dark"
                          v-model="t_estado_pago_id">
                          <!-- Placeholder -->
                          <option value="" disabled selected>Seleccione estado de pago</option>
                          <!-- Opciones -->
                          <option class="text-dark" v-for="m in t_estado_pagos" :key="m.id" :value="m.id">{{ m.nombre }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group col-6">
                      <div class="form-group">
                        <label for="">Monto</label>
                        <input type="text" name="" v-model="monto" class="form-control" id="">
                      </div>
                    </div>
                    <div class="form-group col-6">
                      <div class="form-group">
                        <label for="">Plazo</label>
                        <input type="text" name="" v-model="plazo" class="form-control" id="">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" @click="Save(), [modalDocumento = false]"
                    class="btn bg-gradient-secondary w-100" data-bs-dismiss="modal">
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal fade" :class="modalEditar ? 'showModal' : ''" id="DatosModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Nuevo Documento
                  </h5>
                  <button type="button" class="btn-close text-dark" @click="modalDocumento = false"
                    data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-6">
                      <label for="">Fecha</label>
                      <date-picker v-model="fecha" lang="es" format="YYYY-MM-DD" valueType="format"
                        placeholder="Selecciona una fecha"></date-picker>
                    </div>
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="">Cliente</label>
                        <select name="" id="" class="form-control bg-transparent border-0 text-dark"
                          v-model="cliente_id">
                          <!-- Placeholder -->
                          <option value="" disabled selected>Seleccione cliente</option>
                          <!-- Opciones -->
                          <option class="text-dark" v-for="m in clientes" :key="m.id" :value="m.id">{{ m.nombre }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group col-6">
                      <div class="form-group">
                        <label for="">Nro Dcto</label>
                        <input type="text" name="" v-model="nro" class="form-control" id="">
                      </div>
                    </div>
                    <div class="form-group col-6">
                      <div class="form-group">
                        <label for="">Orden de Compra</label>
                        <input type="text" name="" v-model="orden" class="form-control" id="">
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="">Estado de Pago</label>
                        <select name="" id="" class="form-control bg-transparent border-0 text-dark"
                          v-model="t_estado_pago_id">
                          <!-- Placeholder -->
                          <option value="" disabled selected>Seleccione estado de pago</option>
                          <!-- Opciones -->
                          <option class="text-dark" v-for="m in t_estado_pagos" :key="m.id" :value="m.id">{{ m.nombre }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group col-6">
                      <div class="form-group">
                        <label for="">Monto</label>
                        <input type="text" name="" v-model="monto" class="form-control" id="">
                      </div>
                    </div>
                    <div class="form-group col-6">
                      <div class="form-group">
                        <label for="">Plazo</label>
                        <input type="text" name="" v-model="plazo" class="form-control" id="">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" @click="modalEditar = false, Update()"
                    class="btn bg-gradient-secondary w-100" data-bs-dismiss="modal">
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal fade" :class="modalArchivos ? 'showModal' : ''" id="AjusteModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header bg-gradient-dark ¿">
                  <h5 class="text-white" id="exampleModalLabel">
                    Subir archivo
                  </h5>
                  <div class="col-lg-4 col-md-4 py-4 ms-auto">
                    <a v-if="user.rol_id == 1 || user.rol_id == 2" href="javascript:void(0);" class="cta"
                      @click="[modalSubArchivo = true]">
                      <span>Nuevo</span>
                      <svg width="13px" height="10px" viewBox="0 0 13 10">
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                      </svg>
                    </a>
                  </div>
                  <button type="button" class="btn-close text-white" @click="modalArchivos = false, desdrop1()"
                    data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div id="tabla" class="col-12">
                  <div class="card">
                    <div class="card-body">
                      <table class="table">
                        <thead>
                          <th class="py-0 px-1">#</th>
                          <th class="py-0 px-1">Tipo Archivo</th>
                          <th class="py-0 px-1">Comentario</th>
                        </thead>
                        <tbody>
                          <tr v-for="(m, i) in datosPaginados2">
                            <td data-label="N" class="py-0 px-1">{{ i + 1 }}</td>
                            <td data-label="Cliente" class="py-0 px-1">{{ m.tipo_archivo.nombre }}</td>
                            <td data-label="Cliente" class="py-0 px-1">{{ m.comentario }}</td>
                            <td data-label="Acciones" class="py-0 px-1">
                              <div class="btn-group">
                                <button v-if="user.rol_id == 1 || user.rol_id == 2"
                                  class="btn btn-success btn-sm py-1 px-2" type="button" @click="Doc(m.id), drop()">
                                  <i class="fas fa-image"></i>
                                </button>
                                <button v-if="m.documento !== null" type="button" @click="AbrirLink(m.documento.url)"
                                  class="btn btn-primary btn-sm py-1 px-2">
                                  <i class="fas fa-search"></i>
                                </button>
                                <button v-if="user.rol_id == 1 || user.rol_id == 2" type="button"
                                  @click="Eliminar(m.id)" class="btn btn-danger btn-sm py-1 px-2">
                                  <i class="fas fa-trash"></i>
                                </button>
                              </div>
                            </td>

                          </tr>
                        </tbody>
                      </table>
                      <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                          <li class="page-item"><a class="page-link" v-on:click="getPreviousPage2()" href="#">Pre</a>
                          </li>
                          <li class="page-item"><a class="page-link" v-on:click="getNextPage2()" href="#">Next</a></li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal fade" :class="modalSubArchivo ? 'showModal' : ''" id="DatosModal" tabindex="-1"
            role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Nuevo Documento
                  </h5>
                  <button type="button" class="btn-close text-dark" @click="modalSubArchivo = false"
                    data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="">Estado de Pago</label>
                        <select name="" id="" class="form-control bg-transparent border-0 text-dark"
                          v-model="tipo_archivo_id">
                          <!-- Placeholder -->
                          <option value="" disabled selected>Seleccione tipo de Archivo</option>
                          <!-- Opciones -->
                          <option class="text-dark" v-for="m in tipo_archivos" :key="m.id" :value="m.id">{{ m.nombre }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group col-6">
                      <div class="form-group">
                        <label for="">Comentario</label>
                        <input type="text" name="" v-model="comentario" class="form-control" id="">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" @click="SaveArchivo(), [modalSubArchivo = false]"
                    class="btn bg-gradient-secondary w-100" data-bs-dismiss="modal">
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal fade" :class="modalSubida ? 'showModal' : ''" id="AjusteModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Subir archivo
                  </h5>
                  <button type="button" class="btn-close text-dark" @click="modalSubida = false, desdrop1()"
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
                  <button type="button" @click="modalSubida = false, desdrop1(), archivoActualizar()"
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
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import es from 'vue2-datepicker/locale/es';

export default {
  name: "IndexPage",
  head() {
    return {
      title: this.apiUrl,
    };
  },
  components: {
    DatePicker
  },
  data() {
    return {
      load: true,
      buscar: "",
      buscar2: "",
      rut: '',
      nombre: '',
      cliente_id: '',
      fecha: new Date(),
      fecha1:'',
      fecha2:'',
      empresa_id: '',
      sucursal_id: '',
      r_facturacione: '',
      nro:'',
      plazo:'',
      monto:'',
      orden:'',
      comentario: '',
      area: 4,
      doc: '',
      cli_id: '',
      f_id: '',
      t_estado_pago_id: '',
      tipo_archivo_id: '',
      tipo_archivos: [],
      list: [],
      list2: [],
      clif: {},
      user: {},
      t_estado_pagos: [],
      clientes: [],
      modalDocumento: false,
      modalEditar: false,
      modalArchivos: false,
      modalSubida: false,
      modalSubArchivo: false,
      apiUrl: 'facturaciones',
      apiDelete: 'rFacturaciones',
      page: 'Empresas',
      modulo: 'Formulario 29',
      url_nuevo: "/empresas/archivos/nuevo/",
      url_documento: "/empresas/archivos/archivo/",
      elementosPorPagina: 20,
      datosPaginados: [],
      paginaActual: 1,
      elementosPorPagina2: 5,
      datosPaginados2: [],
      paginaActual2: 1,

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
          let cliente = a.cliente.nombre != null ? a.cliente.nombre : ''
  
          return cliente.toLowerCase().indexOf(buscar.toLowerCase()) != -1
        })

      }
      return this.list
    },
    listFilter2() {
      let buscar2 = this.buscar2;
      if (buscar2 != '') {
        return this.list2.filter((a) => {
          let tipo_archivo = a.tipo_archivo.nombre != null ? a.tipo_archivo.nombre : '';
          let comentario = a.comentario != null ? a.comentario : '';
          return tipo_archivo.toLowerCase().indexOf(buscar2.toLowerCase()) != -1 || comentario.toLowerCase().indexOf(buscar2.toLowerCase()) != -1;
        });
      }
      return this.list2;
    },
  },
  methods: {
    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res
    },
    localSelect(id, cliente_id) {
      if (!localStorage.getItem("clif")) {
        id = { f_id: id, cli_id: cliente_id };

        localStorage.setItem("clif", JSON.stringify(id, cliente_id));

        let dataStorage = JSON.parse(localStorage.getItem("clif"));
        localStorage.setItem("clif", JSON.stringify(dataStorage));
      } else {
        let dataStorage = JSON.parse(localStorage.getItem("clif"));
        dataStorage.f_id = id;
        dataStorage.cli_id = cliente_id;
        localStorage.setItem("clif", JSON.stringify(dataStorage));
      }
      let clif = localStorage.getItem('clif')
      this.clif = JSON.parse(clif)
    },
    Buscar(){
       this.$nextTick(async () => {
      try {
        await Promise.all([this.GET_DATA('facturaciones/filtro?empresa=' + this.user.empresa_id + "&sucursal=" + this.user.sucursal_id + "&fecha1=" + this.fecha1 +' & fecha2=' + this.fecha2)]).then((v) => {
          this.list = v[0];
        });

      } catch (e) {
        console.log(e);
      } finally {
        this.load=false
      }
      this.getDataPagina(1);
    });
    return this.list
    },
    async Save() {
      this.load = true
      let self = this
      try {
        const operacion = {
          empresa_id: this.user.empresa_id,
          cliente_id: this.cliente_id,
          nro: this.nro,
          orden: this.orden,
          plazo: this.plazo,
          fecha: this.fecha,
          sucursal_id: this.user.sucursal_id,
          t_estado_pago_id: this.t_estado_pago_id,
          monto: this.monto,
        }
        const res = await this.$api.$post('facturaciones', operacion);
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
              this.Buscar()
              this.Clean();
            }
          });

      } catch (e) {
        console.log(e)
      } finally {
        this.load = false
      };
    },

    async SaveArchivo() {
      this.load = true
      let self = this
      try {
        const operacion = {
          empresa_id: this.user.empresa_id,
          sucursal_id: this.user.sucursal_id,
          r_facturacione_id: this.clif.f_id,
          cliente_id: this.clif.cli_id,
          area_id: this.area,
          tipo_archivo_id: this.tipo_archivo_id,
          comentario: this.comentario,
        }
        const res = await this.$api.$post('rFacturaciones', operacion);
        console.log(res);
        this.$swal
          .fire({
            title: "Respaldo Guardado !",
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "Ok",
          })
          .then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.archivoActualizar();
              this.cleanArchivo();
            }
          });

      } catch (e) {
        console.log(e)
      } finally {
        this.load = false
      };
    },

    abrirEditar(m){
      this.modalEditar = true,
      this.id = m.id
      this.cliente_id = m.cliente_id
      this.plazo = m.plazo
      this.monto = m.monto
      this.t_estado_pago_id = m.t_estado_pago_id
      this.nro = m.nro
      this.orden = m.orden
      this.fecha = m.fecha
        },
        async Update() {
      {
            this.load = true
            try {
                const res = await this.$api.$put(this.apiUrl + "/" + this.id,{
                    'cliente_id': this.cliente_id,
                    'plazo': this.plazo,
                    'monto': this.monto,
                    't_estado_pago_id': this.t_estado_pago_id,
                    'nro': this.nro,
                    'orden': this.orden,
                    'fecha': this.fecha,
                    'id':this.id,
                });
                console.log(res)
                this.$swal.fire({
                    title: 'Sucursal Actualizada',
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'Ok',
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      this.Buscar()
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
    totalPaginas2() {
      return Math.ceil(this.listFilter2.length / this.elementosPorPagina2);
    },
    getDataPagina2(noPagina2) {
      this.paginaActual2 = noPagina2;
      this.datosPaginados2 = [];
      let ini2 = (noPagina2 * this.elementosPorPagina2) - this.elementosPorPagina2;
      let fin2 = (noPagina2 * this.elementosPorPagina2);
      this.datosPaginados2 = this.listFilter2.slice(ini2, fin2);
    },
    getPreviousPage2() {
      if (this.paginaActual2 > 2) {
        this.paginaActual2--;
      }
      this.getDataPagina2(this.paginaActual2);
    },
    getNextPage2() {
      if (this.paginaActual2 < this.totalPaginas2()) {
        this.paginaActual2++;
      }
      this.getDataPagina2(this.paginaActual2);
    },
    isActive2(noPagina2) {
      return noPagina2 == this.paginaActual2 ? 'active' : '';
    },
    drop() {
      Dropzone.autoDiscover = false;
      let self = this;
      let url =
        this.$api.url + 'respaldoFacturaciones/archivo/' + this.doc;

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
            this.desdrop();
            this.archivoActualizar()
          });
    },
    desdrop1() {
      if (Dropzone.instances.length > 0) Dropzone.instances.forEach(bz => bz.destroy());
    },
    desdrop() {
      if (Dropzone.instances.length > 0) Dropzone.instances.forEach(bz => bz.destroy());

    },
    Clean() {
          this.nro = ''
          this.orden = ''
          this.cliente_id = ''
          this.plazo = ''
          this.fecha = ''
          this.t_estado_pago_id = ''
          this.monto = ''
    },
    cleanModal(){
      this.id = ''
      this.nro = ''
          this.orden = ''
          this.cliente_id = ''
          this.plazo = ''
          this.fecha = ''
          this.t_estado_pago_id = ''
          this.monto = ''
        },
    cleanArchivo() {
          this.tipo_archivo_id = ''
          this.comentario = ''
    },
    archivoActualizar() {
      this.$nextTick(async () => {
        try {
          await Promise.all([this.GET_DATA('rfacturacion/filtro?filtro=' + this.clif.f_id)]).then((v) => {
            this.list2 = v[0];
          });
        } catch (e) {
          console.log(e);
        } finally {
          this.load = false
        }
        this.getDataPagina2(1);
      });
    },
    archivoActualizar2() {
      this.$nextTick(async () => {
        try {
          await Promise.all([this.GET_DATA('facturaciones/filtro?empresa=' + this.user.empresa_id + "&sucursal=" + this.user.sucursal_id )]).then((v) => {
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
    descargarExcel(){
      window.open(('https://sistem.digitalconect.cl/apisgconta/public/api/venta/export?empresa=' + this.user.empresa_id + "&buscar=" + this.buscar + "&sucursal=" + this.user.sucursal_id + "&fecha1=" + this.fecha1 +' &fecha2=' + this.fecha2));
    },
    Doc(id) {
      this.modalSubida = true,
        this.doc = id
    },
    async EliminarItem2(id) {
      this.load = true
      try {
        const res = await this.$api.$delete('facturaciones' + "/" + id);
        console.log(res)
        await Promise.all([this.GET_DATA('facturaciones/filtro?empresa=' + this.user.empresa_id + "&sucursal=" + this.user.sucursal_id )]).then((v) => {
          this.list2 = v[0]
        })
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
    },
    async EliminarItem(id) {
      this.load = true
      try {
        const res = await this.$api.$delete(this.apiDelete + "/" + id);
        console.log(res)
        await Promise.all([this.GET_DATA(this.apiDelete)]).then((v) => {
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
          this.archivoActualizar()
        }
      })
    },
    Eliminar2(id) {
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
          await self.EliminarItem2(id)
          this.archivoActualizar2()
        }
      })
    }
  },
  mounted() {
    let user = localStorage.getItem('userAuth')
    this.user = JSON.parse(user)
    let clif = localStorage.getItem('clif')
    this.clif = JSON.parse(clif)
    this.$nextTick(async () => {
      Dropzone.autoDiscover = false;
      let self = this;
      try {
        await Promise.all([this.GET_DATA('clientes'), this.GET_DATA('testadopagos'), this.GET_DATA('/area/filtro?area=' + this.area)]).then((v) => {
          this.clientes = v[0]
          this.t_estado_pagos = v[1]
          this.tipo_archivos = v[2]
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
