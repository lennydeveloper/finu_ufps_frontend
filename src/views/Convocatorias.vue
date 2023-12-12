<!-- eslint-disable vue/no-export-in-script-setup -->
<!-- eslint-disable no-console -->
<script>
import axios from 'axios'
import CardComponent from '../components/CardComponent.vue'

export default {
  components: { CardComponent },
  data() {
    return {
      convocatorias: [],
    }
  },
  beforeCreate() {
    axios.get('https://finu-rest-api-dev-aptf.4.us-1.fl0.io/convocatorias')
      .then((result) => {
        this.convocatorias = result.data
      })
  },
  methods: {
    redirectNuevaConvocatoria() {
      this.$router.push({ path: '/registro-convocatoria' })
    },
  },
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <div class="flex items-center text-lg">
        <router-link
          class="flex items-center duration-200 hover:text-finu-red"
          to="/dashboard"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home mr-2" width="22" height="22" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
        </router-link>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="14" height="14" viewBox="0 0 20 18" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
        </div>
        <div>
          <p class=" ml-2 mt-1">
            Convocatorias
          </p>
        </div>
      </div>
      <div>
        <button class="flex items-center justify-center text-white px-6 py-2 rounded-md focus:outline-none focus:shadow-outline" style="background-color: #DD4B39;" @click="redirectNuevaConvocatoria">
          <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
          <span class="ml-0 p-0">Crear</span>
        </button>
      </div>
    </div>
    <!-- <h3 class="text-3xl font-medium text-gray-700 mt-4">
      Tables
    </h3> -->

    <div class="mt-8">
      <CardComponent
        v-for="(item, index) in convocatorias"
        :key="index"
        :nombre="item.titulo_convocatoria"
        :descripcion="item.descripcion_convocatoria"
        :fecha-inicio="item.fecha_inicio"
        :fecha-limite="item.fecha_limite"
        :rango-eval="`${item.fecha_inicio_evaluacion} ~ ${item.fecha_fin_evaluacion}`"
        :fecha-publicacion="item.fecha_publicacion_resultados"
        :ruta-archivo="item.url_archivo"
        :id-convocatoria="item.id"
      />
    </div>
  </div>
</template>
