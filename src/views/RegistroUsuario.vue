<!-- eslint-disable no-alert -->
<!-- eslint-disable no-console -->
<script>
import axios from 'axios'

export default {
  data() {
    return {
      usuario: {
        nombres: '',
        apellidos: '',
        telefono: '',
        email: '',
        clave: '',
        codigo: '',
        programa: null,
      },
      listado_programas: [],
      lbl_rol: '',
    }
  },
  beforeMount() {
    this.lbl_rol = this.$route.query.rol === '2' ? 'Docente' : 'Estudiante'
    // get programas
    axios.get('http://localhost:8000/programas')
      .then((result) => {
        this.listado_programas = result.data
      })
  },
  methods: {
    limpiarFormulario() {
      this.usuario = {
        nombres: '',
        apellidos: '',
        telefono: '',
        email: '',
        clave: '',
        codigo: '',
        programa: null,
      }
      this.$router.push({
        name: 'Login',
      })
    },
    register() {
      const formData = new FormData()
      const headers = {
        'Content-Type': 'application/json',
      }

      formData.append('nombres', this.usuario.nombres)
      formData.append('apellidos', this.usuario.apellidos)
      formData.append('telefono', this.usuario.telefono)
      formData.append('email', this.usuario.email)
      formData.append('clave', this.usuario.clave)
      formData.append('rol', this.$route.query.rol)
      formData.append('codigo', this.usuario.codigo)
      formData.append('programa', this.usuario.programa)

      axios.post('http://localhost:8000/registro/usuario', formData, { headers })
        .then((result) => {
          if (result.status === 201) {
            alert('El usuario ha sido creado exitosamente.')
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
    <div class="mt-12 px-12">
      <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
          <h2 class="text-lg font-semibold text-gray-700 capitalize">
            Crear Usuario
          </h2>

          <form @submit.prevent="register">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label class="text-gray-700">Nombre(s)</label>
                <input
                  v-model="usuario.nombres"
                  required
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-finu-red focus:ring focus:ring-opacity-40 focus:ring-finu-red"
                  type="text"
                >
              </div>

              <div>
                <label class="text-gray-700">Apellidos</label>
                <textarea
                  v-model="usuario.apellidos"
                  required
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-finu-red focus:ring focus:ring-opacity-40 focus:ring-finu-red"
                  rows="1"
                />
              </div>

              <div>
                <label class="text-gray-700">Programa</label>
                <select v-model="usuario.programa" required class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-finu-red focus:ring focus:ring-opacity-40 focus:ring-finu-red">
                  <option v-for="(item, index) in listado_programas" :key="index" :value="item.id">
                    {{ item.nombre }}
                  </option>
                </select>
              </div>

              <div>
                <label class="text-gray-700">Codigo</label>
                <input
                  v-model="usuario.codigo"
                  required
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-finu-red focus:ring focus:ring-opacity-40 focus:ring-finu-red"
                  type="text"
                >
              </div>

              <div>
                <label class="text-gray-700">Email</label>
                <input
                  v-model="usuario.email"
                  required
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-finu-red focus:ring focus:ring-opacity-40 focus:ring-finu-red"
                  type="text"
                >
              </div>

              <div>
                <label class="text-gray-700">Telefono</label>
                <input
                  v-model="usuario.telefono"
                  required
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-finu-red focus:ring focus:ring-opacity-40 focus:ring-finu-red"
                  type="text"
                >
              </div>

              <div>
                <label class="text-gray-700">Clave</label>
                <input
                  v-model="usuario.clave"
                  required
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-finu-red focus:ring focus:ring-opacity-40 focus:ring-finu-red"
                  type="password"
                >
              </div>

              <div>
                <label class="text-gray-700">Rol asignado</label>
                <input
                  v-model="lbl_rol"
                  readonly
                  required
                  class="w-full mt-2 border-gray-200 rounded-md focus:outline-none focus:ring-transparent focus:border"
                  type="text"
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
                type="button"
                class="w-28 px-4 py-2 ml-3 text-white rounded-md focus:outline-none focus:bg-gray-700"
                style="background-color: #DD9239;" @click="limpiarFormulario"
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
