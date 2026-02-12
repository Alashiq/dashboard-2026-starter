import Swal from "sweetalert2";
import { mapGetters } from "vuex";
import EmptyBox from '@/components/EmptyBox/EmptyBox.vue';
import BadRequest from '@/components/BadRequest/BadRequest.vue';
import NoPermission from '@/components/NoPermission/NoPermission.vue';
import NoInternet from '@/components/NoInternet/NoInternet.vue';
import SinglePageHeader from '@/components/SinglePageHeader/SinglePageHeader.vue';
import BtnSubmitNewItem from "@/components/BtnSubmitNewItem/BtnSubmitNewItem.vue";

export default {
    components: {
        'Single-Page-Header': SinglePageHeader,
        'Empty-Box': EmptyBox,
        'BadRequest': BadRequest,
        'No-Permission': NoPermission,
        'No-Internet': NoInternet,
        'Btn-Submit-New-Item': BtnSubmitNewItem,
    },
    data() {
        return {
            cityList: [],
            // تم تحديث formData لتناسب حقول متعهد التموين
            formData: {
                name: "",
                city_id: null,
                logo: null,
                cover_photo: null,
                description: "",
                address: "",
                phone: "",
                whatsapp: "",
                latitude: "",
                longitude: "",
                min_booking_days_before: 30,
                min_order_value: null,
                deposit_percentage: null,
                cancellation_policy: "",
                min_guests: null,
                max_guests: null,
                offers_tasting_sessions: false,
                offers_tasting_booking: false,
                tasting_policy: "",
            },
            previewLogo: null,
            previewCover: null,
            loaded: 0,
            sideMenuPage: {
                main: 10, // تأكد من صحة هذه الأرقام
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
            // استدعاء الخدمة الصحيحة لجلب البيانات اللازمة (مثل المدن)
            this.$http.GetNewCaterer( )
                .then(response => {
                    this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.loaded = 200;
                        this.cityList = response.data.data.cities;
                    } else {
                        this.loaded = 400;
                    }
                })
                .catch(error => {
                    this.$store.commit("loadingStop");
                    this.loaded = error.response ? error.response.status : 404;
                    this.errorMessage = error.response?.data?.message || "خطأ في الاتصال بالخادم";
                });
        },
        // معالجة تغيير الشعار
        onChangeLogo(e) {
            const file = e.target.files[0];
            if (file) {
                this.formData.logo = file;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = e => this.previewLogo = e.target.result;
            }
        },
        // معالجة تغيير صورة الغلاف
        onChangeCover(e) {
            const file = e.target.files[0];
            if (file) {
                this.formData.cover_photo = file;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = e => this.previewCover = e.target.result;
            }
        },
        // دالة لإضافة متعهد تموين جديد
        addNewCaterer() {
            const config = { headers: { "content-type": "multipart/form-data" } };
            let data = new FormData();

            // إضافة جميع الحقول إلى FormData
            for (const key in this.formData) {
                if (this.formData[key] !== null) {
                    // تحويل القيم البوليانية إلى 1 أو 0
                    if (typeof this.formData[key] === 'boolean') {
                        data.append(key, this.formData[key] ? 1 : 0);
                    } else {
                        data.append(key, this.formData[key]);
                    }
                }
            }

            this.$store.commit("loadingStart");
            // استدعاء الخدمة الصحيحة
            this.$http.PostNewCaterer(data, config )
                .then(response => {
                    this.$store.commit("loadingStop");
                    this.$alert.Success(response.data.message);
                    this.resetForm();
                })
                .catch(error => {
                    this.$store.commit("loadingStop");
                    // عرض رسالة الخطأ القادمة من الخادم مباشرة
                    this.$alert.BadRequest(error.response.data.message);
                });
        },
        // دالة لإعادة تعيين النموذج بعد الإضافة الناجحة
        resetForm() {
            this.formData = {
                name: "", city_id: null, logo: null, cover_photo: null, description: "",
                address: "", phone: "", whatsapp: "", latitude: "", longitude: "",
                min_booking_days_before: 30, min_order_value: null, deposit_percentage: null,
                cancellation_policy: "", min_guests: null, max_guests: null,
                offers_tasting_sessions: false, offers_tasting_booking: false, tasting_policy: "",
            };
            this.previewLogo = null;
            this.previewCover = null;
            // إعادة تعيين حقول إدخال الملفات
            this.$refs.logoInput.value = null;
            this.$refs.coverInput.value = null;
        },
    },
    mounted() {
        this.$store.commit("activePage", this.sideMenuPage);
        this.loadData();
    },
};
