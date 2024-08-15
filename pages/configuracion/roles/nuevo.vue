<template>
  <div>
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="row justify-content-center">
          <div class="col-sm-8 col-12">
            <div class="card">
              <div class="card-header">
                <h3>Agregar</h3>
              </div>
              <div class="card-body">
                <CrudCreate :model="model" :apiUrl="apiUrl">
                  <div slot="body" class="row">
                    <div class="clas-12">
                      <div class="form-group">
                        <label for="">Nombre</label>
                        <input type="text" name="" v-model="model.nombre" class="form-control" id="">
                      </div>
                    </div>
                  </div>
                </CrudCreate>
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
      title: this.modulo,
    };;
  },
  data() {
    return {
      model: {
        nombre: ''
      },
      apiUrl:'roles',
      page:'Configuracion',
       modulo:'Roles'
    };
  },
  methods: {

  },
  mounted() {
    this.$nextTick(async () => {
      try {

      } catch (e) {
        console.log(e);
      } finally {

      }
    });
  },

};
</script>