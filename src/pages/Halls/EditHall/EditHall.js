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
            hallId: this.$route.params.id,
            cityList: [],
            formData: {
                name: "",
                city_id: null,
                address: "",
                phone: "",
                whatsapp: "",
                supervisor_phone: "",
                description: "",
                tables: "",
                chairs: "",
                capacity: "",
                price_morning: "",
                price_evening: "",
                price_full_day: "",
                services_text: "",
                deposit: "",
                cancellation_policy: "",
                final_payment_days: "",
                logo: "",
                   // الحقول الاختيارية
    drinks_service: 0,
    buffet: 0,
    decoration: 0,
    sound_system: 0,
    bride_room: 0,
    photography: 0,
    parking: 0,
    air_conditioning: 0,
            },
            formValidate: {
                name: "",
                city_id: "",
                address: "",
                phone: "",
                whatsapp: "",
                supervisor_phone: "",
                description: "",
                deposit: "",
                cancellation_policy: "",
                final_payment_days: "",
                logo: "",
            },
            previewImage: null,
            loaded: 0,
            sideMenuPage: {
                main: 9,
                sub: 2,
            },
            errorMessage: "حدث خطأ ما",
        };
    },
    methods: {
        loadData() {
            this.$store.commit("loadingStart");
            this.$http.GetHallForEdit(this.hallId)
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
        onChangeLogo(e) {
            const file = e.target.files[0];
            if (file) {
                this.formData.logo = file;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = e => this.previewImage = e.target.result;
            }
        },
        updateHall() {
            const config = { headers: { "content-type": "multipart/form-data" } };
            let data = new FormData();
            for (const key in this.formData) {
                data.append(key, this.formData[key]);
            }


            this.$store.commit("loadingStart");
            this.$http.EditHall(this.hallId, data, config)
                .then(response => {
                    this.$store.commit("loadingStop");
                    Swal.fire("نجاح", response.data.message, "success");
                    this.$router.push({ name: "halls-list" });
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