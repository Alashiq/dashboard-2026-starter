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
            cityList: [],
            formData: {
                first_name: "",
                last_name: "",
                phone: "",
                city_id: null,
                status: 0,
                point: 0,
                balance: 0,
            },
            formValidate: {
                first_name: "",
                last_name: "",
                phone: "",
                city_id: "",
            },
            loaded: 0,
            sideMenuPage: {
                main: 13,
                sub: 2,
            },
            errorMessage: "حدث خطأ ما",
        };
    },
    methods: {
        reload() {
            this.loadData();
        },
        loadData() {
            this.$store.commit("loadingStart");

            this.$http.GetNewUser()
                .then(response => {
                    this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.loaded = 200;
                        this.cityList = response.data.data.cities;
                    } else if (response.status == 204) {
                        this.loaded = 204;
                    } else {
                        this.loaded = 400;
                    }
                })
                .catch(error => {
                    this.$store.commit("loadingStop");
                    this.loaded = error.response ? error.response.status : 404;
                });
        },
        addNewUser() {
            // Validate all fields
            if (this.validateAll() !== true) return;

            this.$store.commit("loadingStart");
            this.$http.PostNewUser(this.formData)
                .then(response => {
                    this.$store.commit("loadingStop");
                    this.$alert.Success(response.data.message);
                    this.resetForm();
                })
                .catch(error => {
                    this.$store.commit("loadingStop");
                    this.$alert.BadRequest(error.response.data.message);
                });
        },
        resetForm() {
            this.formData.first_name = "";
            this.formData.last_name = "";
            this.formData.phone = "";
            this.formData.city_id = null;
            this.formData.status = 0;
            this.formData.point = 0;
            this.formData.balance = 0;
        },

        // ===== Validation Functions =====
        validateAll() {
            return (
                this.validateFirstName() === true &&
                this.validateLastName() === true &&
                this.validatePhone() === true &&
                this.validateCity() === true
            );
        },
        validateFirstName() {
            this.formValidate.first_name = "";
            if (this.formData.first_name.trim() === "") {
                this.formValidate.first_name = "لا يمكن ترك هذا الحقل فارغ";
                return false;
            }
            return true;
        },
        validateLastName() {
            this.formValidate.last_name = "";
            if (this.formData.last_name.trim() === "") {
                this.formValidate.last_name = "لا يمكن ترك هذا الحقل فارغ";
                return false;
            }
            return true;
        },
        validatePhone() {
            this.formValidate.phone = "";
            if (this.formData.phone.trim() === "") {
                this.formValidate.phone = "لا يمكن ترك هذا الحقل فارغ";
                return false;
            }
            const phoneRegex = /^(\+966|0)?[5][0-9]{8}$/;
            if (!phoneRegex.test(this.formData.phone)) {
                this.formValidate.phone = "رقم الهاتف غير صحيح";
                return false;
            }
            return true;
        },
        validateCity() {
            this.formValidate.city_id = "";
            if (!this.formData.city_id) {
                this.formValidate.city_id = "اختر المدينة";
                return false;
            }
            return true;
        },
    },
    mounted() {
        this.$store.commit("activePage", this.sideMenuPage);
        this.loadData();
    },
    computed: {
        ...mapGetters(["language"]),
        t() {
            return this.$lang.Profile[this.language];
        }
    },
    created() {}
};