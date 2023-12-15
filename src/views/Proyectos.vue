<!-- eslint-disable no-console -->
<script>
import axios from 'axios'

export default {
  data() {
    return {
      proyectos: [],
      proyectos_filtrados: [],
      paginatedTableData: null,
      wideTableData: null,
      skip: 0,
      limit: 10,
      size: 0,
      user: null,
    }
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.obtenerProyectos(this.skip, this.limit, this.user.rol.id, this.user.id)
    // axios.get(`http://localhost:8000/proyectos?skip=${this.skip}&limit=${this.limit}&rol_id=${this.user.rol.id}`)
    //   .then((result) => {
    //     this.proyectos = result.data.proyectos
    //     this.size = result.data.total_proyectos
    //   })
  },
  methods: {
    obtenerProyectos(skip, limit, rol_id, usuario_id) {
      axios.get(`http://localhost:8000/proyectos?skip=${skip}&limit=${limit}&rol_id=${rol_id}&usuario_id=${usuario_id}`)
        .then((result) => {
          this.proyectos = result.data.proyectos
          this.size = result.data.total_proyectos
        })
    },
    nextPage() {
      this.skip++
      const offset = this.skip * this.limit
      this.obtenerProyectos(offset, this.limit)
    },
    prevPage() {
      this.skip -= 1
      const offset = this.skip * this.limit
      this.obtenerProyectos(offset, this.limit)
    },
  },
}
</script>

<template>
  <div>
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
          Proyectos
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
                    Investigador
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                  >
                    Facultad
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                  >
                    Grupo inv.
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                  >
                    Año
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                  >
                    Monto financiado
                  </th>
                  <th
                    class="px-6 py-3 bg-gray-100 border-b border-gray-200"
                  />
                </tr>
              </thead>

              <tbody class="bg-white">
                <tr v-if="proyectos.length === 0">
                  <td
                    colspan="100%"
                    class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap text-center"
                  >
                    No se encuentra información registrada en el sistema.
                  </td>
                </tr>
                <tr v-for="(item, index) in proyectos" :key="index">
                  <td
                    class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                  >
                    <div class="text-sm leading-5 text-gray-900">
                      {{ item.proyecto ? item.proyecto.length > 20 ? `${item.proyecto.slice(0, 20)}...` : item.proyecto : '' }}
                    </div>
                  </td>
                  <td
                    class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                  >
                    <div class="text-sm leading-5 text-gray-900">
                      {{ item.investigador }}
                    </div>
                  </td>

                  <td
                    class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"
                  >
                    {{ item.facultad }}
                  </td>

                  <td
                    class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"
                  >
                    {{ item.grupo_investigacion }}
                  </td>

                  <td
                    class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"
                  >
                    {{ item.anio }}
                  </td>

                  <td
                    class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"
                  >
                    {{ item.monto_financiado_finu ?? 0 }}
                  </td>

                  <td
                    class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap"
                  >
                    <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="flex items-center justify-between px-5 py-5 bg-white border-t xs:flex-row xs:justify-between">
              <span class="text-gray-800 text-sm">Mostrando {{ skip * limit + 1 }} - {{ (skip + 1) * limit }} de {{ size }} resultados</span>
              <div class="flex">
                <button
                  v-if="skip !== 0"
                  class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none"
                  @click="prevPage"
                >
                  Anterior
                </button>
                <button
                  v-if="(skip + 1) * limit < size"
                  class="ml-2 px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none"
                  @click="nextPage"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
