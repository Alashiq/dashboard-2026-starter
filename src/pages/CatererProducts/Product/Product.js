import Swal from "sweetalert2";
import { mapGetters } from "vuex";
import EmptyBox from '@/components/EmptyBox/EmptyBox.vue';
import BadRequest from '@/components/BadRequest/BadRequest.vue';
import NoPermission from '@/components/NoPermission/NoPermission.vue';
import NoInternet from '@/components/NoInternet/NoInternet.vue';
import SinglePageHeader from '@/components/SinglePageHeader/SinglePageHeader.vue';

export default {
    components: {
        'Empty-Box': EmptyBox,
        'BadRequest': BadRequest,
        'No-Permission': NoPermission,
        'No-Internet': NoInternet,
        'Single-Page-Header': SinglePageHeader,
    },
    data() {
        return {
            mainItem: {}, // سيحتوي على جميع بيانات المنتج
            loaded: 0,
            errorMessage: "حدث خطأ ما",
            sideMenuPage: {
                main: 11, // تأكد من أن هذه الأرقام صحيحة
                sub: 1,
            },
        };
    },
    methods: {
        reload() {
            this.loadData();
        },
        loadData() {
            this.$store.commit("loadingStart");
            // استخدام دالة الخدمة لجلب بيانات المنتج بواسطة ID
            this.$http.GetProductById(this.$route.params.id )
                .then(response => {
                    this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.mainItem = response.data.data;
                        this.loaded = 200;
                        this.$alert.Success(response.data.message);
                    } else if (response.status == 204) {
                        this.loaded = 204;
                        this.$alert.Empty("لا يوجد منتج بهذا الرقم");
                    }
                })
                .catch(error => {
                    this.$store.commit("loadingStop");
                    if (error.response.status == 400 || error.response.status == 403) {
                        this.errorMessage = error.response.data.message;
                        this.loaded = error.response.status;
                    } else if (error.response.status == 401) {
                        this.$alert.NotAuth();
                        this.$router.push('/login');
                    } else {
                        this.loaded = 404;
                    }
                });
        },
        activateProduct() {
            Swal.fire({
                title: "هل أنت متأكد؟",
                text: "هل تريد تفعيل هذا المنتج؟",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#16a085",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم، تفعيل",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                    this.$store.commit("loadingStart");
                    this.$http.ActiveProduct(this.mainItem.id ).then(response => {
                        this.$store.commit("loadingStop");
                        this.mainItem.status = 1; // تحديث الحالة محليًا
                        this.$alert.Success(response.data.message);
                    }).catch(error => {
                        this.$store.commit("loadingStop");
                        this.$alert.BadRequest(error.response.data.message);
                    });
                }
            });
        },
        deactivateProduct() {
            Swal.fire({
                title: "هل أنت متأكد؟",
                text: "هل تريد إلغاء تفعيل هذا المنتج؟",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#16a085",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم، إلغاء التفعيل",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                    this.$store.commit("loadingStart");
                    this.$http.DisActiveProduct(this.mainItem.id ).then(response => {
                        this.$store.commit("loadingStop");
                        this.mainItem.status = 0; // تحديث الحالة محليًا
                        this.$alert.Success(response.data.message);
                    }).catch(error => {
                        this.$store.commit("loadingStop");
                        this.$alert.BadRequest(error.response.data.message);
                    });
                }
            });
        },
        deleteProduct() {
            Swal.fire({
                title: "هل أنت متأكد؟",
                text: "سيتم حذف هذا المنتج. هل تريد المتابعة؟",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#e74c3c",
                cancelButtonColor: "#bdc3c7",
                confirmButtonText: "نعم، حذف",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                    this.$store.commit("loadingStart");
                    this.$http.DeleteProduct(this.mainItem.id ).then(response => {
                        this.$store.commit("loadingStop");
                        this.$alert.Success(response.data.message);
                        this.$router.push('/admin/product'); // العودة إلى قائمة المنتجات
                    }).catch(error => {
                        this.$store.commit("loadingStop");
                        this.$alert.BadRequest(error.response.data.message);
                    });
                }
            });
        }
    },
    mounted() {
        this.$store.commit("activePage", this.sideMenuPage);
        this.loadData();
    },
    computed: {
        ...mapGetters(["language"]),
    }
};
