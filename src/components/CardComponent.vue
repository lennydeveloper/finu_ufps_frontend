<!-- eslint-disable no-console -->
<script>
import { useRouter } from 'vue-router'

export default {
  props: ['nombre', 'descripcion', 'fechaInicio', 'fechaLimite', 'rangoEval', 'fechaPublicacion', 'rutaArchivo', 'idConvocatoria'],
  setup(props) {
    const router = useRouter()
    function verPropuestas() {
      router.push({
        name: 'Propuestas',
        query: {
          convocatoria_id: props.idConvocatoria,
        },
      })
    }

    function postularConvocatoria() {
      router.push({
        path: '/registro-propuesta',
        query: {
          id: props.idConvocatoria,
        },
      })
    }

    function editarConvocatoria() {
      router.push({ path: `/editar-convocatoria/${props.idConvocatoria}` })
    }
    return { postularConvocatoria, verPropuestas, editarConvocatoria }
  },
  data() {
    return {
      user: null,
    }
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem('user'))
  },
  methods: {},
}
</script>

<template>
  <!-- Convocatoria horizontal 1 -->
  <div class="mt-5 mb-9">
    <div class="w-full mt-6 lg:flex">
      <div
        class="flex flex-col justify-between p-4 leading-normal bg-white border-b border-l border-r border-gray-200 rounded-b lg:border-l-0 lg:border-t lg:border-gray-200 lg:rounded-b-none lg:rounded-r"
      >
        <div class="p-3">
          <div class="mb-2 text-xl font-bold text-gray-900">
            {{ nombre }}
          </div>
          <p class="text-base text-gray-700">
            {{ descripcion }}
          </p>

          <div class="flex items-center mt-2 ml-8">
            <ul class="list-disc">
              <li><b>Fecha de Inicio:</b> {{ fechaInicio }}</li>
              <li><b>Fecha limite de postulación de la propuesta:</b> {{ fechaLimite }}</li>
              <li><b>Periodo de evaluación de las propuestas:</b> {{ rangoEval }}</li>
              <li><b>Fecha de publicación de resultados:</b> {{ fechaPublicacion }}</li>
            </ul>
          </div>

          <p class="text-base text-gray-700 mt-2">
            Obtenga más información acerca de la postulación de las propuestas y la convocatoria: <a :href="`http://localhost:8000/download?url=${rutaArchivo}`" class="text-indigo-600 hover:text-indigo-900">Descargar Documentos</a>
          </p>

          <div class="flex justify-center mt-4">
            <button v-if="user.rol.id !== 1" class="mr-2 text-white px-6 py-2 rounded-md focus:outline-none focus:shadow-outline" style="background-color: #DD4B39;" @click="postularConvocatoria()">
              Postularse
            </button>
            <button v-if="user.rol.id === 1" class="text-white px-6 py-2 rounded-md focus:outline-none focus:shadow-outline" style="background-color: #DD4B39;" @click="verPropuestas()">
              Ver Propuestas
            </button>
            <button v-if="user.rol.id === 1" class="ml-2 text-white px-6 py-2 rounded-md focus:outline-none focus:shadow-outline" style="background-color: #DD4B39;" @click="editarConvocatoria()">
              Editar Convocatoria
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
    .card {
    min-height: 450px;
    }
</style>
