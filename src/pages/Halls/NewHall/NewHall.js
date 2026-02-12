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
                drinks_service: false,
                buffet: false,
                decoration: false,
                sound_system: false,
                bride_room: false,
                photography: false,
                parking: false,
                air_conditioning: false,
                deposit: "",
                cancellation_policy: "",
                final_payment_days: "",
                logo: "", // ✅ بدلاً من file
                latitude: "",
                longitude: "",
            },
            formValidate: {
                name: "",
                city_id: "",
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
                logo: "", // ✅ بدلاً من file
                latitude: "",
                longitude: "",
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
        reload() {
            this.loadData();
        },
        loadData() {
            this.$store.commit("loadingStart");

            this.$http.GetNewHall()
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
        onChangeLogo(e) {
            this.formData.logo = e.target.files[0]; // ✅ logo بدل file
            const reader = new FileReader();
            reader.readAsDataURL(this.formData.logo);
            reader.onload = e => this.previewImage = e.target.result;
        },
        addNewHall() {
            // Validate all fields
            if (this.validateAll() !== true) return;

            const config = { headers: { "content-type": "multipart/form-data" } };
            let data = new FormData();
            for (const key in this.formData) {
                if (typeof this.formData[key] === "boolean") {
                    data.append(key, this.formData[key] ? 1 : 0);
                } else {
                    data.append(key, this.formData[key]);
                }
            }

            this.$store.commit("loadingStart");
            this.$http.PostNewHall(data, config)
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
            for (const key in this.formData) {
                if (typeof this.formData[key] === "boolean") {
                    this.formData[key] = false;
                } else {
                    this.formData[key] = "";
                }
            }
            this.previewImage = null;
        },

        // ===== Validation Functions =====
        validateAll() {
            return (
                this.validateName() === true &&
                this.validateCity() === true &&
                this.validateAddress() === true &&
                this.validatePhone() === true &&
                this.validateWhatsapp() === true &&
                this.validateSupervisor() === true &&
                this.validateDescription() === true &&
                this.validateTables() === true &&
                this.validateChairs() === true &&
                this.validateCapacity() === true &&
                this.validatePriceMorning() === true &&
                this.validatePriceEvening() === true &&
                this.validatePriceFullDay() === true &&
                this.validateDeposit() === true &&
                this.validateCancellationPolicy() === true &&
                this.validateFinalPaymentDays() === true &&
                this.validateLogo() === true // ✅ logo بدل file
            );
        },
        validateName() {
            this.formValidate.name = "";
            if (this.formData.name.trim() === "") {
                this.formValidate.name = "لا يمكن ترك هذا الحقل فارغ";
                return false;
            }
            if (this.formData.name.trim().length < 5) {
                this.formValidate.name = "يجب أن يكون الإسم 5 أحرف أو أكثر";
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
        validateAddress() {
            this.formValidate.address = "";
            if (this.formData.address.trim() === "") {
                this.formValidate.address = "لا يمكن ترك هذا الحقل فارغ";
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
            return true;
        },
        validateWhatsapp() {
            this.formValidate.whatsapp = "";
            if (this.formData.whatsapp.trim() === "") {
                this.formValidate.whatsapp = "لا يمكن ترك هذا الحقل فارغ";
                return false;
            }
            return true;
        },
        validateSupervisor() {
            this.formValidate.supervisor_phone = "";
            if (this.formData.supervisor_phone.trim() === "") {
                this.formValidate.supervisor_phone = "لا يمكن ترك هذا الحقل فارغ";
                return false;
            }
            return true;
        },
        validateDescription() {
            this.formValidate.description = "";
            if (this.formData.description.trim() === "") {
                this.formValidate.description = "لا يمكن ترك هذا الحقل فارغ";
                return false;
            }
            return true;
        },
        validateTables() {
            this.formValidate.tables = "";
            if (!this.formData.tables) {
                this.formValidate.tables = "ادخل عدد الطاولات";
                return false;
            }
            return true;
        },
        validateChairs() {
            this.formValidate.chairs = "";
            if (!this.formData.chairs) {
                this.formValidate.chairs = "ادخل عدد الكراسي";
                return false;
            }
            return true;
        },
        validateCapacity() {
            this.formValidate.capacity = "";
            if (!this.formData.capacity) {
                this.formValidate.capacity = "ادخل السعة";
                return false;
            }
            return true;
        },
        validatePriceMorning() {
            this.formValidate.price_morning = "";
            if (!this.formData.price_morning) {
                this.formValidate.price_morning = "ادخل السعر صباحي";
                return false;
            }
            return true;
        },
        validatePriceEvening() {
            this.formValidate.price_evening = "";
            if (!this.formData.price_evening) {
                this.formValidate.price_evening = "ادخل السعر مسائي";
                return false;
            }
            return true;
        },
        validatePriceFullDay() {
            this.formValidate.price_full_day = "";
            if (!this.formData.price_full_day) {
                this.formValidate.price_full_day = "ادخل السعر يوم كامل";
                return false;
            }
            return true;
        },
        validateDeposit() {
            this.formValidate.deposit = "";
            if (!this.formData.deposit) {
                this.formValidate.deposit = "ادخل قيمة العربون";
                return false;
            }
            return true;
        },
        validateCancellationPolicy() {
            this.formValidate.cancellation_policy = "";
            if (!this.formData.cancellation_policy) {
                this.formValidate.cancellation_policy = "ادخل سياسة الإلغاء";
                return false;
            }
            return true;
        },
        validateFinalPaymentDays() {
            this.formValidate.final_payment_days = "";
            if (!this.formData.final_payment_days) {
                this.formValidate.final_payment_days = "ادخل أيام الدفع النهائي";
                return false;
            }
            return true;
        },
        validateLogo() {
            this.formValidate.logo = "";
            if (!this.formData.logo) {
                this.formValidate.logo = "اختر صورة للقاعة";
                return false;
            }
            return true;
        }
    },
    mounted() {
        this.$store.commit("activePage", this.sideMenuPage);
        this.loadData();
    },
}
