import axios from "axios";
const domain = 'http://127.0.0.1:8000/api/v1/admin';

export default {
    // ============== Auth Part =======================
    Login(loginData) {
        return axios.post(`${domain}/login`, loginData);
    },
    CheckToken() {
        return axios.get(`${domain}/auth/profile`);
    },
    Logout() {
        return axios.post(`${domain}/auth/logout`);
    },
    ChangeName(formData) {
        return axios.post(`${domain}/auth/name`, formData);
    },
    ChangePassword(formData) {
        return axios.post(`${domain}/auth/password`, formData);
    },
    ChangePhoto(data, config) {
        return axios.post(`${domain}/auth/photo`, data, config);
    },
    // ============== Home Part =======================
    GetHome() {
        return axios.get(`${domain}/home`);
    },


    // ============== Admin Part =======================
    GetAllAdmins(page, countPerPage, tag, phone, firstName, lastName) {
        return axios.get(`${domain}/admin?page=` + page + "&count=" + countPerPage + "&status=" + (tag == null ? '' : tag) + "&phone=" + phone + "&first_name=" + firstName + "&last_name=" + lastName);
    },
    ActiveAdmin(admin) {
        return axios.put(`${domain}/admin/` + admin + "/active");
    },
    DisActiveAdmin(admin) {
        return axios.put(`${domain}/admin/` + admin + "/disActive");
    },
    DeleteAdmin(admin) {
        return axios.delete(`${domain}/admin/` + admin);
    },
    BannedAdmin(admin) {
        return axios.put(`${domain}/admin/` + admin + "/banned");
    },
    ResetAdminPassword(admin) {
        return axios.put(`${domain}/admin/` + admin + "/reset");
    },
    GetAdminById(admin) {
        return axios.get(`${domain}/admin/` + admin);
    },
    GetAdminByIdWithRoles(admin) {
        return axios.get(`${domain}/admin/` + admin + "/edit");
    },
    GetNewAdmin() {
        return axios.get(`${domain}/admin/new`);
    },
    PostNewAdmin(admin) {
        return axios.post(`${domain}/admin`, admin);
    },
    UpdateAdminRole(admin, formData) {
        return axios.put(`${domain}/admin/` + admin, formData);
    },

    // ============== Role Part =======================
    GetAllRoles(page, countPerPage, name) {
        return axios.get(`${domain}/role?page=` + page + "&count=" + countPerPage + "&name=" + name);
    },
    GetRoleById(role) {
        return axios.get(`${domain}/role/` + role);
    },
    DeleteRole(role) {
        return axios.delete(`${domain}/role/` + role);
    },
    GetNewRole() {
        return axios.get(`${domain}/role/new`);
    },
    PostNewRole(role) {
        return axios.post(`${domain}/role`, role);
    },
    EditRole(role, formData) {
        return axios.put(`${domain}/role/` + role, formData);
    },




    // ============== City Part =======================
    GetAllCities(page, countPerPage, name) {
        return axios.get(`${domain}/city?page=` + page + "&count=" + countPerPage + "&name=" + name);
    },
    GetCityById(id) {
        return axios.get(`${domain}/city/` + id);
    },
    DeleteCity(city) {
        return axios.delete(`${domain}/city/` + city);
    },

    GetNewCity() {
        return axios.get(`${domain}/city/new`);
    },

    PostNewCity(city) {
        return axios.post(`${domain}/city`, city);
    },

    GetCityForEdit(id) {
        return axios.get(`${domain}/city/` + id + "/edit");
    },

    EditCity(id, formData) {
        return axios.put(`${domain}/city/` + id, formData);
    },


    // ============== Hall Part =======================
    GetAllHalls(page, countPerPage, name) {
        return axios.get(`${domain}/hall?page=${page}&count=${countPerPage}&name=${name}`);
    },
    GetHallById(id) {
        return axios.get(`${domain}/hall/${id}`);
    },
    GetNewHall() {
        return axios.get(`${domain}/hall/new`);
    },
    PostNewHall(hallData, config) {
        return axios.post(`${domain}/hall`, hallData, config);
    },
    GetHallForEdit(id) {
        return axios.get(`${domain}/hall/` + id + "/edit");
    },
    sEditHall(id, hallData, config) {
        return axios.put(`${domain}/hall/${id}`, hallData, config);
    },
    EditHall(id, hallData, config) {
        // تقدر تحطها في كويري أو داخل الـ FormData (أحدهما يكفي)
        return axios.post(`${domain}/hall/${id}?_method=PUT`, hallData, config);
    },
    DeleteHall(id) {
        return axios.delete(`${domain}/hall/${id}`);
    },
    ActiveHall(id) {
        return axios.put(`${domain}/hall/${id}/active`);
    },
    DisActiveHall(id) {
        return axios.put(`${domain}/hall/${id}/disActive`);
    },


    // ============== User Part =======================
    GetAllUsers(page, countPerPage, tag, phone, first_name, last_name, city_id) {
        return axios.get(`${domain}/user?page=${page}&count=${countPerPage}&status=${tag == null ? '' : tag}&phone=${phone}&first_name=${first_name}&last_name=${last_name}&city_id=${city_id || ''}`);
    },
    GetUserById(user) {
        return axios.get(`${domain}/user/` + user);
    },
    GetNewUser() {
        return axios.get(`${domain}/user/new`);
    },
    PostNewUser(user) {
        return axios.post(`${domain}/user`, user);
    },
    GetUserForEdit(user) {
        return axios.get(`${domain}/user/` + user + "/edit");
    },
    UpdateUser(user, formData) {
        return axios.put(`${domain}/user/` + user, formData);
    },
    DeleteUser(user) {
        return axios.delete(`${domain}/user/` + user);
    },
    ActiveUser(user) {
        return axios.post(`${domain}/user/` + user + "/activate");
    },
    DisActiveUser(user) {
        return axios.post(`${domain}/user/` + user + "/deactivate");
    },
    BannedUser(user, data) {
        return axios.post(`${domain}/user/` + user + "/ban", data);
    },
    UnbanUser(user) {
        return axios.post(`${domain}/user/` + user + "/unban");
    },
    ResetUserPassword(user) {
        return axios.put(`${domain}/user/` + user + "/reset");
    },


    // ============== Caterer Part =======================
    GetAllCaterers(page, countPerPage, name) {
        // تم تغيير الرابط والبارامترات لتناسب البحث عن متعهدي التموين
        return axios.get(`${domain}/caterer?page=${page}&count=${countPerPage}&name=${name}`);
    },
    GetCatererById(id) {
        // تم تغيير الرابط لجلب متعهد تموين معين
        return axios.get(`${domain}/caterer/${id}`);
    },
    GetNewCaterer() {
        // تم تغيير الرابط لجلب البيانات اللازمة لإنشاء متعهد جديد (مثل المدن)
        return axios.get(`${domain}/caterer/new`);
    },
    PostNewCaterer(catererData, config) {
        // تم تغيير الرابط لإرسال بيانات متعهد التموين الجديد
        return axios.post(`${domain}/caterer`, catererData, config);
    },
    GetCatererForEdit(id) {
        // تم تغيير الرابط لجلب بيانات متعهد التموين لغرض التعديل
        return axios.get(`${domain}/caterer/${id}/edit`);
    },
    EditCaterer(id, catererData, config) {
        // تم تعديل هذه الدالة لتطابق المسار الذي اتفقنا عليه في الخلفية (POST)
        // هذا هو الأسلوب الصحيح للتعامل مع تحديث البيانات التي تحتوي على ملفات
        return axios.post(`${domain}/caterer/${id}`, catererData, config);
    },
    DeleteCaterer(id) {
        // تم تغيير الرابط لحذف متعهد التموين
        return axios.delete(`${domain}/caterer/${id}`);
    },
    ActiveCaterer(id) {
        // تم تغيير الرابط لتفعيل حساب متعهد التموين
        return axios.put(`${domain}/caterer/${id}/active`);
    },
    DisActiveCaterer(id) {
        // تم تغيير الرابط لإلغاء تفعيل حساب متعهد التموين
        return axios.put(`${domain}/caterer/${id}/disActive`);
    },



    // ============== Product Part =======================
    GetAllProducts(page, countPerPage, name) {
        // جلب قائمة المنتجات مع دعم الترقيم والبحث بالاسم
        return axios.get(`${domain}/product?page=${page}&count=${countPerPage}&name=${name}`);
    },
    GetProductById(id) {
        // جلب منتج معين بواسطة ID
        return axios.get(`${domain}/product/${id}`);
    },
    GetNewProduct() {
        // جلب البيانات اللازمة لإنشاء منتج جديد (مثل قائمة متعهدي التموين)
        return axios.get(`${domain}/product/new`);
    },
    PostNewProduct(productData, config) {
        // إرسال بيانات منتج جديد ليتم تخزينه
        return axios.post(`${domain}/product`, productData, config);
    },
    GetProductForEdit(id) {
        // جلب بيانات منتج معين لغرض التعديل
        return axios.get(`${domain}/product/${id}/edit`);
    },
    EditProduct(id, productData, config) {
        // تحديث بيانات منتج موجود (استخدام POST للتوافق مع رفع الملفات)
        return axios.post(`${domain}/product/${id}`, productData, config);
    },
    DeleteProduct(id) {
        // حذف منتج (حذف ناعم)
        return axios.delete(`${domain}/product/${id}`);
    },
    ActiveProduct(id) {
        // تفعيل منتج
        return axios.put(`${domain}/product/${id}/active`);
    },
    DisActiveProduct(id) {
        // إلغاء تفعيل منتج
        return axios.put(`${domain}/product/${id}/disActive`);
    },



 // ============== Caterer's Product Part (Global) =======================
    GetAllCatererProducts(page, countPerPage, productName, catererName) {
        // جلب قائمة كل منتجات التشاركيات مع دعم البحث
        return axios.get(`${domain}/caterer-product?page=${page}&count=${countPerPage}&product_name=${productName}&caterer_name=${catererName}`);
    },
    GetNewCatererProductData() {
        // جلب البيانات اللازمة لإنشاء علاقة جديدة
        return axios.get(`${domain}/caterer-product/new`);
    },
    PostNewCatererProduct(data) {
        // إضافة علاقة جديدة
        return axios.post(`${domain}/caterer-product`, data);
    },
    GetCatererProductForEdit(id) {
        // جلب بيانات علاقة معينة للتعديل
        return axios.get(`${domain}/caterer-product/${id}/edit`);
    },
    EditCatererProduct(id, data) {
        // تحديث علاقة معينة
        return axios.put(`${domain}/caterer-product/${id}`, data);
    },
    DeleteCatererProduct(id) {
        // حذف علاقة معينة
        return axios.delete(`${domain}/caterer-product/${id}`);
    },



    //End Data Services 

};
