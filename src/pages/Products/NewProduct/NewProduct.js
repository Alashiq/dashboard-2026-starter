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
            catererList: [], // قائمة متعهدي التموين
            // النموذج الفارغ لبيانات المنتج الجديد
            formData: {
                name: "",
                description: "",
                photo: null,
                ingredients: "",
                keywords: "",
                caterer_id: null, // يبدأ فارغًا للسماح باختيار "منتج عام"
            },
            previewPhoto: null,
            loaded: 0,
            sideMenuPage: {
                main: 11, // تأكد من أن هذا الرقم صحيح
                sub: 1,
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
            // استدعاء الخدمة لجلب البيانات اللازمة (قائمة متعهدي التموين)
            this.$http.GetNewProduct( )
                .then(response => {
                    this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.loaded = 200;
                        this.catererList = response.data.data.caterers;
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
        // دالة لإضافة منتج جديد
        addNewProduct() {
            const config = { headers: { "content-type": "multipart/form-data" } };
            let data = new FormData();

            // إضافة جميع الحقول إلى FormData
            for (const key in this.formData) {
                if (this.formData[key] !== null && this.formData[key] !== '') {
                    data.append(key, this.formData[key]);
                }
            }

            this.$store.commit("loadingStart");
            // استدعاء خدمة إضافة منتج جديد
            this.$http.PostNewProduct(data, config )
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
                name: "", description: "", photo: null, ingredients: "",
                keywords: "", caterer_id: null,
            };
            this.previewPhoto = null;
            if (this.$refs.photoInput) {
                this.$refs.photoInput.value = null;
            }
        },
    },
    mounted() {
        this.$store.commit("activePage", this.sideMenuPage);
        this.loadData();
    },
};
