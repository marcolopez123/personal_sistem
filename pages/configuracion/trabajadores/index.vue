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
                    <th class="py-0 px-1">Rut</th>
                    <th class="py-0 px-1">Acciones</th>
                  </thead>
                  <tbody>
                    <tr v-for="(m, i) in datosPaginados">
                      <td data-label="N" class="py-0 px-1">{{ i + 1 }}</td>
                      <td data-label="Nombre" class="py-0 px-1">{{ m.nombre }} {{ m.a_paterno }} {{ m.a_materno }}</td>
                      <td data-label="Rut" class="py-0 px-1">{{ formatRUT(m.rut) }}</td>
                      <td data-label="Acciones" class="py-0 px-1">
                        <div class="btn-group">
                          <button type="button" @click="sucursalid(m.empresa_id), abrirEditar(m)"
                            class="btn btn-info btn-sm py-1 px-2">
                            <i class="fas fa-pen"></i>
                          </button>
                          <button v-if="user.rol_id == 1" class="btn btn-success btn-sm py-1 px-2" type="button"
                            @click="archivo(m.id), drop()">
                            <i class="fas fa-image"></i>
                          </button>
                          <button type="button" @click="localSelect(m.id), AbrirFicha()"
                            class="btn btn-dark btn-sm py-1 px-2">
                            <i class="fa fa-user"></i>
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
            <div class="modal-dialog modal-xl modalPersonalizado" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Crear Ficha
                  </h5>
                  <button type="button" class="btn-close text-dark" @click="modalIngreso = false, cleanModal()"
                    data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div slot="body" class="row p-3">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Nombre</label>
                      <input type="text" name="" v-model="nombre" class="form-control" id="">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Apellido Paterno</label>
                      <input type="text" name="" v-model="a_paterno" class="form-control" id="">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Apellido Materno</label>
                      <input type="text" name="" v-model="a_materno" class="form-control" id="">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Rut</label>
                      <input type="text" v-model="rut" class="form-control" id="rut" @input="validateRUN">
                      <span v-if="rut && !isValidRUN" class="text-danger">RUN no válido</span>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group has-success">
                      <label for="">Nacionalidad</label>
                      <select name="" id="" class="form-control bg-transparent border-0 text-dark" v-model="t_nacionalidade_id">
                        <option value="" disabled selected>Seleccione nacionalidad</option>
                        <option v-for="m in nacionalidades" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Sexo</label>
                      <select name="" id="" class="form-control" v-model="t_sexo_id">
                        <option value="" disabled selected>Seleccione sexo</option>
                        <option v-for="m in sexos" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Estado Civil</label>
                      <select name="" id="" class="form-control" v-model="t_estado_civile_id">
                        <option value="" disabled selected>Seleccione estado civil</option>
                        <option v-for="m in civiles" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Pais</label>
                      <select name="" id="" class="form-control" v-model="pais_id" @change="region(pais_id)">
                        <option value="" disabled selected>Seleccione pais</option>
                        <option v-for="m in paises" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Regiones</label>
                      <select name="" id="" class="form-control" v-model="region_id" @change="comuna(region_id)">
                        <option value="" disabled selected>Seleccione region</option>
                        <option v-for="m in regiones" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Comuna</label>
                      <select name="" id="" class="form-control" v-model="comuna_id" @change="ciudad(comuna_id)">
                        <option value="" disabled selected>Seleccione comuna</option>
                        <option v-for="m in comunas" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Ciudad</label>
                      <select name="" id="" class="form-control" v-model="ciudad_id">
                        <option value="" disabled selected>Seleccione ciudad</option>
                        <option v-for="m in ciudades" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Direccion</label>
                      <input type="text" name="" v-model="direccion" class="form-control" id="">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Email Personal</label>
                      <input type="email" name="" v-model="e_personal" class="form-control" id="">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Email Institucional</label>
                      <input type="email" name="" v-model="e_institucional" class="form-control" id="">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Telefono Personal</label>
                      <input type="tel" name="" v-model="t_personal" class="form-control" id="">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Telefono Emergencia</label>
                      <input type="tel" name="" v-model="t_emergencia" class="form-control" id="">
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" @click="modalIngreso = false, Save()" class="button_slide slide_right"
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
            <div class="modal-dialog modal-xl modalPersonalizado" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Modificar Ficha
                  </h5>
                  <button type="button" class="btn-close text-dark" @click="modalEditar = false, cleanModal()"
                    data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div slot="body" class="row p-3">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Nombre</label>
                      <input type="text" name="" v-model="nombre" class="form-control" id="">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Apellido Paterno</label>
                      <input type="text" name="" v-model="a_paterno" class="form-control" id="">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Apellido Materno</label>
                      <input type="text" name="" v-model="a_materno" class="form-control" id="">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Rut</label>
                      <input type="text" v-model="rut" class="form-control" id="rut" @input="validateRUN">
                      <span v-if="rut && !isValidRUN" class="text-danger">RUN no válido</span>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Nacionalidad</label>
                      <select name="" id="" class="form-control" v-model="t_nacionalidade_id">
                        <option v-for="m in nacionalidades" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Sexo</label>
                      <select name="" id="" class="form-control" v-model="t_sexo_id">
                        <option v-for="m in sexos" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Estado Civil</label>
                      <select name="" id="" class="form-control" v-model="t_estado_civile_id">
                        <option v-for="m in civiles" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Pais</label>
                      <select name="" id="" class="form-control" v-model="pais_id" @change="region(pais_id)">
                        <option v-for="m in paises" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Regiones</label>
                      <select name="" id="" class="form-control" v-model="region_id" @change="comuna(region_id)">
                        <option v-for="m in regiones" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Comuna</label>
                      <select name="" id="" class="form-control" v-model="comuna_id" @change="ciudad(comuna_id)">
                        <option v-for="m in comunas" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Ciudad</label>
                      <select name="" id="" class="form-control" v-model="ciudad_id">
                        <option v-for="m in ciudades" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Direccion</label>
                      <input type="text" name="" v-model="direccion" class="form-control" id="">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Email Personal</label>
                      <input type="email" name="" v-model="e_personal" class="form-control" id="">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Email Institucional</label>
                      <input type="email" name="" v-model="e_institucional" class="form-control" id="">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Telefono Personal</label>
                      <input type="tel" name="" v-model="t_personal" class="form-control" id="">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="">Telefono Emergencia</label>
                      <input type="tel" name="" v-model="t_emergencia" class="form-control" id="">
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" @click="modalEditar = false, Update()" class="button_slide slide_right"
                      data-bs-dismiss="modal">
                      Actualizar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal fade" :class="modalArchivos ? 'showModal' : ''" id="AjusteModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content p-3">
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
      modalArchivos: false,
      list: [],
      paises: [],
      regiones: [],
      comunas: [],
      ciudades: [],
      empresas: [],
      sucursales: [],
      sexos: [],
      nacionalidades: [],
      civiles: [],
      nombre: '',
      a_paterno: '',
      a_materno: '',
      id: '',
      rut: '',
      pais_id: '',
      region_id: '',
      comuna_id: '',
      empresa_id: '',
      sucursal_id: '',
      ciudad_id: '',
      t_sexo_id: '',
      t_nacionalidade_id: '',
      t_estado_civile_id: '',
      direccion: '',
      e_personal: '',
      e_institucional: '',
      t_personal: '',
      t_emergencia: '',
      buscar: "",
      apiUrl: 'trabajadors',
      page: 'Configuracion',
      modulo: 'Trabajadores',
      url_ficha: "/configuracion/trabajadores/fichas/id",
      elementosPorPagina: 20,
      datosPaginados: [],
      paginaActual: 1,
      user: {},
      sl: {},
      isValidRUN: true
    };
  },
  filters: {
    format_number: function (value) {
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
    formatRUT(rut) {
      if (!rut) return '';
      rut = rut.replace(/^0+/, '');
      if (rut.length <= 1) return rut;

      const body = rut.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      const dv = rut.slice(-1).toUpperCase();
      return `${body}-${dv}`;
    },
    cleanRUT(rut) {
      return rut.replace(/[^0-9kK]/g, '').toUpperCase();
    },
    validateRUN() {
      const cleanedRUN = this.cleanRUT(this.rut);
      if (cleanedRUN.length < 2) {
        this.isValidRUN = false;
        return;
      }

      const digits = cleanedRUN.slice(0, -1);
      const checkDigit = cleanedRUN.slice(-1);

      if (!/^\d+$/.test(digits)) {
        this.isValidRUN = false;
        return;
      }

      let sum = 0;
      let multiplier = 2;
      for (let i = digits.length - 1; i >= 0; i--) {
        sum += parseInt(digits[i], 10) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
      }

      const remainder = 11 - (sum % 11);
      const computedCheckDigit = remainder === 11 ? '0' : remainder === 10 ? 'K' : remainder.toString();

      this.isValidRUN = computedCheckDigit === checkDigit;

      // Formatear el RUN
      if (this.isValidRUN) {
        this.rut = this.formatRUT(cleanedRUN);
      }
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
        this.doc = "fichaImages/trabajador/",
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
    async AbrirFicha() {
      window.open(this.url_ficha, "_self");
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
          nombre: this.nombre,
          a_paterno: this.a_paterno,
          a_materno: this.a_materno,
          t_nacionalidade_id: this.t_nacionalidade_id,
          t_sexo_id: this.t_sexo_id,
          t_estado_civile_id: this.t_estado_civile_id,
          rut: this.cleanRUT(this.rut),
          empresa_id: this.user.empresa_id,
          sucursal_id: this.user.sucursal_id,
          pais_id: this.pais_id,
          region_id: this.region_id,
          comuna_id: this.comuna_id,
          ciudad_id: this.ciudad_id,
          direccion: this.direccion,
          e_personal: this.e_personal,
          e_institucional: this.e_institucional,
          t_personal: this.t_personal,
          t_emergencia: this.t_emergencia,

        }
        const res = await this.$api.$post(this.apiUrl, operacion);
        console.log(res);
        this.$swal
          .fire({
            title: "Trabajador Creado !",
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
          const res = await this.$api.$put(this.apiUrl + "/" + this.id, {
            'nombre': this.nombre,
            'rut': this.cleanRUT(this.rut),
            'a_paterno': this.a_paterno,
            'a_materno': this.a_materno,
            't_nacionalidade_id': this.t_nacionalidade_id,
            't_sexo_id': this.t_sexo_id,
            't_estado_civile_id': this.t_estado_civile_id,
            'pais_id': this.pais_id,
            'region_id': this.region_id,
            'comuna_id': this.comuna_id,
            'ciudad_id': this.ciudad_id,
            'direccion': this.direccion,
            'e_personal': this.e_personal,
            'e_institucional': this.e_institucional,
            't_personal': this.t_personal,
            't_emergencia': this.t_emergencia,
            'id': this.id,
          });
          console.log(res)
          this.$swal.fire({
            title: 'Trabajador Actualizado',
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
          await Promise.all([this.GET_DATA('trabajadors/empresa?filtro=' + this.user.empresa_id + "&sucursal=" + this.user.sucursal_id)]).then((v) => {
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
    sucursalid(empresa_id) {
      this.$nextTick(async () => {
        try {
          await Promise.all([this.GET_DATA('/usersSucursal/empresa?empresa=' + empresa_id + "&usuario=" + this.user.id)]).then((v) => {
            this.sucursales = v[0];
          });
        } catch (e) {
          console.log(e);
        } finally {
          this.load = false
        }
      });
    },
    sucursal(empresa_id) {
      this.$nextTick(async () => {
        try {
          await Promise.all([this.GET_DATA('/usersSucursal/empresa?empresa=' + empresa_id + "&usuario=" + this.user.id)]).then((v) => {
            this.sucursales = v[0];
          });
        } catch (e) {
          console.log(e);
        } finally {
          this.load = false
        }
      });
    },
    region(pais_id) {
      this.$nextTick(async () => {
        try {
          await Promise.all([this.GET_DATA('/region/filtro?filtro=' + pais_id)]).then((v) => {
            this.comunas = v[0];
          });
        } catch (e) {
          console.log(e);
        } finally {
          this.load = false
        }
      });
    },
    comuna(region_id) {
      this.$nextTick(async () => {
        try {
          await Promise.all([this.GET_DATA('/comuna/filtro?filtro=' + region_id)]).then((v) => {
            this.comunas = v[0];
          });
        } catch (e) {
          console.log(e);
        } finally {
          this.load = false
        }
      });
    },
    ciudad(comuna_id) {
      this.$nextTick(async () => {
        try {
          await Promise.all([this.GET_DATA('/ciudad/filtro?filtro=' + comuna_id)]).then((v) => {
            this.ciudades = v[0];
          });
        } catch (e) {
          console.log(e);
        } finally {
          this.load = false
        }
      });
    },
    abrirEditar(m) {
      this.modalEditar = true,
        this.id = m.id
      this.nombre = m.nombre
      this.a_paterno = m.a_paterno
      this.a_materno = m.a_materno
      this.t_nacionalidade_id = m.t_nacionalidade_id
      this.t_sexo_id = m.t_sexo_id
      this.t_estado_civile_id = m.t_estado_civile_id
      this.rut = m.rut
      this.pais_id = m.pais_id
      this.region_id = m.region_id
      this.comuna_id = m.comuna_id
      this.ciudad_id = m.ciudad_id
      this.direccion = m.direccion
      this.e_personal = m.e_personal
      this.e_institucional = m.e_institucional;
      this.t_personal = m.t_personal
      this.t_emergencia = m.t_emergencia
    },
    cleanModal() {
      this.id = ''
      this.nombre = ''
      this.rut = ''
      this.a_paterno = ''
      this.a_materno = ''
      this.t_nacionalidade_id = ''
      this.t_sexo_id = ''
      this.t_estado_civile_id = ''
      this.pais_id = ''
      this.region_id = ''
      this.comuna_id = ''
      this.ciudad_id = ''
      this.direccion = ''
      this.e_personal = ''
      this.e_institucional = ''
      this.t_personal = ''
      this.t_emergencia = ''

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
    Dropzone.autoDiscover = false;
    let self = this;
    this.$nextTick(async () => {
      try {
        await Promise.all([this.GET_DATA('trabajadors/empresa?filtro=' + this.user.empresa_id + "&sucursal=" + this.user.sucursal_id),
                           this.GET_DATA('paises'), this.GET_DATA('/usersEmpresa/usuario?usuario=' + this.user.id),
                           this.GET_DATA('regiones'), this.GET_DATA('comunas'), 
                           this.GET_DATA('ciudades'),
                           this.GET_DATA('tSexos'),
                           this.GET_DATA('tNacionalidades'),
                           this.GET_DATA('tEstadoCiviles')]).then((v) => {
                           this.list = v[0]
                           this.paises = v[1];
                           this.empresas = v[2];
                           this.regiones = v[3];
                           this.ciudades = v[4];
                           this.comunas = v[5];
                           this.sexos = v[6];
                           this.nacionalidades = v[7];
                           this.civiles = v[8];
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
<style>
.modalPersonalizado {

  margin-top: 10rem;
  
}



</style>

<style>
.button_slide {
  color: #052c65;
  border: 2px solid #052c65;
  font-weight: bold;
  border-radius: 10px;
  padding: 10px 20px;
  display: inline-block;
  font-size: 14px;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: inset 0 0 0 0 #052c65;
  -webkit-transition: ease-out 0.4s;
  -moz-transition: ease-out 0.4s;
  transition: ease-out 0.4s;
}

.slide_down:hover {
  box-shadow: inset 0 100px 0 0 #052c65;
  color: #fff;
}

.slide_right:hover {
  box-shadow: inset 400px 0 0 0  #052c65;
  color: #fff;
}

.slide_left:hover {
  box-shadow: inset 0 0 0 50px  #052c65;
  color: #fff;
}

.slide_diagonal:hover {
  box-shadow: inset 400px 50px 0 0  #052c65;
  color: #fff;
}

#outer {
  width: 364px;
  margin: 50px auto 0 auto;
  text-align: center;
}
</style>
