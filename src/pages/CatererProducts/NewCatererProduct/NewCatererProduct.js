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
            productList: [], // قائمة المنتجات
            // النموذج الفارغ للبيانات الجديدة
            formData: {
                caterer_id: null,
                product_id: null,
                price: '',
                is_available: true, // القيمة الافتراضية هي "متوفر"
            },
            loaded: 0,
            sideMenuPage: {
                main: 12, // تأكد من أن هذا الرقم صحيح
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
            // استدعاء الخدمة لجلب البيانات اللازمة (قائمة المتعهدين والمنتجات)
            this.$http.GetNewCatererProductData( )
                .then(response => {
                    this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.loaded = 200;
                        this.catererList = response.data.data.caterers;
                        this.productList = response.data.data.products;
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
        // دالة لإضافة الرابط الجديد
        addNewItem() {
            // تحويل القيمة المنطقية إلى 0 أو 1 قبل الإرسال
            const dataToSend = {
                ...this.formData,
                is_available: this.formData.is_available ? 1 : 0,
            };

            this.$store.commit("loadingStart");
            this.$http.PostNewCatererProduct(dataToSend )
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
        // دالة لإعادة تعيين النموذج
        resetForm() {
            this.formData = {
                caterer_id: null,
                product_id: null,
                price: '',
                is_available: true,
            };
        },
    },
    mounted() {
        this.$store.commit("activePage", this.sideMenuPage);
        this.loadData();
    },
};
