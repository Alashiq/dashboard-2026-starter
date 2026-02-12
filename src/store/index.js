
import authModule from './modules/auth'
import langModule from './modules/lang'

export default {
    state: () => ({
        pages: [
            {
                id: 1,
                target: 0, // 0 label - 1 page
                name: "الرئيسية",
                nameEn: "Home",
                role: "HomeLabel",
                url: "/admin",
                icon: "fa-regular fa-house",
                list: [],
            },
            {
                id: 2,
                target: 1, // 0 label - 1 page
                name: "الصفحة الرئيسية",
                nameEn: "Home Page",
                role: "HomeChart",
                url: "/admin",
                icon: "fa-sharp fa-solid fa-house",
                list: [],
            },

            {
                id: 4,
                target: 0, // 0 label - 1 page
                name: "العمليات",
                nameEn: "Settings",
                role: "SettingLabel",
                url: "/admin",
                icon: "fas fa-home",
                list: [],
            },

            {
                id: 9,
                target: 1,
                name: 'قاعات الافراح',
                nameEn: 'Halls List',
                role: 'ReadHall',
                url: '/hall',
                icon: 'far fa-bell',
                list: [
                    {
                        id: 1,
                        name: 'قائمة القاعات',
                        nameEn: 'Halls List',
                        role: 'ReadHall',
                        url: '/admin/hall',
                    },
                    {
                        id: 2,
                        name: 'قاعة جديدة',
                        nameEn: 'New Hall',
                        role: 'CreateHall',
                        url: '/admin/hall/new',
                    },
                ],
            },

                {
                id: 13,
                target: 1,
                name: 'المستخدمين',
                nameEn: 'Users List',
                role: 'ReadUser',
                url: '/user',
                icon: 'far fa-bell',
                list: [
                    {
                        id: 1,
                        name: 'قائمة المستخدمين',
                        nameEn: 'Users List',
                        role: 'ReadUser',
                        url: '/admin/user',
                    },
                    {
                        id: 2,
                        name: 'مستخدم جديد',
                        nameEn: 'New User',
                        role: 'CreateUser',
                        url: '/admin/user/new',
                    },
                ],
            },


            {
                id: 10,
                target: 1,
                name: 'التشاركيات والمتاجر',
                nameEn: 'Caterer List',
                role: 'ReadCaterer',
                url: '/caterer',
                icon: 'far fa-bell',
                list: [
                    {
                        id: 1,
                        name: 'قائمة التشاركيات',
                        nameEn: 'Caterer List',
                        role: 'ReadCaterer',
                        url: '/admin/caterer',
                    },
                    {
                        id: 2,
                        name: 'تشاركية جديدة',
                        nameEn: 'New Caterer',
                        role: 'CreateCaterer',
                        url: '/admin/caterer/new',
                    },
                ],
            },


            {
                id: 11,
                target: 1,
                name: 'المنتجات',
                nameEn: 'Products List',
                role: 'ReadProduct',
                url: '/product',
                icon: 'far fa-bell',
                list: [
                    {
                        id: 1,
                        name: 'قائمة المنتجات',
                        nameEn: 'Products List',
                        role: 'ReadProduct',
                        url: '/admin/product',
                    },
                    {
                        id: 2,
                        name: 'منتج جديد',
                        nameEn: 'New Caterer',
                        role: 'CreateCaterer',
                        url: '/admin/product/new',
                    },
                ],
            },



            {
                id: 12,
                target: 1,
                name: 'منتجات التشاركية',
                nameEn: 'Caterer Products List',
                role: 'ReadCatererProduct',
                url: '/catererproduct',
                icon: 'far fa-bell',
                list: [
                    {
                        id: 1,
                        name: 'قائمة منتجات التشاركية',
                        nameEn: 'Caterer Products List',
                        role: 'ReadCatererProduct',
                        url: '/admin/catererproduct',
                    },
                    {
                        id: 2,
                        name: 'منتج تشاركية جديد',
                        nameEn: 'New Caterer Product',
                        role: 'CreateCatererProduct',
                        url: '/admin/catererproduct/new',
                    },
                ],
            },




            {
                id: 7,
                target: 0, // 0 label - 1 page
                name: "البيانات",
                nameEn: "Data",
                role: "DataLabel",
                url: "/admin",
                icon: "fas fa-home",
                list: [],
            },


            {
                id: 8,
                target: 1,
                name: 'المدن',
                nameEn: 'Cities List',
                role: 'ReadCity',
                url: '/city',
                icon: 'far fa-bell',
                list: [
                    {
                        id: 1,
                        name: 'قائمة المدن',
                        nameEn: 'City List',
                        role: 'ReadCity',
                        url: '/admin/city',
                    },
                    {
                        id: 2,
                        name: 'مدينة جديدة',
                        nameEn: 'New City',
                        role: 'CreateCity',
                        url: '/admin/city/new',
                    },
                ],
            },







            {
                id: 3,
                target: 0, // 0 label - 1 page
                name: "الإعدادات",
                nameEn: "Settings",
                role: "SettingLabel",
                url: "/admin",
                icon: "fas fa-home",
                list: [],
            },
            {
                id: 5,
                target: 1, // 0 label - 1 page
                name: "المشرفين والصلاحيات",
                nameEn: "Admins & Roles",
                role: "RolePermissionsList",
                url: "/admin",
                icon: "fas fa-user-shield",
                list: [
                    {
                        id: 1,
                        name: "قائمة المشرفين",
                        nameEn: "Admins List",
                        role: "ReadAdmin",
                        url: "/admin/admin",
                    },
                    {
                        id: 2,
                        name: "إضافة مشرف",
                        nameEn: "New Admin",
                        role: "CreateAdmin",
                        url: "/admin/admin/new",
                    },
                    {
                        id: 3,
                        name: "أدوار المشرفين",
                        nameEn: "Roles List",
                        role: "ReadRole",
                        url: "/admin/role",
                    },
                    {
                        id: 4,
                        name: "إضافة دور",
                        nameEn: "New Role",
                        role: "CreateRole",
                        url: "/admin/role/new",
                    },
                ],
            },








        ],
        pageActive: 4,
        subPageActive: 1,
        openPageList: 4,
        loading: false,

        // Menu
        menu: false,
        languageMenu: false,
        userMenu: false,


    }),

    mutations: {

        activePage(state, v) {
            state.pageActive = v.main;
            state.subPageActive = v.sub;
            state.openPageList = v.main;
        },
        toggllePageList(state, pageNumber) {
            if (state.openPageList != pageNumber)
                state.openPageList = pageNumber;
            else
                state.openPageList = 0;
        },
        // Loading 
        loadingStart(state) {
            state.loading = true;
        },
        loadingStop(state) {
            state.loading = false;
        },
        // Menu
        toggleMenu(state) {
            state.menu = !state.menu;
        },
        toggleLanguageMenu(state, val) {
            if (val == 1)
                state.languageMenu = !state.languageMenu;
            else
                state.languageMenu = false;
        },
        toggleUserMenu(state, val) {
            if (val == 1)
                state.userMenu = !state.userMenu;
            else
                state.userMenu = false;
        },
    },

    actions: {
    },
    modules: {
        authModule: authModule,
        langModule: langModule
    }
};

