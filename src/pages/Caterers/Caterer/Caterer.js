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
            mainItem: [],
            loaded: 0,
            // 0 not Loaded - 200 Load Success - 204 Empty - 400 Bad Request - 404 No Internet
            sideMenuPage: {
                main: 10, // <-- تأكد من أن هذا الرقم صحيح لصفحة التشاركيات في القائمة الجانبية
                sub: 2,   // <-- تأكد من أن هذا الرقم صحيح
            },
            errorMessage: "حدث خطأ ما"
        };
    },
    methods: {
        reload: function () {
            this.loadData();
        },
        loadData: function () {
            this.$store.commit("loadingStart");
            // --- تعديل: استخدام دالة جلب التشاركية ---
            this.$http
                .GetCatererById(this.$route.params.id )
                .then(response => {
                    this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.mainItem = response.data.data;
                        this.loaded = 200;
                        this.$alert.Success(response.data.message);
                    } else if (response.status == 204) {
                        this.loaded = 204;
                        this.$alert.Empty("هذا العنصر غير متوفر");
                    } else {
                        this.loaded = 400;
                    }
                })
                .catch(error => {
                    this.$store.commit("loadingStop");
                    if (error.response.status == 400) {
                        this.errorMessage = error.response.data.message;
                        this.loaded = 400;
                        this.$alert.BadRequest(error.response.data.message);
                    } else if (error.response.status == 403) {
                        this.errorMessage = error.response.data.message;
                        this.loaded = 403;
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
        deleteCaterer: function () {
            Swal.fire({
                title: "هل أنت متأكد",
                // --- تعديل: تغيير النص ---
                text: "هل أنت متأكد من أنك تريد حذف هذه التشاركية!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#16a085",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم حذف",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                    this.$store.commit("loadingStart");
                    // --- تعديل: استخدام دالة حذف التشاركية ---
                    this.$http
                        .DeleteCaterer(this.$route.params.id )
                        .then(response => {
                            this.$store.commit("loadingStop");
                            if (response.status == 200) {
                                this.mainItem = [];
                                this.loaded = 204;
                                this.$alert.Success(response.data.message);
                            } else if (response.status == 204) {
                                this.mainItem = [];
                                this.loaded = 204;
                                this.$alert.Empty("لم يعد هذا العنصر متوفرا, قد يكون شخص أخر قام بحذفه");
                            }
                        })
                        .catch(error => {
                            this.$store.commit("loadingStop");
                            this.$alert.BadRequest(error.response.data.message);
                        });
                }
            });
        },
        activateCaterer() {
            Swal.fire({
                title: "هل أنت متأكد؟",
                // --- تعديل: تغيير النص ---
                text: "هل تريد تفعيل هذه التشاركية؟",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#16a085",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                    this.$store.commit("loadingStart");
                    // --- تعديل: استخدام دالة تفعيل التشاركية ---
                    this.$http.ActiveCaterer(this.$route.params.id )
                        .then(response => {
                            this.$store.commit("loadingStop");
                            if (response.status == 200) {
                                this.mainItem.status = 1;
                                this.$alert.Success(response.data.message);
                            } else if (response.status == 204) {
                                this.mainItem = [];
                                this.loaded = 204;
                                this.$alert.Empty("لم يعد هذا العنصر متوفرا, قد يكون شخص أخر قام بحذفه");
                            }
                        })
                        .catch(error => {
                            this.$store.commit("loadingStop");
                            this.$alert.BadRequest(error.response.data.message);
                        });
                }
            });
        },
        deactivateCaterer() {
            Swal.fire({
                title: "هل أنت متأكد؟",
                // --- تعديل: تغيير النص ---
                text: "هل تريد إلغاء تفعيل هذه التشاركية؟",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#f39c12",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                    this.$store.commit("loadingStart");
                    // --- تعديل: استخدام دالة إلغاء تفعيل التشاركية ---
                    this.$http.DisActiveCaterer(this.$route.params.id )
                        .then(response => {
                            this.$store.commit("loadingStop");
                            if (response.status == 200) {
                                this.mainItem.status = 0;
                                this.$alert.Success(response.data.message);
                            } else if (response.status == 204) {
                                this.mainItem = [];
                                this.loaded = 204;
                                this.$alert.Empty("لم يعد هذا العنصر متوفرا, قد يكون شخص أخر قام بحذفه");
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
        this.loadData();
    },
    computed: {},
    created() { }
};
