import Swal from "sweetalert2";
import { mapGetters, mapActions, mapMutations } from "vuex";
import EmptyBox from '@/components/EmptyBox/EmptyBox.vue';
import BadRequest from '@/components/BadRequest/BadRequest.vue';
import NoPermission from '@/components/NoPermission/NoPermission.vue';
import NoInternet from '@/components/NoInternet/NoInternet.vue';
import PaginationBar from '@/components/PaginationBar/PaginationBar.vue';
import SinglePageHeader from '@/components/SinglePageHeader/SinglePageHeader.vue';
import BtnSubmitNewItem from "@/components/BtnSubmitNewItem/BtnSubmitNewItem.vue";
export default {
    components: {
        'Empty-Box': EmptyBox,
        'BadRequest': BadRequest,
        'No-Permission': NoPermission,
        'No-Internet': NoInternet,
        'Pagination-Bar': PaginationBar,
        'Single-Page-Header': SinglePageHeader,
        'Btn-Submit-New-Item': BtnSubmitNewItem,
    },
    data() {
        return {
            mainItem: [],
            formData: {
                name: '',
                longitude: 0.0,
                latitude: 0.0,
                description:'',
            },
            formValidate: {
                name: '',
                longitude: '',
                latitude: '',
                description:'',
            },
            loaded: 0,
            // Side Menu
            sideMenuPage: {
                main: 8,
                sub: 1,
            },
            errorMessage: "حدث خطأ ما",
        };
    },
    methods: {
        reload: function () {
            this.loadData();
        },
        loadData: function () {
          this.$store.commit("loadingStart");
            this.$http
                .GetCityForEdit(this.$route.params.id)
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.mainItem = response.data.data;
                        this.formData.name = response.data.data.name;
                        this.formData.longitude = response.data.data.longitude;
                        this.formData.latitude = response.data.data.latitude;
                        this.formData.description = response.data.data.description;
                        this.loaded = 200;
                        this.$alert.Success(response.data.message);
                    } else if (response.status == 204) {
                        this.loaded = 204;
                        this.$alert.Empty("هذه المدينة غير متوفر");
                    }
                })
                .catch(error => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (error.response.status == 400) {
                        this.errorMessage = error.response.data.message;
                        this.loaded = 400;
                        this.$alert.BadRequest(error.response.data.message);
                    } else if (error.response.status == 403) {
                        this.errorMessage = error.response.data.message;
                        this.loaded = 403;
                        this.$alert.BadRequest(error.response.data.message);
                    } else if (error.response.status == 401) {
                        this.$alert.NotAuth();
                    } else {
                        this.errorMessage = "حدث خطأ ما";
                        this.loaded = 404;
                        this.$alert.BadRequest("حدث خطأ ما, الرجاء إعادة المحاولة");
                    }
                });
        },
        editMainItem: function (id) {
            this.validateName();
            if (this.formValidate.name != '') return 0;
            this.validateDescription();
            if (this.formValidate.description != '') return 0;
            this.validateLongitude();
            if (this.formValidate.longitude != '') return 0;
            this.validateLatitude();
            if (this.formValidate.latitude != '') return 0;



        /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
                .EditCity(this.$route.params.id, this.formData)
                .then(response => {
                /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.$alert.Success(response.data.message);
                    } else if (response.status == 204) {
                        this.mainItem = [];
                        this.loaded = 204;
                        this.$alert.Empty(
                            "لم يعد هذا العنصر متوفر, قد يكون شخص أخر قام بحذفه"
                        );
                    }
                    else if (response.status == 400) {
                        this.mainItem = [];
                        this.loaded = 204;
                        this.$alert.Empty(
                            response.data.messageresponse.data.message
                        );
                    }
                })
                .catch(error => {
                /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    this.$alert.BadRequest(error.response.data.message);
                });

        },
        validateName: function () {
            this.formValidate.name = "";
            if (this.formData.name.trim() == "") {
                this.formValidate.name = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.name.trim().length < 5) {
                this.formValidate.name = "يجب ان يكون الحقل 5 أحرف أو اكثر";
                return 1;
            }
            if (this.formData.name.trim().length > 16) {
                this.formValidate.name = "يجب ان يكون الحقل أقل من 16 حرف";
                return 1;
            }
        },
        validateDescription: function () {
            this.formValidate.description = "";
            if (this.formData.description.trim() == "") {
                this.formValidate.description = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.description.trim().length < 5) {
                this.formValidate.description = "يجب ان يكون الحقل 5 أحرف أو اكثر";
                return 1;
            }
            if (this.formData.description.trim().length > 150) {
                this.formValidate.description = "يجب ان يكون الحقل أقل من 150 حرف";
                return 1;
            }

            
        },
        validateLongitude: function () {
            this.formValidate.longitude = "";
            if (this.formData.longitude == null || this.formData.longitude == '') {
                this.formValidate.longitude = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (isNaN(this.formData.longitude)) {
                this.formValidate.longitude = "يجب ان يكون رقم";
                return 1;
            }
        },
        validateLatitude: function () {
            this.formValidate.latitude = "";
            if (this.formData.latitude == null || this.formData.latitude == '') {
                this.formValidate.latitude = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (isNaN(this.formData.latitude)) {
                this.formValidate.latitude = "يجب ان يكون رقم";
                return 1;
            }
        }   


    },
    mounted() {
        this.$store.commit("activePage", this.sideMenuPage);
        this.loadData();
    },
    computed: {},
    created() { }
};
