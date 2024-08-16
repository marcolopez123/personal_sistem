<template>
  <div>
    <JcLoader :load="load"></JcLoader>
    <AdminTemplate v-if="user.tipo == 1" :page="page" :modulo="modulo">
      <div slot="body" v-if="user.rol_id == 1 || user.rol_id == 2">
        <div class="row">
          <div class="col-xl-3 col-sm-3 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize font-weight-bold">
                        Trabajadores Activos
                      </p>
                      <h5 class="font-weight-bolder mb-0">
                        {{ dashboard.ctrabajadores | format_number }}
                        <span class="text-success text-sm font-weight-bolder"></span>
                      </h5>
                    </div>
                  </div>
                  <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i class="ni ni-single-02 text-lg opacity-10" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-3 mb-xl-0 mb-3">
            <div class="card">
              <div class="card-body p-3">
                <div class="row">
                  <div class="col-8">
                    <div class="numbers">
                      <p class="text-sm mb-0 text-capitalize font-weight-bold">
                        Deuda Clientes
                      </p>
                      <h5 class="font-weight-bolder mb-0">
                        <span class="text-success text-sm font-weight-bolder">T VENTA:&nbsp;&nbsp;</span>
                        {{ dashboard.dclientes | format_number }}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row my-4">
        <div class="table-container col-xl-3 col-sm-3 mb-xl-0 mb-4 card text-sm mb-0">
          <h3>Deuda por Cliente</h3>
          <table class="table">
            <thead>
              <th class="py-0 px-1">cliente</th>
              <th class="py-0 px-1">monto</th>
            </thead>
            <tbody>
              <tr v-for="(m, i) in facturaciones">
                <td data-label="Cliente" class="py-0 px-1">{{ m.cliente.nombre }}</td>
                <td data-label="Cliente" class="py-0 px-1">{{ m.monto | format_number }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <VueCal :events="events" />
    </div>
    </AdminTemplate>
    <AdminTemplate v-if="user.tipo == 2" :page="page" :modulo="modulo">
      <div slot="body">
        <div v-if="user.tipo == 1" class="row">

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
      title: "Index",
    };
  },
  data() {
    return {
      user: {},
      page: 'Dashboard',
      modulo: 'Dashboard',
      load: false,
      facturaciones: [],
      dashboardgas: {
        meses: [],
        cmeses: [],
        ainventario: []
      },
      dashboard: {
        meses: [],
        cmeses: [],
        ainventario: []
      }
    }
  },
  filters: {
    format_number: function (value) {
      return parseInt(value).toLocaleString("de-DE")
    }

  },
  methods: {
    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res;
    },
  },
  mounted() {
    this.$nextTick(() => {

      let user = localStorage.getItem('userAuth')
      this.user = JSON.parse(user)
      this.$nextTick(async () => {
        let self = this

        this.load = true
        try {
          await Promise.all([this.GET_DATA('dashboard?filtro=' + this.user.empresa_id + "&sucursal=" + this.user.sucursal_id), this.GET_DATA('facturaciones/filtro2?empresa=' + this.user.empresa_id + "&sucursal=" + this.user.sucursal_id)]).then((v) => {
            this.dashboard = v[0];
            this.facturaciones = v[1];
          })
        } catch (e) {

        } finally {
          this.load = false;
        }

      });

    })
  }
};
</script>