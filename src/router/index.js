import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import Login from "../pages/Login/Login.vue";
import Home from "../pages/Home/Home.vue";
import Profile from "../pages/Profile/Profile.vue";
import Layout from "../pages/Layout/Layout.vue";
import Admins from "../pages/Admins/Admins.vue";
import Admin from "../pages/Admins/Admin/Admin.vue";
import NewAdmin from "../pages/Admins/NewAdmin/NewAdmin.vue";
import Roles from "../pages/Roles/Roles.vue";
import NewRole from "../pages/Roles/NewRole/NewRole.vue";
import Role from "../pages/Roles/Role/Role.vue";
import EditRole from "../pages/Roles/EditRole/EditRole.vue";
import EditAdminRole from "../pages/Admins/EditAdminRole/EditAdminRole.vue";
import Users from '@/pages/Users/Users.vue';
import User from "../pages/Users/User/User.vue";
import NewUser from "../pages/Users/NewUser/NewUser.vue";
import EditUser from "../pages/Users/EditUser/EditUser.vue";

import UserNotifications from "../pages/UserNotifications/UserNotifications.vue";
import UserNotification from "../pages/UserNotifications/UserNotification/UserNotification.vue";
import NewUserNotification from "@/pages/UserNotifications/NewUserNotification/NewUserNotification.vue";

import Cities from "@/pages/Cities/Cities.vue";
import City from '@/pages/Cities/City/City.vue';
import NewCity from '@/pages/Cities/NewCity/NewCity.vue';
import EditCity from '@/pages/Cities/EditCity/EditCity.vue';

import Halls from '@/pages/Halls/Halls.vue';
import Hall from '@/pages/Halls/Hall/Hall.vue';
import NewHall from '@/pages/Halls/NewHall/NewHall.vue';
import EditHall from '@/pages/Halls/EditHall/EditHall.vue';


import Caterers from '@/pages/Caterers/Caterers.vue';
import Caterer from '@/pages/Caterers/Caterer/Caterer.vue';
import NewCaterer from '@/pages/Caterers/NewCaterer/NewCaterer.vue';
import EditCaterer from '@/pages/Caterers/EditCaterer/EditCaterer.vue';



import Products from '@/pages/Products/Products.vue';
import Product from '@/pages/Products/Product/Product.vue';
import NewProduct from '@/pages/Products/NewProduct/NewProduct.vue';
import EditProduct from '@/pages/Products/EditProduct/EditProduct.vue';


import CatererProducts from '@/pages/CatererProducts/CatererProducts.vue';
import NewCatererProduct from '@/pages/CatererProducts/NewCatererProduct/NewCatererProduct.vue';
import EditCatererProduct from '@/pages/CatererProducts/EditCatererProduct/EditCatererProduct.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView
    },
    {
      path: "/login",
      name: 'login',
      component: Login
    },

    {
      path: "/",
      name: "layout",
      component: Layout,
      children: [
        {
          path: "admin",
          component: Home
        },
        {
          path: "admin/profile",
          component: Profile
        },
        {
          path: "admin/admin",
          component: Admins
        },
        {
          path: "admin/admin/new",
          component: NewAdmin
        },
        {
          path: "admin/admin/:id",
          component: Admin
        },
        {
          path: "admin/admin/:id/edit",
          component: EditAdminRole
        },
        {
          path: "admin/role",
          component: Roles
        },
        {
          path: "admin/role/new",
          component: NewRole
        },
        {
          path: "admin/role/:id",
          component: Role
        },
        {
          path: "admin/role/:id/edit",
          component: EditRole
        },


        {
          path: 'admin/user',
          component: Users
        },
        {
          path: "admin/user/new",
          component: NewUser
        },
        {
          path: "admin/user/:id",
          component: User
        },
        {
          path: "admin/user/:id/edit",
          component: EditUser
        },



        {
          path: 'admin/notification',
          component: UserNotifications
        },
        {
          path: "admin/notification/new/:id?",
          component: NewUserNotification
        },
        {
          path: "admin/notification/:id",
          component: UserNotification
        },

        // City CRUD

        {
          path: 'admin/city',
          component: Cities
        },
        {
          path: "admin/city/new",
          component: NewCity
        },
        {
          path: "admin/city/:id/edit",
          component: EditCity
        },
        {
          path: "admin/city/:id",
          component: City
        },


                // Hall CRUD

        {
          path: 'admin/hall',
          component: Halls
        },
        {
          path: "admin/hall/new",
          component: NewHall
        },
        {
          path: "admin/hall/:id/edit",
          component: EditHall
        },
        {
          path: "admin/hall/:id",
          component: Hall
        },


                        // Caterer CRUD
        {
          path: 'admin/caterer',
          component: Caterers
        },

                {
          path: "admin/caterer/new",
          component: NewCaterer
        },
        {
          path: "admin/caterer/:id/edit",
          component: EditCaterer
        },
        {
          path: "admin/caterer/:id",
          component: Caterer
        },



                        // Product CRUD
        {
          path: 'admin/product',
          component: Products
        },

                {
          path: "admin/product/new",
          component: NewProduct
        },
        {
          path: "admin/product/:id/edit",
          component: EditProduct
        },
        {
          path: "admin/product/:id",
          component: Product
        },




                        // Caterer Product CRUD
        {
          path: 'admin/catererproduct',
          component: CatererProducts
        },

                {
          path: "admin/catererproduct/new",
          component: NewCatererProduct
        },
        {
          path: "admin/catererproduct/:id/edit",
          component: EditCatererProduct
        },


      ]
    },
  ]
})

export default router
