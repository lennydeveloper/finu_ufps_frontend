<!-- eslint-disable no-alert -->
<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vue/no-export-in-script-setup -->
<!-- eslint-disable no-console -->
<script>
import axios from 'axios'

export default {
  data() {
    return {
      propuestas: [],
      propuestas_filtradas: [],
      convocatoria_id: null,
      user: null,
      open: false,
      estados_propuesta: [],
      modal_title: '',
      selected_propuesta: null,
      estado_aprobacion_interna: null,
      observaciones: '',
      filtro_busqueda: '',
      idx_aprobacion_externa: null,
      estado_evaluador_externo: null,
      registro_evaluadores: {
        puntaje: 0,
        estado: null,
        documento: null,
      },
    }
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.convocatoria_id = this.$route.query.convocatoria_id ?? null
    this.getPropuestas()
    this.getEstados()
  },
  methods: {
    getPropuestas() {
      // TODO => agarrar el id de usuario a partir del login
      const url = this.convocatoria_id === null || this.convocatoria_id === undefined
        ? `http://localhost:8000/propuestas?usuario_id=${this.user.id}`
        : `http://localhost:8000/propuestas?convocatoria_id=${this.convocatoria_id}`

      axios.get(url)
        .then((result) => {
          this.propuestas = result.data
          this.propuestas_filtradas = result.data
        })
    },
    getEstados() {
      axios.get('http://localhost:8000/estados')
        .then((result) => {
          this.estados_propuesta = result.data
          this.estado_evaluador_externo = this.estados_propuesta.filter(e => e.nombre.toLowerCase() === 'aprobado')[0].id
          this.registro_evaluadores.estado = this.estado_evaluador_externo
        })
    },
    aprobarPropuesta(propuesta) {
      this.estado_aprobacion_interna = 2
      this.selected_propuesta = propuesta
      this.open = true
      this.modal_title = 'Revisión interna de la propuesta'
    },
    registrarCalificacion(propuesta) {
      this.selected_propuesta = propuesta
      this.open = true
      this.modal_title = 'Calificación de evaluadores externos'
    },
    cancelarAprobacion() {
      this.open = false
      this.observaciones = ''
      this.idx_aprobacion_externa = null
    },
    enviarAprobacion() {
      const formData = new FormData()
      formData.append('propuesta_id', this.selected_propuesta.id)
      formData.append('estado_id', this.estado_aprobacion_interna)
      formData.append('observaciones', this.observaciones)
      this.observaciones = ''
      this.open = false
      const headers = {
        'Content-Type': 'multipart/form-data',
      }
      axios.post('http://localhost:8000/update/estado-propuesta', formData, { headers })
        .then((result) => {
          alert(result.data)
          this.$router.go(0)
        })
        .catch((err) => {
          this.observaciones = ''
          this.open = false
          console.log(err)
        })
    },
    filtrarPropuestas() {
      this.propuestas_filtradas = this.propuestas.filter((item) => {
        return item.nombre.toLowerCase().includes(this.filtro_busqueda.toLowerCase())
                || item.descripcion.toLowerCase().includes(this.filtro_busqueda.toLowerCase())
                || `${item.usuario.nombres} ${item.usuario.apellidos}`.toLowerCase().includes(this.filtro_busqueda.toLowerCase())
                || item.grupos_investigacion.nombre.toLowerCase().includes(this.filtro_busqueda.toLowerCase())
                || item.facultad.nombre.toLowerCase().includes(this.filtro_busqueda.toLowerCase())
                || item.programa.nombre.toLowerCase().includes(this.filtro_busqueda.toLowerCase())
                || item.estado.nombre.toLowerCase().includes(this.filtro_busqueda.toLowerCase())
      })
    },
    actualizarEstadoPropuesta(event, id) {
      this.modal_title = 'Confirmación de estado'
      this.idx_aprobacion_externa = {
        estado_id: event.target.value,
        propuesta_id: id,
      }
      this.open = true
    },
    // este metodo captura los estados de la propuesta manuales como cancelado y pendiente de aprobacion
    actualizarEstadoInterno() {
      const formData = new FormData()
      const headers = {
        'Content-Type': 'multipart/form-data',
      }
      formData.append('propuesta_id', this.idx_aprobacion_externa.propuesta_id)
      formData.append('estado_id', this.idx_aprobacion_externa.estado_id)
      this.open = false
      axios.post('http://localhost:8000/update/estado-propuesta', formData, { headers })
        .then((result) => {
          this.cancelarAprobacion()
          alert(result.data)
          this.$router.go(0)
        })
    },
    handleFileUpload(event) {
      this.registro_evaluadores.documento = event.target.files[0]
    },
    cargarPuntajeExterno() {
      const formData = new FormData()
      const headers = {
        'Content-Type': 'multipart/form-data',
      }
      formData.append('estado_id', this.registro_evaluadores.estado)
      formData.append('propuesta_id', this.selected_propuesta.id)
      formData.append('puntaje', this.registro_evaluadores.puntaje)
      formData.append('file', this.registro_evaluadores.documento)
      this.cancelarExterno()
      axios.post('http://localhost:8000/update/calificacion-propuesta', formData, { headers })
        .then((result) => {
          alert(result.data)
          this.$router.go(0)
        })
        .catch((err) => {
          alert(err.response.data)
          this.router.go(0)
        })
    },
    cancelarExterno() {
      this.registro_evaluadores = {
        puntaje: 0,
        estado: null,
        documento: null,
      }
      this.open = false
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

    <div class="flex justify-end">
      <input v-model="filtro_busqueda" type="text" placeholder="Filtro de busqueda ..." class="rounded-md">
      <button type="button" class="ml-2 px-4 py-2 bg-finu-red text-white rounded-md" @click="filtrarPropuestas">
        Filtrar
      </button>
    </div>

    <div
      :class="`modal ${
        !open && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div
        class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
        @click="open = false"
      />

      <div
        class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal -->
        <div class="px-6 py-4 text-left modal-content">
          <!-- Title -->
          <div class="flex items-center justify-between pb-3">
            <p class="text-2xl font-bold">
              {{ modal_title }}
            </p>
            <div class="z-50 cursor-pointer modal-close" @click="open = false">
              <svg
                class="text-black fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                />
              </svg>
            </div>
          </div>

          <!-- Body -->
          <div v-if="idx_aprobacion_externa == null && modal_title !== 'Calificación de evaluadores externos'">
            {{ idx_aprobacion_externa }}
            <div>
              <label>Estado de la propuesta</label>
              <select
                v-model="estado_aprobacion_interna"
                class="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l appearance-none focus:outline-none focus:bg-white"
              >
                <option selected value="2">
                  Correcciones
                </option>
                <option value="3">
                  En revisión
                </option>
              </select>
            </div>

            <div v-if="estado_aprobacion_interna == 2" class="mt-4">
              <label class="text-gray-700" for="titulo">Observaciones</label>
              <input
                v-model="observaciones"
                class="w-full mt-2 border-gray-200 rounded-md focus:border-finu-red focus:ring focus:ring-opacity-40 focus:ring-finu-red"
                type="text"
              >
            </div>
          </div>

          <div v-if="idx_aprobacion_externa != null && modal_title !== 'Calificación de evaluadores externos'">
            <label>{{ `Esta accion cambiara el estado de la propuesta a ${estados_propuesta.filter((item) => item.id == idx_aprobacion_externa.estado_id)[0].nombre}. Desea continuar?` }}</label>
          </div>

          <div v-if="modal_title === 'Calificación de evaluadores externos'">
            <div>
              <label class="text-gray-700">Puntaje</label>
              <input
                v-model="registro_evaluadores.puntaje"
                class="w-full mt-2 border-gray-200 rounded-md focus:border-finu-red focus:ring focus:ring-opacity-40 focus:ring-finu-red"
                rows="1"
              >
            </div>

            <div class="mt-4">
              <label class="text-gray-700">Estado</label>
              <select v-model="registro_evaluadores.estado" required class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-finu-red focus:ring focus:ring-opacity-40 focus:ring-finu-red">
                <option v-for="(item, index) in estados_propuesta" v-show="item.id === 5 || item.id === 6" :key="index" :value="item.id">
                  {{ item.nombre }}
                </option>
              </select>
            </div>

            <div class="mt-4">
              <label class="text-gray-700">Documento</label>
              <input
                required
                class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none"
                type="file"
                @change="handleFileUpload"
              >
            </div>
          </div>

          <!-- Footer -->
          <div v-if="idx_aprobacion_externa == null && modal_title !== 'Calificación de evaluadores externos'" class="flex justify-end mt-4">
            <button
              type="button"
              class="w-28 px-4 py-2 text-white rounded-md bg-finu-red focus:outline-none focus:bg-gray-700"
              @click="enviarAprobacion()"
            >
              Enviar
            </button>
            <button
              class="p-3 px-6 py-3 ml-2 text-finu-red bg-transparent rounded-lg focus:outline-none"
              @click="cancelarAprobacion()"
            >
              Cancelar
            </button>
          </div>

          <div v-if="idx_aprobacion_externa != null && modal_title !== 'Calificación de evaluadores externos'" class="flex justify-end mt-4">
            <button
              type="button"
              class="w-28 px-4 py-2 text-white rounded-md bg-finu-red focus:outline-none focus:bg-gray-700"
              @click="actualizarEstadoInterno"
            >
              Aceptar
            </button>
            <button
              class="p-3 px-6 py-3 ml-2 text-finu-red bg-transparent rounded-lg focus:outline-none"
              @click="cancelarAprobacion"
            >
              Cancelar
            </button>
          </div>

          <div v-if="modal_title === 'Calificación de evaluadores externos'" class="flex justify-end mt-4">
            <button
              type="button"
              class="w-28 px-4 py-2 text-white rounded-md bg-finu-red focus:outline-none focus:bg-gray-700"
              @click="cargarPuntajeExterno"
            >
              Enviar
            </button>
            <button
              class="p-3 px-6 py-3 ml-2 text-finu-red bg-transparent rounded-lg focus:outline-none"
              @click="cancelarExterno"
            >
              Cancelar
            </button>
          </div>
        </div>
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
                  <th
                    v-show="user.rol.id === 1"
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody class="bg-white">
                <tr v-if="propuestas_filtradas.length === 0">
                  <td
                    colspan="100%"
                    class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap text-center"
                  >
                    No se encuentra información registrada en el sistema.
                  </td>
                </tr>
                <tr v-for="(item, index) in propuestas_filtradas" :key="index">
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
                    <a :href="`http://localhost:8000/download?url=${item.url_archivo_propuesta}`" class="text-indigo-600 hover:text-indigo-900">
                      <span class="ml-1 p-0">Descargar</span>
                    </a>
                  </td>
                  <td v-show="user.rol.id === 1">
                    <div class="max-w-full px-2 flex flex-col gap-1">
                      <select
                        v-show="item.estado.id === 3"
                        class="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l appearance-none focus:outline-none focus:bg-white"
                        @change="actualizarEstadoPropuesta($event, item.id)"
                      >
                        <option
                          v-for="el in estados_propuesta"
                          v-show="el.id === 4 || el.id === 7"
                          :key="el.id"
                          :value="el.id"
                          :selected="item.estado.id === el.id"
                        >
                          {{ el.nombre }}
                        </option>
                      </select>
                      <a v-show="item.estado.id === 1" class="text-indigo-600 text-base hover:text-indigo-900 hover:cursor-pointer" @click="aprobarPropuesta(item)">
                        <span class="ml-1 p-0">Aprobar propuesta</span>
                      </a>
                      <a v-show="item.estado.id === 4" class="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer" @click="registrarCalificacion(item)">
                        <span class="ml-1 p-0">Registrar calificacion</span>
                      </a>
                    </div>
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

<style>
.modal {
  transition: opacity 0.25s ease;
}
</style>
