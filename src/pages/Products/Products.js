import Swal from "sweetalert2";
import { mapGetters } from "vuex";
import EmptyBox from '@/components/EmptyBox/EmptyBox.vue';
import BadRequest from '@/components/BadRequest/BadRequest.vue';
import NoPermission from '@/components/NoPermission/NoPermission.vue';
import NoInternet from '@/components/NoInternet/NoInternet.vue';
import PaginationBar from '@/components/PaginationBar/PaginationBar.vue';

export default {
    components: {
        'Empty-Box': EmptyBox,
        'BadRequest': BadRequest,
        'No-Permission': NoPermission,
        'No-Internet': NoInternet,
        'Pagination-Bar': PaginationBar,
    },
    data() {
        return {
            mainList: [],
            loaded: 0,
            pageId: 1,
            countPerPage: 10, // عرض 10 منتجات في الصفحة
            lastPage: 0,
            totalRows: 0,
            itemFrom: 0,
            itemTo: 0,
            nameSrh: "",
            optionId: 0,
            sideMenuPage: {
                main: 11, // قد تحتاج لتغيير هذا الرقم
                sub: 1,   // وهذا أيضًا
            },
            errorMessage: "حدث خطأ ما"
        };
    },
    methods: {
        reload: function () {
            this.loadData(1);
        },
        loadData: function (page) {
            this.pageId = page;
            this.$store.commit("loadingStart");
            // استدعاء دالة جلب المنتجات
            this.$http
                .GetAllProducts(this.pageId, this.countPerPage, this.nameSrh )
                .then(response => {
                    this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.mainList = response.data.data.data;
                        this.lastPage = response.data.data.last_page;
                        this.totalRows = response.data.data.total;
                        this.itemFrom = response.data.data.from;
                        this.itemTo = response.data.data.to;
                        this.$alert.Success(response.data.message);
                        this.loaded = 200;
                    } else if (response.status == 204) {
                        this.loaded = 204;
                        this.$alert.Empty("تنبيه: لا توجد أي منتجات.");
                    }
                })
                .catch(error => {
                    this.$store.commit("loadingStop");
                    if (error.response.status == 400 || error.response.status == 403) {
                        this.errorMessage = error.response.data.message;
                        this.loaded = error.response.status;
                    } else if (error.response.status == 401) {
                        this.$alert.NotAuth();
                    } else {
                        this.loaded = 404;
                    }
                });
        },
        changePerPage: function (event) {
            this.countPerPage = event.target.value;
            this.pageId = 1;
            this.loadData(this.pageId);
        },
        clearSearch: function () {
            this.nameSrh = "";
            this.loadData(1);
        },
        moveToNext: function () {
            this.pageId++;
            this.loadData(this.pageId);
        },
        moveToPrevius: function () {
            this.pageId--;
            this.loadData(this.pageId);
        },
        openOptions: function (event) {
            this.optionId = event.target.id == 0 ? 0 : event.target.id;
        },
        // تم تغيير اسم الدالة والنصوص الداخلية
        activeProduct: function (id, index) {
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
                    this.$http.ActiveProduct(id ).then(response => {
                        this.$store.commit("loadingStop");
                        this.mainList[index].status = 1;
                        this.$alert.Success(response.data.message);
                    }).catch(error => {
                        this.$store.commit("loadingStop");
                        this.$alert.BadRequest(error.response.data.message);
                    });
                }
            });
        },
        // تم تغيير اسم الدالة والنصوص الداخلية
        disActiveProduct: function (id, index) {
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
                    this.$http.DisActiveProduct(id ).then(response => {
                        this.$store.commit("loadingStop");
                        this.mainList[index].status = 0;
                        this.$alert.Success(response.data.message);
                    }).catch(error => {
                        this.$store.commit("loadingStop");
                        this.$alert.BadRequest(error.response.data.message);
                    });
                }
            });
        },
        // تم تغيير اسم الدالة والنصوص الداخلية
        deleteProduct: function (id) {
            Swal.fire({
                title: "هل أنت متأكد؟",
                text: "سيتم حذف هذا المنتج. لا يمكن التراجع عن هذا الإجراء.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#e74c3c",
                cancelButtonColor: "#bdc3c7",
                confirmButtonText: "نعم، حذف",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                    this.$store.commit("loadingStart");
                    this.$http.DeleteProduct(id ).then(response => {
                        this.$store.commit("loadingStop");
                        this.mainList.splice(this.mainList.findIndex(m => m.id === id), 1);
                        this.$alert.Success(response.data.message);
                    }).catch(error => {
                        this.$store.commit("loadingStop");
                        this.$alert.BadRequest(error.response.data.message);
                    });
                }
            });
        },
    },
    mounted() {
        this.$store.commit("activePage", this.sideMenuPage);
        this.loadData(this.pageId);
    },
    computed: {
        ...mapGetters(["language"]),
    }
};
