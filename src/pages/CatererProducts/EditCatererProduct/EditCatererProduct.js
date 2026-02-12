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
            catererProductId: this.$route.params.id, // ID السجل في جدول caterer_products
            // سيتم تعبئة هذا النموذج بالبيانات الحالية
            formData: {
                price: '',
                is_available: true,
            },
            // لتخزين البيانات التي لا تتغير للعرض فقط
            displayData: {
                catererName: '',
                productName: '',
            },
            loaded: 0,
            sideMenuPage: {
                main: 12, // تأكد من صحة هذا الرقم
                sub: 1,
            },
            errorMessage: "حدث خطأ ما",
        };
    },
    methods: {
        loadData() {
            this.$store.commit("loadingStart");
            // استدعاء الخدمة لجلب بيانات السجل للتعديل
            this.$http.GetCatererProductForEdit(this.catererProductId )
                .then(response => {
                    this.$store.commit("loadingStop");
                    if (response.status === 200) {
                        this.loaded = 200;
                        const item = response.data.data;
                        // تعبئة النموذج بالبيانات القابلة للتعديل
                        this.formData.price = item.price;
                        this.formData.is_available = item.is_available;
                        // تعبئة بيانات العرض
                        this.displayData.catererName = item.caterer.name;
                        this.displayData.productName = item.product.name;
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
        // دالة لتحديث البيانات
        updateItem() {
            // تحويل القيمة المنطقية إلى 0 أو 1
            const dataToSend = {
                price: this.formData.price,
                is_available: this.formData.is_available ? 1 : 0,
            };

            this.$store.commit("loadingStart");
            this.$http.EditCatererProduct(this.catererProductId, dataToSend )
                .then(response => {
                    this.$store.commit("loadingStop");
                    Swal.fire("نجاح", response.data.message, "success");
                    this.$router.push('/admin/catererproduct'); // العودة إلى القائمة الرئيسية
                })
                .catch(error => {
                    this.$store.commit("loadingStop");
                    Swal.fire("خطأ", error.response.data.message, "error");
                });
        }
    },
    mounted() {
        this.$store.commit("activePage", this.sideMenuPage);
        this.loadData();
    }
};
