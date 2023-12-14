<!-- <script setup lang="ts">
import { useTableData } from '../composables/useTableData'

const {
  simpleTableData,
  paginatedTableData,
  wideTableData,
} = useTableData()
</script> -->

<script>
import axios from 'axios'

export default {
  // components: { CardComponent },
  data() {
    return {
      usuarios: [],
    }
  },
  beforeMount() {
    this.getUsuarios()
  },
  methods: {
    getUsuarios() {
      const url = 'http://localhost:8000/usuarios'
      axios.get(url)
        .then((result) => {
          this.usuarios = result.data
        })
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
          Usuarios
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
                    Nombre(s)
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                  >
                    Apellido(s)
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                  >
                    Telefono
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                  >
                    Email
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                  >
                    Rol
                  </th>
                </tr>
              </thead>

              <tbody class="bg-white">
                <tr v-if="usuarios.length === 0">
                  <td
                    colspan="100%"
                    class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap text-center"
                  >
                    No se encuentra información registrada en el sistema.
                  </td>
                </tr>
                <tr v-for="(u, index) in usuarios" :key="index">
                  <td
                    class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"
                  >
                    {{ u.nombres }}
                  </td>

                  <td
                    class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"
                  >
                    {{ u.apellidos }}
                  </td>

                  <td
                    class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"
                  >
                    {{ u.telefono }}
                  </td>

                  <td
                    class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"
                  >
                    {{ u.email }}
                  </td>

                  <td
                    class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"
                  >
                    {{ u.rol.nombre.charAt(0).toUpperCase() + u.rol.nombre.slice(1) }}
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
