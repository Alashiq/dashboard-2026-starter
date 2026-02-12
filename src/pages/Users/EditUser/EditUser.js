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
        'Single-Page-Header': SinglePageHeader,
        'BadRequest': BadRequest,
        'No-Permission': NoPermission,
        'No-Internet': NoInternet,
    },
    data() {
        return {
            userId: this.$route.params.id,
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
        loadData() {
            this.$store.commit("loadingStart");
            this.$http.GetUserForEdit(this.userId)
                .then(response => {
                    this.$store.commit("loadingStop");
                    if (response.status === 200) {
                        this.loaded = 200;
                        this.cityList = response.data.cities;
                        this.formData = { ...response.data.data }; // تعبئة البيانات
                    } else {
                        this.loaded = 400;
                    }
                })
                .catch(error => {
                    this.$store.commit("loadingStop");
                    this.loaded = error.response ? error.response.status : 404;
                });
        },
        updateUser() {
            this.$store.commit("loadingStart");
            this.$http.UpdateUser(this.userId, this.formData)
                .then(response => {
                    this.$store.commit("loadingStop");
                    Swal.fire("نجاح", response.data.message, "success");
                    this.$router.push({ path: "/admin/user" });
                })
                .catch(error => {
                    this.$store.commit("loadingStop");
                    Swal.fire("خطأ", error.response.data.message, "error");
                });
        }
    },
    mounted() {
        this.loadData();
    }
};