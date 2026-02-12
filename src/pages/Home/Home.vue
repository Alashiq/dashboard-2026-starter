<template>
  <div class="w-auto md:p-8 p-4">
    <!-- Cards -->
    <div class="w-full grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 JF-Flat" v-if="loaded == 200">
      <!-- بطاقات الإحصائيات -->
      <div v-for="(item, index) in stats" :key="index" class="h-40 bg-white shadow-3 px-6 rounded-lg flex items-center hover:shadow-lg transition">
        <div :class="['h-16 w-16 rounded-full text-2xl flex items-center justify-center text-white', item.color]">
          <i :class="item.icon"></i>
        </div>
        <div class="mr-8">
          <div class="text-3xl text-gray-700 font-semibold h-20 flex items-center">
            {{ item.value }}
          </div>
          <div class="text-gray-500 flex items-center h-4">
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>

    <!-- الرسوم البيانية -->
    <div class="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-8" v-if="loaded == 200">
      <!-- مخطط الزيارات -->
      <div class="bg-white shadow-3 rounded-lg p-6">
        <h2 class="text-2xl font-semibold cairo text-gray-700 mb-4">مخطط الزيارات</h2>
        <canvas id="visitsChart" class="w-full h-80"></canvas>
      </div>

      <!-- مخطط المبيعات -->
      <div class="bg-white shadow-3 rounded-lg p-6">
        <h2 class="text-2xl font-semibold cairo text-gray-700 mb-4">إحصائيات المبيعات</h2>
        <canvas id="salesChart" class="w-full h-80"></canvas>
      </div>

      <!-- مخطط الفئات -->
      <div class="bg-white shadow-3 rounded-lg p-6">
        <h2 class="text-2xl font-semibold cairo text-gray-700 mb-4">توزيع الفئات</h2>
        <canvas id="categoryChart" class="w-full h-80"></canvas>
      </div>
    </div>

    <!-- حالات أخرى -->
    <Empty-Box v-if="loaded == 204" />
    <Bad-Request v-if="loaded == 400" :reload="reload" :message="errorMessage" />
    <No-Permission v-if="loaded == 403" :message="errorMessage" />
    <No-Internet v-if="loaded == 404" :reload="reload" />
  </div>
</template>

<script>
import EmptyBox from '@/components/EmptyBox/EmptyBox.vue';
import BadRequest from '@/components/BadRequest/BadRequest.vue';
import NoPermission from '@/components/NoPermission/NoPermission.vue';
import NoInternet from '@/components/NoInternet/NoInternet.vue';
import PaginationBar from '@/components/PaginationBar/PaginationBar.vue';
import SinglePageHeader from '@/components/SinglePageHeader/SinglePageHeader.vue';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

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
      mainItem: {},
      loaded: 0,
      stats: [
        { label: 'المستخدمين الجدد اليوم', value: '120', color: 'bg-blue-400', icon: 'fas fa-user-plus' },
        { label: 'إجمالي المستخدمين', value: '2450', color: 'bg-green-400', icon: 'fas fa-users' },
        { label: 'مبيعات اليوم', value: '$1,200', color: 'bg-yellow-400', icon: 'fas fa-dollar-sign' },
        { label: 'طلبات جديدة', value: '85', color: 'bg-purple-500', icon: 'fas fa-shopping-cart' },
        { label: 'مستخدمو Android', value: '1500', color: 'bg-green-600', icon: 'fab fa-android' },
        { label: 'مستخدمو iOS', value: '950', color: 'bg-gray-800', icon: 'fab fa-apple' },
      ],
      sideMenuPage: { main: 2, sub: 0 },
      errorMessage: "حدث خطأ ما"
    };
  },
  methods: {
    reload() {
      this.loadData(1);
    },
    loadData(page) {
      this.pageId = page;
      this.$store.commit("loadingStart");
      this.$http
        .GetHome()
        .then(response => {
          this.$store.commit("loadingStop");
          if (response.status == 200) {
            this.mainItem = response.data.data;
            this.loaded = 200;
            this.$nextTick(() => {
              this.initCharts();
            });
          } else if (response.status == 204) {
            this.loaded = 204;
          } else {
            this.loaded = 400;
          }
        })
        .catch(error => {
          this.$store.commit("loadingStop");
          this.loaded = error.response?.status || 404;
          this.errorMessage = error.response?.data?.message || "حدث خطأ ما";
        });
    },
    initCharts() {
      // Line Chart
      new Chart(document.getElementById('visitsChart'), {
        type: 'line',
        data: {
          labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
          datasets: [{
            label: 'عدد الزيارات',
            data: [500, 800, 750, 900, 1200, 1500],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            fill: true,
            tension: 0.3
          }]
        },
        options: { responsive: true }
      });

      // Bar Chart
      new Chart(document.getElementById('salesChart'), {
        type: 'bar',
        data: {
          labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
          datasets: [{
            label: 'المبيعات بالدولار',
            data: [1200, 1500, 1400, 1800, 2000, 2500],
            backgroundColor: '#f59e0b'
          }]
        },
        options: { responsive: true }
      });

      // Doughnut Chart
      new Chart(document.getElementById('categoryChart'), {
        type: 'doughnut',
        data: {
          labels: ['إلكترونيات', 'ملابس', 'أغذية', 'أخرى'],
          datasets: [{
            data: [40, 25, 20, 15],
            backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
          }]
        },
        options: { responsive: true }
      });
    }
  },
  mounted() {
    this.$store.commit("activePage", this.sideMenuPage);
    this.loadData();
  }
};
</script>
