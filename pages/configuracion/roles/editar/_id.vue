<template>
    <div>
        <JcLoader :load="load"></JcLoader>
        <AdminTemplate :page="page" :modulo="modulo">
            <div slot="body">
                <div class="row justify-content-center">
                    <div class="col-sm-8 col-12">
                        <div class="card">
                            <div class="card-header">
                                <h3>Actualizar</h3>
                            </div>
                            <div class="card-body">
                                <CrudUpdate :model="model" :apiUrl="apiUrl">
                                    <div slot="body" class="row">
                                        <div class="clas-12">
                                            <div class="form-group">
                                                <label for="">Nombre</label>
                                                <input type="text" name="" v-model="model.nombre" class="form-control"
                                                    id="">
                                            </div>
                                        </div>
                                    </div>
                                </CrudUpdate>
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
            title: "Roles",
        };;
    },
    data() {
        return {
            load: true,
            model: {
                nombre: ''
            },
            apiUrl:'roles',
            page:'Configuracion',
            modulo:'Roles'
        };
    },
    methods: {
        async GET_DATA(path) {
            const res = await this.$api.$get(path);
            return res
        },

    },
    mounted() {
        this.$nextTick(async () => {
            try {
                await Promise.all([this.GET_DATA(this.apiUrl + '/'+this.$route.params.id)]).then((v) => {
                    this.model = v[0]
                })
            } catch (e) {
                console.log(e);
            } finally {
                this.load = false;
            }
        });

    },

};
</script>