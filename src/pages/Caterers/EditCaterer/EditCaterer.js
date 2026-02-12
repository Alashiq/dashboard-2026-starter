import Swal from "sweetalert2";
import { mapGetters } from "vuex";
import EmptyBox from '@/components/EmptyBox/EmptyBox.vue';
import BadRequest from '@/components/BadRequest/BadRequest.vue';
import NoPermission from '@/components/NoPermission/NoPermission.vue';
import NoInternet from '@/components/NoInternet/NoInternet.vue';
import SinglePageHeader from '@/components/SinglePageHeader/SinglePageHeader.vue';

export default {
    components: {
        'Single-Page-Header': SinglePageHeader,
        'BadRequest': BadRequest,
        'No-Permission': NoPermission,
        'No-Internet': NoInternet,
    },
    data() {
        return {
            catererId: this.$route.params.id,
            cityList: [],
            // تم تحديث formData لتشمل جميع حقول متعهد التموين
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
            // يمكنك استخدام هذا للتحقق من صحة الواجهة الأمامية إذا أردت
            formValidate: {},
            previewLogo: null, // صورة معاينة للشعار
            previewCover: null, // صورة معاينة للغلاف
            loaded: 0,
            sideMenuPage: {
                main: 10, // تأكد من أن هذه الأرقام صحيحة
                sub: 1,
            },
            errorMessage: "حدث خطأ ما",
        };
    },
    methods: {
        loadData() {
            this.$store.commit("loadingStart");
            // استدعاء دالة الخدمة الصحيحة
            this.$http.GetCatererForEdit(this.catererId )
                .then(response => {
                    this.$store.commit("loadingStop");
                    if (response.status === 200) {
                        this.loaded = 200;
                        this.cityList = response.data.cities;
                        // تعبئة البيانات القادمة من الـ API
                        this.formData = { ...response.data.data };
                        // تحويل القيم البوليانية إلى true/false إذا كانت 1/0
                        this.formData.offers_tasting_sessions = !!response.data.data.offers_tasting_sessions;
                        this.formData.offers_tasting_booking = !!response.data.data.offers_tasting_booking;
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
        // دالة لمعالجة تغيير الشعار
        onChangeLogo(e) {
            const file = e.target.files[0];
            if (file) {
                this.formData.logo = file;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = e => this.previewLogo = e.target.result;
            }
        },
        // دالة لمعالجة تغيير صورة الغلاف
        onChangeCover(e) {
            const file = e.target.files[0];
            if (file) {
                this.formData.cover_photo = file;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = e => this.previewCover = e.target.result;
            }
        },
        // تم تحديث الدالة لتناسب متعهد التموين
        updateCaterer() {
            const config = { headers: { "content-type": "multipart/form-data" } };
            let data = new FormData();

            // إضافة جميع الحقول إلى FormData
            for (const key in this.formData) {
                // تجاهل الصور القديمة (الروابط) عند الإرسال
                if ((key === 'logo' || key === 'cover_photo') && typeof this.formData[key] === 'string') {
                    continue;
                }
                // تحويل القيم البوليانية إلى 1 أو 0
                if (typeof this.formData[key] === 'boolean') {
                    data.append(key, this.formData[key] ? 1 : 0);
                } else if (this.formData[key] !== null) { // التأكد من عدم إرسال القيم الفارغة
                    data.append(key, this.formData[key]);
                }
            }

            this.$store.commit("loadingStart");
            // استدعاء دالة الخدمة الصحيحة
            this.$http.EditCaterer(this.catererId, data, config )
                .then(response => {
                    this.$store.commit("loadingStop");
                    Swal.fire("نجاح", response.data.message, "success");
                    this.$router.push({ name: "caterers-list" }); // تأكد من أن اسم المسار صحيح
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
