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
                    <th class="py-0 px-1">Razon Social</th>
                    <th class="py-0 px-1">Rut</th>
                    <th class="py-0 px-1">Direccion</th>
                    <th class="py-0 px-1"></th>
                  </thead>
                  <tbody>
                    <tr v-for="(m, i) in datosPaginados">
                      <td data-label="N" class="py-0 px-1">{{ i + 1 }}</td>
                      <td data-label="R Social" class="py-0 px-1">{{ m.razon_social }}</td>
                      <td data-label="Rut" class="py-0 px-1">{{ formatRUT(m.rut) }}</td>
                      <td data-label="Direccion" class="py-0 px-1">{{ m.direccion }}</td>
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
          
                </nav>
              </div>
            </div>
          </div>
          <div class="modal fade" :class="modalIngreso ? 'showModal' : ''" id="AjusteModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Crear</h5>
        <button type="button" class="btn-close text-dark" @click="modalIngreso = false, cleanModal()"
                    data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
      </div>
      <div class="modal-body row">
        <div class="form-group col-6">
          <label for="nombreFantasia">Nombre Fantasia</label>
          <input type="text" v-model="nombre" class="form-control" id="nombreFantasia">
        </div>
        <div class="form-group col-6">
          <label for="razonSocial">Razon Social</label>
          <input type="text" v-model="razon_social" class="form-control" id="razonSocial">
        </div>
        <div class="form-group col-6">
          <label for="rut">Rut</label>
          <input type="text" v-model="rut" class="form-control" id="rut" @input="validateRUN">
          <span v-if="rut && !isValidRUN" class="text-danger">RUN no válido</span>
        </div>
        <div class="form-group col-6">
          <label for="pais">Pais</label>
          <select v-model="pais_id" class="form-control" id="pais" @change="region(pais_id)">
            <option v-for="m in paises" :value="m.id">{{ m.nombre }}</option>
          </select>
        </div>
        <div class="form-group col-6">
          <label for="regiones">Regiones</label>
          <select v-model="region_id" class="form-control" id="regiones" @change="comuna(region_id)">
            <option v-for="m in regiones" :value="m.id">{{ m.nombre }}</option>
          </select>
        </div>
        <div class="form-group col-6">
          <label for="comuna">Comuna</label>
          <select v-model="comuna_id" class="form-control" id="comuna" @change="ciudad(comuna_id)">
            <option v-for="m in comunas" :value="m.id">{{ m.nombre }}</option>
          </select>
        </div>
        <div class="form-group col-6">
          <label for="ciudad">Ciudad</label>
          <select v-model="ciudad_id" class="form-control" id="ciudad">
            <option v-for="m in ciudades" :value="m.id">{{ m.nombre }}</option>
          </select>
        </div>
        <div class="form-group col-6">
          <label for="direccion">Direccion</label>
          <input type="text" v-model="direccion" class="form-control" id="direccion">
        </div>
        <div class="form-group col-6">
          <label for="ppm">PPM</label>
          <input type="text" v-model="ppm" class="form-control" id="ppm">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" @click="modalIngreso = false; Save()" class="btn btn-secondary w-100" data-bs-dismiss="modal">Guardar</button>
      </div>
    </div>
  </div>
          </div>
          <div class="modal fade" :class="modalEditar ? 'showModal' : ''" id="AjusteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
           
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modificar</h5>
        <button type="button" class="btn-close text-dark" @click="modalEditar = false, cleanModal()"
                    data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
      </div>
      <div class="modal-body row">
        <div class="form-group col-6">
          <label for="nombreFantasia">Nombre Fantasia</label>
          <input type="text" v-model="nombre" class="form-control" id="nombreFantasia">
        </div>
        <div class="form-group col-6">
          <label for="razonSocial">Razon Social</label>
          <input type="text" v-model="razon_social" class="form-control" id="razonSocial">
        </div>
        <div class="form-group col-6">
          <label for="rut">Rut</label>
          <input type="text" v-model="rut" class="form-control" id="rut" @input="validateRUN">
          <span v-if="rut && !isValidRUN" class="text-danger">RUN no válido</span>
        </div>
        <div class="form-group col-6">
          <label for="pais">Pais</label>
          <select v-model="pais_id" class="form-control" id="pais" @change="region(pais_id)">
            <option v-for="m in paises" :value="m.id">{{ m.nombre }}</option>
          </select>
        </div>
        <div class="form-group col-6">
          <label for="regiones">Regiones</label>
          <select v-model="region_id" class="form-control" id="regiones" @change="comuna(region_id)">
            <option v-for="m in regiones" :value="m.id">{{ m.nombre }}</option>
          </select>
        </div>
        <div class="form-group col-6">
          <label for="comuna">Comuna</label>
          <select v-model="comuna_id" class="form-control" id="comuna" @change="ciudad(comuna_id)">
            <option v-for="m in comunas" :value="m.id">{{ m.nombre }}</option>
          </select>
        </div>
        <div class="form-group col-6">
          <label for="ciudad">Ciudad</label>
          <select v-model="ciudad_id" class="form-control" id="ciudad">
            <option v-for="m in ciudades" :value="m.id">{{ m.nombre }}</option>
          </select>
        </div>
        <div class="form-group col-6">
          <label for="direccion">Direccion</label>
          <input type="text" v-model="direccion" class="form-control" id="direccion">
        </div>
        <div class="form-group col-6">
          <label for="ppm">PPM</label>
          <input type="text" v-model="ppm" class="form-control" id="ppm">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" @click="modalEditar = false; Update()" class="btn btn-secondary w-100" data-bs-dismiss="modal">Actualizar</button>
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
      buscar: '',
      list: [],
      paises: [],
      regiones: [],
      comunas: [],
      ciudades: [],
      nombre: '',
      rut: '',
      razon_social: '',
      pais_id: '',
      region_id: '',
      comuna_id: '',
      ciudad_id: '',
      direccion: '',
      ppm: '',
      apiUrl: 'empresas',
      page: 'Empresas',
      modulo: 'Empresas',
      url_nuevo: '/empresas/empresa/nuevo/',
      url_editar: '/empresas/empresa/editar/',
      elementosPorPagina: 20,
      datosPaginados: [],
      paginaActual: 1,
      user: {},
      isValidRUN: true
    };
  },
  computed: {
    listFilter() {
      let buscar = this.buscar
      if (buscar != '') {
        return this.list.filter((a) => {
          let razon_social = a.razon_social != null ? a.razon_social : ''
          let rut = a.rut != null ? a.rut : ''
          return razon_social.toLowerCase().indexOf(buscar.toLowerCase()) != -1 || rut.toLowerCase().indexOf(buscar.toLowerCase()) != -1
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
    abrirEditar(m) {
      this.modalEditar = true,
      this.id = m.id
      this.nombre = m.nombre
      this.rut = this.cleanRUT(m.rut)
      this.razon_social = m.razon_social
      this.pais_id = m.pais_id
      this.region_id = m.region_id
      this.comuna_id = m.comuna_id
      this.ciudad_id = m.ciudad_id
      this.direccion = m.direccion
      this.ppm = m.ppm
      this.validateRUN()
    },
    cleanModal() {
      this.id = ''
      this.nombre = ''
      this.rut = ''
      this.razon_social = ''
      this.pais_id = ''
      this.region_id = ''
      this.comuna_id = ''
      this.ciudad_id = ''
      this.direccion = ''
      this.ppm = ''
      this.isValidRUN = true
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
    region(pais_id) {
      this.$nextTick(async () => {
        try {
          await Promise.all([this.GET_DATA('/region/filtro?filtro=' + pais_id)]).then((v) => {
            this.regiones = v[0];
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
          rut: this.cleanRUT(this.rut),
          razon_social: this.razon_social,
          pais_id: this.pais_id,
          region_id: this.region_id,
          comuna_id: this.comuna_id,
          ciudad_id: this.ciudad_id,
          direccion: this.direccion,
          ppm: this.ppm,
        }
        const res = await this.$api.$post(this.apiUrl, operacion);
        console.log(res);
        this.$swal
          .fire({
            title: "Empresa Creada !",
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
      this.load = true
      try {
        const res = await this.$api.$put(this.apiUrl + "/" + this.id, {
          'nombre': this.nombre,
          'rut': this.cleanRUT(this.rut),
          'razon_social': this.razon_social,
          'pais_id': this.pais_id,
          'region_id': this.region_id,
          'comuna_id': this.comuna_id,
          'ciudad_id': this.ciudad_id,
          'direccion': this.direccion,
          'ppm': this.ppm,
          'id': this.id,
        });
        console.log(res)
        this.$swal.fire({
          title: 'Empresa Actualizada',
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
    this.$nextTick(async () => {
      let user = localStorage.getItem('userAuth')
      this.user = JSON.parse(user)
      Dropzone.autoDiscover = false;
      let self = this;
      try {
        await Promise.all([this.GET_DATA(this.apiUrl), this.GET_DATA('paises'), this.GET_DATA('regiones'), this.GET_DATA('comunas'), this.GET_DATA('ciudades')]).then((v) => {
          this.list = v[0]
          this.paises = v[1]
          this.regiones = v[2]
          this.ciudades = v[3]
          this.comunas = v[4]
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