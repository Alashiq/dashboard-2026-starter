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
        'Empty-Box': EmptyBox,
        'BadRequest': BadRequest,
        'No-Permission': NoPermission,
        'No-Internet': NoInternet,
    },
    data() {
        return {
            productId: this.$route.params.id,
            catererList: [],
            // سيتم تعبئة هذا النموذج ببيانات المنتج عند التحميل
            formData: {
                name: "",
                description: "",
                photo: null,
                ingredients: "",
                keywords: "",
                caterer_id: null,
            },
            previewPhoto: null,
            loaded: 0,
            sideMenuPage: {
                main: 11, // تأكد من صحة هذه الأرقام
                sub: 1,
            },
            errorMessage: "حدث خطأ ما",
        };
    },
    methods: {
        loadData() {
            this.$store.commit("loadingStart");
            // استدعاء الخدمة لجلب بيانات المنتج للتعديل
            this.$http.GetProductForEdit(this.productId )
                .then(response => {
                    this.$store.commit("loadingStop");
                    if (response.status === 200) {
                        this.loaded = 200;
                        this.catererList = response.data.caterers;
                        // تعبئة النموذج بالبيانات القادمة من الـ API
                        this.formData = response.data.data;
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
        // معالجة تغيير صورة المنتج
        onChangePhoto(e) {
            const file = e.target.files[0];
            if (file) {
                this.formData.photo = file;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = e => this.previewPhoto = e.target.result;
            }
        },
        // دالة لتحديث بيانات المنتج
        updateProduct() {
            const config = { headers: { "content-type": "multipart/form-data" } };
            let data = new FormData();

            // إضافة جميع الحقول إلى FormData
            for (const key in this.formData) {
                // 1. تجاهل الصورة القديمة (التي تكون عبارة عن رابط نصي) إذا لم يتم اختيار صورة جديدة
                if (key === 'photo' && typeof this.formData[key] === 'string') {
                    continue;
                }

                // 2. إذا كانت القيمة null، أرسلها كقيمة فارغة. الخادم سيفهمها كـ null.
                if (this.formData[key] === null) {
                    data.append(key, ''); 
                } 
                // 3. أرسل باقي القيم (غير الفارغة) كالمعتاد
                else if (this.formData[key] !== '') {
                    data.append(key, this.formData[key]);
                }
            }

            this.$store.commit("loadingStart");
            // استدعاء خدمة تعديل المنتج
            this.$http.EditProduct(this.productId, data, config )
                .then(response => {
                    this.$store.commit("loadingStop");
                    Swal.fire("نجاح", response.data.message, "success");
                    this.$router.push({ path: `/admin/product/${this.productId}` }); // العودة إلى صفحة عرض المنتج
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
