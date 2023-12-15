<!-- eslint-disable no-console -->
<!-- <template>
  <h3 class="text-gray-700 text-3xl font-medium">
    Blank Page
  </h3>
</template> -->

<script>
import VueApexCharts from 'vue3-apexcharts'
import axios from 'axios'
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  components: {
    Apexchart: VueApexCharts,
    // Pie,
  },
  data() {
    return {
      totalConvocatorias: 0,
      totalProyectos: 0,
      totalPresupuesto: 0,
      totalDocentes: 0,
      totalEstudiantes: 0,
      totalGruposInv: 0,
      proyectoSeries: [],
      presupuestoSeries: [],
      series: [{
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      }, {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      }, {
        name: 'Free Cash Flow',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      }],
      testUser: {
        name: 'John Doe',
        email: 'john@example.com',
        title: 'Software Engineer',
        title2: 'Web dev',
        status: 'Active',
        role: 'Owner',
      },
      user: [],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '60%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        xaxis: {
          categories: [new Date().getFullYear() - 5, new Date().getFullYear() - 4, new Date().getFullYear() - 3, new Date().getFullYear() - 2, new Date().getFullYear() - 1, new Date().getFullYear()],
        },
        yaxis: {
          title: {
            text: 'Proyectos',
          },
        },
        fill: {
          opacity: 1,
          colors: ['#F44336'],
        },
        tooltip: {
          y: {
            formatter(val) {
              return `${val} proyecto${val > 1 ? 's' : ''}`
            },
          },
        },
      },
      chartPresupuesto: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '60%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        xaxis: {
          categories: [new Date().getFullYear() - 5, new Date().getFullYear() - 4, new Date().getFullYear() - 3, new Date().getFullYear() - 2, new Date().getFullYear() - 1, new Date().getFullYear()],
        },
        yaxis: {
          title: {
            text: 'Presupuesto',
          },
        },
        fill: {
          opacity: 1,
          colors: ['#DAA520'],
        },
        tooltip: {
          y: {
            formatter(val) {
              return `COP $ ${new Intl.NumberFormat('es-CO').format(val)}`
            },
          },
        },
      },
    }
  },
  beforeCreate() {
    axios.get('http://localhost:8000/dashboard/totales')
      .then((result) => {
        const data = result.data
        this.totalConvocatorias = data.convocatorias
        this.totalProyectos = data.proyectos
        this.totalPresupuesto = data.presupuesto
        this.totalDocentes = data.docentes
        this.totalEstudiantes = data.estudiantes
        this.totalGruposInv = data.grupos
      })
  },
  beforeMount() {
    axios.get('http://localhost:8000/dashboard/proyectos-ejecutados')
      .then((result) => {
        const data = result.data
        this.proyectoSeries = [
          { name: 'Cantidad de proyectos por año', data: data.proyectos.map(e => e == null ? 0 : e) },
        ]
        this.presupuestoSeries = [
          { name: 'Presupuesto financiado por año', data: data.presupuesto.map(e => e == null ? 0 : e) },
        ]
      })
  },
}
</script>

<template>
  <div class="mt-4">
    <div class="flex flex-wrap -mx-6">
      <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
        <div
          class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm"
        >
          <div class="p-3 bg-finu-red bg-opacity-75 rounded-full">
            <svg
              class="w-8 h-8 text-white"
              viewBox="0 0 28 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                fill="currentColor"
              />
              <path
                d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                fill="currentColor"
              />
              <path
                d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                fill="currentColor"
              />
              <path
                d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                fill="currentColor"
              />
              <path
                d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                fill="currentColor"
              />
              <path
                d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div class="mx-5">
            <h4 class="text-2xl font-semibold text-gray-700">
              {{ totalConvocatorias }}
            </h4>
            <div class="text-gray-500">
              {{ `Convocatoria${totalConvocatorias !== 1 ? 's' : ''} realizada${totalConvocatorias !== 1 ? 's' : ''} por el FINU` }}
            </div>
          </div>
        </div>
      </div>

      <div class="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
        <div
          class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm"
        >
          <div class="p-3 bg-finu-red bg-opacity-75 rounded-full">
            <svg
              class="w-8 h-8 text-white"
              viewBox="0 0 28 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                fill="currentColor"
              />
              <path
                d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                fill="currentColor"
              />
              <path
                d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                fill="currentColor"
              />
              <path
                d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                fill="currentColor"
              />
              <path
                d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                fill="currentColor"
              />
              <path
                d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div class="mx-5">
            <h4 class="text-2xl font-semibold text-gray-700">
              {{ totalProyectos }}
            </h4>
            <div class="text-gray-500">
              {{ `Proyecto${totalProyectos !== 1 ? 's' : ''} registrado${totalProyectos !== 1 ? 's' : ''} en la plataforma` }}
            </div>
          </div>
        </div>
      </div>

      <div class="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
        <div
          class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm"
        >
          <div class="p-3 bg-finu-red bg-opacity-75 rounded-full">
            <svg
              class="w-8 h-8 text-white"
              viewBox="0 0 28 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                fill="currentColor"
              />
              <path
                d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                fill="currentColor"
              />
              <path
                d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                fill="currentColor"
              />
              <path
                d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                fill="currentColor"
              />
              <path
                d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                fill="currentColor"
              />
              <path
                d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div class="mx-5">
            <h4 class="text-2xl tracking-tight font-semibold text-gray-700">
              COP ${{ new Intl.NumberFormat('es-CO').format(totalPresupuesto) }}
            </h4>
            <div class="text-gray-500">
              Presupuesto total de inversión FINU
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap -mx-6 mt-4">
      <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
        <div
          class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm"
        >
          <div class="p-3 bg-finu-red bg-opacity-75 rounded-full">
            <svg
              class="w-8 h-8 text-white"
              viewBox="0 0 28 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                fill="currentColor"
              />
              <path
                d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                fill="currentColor"
              />
              <path
                d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                fill="currentColor"
              />
              <path
                d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                fill="currentColor"
              />
              <path
                d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                fill="currentColor"
              />
              <path
                d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div class="mx-5">
            <h4 class="text-2xl font-semibold text-gray-700">
              {{ totalDocentes }}
            </h4>
            <div class="text-gray-500">
              {{ `Docente${totalDocentes !== 1 ? 's' : ''} registrado${totalDocentes !== 1 ? 's' : ''} en la plataforma` }}
            </div>
          </div>
        </div>
      </div>

      <div class="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
        <div
          class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm"
        >
          <div class="p-3 bg-finu-red bg-opacity-75 rounded-full">
            <svg
              class="w-8 h-8 text-white"
              viewBox="0 0 28 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                fill="currentColor"
              />
              <path
                d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                fill="currentColor"
              />
              <path
                d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                fill="currentColor"
              />
              <path
                d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                fill="currentColor"
              />
              <path
                d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                fill="currentColor"
              />
              <path
                d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div class="mx-5">
            <h4 class="text-2xl font-semibold text-gray-700">
              {{ totalEstudiantes }}
            </h4>
            <div class="text-gray-500">
              {{ `Estudiante${totalEstudiantes !== 1 ? 's' : ''} registrado${totalEstudiantes !== 1 ? 's' : ''} en la plataforma` }}
            </div>
          </div>
        </div>
      </div>

      <div class="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
        <div
          class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm"
        >
          <div class="p-3 bg-finu-red bg-opacity-75 rounded-full">
            <svg
              class="w-8 h-8 text-white"
              viewBox="0 0 28 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                fill="currentColor"
              />
              <path
                d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                fill="currentColor"
              />
              <path
                d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                fill="currentColor"
              />
              <path
                d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                fill="currentColor"
              />
              <path
                d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                fill="currentColor"
              />
              <path
                d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div class="mx-5">
            <h4 class="text-2xl font-semibold text-gray-700">
              {{ totalGruposInv }}
            </h4>
            <div class="text-gray-500">
              {{ `Grupo${totalGruposInv !== 1 ? 's' : ''} de investigación registrado${totalGruposInv !== 1 ? 's' : ''}` }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col xl:flex-row xl:justify-between">
    <!-- graph 1 -->
    <div class="mt-10 mb-3">
      <h2 class="text-lg font-semibold text-gray-700 uppercase">
        Cantidad de proyectos anuales {{ new Date().getFullYear() - 5 }} - {{ new Date().getFullYear() }}
      </h2>
      <Apexchart type="bar" height="500" class="mt-4" style="width: 700px" :options="chartOptions" :series="proyectoSeries" />
      <h2 class="text-sm font-medium text-gray-700 uppercase italic">
        La cantidad de proyectos registrados en la plataforma entre los años {{ new Date().getFullYear() - 5 }} - {{ new Date().getFullYear() }} es de 123324
      </h2>
      <div class="lg:flex lg:justify-between">
      <!-- #1 chart -->
      <!-- <div class="p-4 bg-zinc-50 border border-slate-300 lg:w-1/2 w-full">
        <h4 class="text-gray-600">
          Dummy text
        </h4>
        <div class="mt-2">
          <Pie
            id="my-chart-id"
            :options="chartOptions"
            :data="chartData"
            :width="400"
            :height="400"
          />
        </div>
      </div> -->

      <!-- #2 chart -->
      <!-- <div class="p-4 bg-zinc-50 border border-slate-300 lg:w-1/2 lg:ml-8 w-full mt-4 lg:mt-0">
        <h4 class="text-gray-600">
          Dummy text
        </h4>
        <div class="mt-2">
          <Pie
            id="my-chart-id"
            :options="chartOptions"
            :data="chartData"
            :width="400"
            :height="400"
          />
        </div>
      </div> -->
      </div>
    </div>

    <!-- graph 2 -->
    <div class="mt-10 mb-3">
      <h2 class="text-lg font-semibold text-gray-700 uppercase">
        Presupuesto financiado por el FINU {{ new Date().getFullYear() - 5 }} - {{ new Date().getFullYear() }}
      </h2>
      <Apexchart type="bar" height="500" class="mt-4" style="width: 700px" :options="chartPresupuesto" :series="presupuestoSeries" />
      <h2 class="text-sm font-medium text-gray-700 uppercase italic">
        El total de presupuesto financiado entre los años {{ new Date().getFullYear() - 5 }} - {{ new Date().getFullYear() }} es de $123.456
      </h2>
      <div class="lg:flex lg:justify-between">
      <!-- #1 chart -->
      <!-- <div class="p-4 bg-zinc-50 border border-slate-300 lg:w-1/2 w-full">
        <h4 class="text-gray-600">
          Dummy text
        </h4>
        <div class="mt-2">
          <Pie
            id="my-chart-id"
            :options="chartOptions"
            :data="chartData"
            :width="400"
            :height="400"
          />
        </div>
      </div> -->

      <!-- #2 chart -->
      <!-- <div class="p-4 bg-zinc-50 border border-slate-300 lg:w-1/2 lg:ml-8 w-full mt-4 lg:mt-0">
        <h4 class="text-gray-600">
          Dummy text
        </h4>
        <div class="mt-2">
          <Pie
            id="my-chart-id"
            :options="chartOptions"
            :data="chartData"
            :width="400"
            :height="400"
          />
        </div>
      </div> -->
      </div>
    </div>
  </div>
</template>
