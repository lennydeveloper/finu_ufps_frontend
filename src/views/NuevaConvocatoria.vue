<!-- eslint-disable no-alert -->
<!-- eslint-disable no-console -->
<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

interface Convocatoria {
  titulo: string
  descripcion: string
  fecha_inicio: string
  fecha_limite: string
  fecha_inicio_evaluacion: string
  fecha_fin_evaluacion: string
  fecha_publicacion_resultados: string
  tipo_convocatoria: string
}

const selectedFile = ref(null)

function handleFileUpload(event) {
  selectedFile.value = event.target.files[0]
  // eslint-disable-next-line no-console
  console.log(selectedFile.value)
}

const convocatoria = ref<Convocatoria>({
  titulo: '',
  descripcion: '',
  fecha_inicio: formatDate(new Date()),
  fecha_limite: formatDate(new Date()),
  fecha_inicio_evaluacion: formatDate(new Date()),
  fecha_fin_evaluacion: formatDate(new Date()),
  fecha_publicacion_resultados: formatDate(new Date()),
  tipo_convocatoria: 'semillero',
})

// ✅ Defining a reusable function
function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0')
}

// 👇️ format as "YYYY-MM-DD hh:mm:ss"
// You can tweak the format easily
function formatDate(date: Date) {
  return (
    `${[date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-')}`
  )
}

function register() {
  if (selectedFile.value === null)
    alert('Debe cargar un archivo para continuar con el registro de la convocatoria')

  const headers = {
    'Content-Type': 'multipart/form-data',
  }

  const data: Convocatoria = JSON.parse(JSON.stringify(convocatoria.value))
  const formData = new FormData()
  formData.append('titulo', data.titulo)
  formData.append('descripcion', data.descripcion)
  formData.append('fecha_inicio', data.fecha_inicio)
  formData.append('fecha_limite', data.fecha_limite)
  formData.append('fecha_inicio_evaluacion', data.fecha_inicio_evaluacion)
  formData.append('fecha_fin_evaluacion', data.fecha_fin_evaluacion)
  formData.append('fecha_publicacion_resultados', data.fecha_publicacion_resultados)
  formData.append('tipo_convocatoria', data.tipo_convocatoria)
  formData.append('file', selectedFile.value ?? '')

  axios.post('http://localhost:8000/registro/convocatoria', formData, { headers })
    .then((result) => {
      if (result.status === 201) {
        alert('La convocatoria ha sido creada exitosamente.')
        convocatoria.value = {
          titulo: '',
          descripcion: '',
          fecha_inicio: formatDate(new Date()),
          fecha_limite: formatDate(new Date()),
          fecha_inicio_evaluacion: formatDate(new Date()),
          fecha_fin_evaluacion: formatDate(new Date()),
          fecha_publicacion_resultados: formatDate(new Date()),
          tipo_convocatoria: 'semillero',
        }
      }
    })
    .catch((err) => {
      alert(err.response.data)
    })
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
          <span class="mx-2">Convocatorias</span>
        </router-link>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="14" height="14" viewBox="0 0 20 18" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
        </div>
        <div>
          <p class="ml-2 mt-1">
            Nueva Convocatoria
          </p>
        </div>
      </div>

      <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
          <h2 class="text-lg font-semibold text-gray-700 capitalize">
            Crear Convocatoria
          </h2>

          <form @submit.prevent="register">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label class="text-gray-700" for="titulo">Título</label>
                <input
                  v-model="convocatoria.titulo"
                  required
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-finu-red focus:ring focus:ring-opacity-40 focus:ring-finu-red"
                  type="text"
                >
              </div>

              <div>
                <label class="text-gray-700" for="description">Descripción</label>
                <textarea
                  v-model="convocatoria.descripcion"
                  required
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-finu-red focus:ring focus:ring-opacity-40 focus:ring-finu-red"
                  rows="1"
                />
              </div>

              <div>
                <label class="text-gray-700" for="username">Fecha de inicio</label>
                <input
                  v-model="convocatoria.fecha_inicio"
                  required
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-finu-red focus:ring focus:ring-opacity-40 focus:ring-finu-red"
                  type="date"
                >
              </div>

              <div>
                <label class="text-gray-700" for="username">Fecha límite de inscripción</label>
                <input
                  v-model="convocatoria.fecha_limite"
                  required
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-finu-red focus:ring focus:ring-opacity-40 focus:ring-finu-red"
                  type="date"
                >
              </div>

              <div>
                <label class="text-gray-700" for="username">Fecha inicio de evaluación</label>
                <input
                  v-model="convocatoria.fecha_inicio_evaluacion"
                  required
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-finu-red focus:ring focus:ring-opacity-40 focus:ring-finu-red"
                  type="date"
                >
              </div>

              <div>
                <label class="text-gray-700" for="username">Fecha fin de evaluación</label>
                <input
                  v-model="convocatoria.fecha_fin_evaluacion"
                  required
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-finu-red focus:ring focus:ring-opacity-40 focus:ring-finu-red"
                  type="date"
                >
              </div>

              <div>
                <label class="text-gray-700" for="username">Fecha publicación de resultados</label>
                <input
                  v-model="convocatoria.fecha_publicacion_resultados"
                  required
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-finu-red focus:ring focus:ring-opacity-40 focus:ring-finu-red"
                  type="date"
                >
              </div>

              <div>
                <label class="text-gray-700" for="emailAddress">Adjuntos</label>
                <input
                  required
                  class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none"
                  type="file"
                  @change="handleFileUpload"
                >
              </div>

              <div>
                <label class="text-gray-700" for="username">Tipo de convocatoria</label>
                <select v-model="convocatoria.tipo_convocatoria" required class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-finu-red focus:ring focus:ring-opacity-40 focus:ring-finu-red">
                  <option value="semillero" selected>
                    Semillero (estudiantes)
                  </option>
                  <option value="grupo">
                    Grupo (estudiantes y docentes)
                  </option>
                </select>
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
                class="w-28 px-4 py-2 ml-3 text-white rounded-md focus:outline-none focus:bg-gray-700" style="background-color: #DD9239;"
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
