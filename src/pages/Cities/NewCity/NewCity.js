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
            roleList: [],
            formData: {
                name: "",
                longitude: 0.0,
                latitude: 0.0,
                description: "",
            },
            formValidate: {
                name: "",
                longitude: "",
                latitude: "",
                description: "",
            },
            loaded: 0,
            // Side Menu
            sideMenuPage: {
                main: 8,
                sub: 2,
            },
            errorMessage: "حدث خطأ ما",
        };
    },
    methods: {
        reload: function () {
            this.loadData();
        },
        loadData: function () {
        /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
                .GetNewCity()
                .then(response => {
                /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.loaded = 200;
                        this.$alert.Success(response.data.message);
                    } else if (response.status == 204) {
                        this.loaded = 204;
                        this.$alert.Empty("تنبيه لا يوجد اي بيانات");
                    } else {
                        this.loaded = 400;
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
        addNewItem: function () {
            this.validateName();
            this.validateLongitude();
            this.validateLatitude();
            this.validateDescription();
            if (this.formValidate.name != "") return 0;
            if (this.formValidate.longitude != "") return 0;
            if (this.formValidate.latitude != "") return 0;
            if (this.formValidate.description != "") return 0;

            /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
                .PostNewCity(this.formData)
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    this.$alert.Success(response.data.message);
                    this.formData.name = "";
                    this.formData.longitude = 0.0;
                    this.formData.latitude = 0.0;
                    this.formData.description = "";
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
            if (this.formData.name.trim().length < 3) {
                this.formValidate.name = "يجب ان يكون الإسم 3 أحرف أو اكثر";
                return 1;
            }
            if (this.formData.name.trim().length > 16) {
                this.formValidate.name = "يجب ان يكون الإسم أقل من 16 حرف";
                return 1;
            }
        },
        validateLongitude: function () {
            this.formValidate.longitude = "";
            if (this.formData.longitude == null) {
                this.formValidate.longitude = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
        },
                validateLatitude: function () {
            this.formValidate.latitude = "";
            if (this.formData.latitude == null) {
                this.formValidate.latitude = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
        },
        validateDescription: function () {
            this.formValidate.description = "";
            if (this.formData.description.trim() == "") {
                this.formValidate.description = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
        },

    },
    mounted() {
        this.$store.commit("activePage", this.sideMenuPage);
        this.loadData();
    },
    computed: {},
    created() { }
};
