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
                      <a v-if="user.rol_id == 1 || user.rol_id == 2 || user.rol_id == 3 || user.rol_id == 4" href="javascript:void(0);" class="cta"
                        @click="abrirIngreso(asistencias)">
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
                      <th class="py-0 px-1">Fecha</th>
                      <th class="py-0 px-1">Entrada</th>
                      <th class="py-0 px-1">Salida</th>
                      <th class="py-0 px-1">Horas Trabajadas</th>
                   
                    </thead>
                    <tbody>
                      <tr v-for="(m, i) in datosPaginados" :key="i">
                        <td data-label="N" class="py-0 px-1">{{ i + 1 }}</td>
                        <td data-label="Nombre" class="py-0 px-1">{{ m.trabajador.nombre }}</td>
                        <td data-label="Fecha" class="py-0 px-1">{{ formatearFecha(m.fecha) }}</td>
                        <td data-label="Entrada" class="py-0 px-1">{{ m.entrada }}</td>
                        <td data-label="Salida" class="py-0 px-1">{{ m.salida }}</td>
                        <td v-if="m.salida == null" data-label="H Trabajadas" class="py-0 px-1">{{ '0:0' }}</td>
                        <td v-if="m.salida !== null" data-label="H Trabajadas" class="py-0 px-1">{{ calcularDiferenciaHorasMinutos(m.entrada, m.salida) }}</td>
                       
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
                <div class="modal-content p-3">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Tomar Asistencia
                    </h5>
                    <button type="button" class="btn-close text-dark" @click="modalIngreso = false"
                      data-bs-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div>
                    <div id="map" style="height: 400px;"></div> <!-- Contenedor para el mapa -->
                  </div>
                  <div class="modal-footer">
                    <button v-if="asistencias.length === 0" type="button" @click="Save(),modalIngreso = false"
                      class="btn bg-gradient-secondary w-100" data-bs-dismiss="modal">
                      Registrar Ingreso
                    </button>
                  </div>
                  <div class="modal-footer">
                    <button v-if="asistencias.length > 0 " type="button" @click="Update(),modalIngreso = false"
                      class="btn bg-gradient-secondary w-100" data-bs-dismiss="modal">
                      Registrar Salida
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
  data() {
    return {
      load: true,
      buscar: "",
      list: [],
      asistencias:[],
      latitud: '',
      longitud: '',
      asistencia_id: '',
      modalIngreso: false,
      apiUrl: 'rCAsistencias',
      page: 'Asistencia',
      modulo: 'Asistencia',
      url_documento: "/prevencion/trabajadores/archivos/archivo",
      elementosPorPagina: 20,
      datosPaginados: [],
      paginaActual: 1,
      user: {},
      map: null  // Añadir referencia al mapa
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
            let nombre = a.nombre != null ? a.nombre : ''
            let rut = a.rut != null ? a.rut : ''
            return nombre.toLowerCase().indexOf(buscar.toLowerCase()) != -1 || rut.toLowerCase().indexOf(buscar.toLowerCase()) != -1
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
      calcularDiferenciaHorasMinutos(entrada, salida) {
      const fechaEntrada = new Date(entrada);
      const fechaSalida = new Date(salida);

      // Calcular la diferencia en milisegundos
      const diferenciaMilisegundos = fechaSalida - fechaEntrada;

      // Convertir a horas
      const diferenciaTotalHoras = diferenciaMilisegundos / (1000 * 60 * 60);

      // Obtener las horas completas
      const horas = Math.floor(diferenciaTotalHoras);

      // Obtener los minutos restantes
      const minutos = Math.floor((diferenciaTotalHoras - horas) * 60);

      return `${horas}:${minutos}`;
    },
    formatearFecha(fecha) {
      // Asegúrate de que la fecha esté en formato YYYY-MM-DD
      if (!fecha) return ''; // Manejo de fechas vacías o no definidas

      const [year, month, day] = fecha.split('-');
      // Asegúrate de que day, month y year sean números válidos
      return `${day}-${month}-${year}`;
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
      async AbrirDocumento() {
        window.open(this.url_documento, "_self");
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

      listaActualizar() {
        this.$nextTick(async () => {
          try {
            await Promise.all([this.GET_DATA('rCAsistencias/filtro2?filtro=' + this.user.empresa_id + "&sucursal=" + this.user.sucursal_id + "&trabajador=" + this.user.trabajador_id)]).then((v) => {
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
      asistenciaActualizar() {
        this.$nextTick(async () => {
          try {
            await Promise.all([this.GET_DATA('rCAsistencias/filtroSalida?trabajador=' + this.user.trabajador_id + "&filtro=" + this.user.empresa_id + "&sucursal=" + this.user.sucursal_id)]).then((v) => {
              this.asistencias = v[0];
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
          cancelButtonText: Cancelar,
        }).then(async (result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            await self.EliminarItem(id)
            this.listaActualizarActualizar()
            this.asistenciaActualizarlizarActualizar()
            
          }
        })
      },
      formatearHora() {
      const ahora = new Date();
      const año = ahora.getFullYear();
      const mes = String(ahora.getMonth() + 1).padStart(2, '0');
      const dia = String(ahora.getDate()).padStart(2, '0');
      const horas = String(ahora.getHours()).padStart(2, '0');
      const minutos = String(ahora.getMinutes()).padStart(2, '0');
      const segundos = String(ahora.getSeconds()).padStart(2, '0');

      return `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    },
    formatearFecha() {
      const ahora = new Date();
      const año = ahora.getFullYear();
      const mes = String(ahora.getMonth() + 1).padStart(2, '0');
      const dia = String(ahora.getDate()).padStart(2, '0');
      const horas = String(ahora.getHours()).padStart(2, '0');
      const minutos = String(ahora.getMinutes()).padStart(2, '0');
      const segundos = String(ahora.getSeconds()).padStart(2, '0');

      return `${año}-${mes}-${dia}`;
    },
    async Save() {
      this.load = true
      let self = this
      try {
        const formattedNow = this.formatearHora(); // Usar la función de formateo
        const formattedFechaNow = this.formatearFecha(); // Usar la función de formateo
        const operacion = {
          fecha: formattedFechaNow,
          empresa_id: this.user.empresa_id,
          sucursal_id: this.user.sucursal_id,
          trabajador_id: this.user.trabajador_id,
          longitud: this.longitud,
          latitud: this.latitud,
          entrada: formattedNow,         
        }
        const res = await this.$api.$post(this.apiUrl, operacion);
        console.log(res);
        this.$swal
          .fire({
            title: "Ingreso Registrado !",
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "Ok",
          })
          .then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                this.listaActualizar()
                this.asistenciaActualizar()  
            }
          });

      } catch (e) {
        console.log(e)
      } finally {
        this.load = false
      };
    },
    async Update() {
      this.load = true;
      try {
        const formattedNow = this.formatearHora(); // Usar la función de formateo

        const res = await this.$api.$put('rCAsistencias/' + this.asistencias[0].id, {
          'salida': formattedNow, // Usar la fecha y hora formateadas
          'latituds': this.latitud,
          'longituds': this.longitud,
        });

        console.log(res);
        this.$swal.fire({
          title: 'Salida Registrada',
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: 'Ok',
        }).then((result) => {
          if (result.isConfirmed) {
            this.listaActualizar()
            this.asistenciaActualizar()  
          }
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
    },
    abrirIngreso() {
    this.modalIngreso = true;
   
    // Obtener geolocalización y actualizar el mapa
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitud = position.coords.latitude;
        this.longitud = position.coords.longitude;

        // Guardar en el localStorage
        this.user.location = {
          latitude: this.latitud,
          longitude: this.longitud
        };
        localStorage.setItem('userAuth', JSON.stringify(this.user));

        // Inicializar el mapa después de obtener la geolocalización
        this.$nextTick(() => {
          if (!this.map) {
            this.map = L.map('map').setView([this.latitud, this.longitud], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 18,
            }).addTo(this.map);

            this.marker = L.marker([this.latitud, this.longitud]).addTo(this.map)
              .bindPopup('Ubicación actual')
              .openPopup();
          } else {
            this.map.setView([this.latitud, this.longitud], 13);
            if (this.marker) {
              this.marker.setLatLng([this.latitud, this.longitud]);
            } else {
              this.marker = L.marker([this.latitud, this.longitud]).addTo(this.map)
                .bindPopup('Ubicación actual')
                .openPopup();
            }
          }
        });
      }, (error) => {
        console.error("Error al obtener la geolocalización:", error);
      });
    } else {
      console.error("Geolocalización no es soportada por este navegador.");
    }
  }
    
  },
  mounted() {
      let user = localStorage.getItem('userAuth')
      this.user = JSON.parse(user)
      this.$nextTick(async () => {
        try {
          await Promise.all([this.GET_DATA('rCAsistencias/filtro2?filtro=' + this.user.empresa_id + "&sucursal=" + this.user.sucursal_id + "&trabajador=" + this.user.trabajador_id),this.GET_DATA('rCAsistencias/filtroSalida?trabajador=' + this.user.trabajador_id + "&filtro=" + this.user.empresa_id + "&sucursal=" + this.user.sucursal_id)]).then((v) => {
            this.list = v[0]
            this.asistencias = v[1]
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
  
  #map {
    height: 400px;
    width: 100%;
  }
  </style>
  