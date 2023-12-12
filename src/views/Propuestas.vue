<!-- eslint-disable vue/no-export-in-script-setup -->
<!-- eslint-disable no-console -->
<script>
import axios from 'axios'

export default {
  // components: { CardComponent },
  data() {
    return {
      propuestas: [],
      convocatoria_id: null,
    }
  },
  beforeMount() {
    this.convocatoria_id = this.$route.query.convocatoria_id ?? null
    this.getPropuestas()
  },
  methods: {
    getPropuestas() {
      console.log(this.convocatoria_id)
      // TODO => agarrar el id de usuario a partir del login
      const url = this.convocatoria_id === null
        ? `https://finu-rest-api-dev-aptf.4.us-1.fl0.io/propuestas?usuario_id=${11}`
        : `https://finu-rest-api-dev-aptf.4.us-1.fl0.io/propuestas?convocatoria_id=${this.convocatoria_id}`

      axios.get(url)
        .then((result) => {
          console.log(result.data)
          this.propuestas = result.data
        })
    },
  },
}
</script>

<!-- <script setup lang="ts">
import { useTableData } from '../composables/useTableData'

const {
  simpleTableData,
  paginatedTableData,
  wideTableData,
} = useTableData()
</script> -->

<template>
  <div>
    <div class="flex items-center text-lg">
      <router-link
        class="flex items-center duration-200 hover:text-finu-red"
        to="/dashboard"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home mr-2" width="22" height="22" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
        <!-- <span class="mx-2">Home</span> -->
      </router-link>
      <!-- <div class="flex items-center hover:text-finu-red">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
      <p class="ml-1">
        Home
      </p>
    </div> -->
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="14" height="14" viewBox="0 0 20 18" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
      </div>
      <router-link
        class="mt-1 flex items-center duration-200 hover:text-finu-red"
        to="/convocatorias"
      >
        <span class="mx-2">Convocatoria</span>
      </router-link>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="14" height="14" viewBox="0 0 20 18" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
      </div>
      <div>
        <p class="ml-2 mt-1">
          Propuestas
        </p>
      </div>
    </div>

    <div class="mt-8">
      <div class="flex flex-col">
        <div
          class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          <div
            class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
          >
            <table class="min-w-full">
              <thead>
                <tr>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                  >
                    Nombre
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                  >
                    Descripcion
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                  >
                    Postulante
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                  >
                    Grupo inv.
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                  >
                    Facultad
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                  >
                    Programa
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                  >
                    Estado
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                  >
                    Documentos
                  </th>
                </tr>
              </thead>

              <tbody class="bg-white">
                <tr v-for="(item, index) in propuestas" :key="index">
                  <td
                    class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"
                  >
                    <span class="text-ellipsis max-w-xs">
                      {{ item.nombre.length > 20 ? `${item.nombre.slice(0, 20)}...` : item.nombre }}

                    </span>
                  </td>

                  <td
                    class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"
                  >
                    {{ item.descripcion.length > 20 ? `${item.descripcion.slice(0, 20)}...` : item.descripcion }}
                  </td>

                  <td
                    class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                  >
                    <div class="text-sm leading-5 text-gray-900">
                      {{ `${item.usuario.nombres} ${item.usuario.apellidos}` }}
                    </div>
                    <div class="text-sm leading-5 text-gray-500">
                      {{ `${item.usuario.email}` }}
                    </div>
                  </td>

                  <!-- <td
                    class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                  >
                    <span
                      class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
                    >{{ `${item.usuario.nombres} ${item.usuario.apellidos}` }}</span>
                  </td> -->

                  <td
                    class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"
                  >
                    {{ item.grupos_investigacion.nombre.length > 30 ? `${item.grupos_investigacion.nombre.slice(0, 30)}...` : item.grupos_investigacion.nombre }}
                  </td>

                  <!-- <td
                    class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"
                  /> -->

                  <td
                    class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"
                  >
                    {{ item.facultad.nombre }}
                  </td>

                  <td
                    class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"
                  >
                    {{ item.programa.nombre }}
                  </td>

                  <td
                    class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"
                  >
                    {{ item.estado.nombre }}
                  </td>

                  <td
                    class="px-6 py-4 text-sm font-medium leading-5 text-left border-b border-gray-200 whitespace-nowrap"
                  >
                    <a :href="`https://finu-rest-api-dev-aptf.4.us-1.fl0.io/download?url=${item.url_archivo}`" class="text-indigo-600 hover:text-indigo-900">
                      <span class="ml-1 p-0">Descargar</span>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
