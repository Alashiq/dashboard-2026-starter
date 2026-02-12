import Swal from "sweetalert2";
import { mapGetters, mapActions,mapMutations } from "vuex";
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
            // Side Menu
            sideMenuPage: {
                main: 13,
                sub: 1,
            },
            errorMessage: "حدث خطأ ما"
        };
    },
    methods: {
        reload: function () {
            this.loadData();
        },
        loadData: function () {
            /*this.$loading.Start();*/ this.$store.commit("loadingStart");
            this.$http
                .GetUserById(this.$route.params.id)
                .then(response => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.mainItem = response.data.data;
                        this.loaded = 200;
                        this.$alert.Success(response.data.message);
                    } else if (response.status == 204) {
                        this.loaded = 204;
                        this.$alert.Empty("هذه العنصر غير متوفرة");
                    }
                    else {
                        this.loaded = 400;
                    }
                })
                .catch(error => {
                    /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                    if (error.response.status == 400) {
                        this.errorMessage=error.response.data.message;
                        this.loaded = 400;
                        this.$alert.BadRequest(error.response.data.message);
                    } else if (error.response.status == 403) {
                        this.errorMessage=error.response.data.message;
                        this.loaded = 403;
                        this.$alert.BadRequest(error.response.data.message);
                    } else if (error.response.status == 401) {
                        this.$alert.NotAuth();
                    } else {
                        this.errorMessage="حدث خطأ ما";
                        this.loaded = 404;
                        this.$alert.BadRequest("حدث خطأ ما, الرجاء إعادة المحاولة");
                    }
                });
        },
        bannedUser: function () {
            Swal.fire({
                title: "حظر المستخدم",
                text: "أدخل تاريخ انتهاء الحظر:",
                input: 'text',
                inputPlaceholder: 'YYYY-MM-DD',
                inputValidator: (value) => {
                    if (!value) {
                        return 'يجب إدخال تاريخ!';
                    }
                    const date = new Date(value);
                    if (isNaN(date.getTime()) || date <= new Date()) {
                        return 'تاريخ غير صحيح أو في الماضي!';
                    }
                },
                showCancelButton: true,
                confirmButtonColor: "#16a085",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم حظر الحساب",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                    const banData = { ban_expires_at: result.value };
                    this.$store.commit("loadingStart");
                    this.$http
                        .BannedUser(this.$route.params.id, banData)
                        .then(response => {
                            this.$store.commit("loadingStop");
                            if (response.status == 200) {
                                this.mainItem.status = 3;
                                this.$alert.Success(response.data.message);
                            } else if (response.status == 204) {
                                this.loaded = 204;
                                this.mainItem = [];
                                this.$alert.Empty(
                                    "لم يعد هذا الحساب متوفر, قد يكون شخص أخر قام بحذفه"
                                );
                            }
                        })
                        .catch(error => {
                            this.$store.commit("loadingStop");
                            this.$alert.BadRequest(error.response.data.message);
                        });
                }
            });
        },
        unbanUser: function () {
            Swal.fire({
                title: "هل أنت متأكد",
                text: "هل تريد إلغاء حظر هذا المستخدم؟",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#16a085",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم إلغاء الحظر",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                    this.$store.commit("loadingStart");
                    this.$http
                        .UnbanUser(this.$route.params.id)
                        .then(response => {
                            this.$store.commit("loadingStop");
                            if (response.status == 200) {
                                this.mainItem.status = 2;
                                this.$alert.Success(response.data.message);
                            } else if (response.status == 204) {
                                this.loaded = 204;
                                this.mainItem = [];
                                this.$alert.Empty(
                                    "لم يعد هذا المستخدم متوفر, قد يكون شخص أخر قام بحذفه"
                                );
                            }
                        })
                        .catch(error => {
                            this.$store.commit("loadingStop");
                            this.$alert.BadRequest(error.response.data.message);
                        });
                }
            });
        },
        activeUser: function () {
            Swal.fire({
                title: "هل أنت متأكد",
                text: "هل تريد تفعيل هذا المستخدم؟",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#16a085",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم تفعيل",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                    this.$store.commit("loadingStart");
                    this.$http
                        .ActiveUser(this.$route.params.id)
                        .then(response => {
                            this.$store.commit("loadingStop");
                            if (response.status == 200) {
                                this.mainItem.status = 1;
                                this.$alert.Success(response.data.message);
                            } else if (response.status == 204) {
                                this.loaded = 204;
                                this.mainItem = [];
                                this.$alert.Empty(
                                    "لم يعد هذا المستخدم متوفر, قد يكون شخص أخر قام بحذفه"
                                );
                            }
                        })
                        .catch(error => {
                            this.$store.commit("loadingStop");
                            this.$alert.BadRequest(error.response.data.message);
                        });
                }
            });
        },
        disActiveUser: function () {
            Swal.fire({
                title: "هل أنت متأكد",
                text: "هل تريد إلغاء تفعيل هذا المستخدم؟",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#16a085",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم إلغاء التفعيل",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                    this.$store.commit("loadingStart");
                    this.$http
                        .DisActiveUser(this.$route.params.id)
                        .then(response => {
                            this.$store.commit("loadingStop");
                            if (response.status == 200) {
                                this.mainItem.status = 0;
                                this.$alert.Success(response.data.message);
                            } else if (response.status == 204) {
                                this.loaded = 204;
                                this.mainItem = [];
                                this.$alert.Empty(
                                    "لم يعد هذا المستخدم متوفر, قد يكون شخص أخر قام بحذفه"
                                );
                            }
                        })
                        .catch(error => {
                            this.$store.commit("loadingStop");
                            this.$alert.BadRequest(error.response.data.message);
                        });
                }
            });
        },
        deleteUser: function (id) {
            Swal.fire({
                title: "هل أنت متأكد",
                text: "هل أنت متأكد من أنك تريد حذف هذا الحساب !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#16a085",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم حذف",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                    /*this.$loading.Start();*/ this.$store.commit("loadingStart");
                    this.$http
                        .DeleteUser(this.$route.params.id)
                        .then(response => {
                            /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
                            if (response.status == 200) {
                                this.mainItem = [];
                                this.loaded = 204;
                                this.$alert.Success(response.data.message);
                            } else if (response.status == 204) {
                                this.mainItem = [];
                                this.loaded = 204;
                                this.$alert.Empty(
                                    "لم يعد هذا الحساب متوفرة, قد يكون شخص أخر قام بحذفه"
                                );
                            }
                        })
                        .catch(error => {
                            /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
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
