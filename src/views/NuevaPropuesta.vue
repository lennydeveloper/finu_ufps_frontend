<!-- eslint-disable no-alert -->
<!-- eslint-disable no-console -->
<script>
import axios from 'axios'

export default {
  data() {
    return {
      usuario: null,
      documento: null,
      convocatoria_id: null,
      propuesta: {
        nombre: '',
        descripcion: '',
        grupo_inv: null,
        facultad: null,
        programa: null,
      },
      listado_grupos_inv: [],
      listado_facultades: [],
      listado_programas: [],
    }
  },
  beforeMount() {
    this.convocatoria_id = this.$route.query.id
    this.usuario = JSON.parse(localStorage.getItem('user'))
    axios.get('http://localhost:8000/info-propuesta')
      .then((result) => {
        const data = result.data
        this.listado_facultades = data.facultades
        this.listado_grupos_inv = data.grupos_inv
        this.listado_programas = data.programas
      })
    // Promise.all(this.endpoints.map(url => axios.get(url))).then(([{ data: grupos }, { data: facs }, { data: programas }]) => {
    //   this.listado_grupos_inv = grupos
    //   this.listado_facultades = facs
    //   this.listado_programas = programas
    // })
  },
  methods: {
    limpiarFormulario() {
      this.propuesta = {
        nombre: '',
        descripcion: '',
        grupo_inv: null,
        facultad: null,
        programa: null,
      }
      this.documento = null
    },
    cancelarRegistro() {
      this.limpiarFormulario()
      this.$router.push({
        path: '/convocatorias',
      })
    },
    handleFileUpload(event) {
      this.documento = event.target.files[0]
    },
    register() {
      const formData = new FormData()
      const headers = {
        'Content-Type': 'multipart/form-data',
      }

      formData.append('titulo', this.propuesta.nombre)
      formData.append('descripcion', this.propuesta.descripcion)
      formData.append('usuario_id', this.usuario.id)
      formData.append('grupo_inv', this.propuesta.grupo_inv)
      formData.append('facultad', this.propuesta.facultad)
      formData.append('programa', this.propuesta.programa)
      formData.append('convocatoria_id', this.convocatoria_id)
      formData.append('file', this.documento)

      axios.post('http://localhost:8000/registro/propuesta', formData, { headers })
        .then((result) => {
          if (result.status === 201) {
            alert('La propuesta ha sido creada exitosamente.')
            this.limpiarFormulario()
          }
        })
        .catch((err) => {
          alert(err.response.data.detail)
        })
    },
  },
}
</script>

<template>
  <div>
    <div class="mt-4">
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
          <span class="mx-2">Convocatorias</span>
        </router-link>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="14" height="14" viewBox="0 0 20 18" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
        </div>
        <div>
          <p class="ml-2 mt-1">
            Nueva Propuesta
          </p>
        </div>
      </div>

      <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
          <h2 class="text-lg font-semibold text-gray-700 capitalize">
            Crear Propuesta
          </h2>

          <form @submit.prevent="register">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label class="text-gray-700">Nombre</label>
                <input
                  v-model="propuesta.nombre"
                  required
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-finu-red focus:ring focus:ring-opacity-40 focus:ring-finu-red"
                  type="text"
                >
              </div>

              <div>
                <label class="text-gray-700">Descripción</label>
                <textarea
                  v-model="propuesta.descripcion"
                  required
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-finu-red focus:ring focus:ring-opacity-40 focus:ring-finu-red"
                  rows="1"
                />
              </div>

              <div>
                <label class="text-gray-700">Grupo Investigador</label>
                <select v-model="propuesta.grupo_inv" required class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-finu-red focus:ring focus:ring-opacity-40 focus:ring-finu-red">
                  <option v-for="(item, index) in listado_grupos_inv" :key="index" :value="item.id">
                    {{ item.nombre }}
                  </option>
                </select>
              </div>

              <div>
                <label class="text-gray-700">Facultad</label>
                <select v-model="propuesta.facultad" required class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-finu-red focus:ring focus:ring-opacity-40 focus:ring-finu-red">
                  <option v-for="(item, index) in listado_facultades" :key="index" :value="item.id">
                    {{ item.nombre }}
                  </option>
                </select>
              </div>

              <div>
                <label class="text-gray-700">Programa</label>
                <select v-model="propuesta.programa" required class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-finu-red focus:ring focus:ring-opacity-40 focus:ring-finu-red">
                  <option v-for="(item, index) in listado_programas" :key="index" :value="item.id">
                    {{ item.nombre }}
                  </option>
                </select>
              </div>

              <div>
                <label class="text-gray-700">Documentos</label>
                <input
                  required
                  class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none"
                  type="file"
                  @change="handleFileUpload"
                >
              </div>
            </div>

            <div class="flex justify-end mt-4">
              <button
                type="submit"
                class="w-28 px-4 py-2 text-white rounded-md focus:outline-none focus:bg-gray-700" style="background-color: #DD4B39;"
              >
                Crear
              </button>
              <button
                class="w-28 px-4 py-2 ml-3 text-white rounded-md focus:outline-none focus:bg-gray-700"
                style="background-color: #DD9239;" @click="cancelarRegistro"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
