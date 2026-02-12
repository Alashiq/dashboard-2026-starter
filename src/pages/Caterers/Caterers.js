import Swal from "sweetalert2";
import { mapGetters, mapActions, mapMutations } from "vuex";
import EmptyBox from '@/components/EmptyBox/EmptyBox.vue';
import BadRequest from '@/components/BadRequest/BadRequest.vue';
import NoPermission from '@/components/NoPermission/NoPermission.vue';
import NoInternet from '@/components/NoInternet/NoInternet.vue';
import PaginationBar from '@/components/PaginationBar/PaginationBar.vue';
import SinglePageHeader from '@/components/SinglePageHeader/SinglePageHeader.vue';

export default {
    components: {
        'Empty-Box': EmptyBox,
        'BadRequest': BadRequest,
        'No-Permission': NoPermission,
        'No-Internet': NoInternet,
        'Pagination-Bar': PaginationBar,
        'Single-Page-Header': SinglePageHeader,
    },
    data() {
        return {
            mainList: [],
            loaded: 0,
            tagId: null,
            pageId: 1,
            countPerPage: 5,
            lastPage: 0,
            totalRows: 0,
            itemFrom: 0,
            itemTo: 0,
            nameSrh: "",
            optionId: 0,
            sideMenuPage: {
                main: 10, // قد تحتاج لتغيير هذا الرقم لتمييز صفحة متعهدي التموين في القائمة الجانبية
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
            // استدعاء دالة جلب متعهدي التموين
            this.$http
                .GetAllCaterers(this.pageId, this.countPerPage, this.nameSrh )
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
                        // تم تغيير الرسالة
                        this.$alert.Empty("تنبيه: لا يوجد أي متعهدي تموين.");
                    } else {
                        this.loaded = 400;
                    }
                })
                .catch(error => {
                    this.$store.commit("loadingStop");
                    if (error.response.status == 400 || error.response.status == 403) {
                        this.errorMessage = error.response.data.message;
                        this.loaded = error.response.status;
                        this.$alert.BadRequest(error.response.data.message);
                    } else if (error.response.status == 401) {
                        this.$alert.NotAuth();
                    } else {
                        this.errorMessage = "حدث خطأ ما";
                        this.loaded = 404;
                        this.$alert.BadRequest("حدث خطأ ما, الرجاء إعادة المحاولة");
                    }
                });
        },
        changeTag(tag) {
            this.tagId = tag;
            this.pageId = 1;
            this.loadData(1);
        },
        changePerPage: function (event) {
            this.countPerPage = event.target.value;
            this.pageId = 1;
            this.loadData(this.pageId);
        },
        clearSearch: function () {
            this.nameSrh = "";
            this.loadData(this.pageId);
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
        activeCaterer: function (id, index) {
            Swal.fire({
                title: "هل أنت متأكد؟",
                text: "هل تريد تفعيل حساب متعهد التموين هذا؟",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#16a085",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم، تفعيل",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                    this.$store.commit("loadingStart");
                    // استدعاء دالة التفعيل
                    this.$http
                        .ActiveCaterer(id )
                        .then(response => {
                            this.$store.commit("loadingStop");
                            if (response.status == 200) {
                                this.mainList[index].status = 1;
                                this.$alert.Success(response.data.message);
                            } else if (response.status == 204) {
                                this.$alert.Empty("هذا الحساب لم يعد متوفرًا.");
                            }
                        })
                        .catch(error => {
                            this.$store.commit("loadingStop");
                            this.$alert.BadRequest(error.response.data.message);
                        });
                }
            });
        },
        // تم تغيير اسم الدالة والنصوص الداخلية
        disActiveCaterer: function (id, index) {
            Swal.fire({
                title: "هل أنت متأكد؟",
                text: "هل تريد إلغاء تفعيل هذا الحساب؟",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#16a085",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم، إلغاء التفعيل",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                    this.$store.commit("loadingStart");
                    // استدعاء دالة إلغاء التفعيل
                    this.$http
                        .DisActiveCaterer(id )
                        .then(response => {
                            this.$store.commit("loadingStop");
                            if (response.status == 200) {
                                this.mainList[index].status = 0;
                                this.$alert.Success(response.data.message);
                            } else if (response.status == 204) {
                                this.$alert.Empty("هذا الحساب لم يعد متوفرًا.");
                            }
                        })
                        .catch(error => {
                            this.$store.commit("loadingStop");
                            this.$alert.BadRequest(error.response.data.message);
                        });
                }
            });
        },
        // تم تغيير اسم الدالة والنصوص الداخلية
        deleteCaterer: function (id) {
            Swal.fire({
                title: "هل أنت متأكد؟",
                text: "هل تريد حذف متعهد التموين هذا؟ لا يمكن التراجع عن هذا الإجراء.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#e74c3c",
                cancelButtonColor: "#bdc3c7",
                confirmButtonText: "نعم، حذف",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                    this.$store.commit("loadingStart");
                    // استدعاء دالة الحذف
                    this.$http
                        .DeleteCaterer(id )
                        .then(response => {
                            this.$store.commit("loadingStop");
                            if (response.status == 200) {
                                this.mainList.splice(this.mainList.findIndex(m => m.id === id), 1);
                                this.$alert.Success(response.data.message);
                            } else if (response.status == 204) {
                                this.mainList.splice(this.mainList.findIndex(m => m.id === id), 1);
                                this.$alert.Empty("هذا الحساب لم يعد متوفرًا.");
                            }
                        })
                        .catch(error => {
                            this.$store.commit("loadingStop");
                            this.$alert.BadRequest(error.response.data.message);
                        });
                }
            });
        },
    },
    mounted() {
        this.$store.commit("activePage", this.sideMenuPage);
        this.$store.commit("loadingStart");
        this.loadData(this.pageId);
    },
    computed: {
        ...mapGetters(["language"]),
        t() {
            // يمكنك تعديل هذا إذا كان لديك ملف ترجمة خاص بمتعهدي التموين
            return this.$lang.Profile[this.language];
        }
    },
    created() { }
};
