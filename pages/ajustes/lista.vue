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
                      <tr >
                      <th class="py-0 px-1">venta</th>
                      <th class="py-0 px-1">Nro Doc</th>
                      <th class="py-0 px-1">Cliente</th>
                      <th class="py-0 px-1">Total</th>
                      <th class="py-0 px-1"></th>
                    </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(m, i) in datosPaginados">
                        <td data-label="Venta" class="py-0 px-1">{{ m.id }}</td>
                        <td data-label="Nro  Doc" class="py-0 px-1">{{ m.ndocumento }}</td>
                        <td data-label="Cliente" class="py-0 px-1">{{ m.cliente.razon_social }}</td>
                        <td data-label="Total" class="py-0 px-1">{{ m.total | format_number }}</td>
                        <td data-label="" class="py-0 px-1">
                          <div class="btn-group">
                            <a type="button" :href="m.url_pdf" target="_blank" class="btn  btn-danger btn-sm py-1 px-2">
                              <i class="fas fa-print"></i>
                            </a>
                            <nuxtLink :to="url_editar + m.id" class="btn btn-info btn-sm py-1 px-2">
                              <i class="fas fa-eye"></i>
                            </nuxtLink>
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
      buscar: "",
      list: [],
      apiUrl: 'ventas',
      page: 'Configuracion',
      modulo: 'Lista de Ventas',
      url_editar: '/ventas/invoice/',
      elementosPorPagina: 20,
      datosPaginados: [],
      paginaActual: 1
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
          let fecha = a.fecha != null ? a.fecha : ''
          let razon_social = a.cliente.razon_social != null ? a.cliente.razon_social : ''
          let ndocumento = a.ndocumento != null ? a.ndocumento : ''
          return fecha.toLowerCase().indexOf(buscar.toLowerCase()) != -1 || razon_social.toLowerCase().indexOf(buscar.toLowerCase()) != -1 || ndocumento.toLowerCase().indexOf(buscar.toLowerCase()) != -1
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

    isActive(noPagina) {
      return noPagina == this.paginaActual ? 'active' : ''
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
      try {
        await Promise.all([this.GET_DATA(this.apiUrl)]).then((v) => {
          this.list = v[0]
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

