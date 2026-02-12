import Swal from "sweetalert2";
import { mapGetters } from "vuex";
import EmptyBox from '@/components/EmptyBox/EmptyBox.vue';
import BadRequest from '@/components/BadRequest/BadRequest.vue';
import NoPermission from '@/components/NoPermission/NoPermission.vue';
import NoInternet from '@/components/NoInternet/NoInternet.vue';
import PaginationBar from '@/components/PaginationBar/PaginationBar.vue';

export default {
    components: { EmptyBox, BadRequest, NoPermission, NoInternet, PaginationBar },
    data() {
        return {
            mainList: [],
            loaded: 0,
            pageId: 1,
            countPerPage: 10,
            lastPage: 0,
            totalRows: 0,
            itemFrom: 0,
            itemTo: 0,
            productNameSrh: "",
            catererNameSrh: "",
            optionId: 0,
            sideMenuPage: { main: 12, sub: 1 }, // قد تحتاج لتغيير هذا
            errorMessage: "حدث خطأ ما"
        };
    },
    methods: {
        reload: function () { this.loadData(1); },
        loadData: function (page) {
            this.pageId = page;
            this.$store.commit("loadingStart");
            this.$http.GetAllCatererProducts(this.pageId, this.countPerPage, this.productNameSrh, this.catererNameSrh )
                .then(response => {
                    this.$store.commit("loadingStop");
                    if (response.status == 200) {
                        this.mainList = response.data.data.data;
                        this.lastPage = response.data.data.last_page;
                        this.totalRows = response.data.data.total;
                        this.itemFrom = response.data.data.from;
                        this.itemTo = response.data.data.to;
                        this.loaded = 200;
                    } else if (response.status == 204) {
                        this.loaded = 204;
                    }
                })
                .catch(error => {
                    this.$store.commit("loadingStop");
                    this.loaded = error.response ? error.response.status : 404;
                });
        },
        clearSearch: function () {
            this.productNameSrh = "";
            this.catererNameSrh = "";
            this.loadData(1);
        },
        deleteItem: function (id) {
            Swal.fire({
                title: "هل أنت متأكد؟",
                text: "سيتم حذف هذا السجل نهائيًا.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#e74c3c",
                confirmButtonText: "نعم، حذف",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                    this.$store.commit("loadingStart");
                    this.$http.DeleteCatererProduct(id ).then(response => {
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
        changePerPage: function (event) { this.countPerPage = event.target.value; this.loadData(1); },
        moveToNext: function () { this.pageId++; this.loadData(this.pageId); },
        moveToPrevius: function () { this.pageId--; this.loadData(this.pageId); },
        openOptions: function (event) { this.optionId = event.target.id == 0 ? 0 : event.target.id; },
    },
    mounted() {
        this.$store.commit("activePage", this.sideMenuPage);
        this.loadData(this.pageId);
    },
    computed: { ...mapGetters(["language"]) }
};
