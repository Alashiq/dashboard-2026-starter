<template>
  <div
    class="h-20 w-full bg-white mb-8 flex justify-between items-center px-3 layout-shadow"
  >
    <div class="flex justify-end clear-left">
      <div class="flex justify-end clear-left">
        <div
          @click="toggleUserMenu()"
          id="userMenu"
          :class="
            [userMenu ? 'active-header-user' : ' '] +
            ' flex flex-wrap items-center font-normal cairo text-sm text-gray-500   hover:bg-gray-100 cursor-pointer px-2 py-1 rounded-lg'
          "
        >
          <div
            id="userMenu"
            class="border-2 border-blue-400 rounded-full flex items-center justify-center p-1"
          >
            <img
              id="userMenu"
              :src="user.photo"
              class="w-8 h-8 rounded-full object-cover"
              alt="User Avatar"
            />
          </div>
          <div id="userMenu" class="w-2"></div>
          <div id="userMenu">
            {{ t.headerWelcome }}
          </div>
          <div id="userMenu" class="w-1"></div>
          <div id="userMenu" class="font-medium">
            {{ user.first_name }}
          </div>

          <div id="userMenu" class="w-2"></div>
          <div>
            <i id="userMenu" class="fa-solid fa-chevron-down"></i>
          </div>
        </div>
        <div
          v-if="userMenu"
          class="py-1 w-44 bg-white mt-14 rounded absolute text-gray-600 text-sm cairo"
          style="box-shadow: 0 0.25rem 1rem rgb(161 172 184 / 45%)"
        >
          <div class="flex items-center px-4 pt-3 pb-2" id="userMenu">
            <div class="h-10 w-10" id="userMenu">
              <img :src="user.photo" class="rounded-full h-10" id="userMenu" />
              <div
                id="userMenu"
                class="rounded-full h-3 w-3 bg-white shadow-xl animate-ping -mt-3 mr-7 flex items-center justify-center"
              >
                <div
                  class="back-btn h-4 w-4 rounded-full animate-ping"
                  id="userMenu"
                ></div>
              </div>
              <div
                id="userMenu"
                class="rounded-full h-3 w-3 bg-white shadow-xl relative z-10 -mt-3 mr-7 flex items-center justify-center"
              >
                <div id="userMenu" class="back-btn h-2 w-2 rounded-full"></div>
              </div>
            </div>
            <div class="w-2" id="userMenu"></div>
            <div class="" id="userMenu">
              <div
                class="Swissra-Normal text-basea"
                id="userMenu"
                style="color: #697a8d"
              >
                {{ user.first_name }}
              </div>
              <div class="text-gray-400 text-xs" id="userMenu">
                {{ user.role }}
              </div>
            </div>
          </div>

          <div class="w-full bg-gray-200 h-px my-1"></div>

          <router-link to="/admin/profile">
            <div
              class="flex items-center justify-start px-4 my-1 h-10 hover:bg-gray-100 JF-Flat cursor-pointer"
              style="color: #697a8d"
            >
              <i class="fa-solid fa-user-pen"></i>
              <div class="w-2"></div>
              <span>{{ t.editAccount }}</span>
            </div>
          </router-link>

          <div class="w-full bg-gray-200 h-px my-1"></div>
          <div
            @click="logout"
            class="flex items-center justify-start px-4 my-1 h-10 hover:bg-gray-100 JF-Flat cursor-pointer"
            style="color: #697a8d"
          >
            <i class="fa-solid fa-power-off"></i>
            <div class="w-2"></div>
            <span>{{ t.logout }}</span>
          </div>
        </div>
      </div>

      <!-- Notification Box -->
      <div class="text-2xl mx-4 flex items-center justify-center">
        <div class="relative group">
          <div
            class="h-10 w-10 flex items-center justify-center text-gray-600 text-lg cursor-pointer rounded-full hover:bg-gray-100 transition-all duration-300"
          >
            <i class="fa-regular fa-bell"></i>
          </div>
          <span
            class="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5"
            >3</span
          >
        </div>
      </div>
      <!-- End Notifications Box -->
    </div>

    <div class="flex items-center justify-center">
      <div class="h-9 flex items-start justify-end">
        <div
          @click="toggleLanguageMenu()"
          id="languageMenu"
          class="h-10 w-10 border border-gray-200 cursor-pointer rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300"
          >
          <img
            v-if="lang == 'ar'"
            id="languageMenu"
            src="@/assets/ar.png"
                        class="h-6 w-6 rounded-full object-cover"
            alt=""
          />
          <img
            v-else
            id="languageMenu"
            src="@/assets/en.svg"
                        class="h-6 w-6 rounded-full object-cover"
            alt=""
          />
        </div>

        <!-- Language Box -->
        <div
          v-if="languageMenu"
          class="py-1 w-32 bg-white mt-10 rounded absolute text-gray-600 text-sm cairo"
          style="box-shadow: 0 0.25rem 1rem rgb(161 172 184 / 45%)"
        >
          <div
            @click="changeLanguage('ar')"
            class="flex items-center justify-start px-4 my-1 h-10 hover:bg-gray-100 JF-Flat cursor-pointer"
            style="color: #697a8d"
          >
            <img src="@/assets/ar.png" class="h-6 w-6 rounded-full" alt="" />
            <div class="w-2"></div>
            <span>العربية</span>
          </div>

          <div
            @click="changeLanguage('en')"
            class="flex items-center justify-start px-4 my-1 h-10 hover:bg-gray-100 JF-Flat cursor-pointer"
            style="color: #697a8d"
          >
            <img src="@/assets/en.svg" class="h-6 w-6 rounded-full" alt="" />
            <div class="w-2"></div>
            <span>English</span>
          </div>
        </div>
        <!-- End Language Box -->
      </div>
      <div class="w-2"></div>
      <div
        @click="toggleMenu"
        class="h-16 w-16 text-gray-600 flex items-center justify-center text-2xl hover:text-red-400 cursor-pointer md:hidden"
      >
        <i class="fas fa-bars"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data: function () {
    return {};
  },
  methods: {
    toggleMenu() {
      this.$store.commit("toggleMenu");
    },
    toggleUserMenu: function () {
      this.$store.commit("toggleUserMenu", 1);
    },
    toggleLanguageMenu: function () {
      this.$store.commit("toggleLanguageMenu", 1);
    },
    // logout: function () {
    //   /*this.$loading.Start();*/ this.$store.commit("loadingStart");
    //   this.$http
    //     .Logout()
    //     .then((response) => {
    //       /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
    //       this.$router.push("/login");
    //       this.$store.commit("clearUser");
    //       localStorage.removeItem("token");
    //       axios.defaults.headers.common["Authorization"] = null;
    //       this.$alert.Success(response.data.message);
    //     })
    //     .catch((error) => {
    //       /*this.$loading.Stop();*/ this.$store.commit("loadingStop");
    //       this.$alert.BadRequest(error.response.data.message);
    //     });
    // },
    logout: function () {
      this.$store.commit("loadingStart");

      this.$http
        .Logout()
        .then((response) => {
          this.$store.commit("loadingStop");
          this.handleLogout(response.data.message);
        })
        .catch((error) => {
          this.$store.commit("loadingStop");

          if (error.response && error.response.status === 401) {
            // إذا كان 401، نفذ عملية الخروج
            this.handleLogout("انتهت صلاحية الجلسة، يرجى تسجيل الدخول مجددًا");
          } else   if ( error.response.status === 200) {
            this.handleLogout("تم تسجيل الخروج بنجاح");
          } else {
            this.$alert.BadRequest(
              error.response?.data?.message || "حدث خطأ غير متوقع"
            );
          }
        });
    },

    handleLogout: function (message) {
      this.$router.push("/login");
      this.$store.commit("clearUser");
      localStorage.removeItem("token");
      axios.defaults.headers.common["Authorization"] = null;
      this.$alert.Success(message);
    },
    toggleSideList: function (id) {
      this.$store.commit("toggllePageList", id);
    },
    // Change Language
    changeLanguage(language) {
      this.$store.commit("channgeLanguage", language);
    },
  },
  computed: {
    ...mapGetters(["user", "language"]),

    userMenu() {
      return this.$store.state.storeModule.userMenu;
    },
    languageMenu() {
      return this.$store.state.storeModule.languageMenu;
    },
    lang() {
      return this.language;
    },
    t() {
      return this.$lang.Layout[this.language];
    },
  },
};
</script>

<style>
.active-header-user {
  background: rgba(67, 89, 113, 0.04);
}
</style>
