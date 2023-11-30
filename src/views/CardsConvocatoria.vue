<template>
  <div>
    <!-- Menu router -->
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
      <div>
        <p class=" ml-2 mt-1">
          Convocatorias
        </p>
      </div>
    </div>
    <!-- Convocatoria horizontal 1 -->
    <div class="mt-5 mb-9">
      <div class="w-full max-w-sm mt-6 lg:max-w-full lg:flex">
        <!-- <div
            class="flex-none h-48 overflow-hidden text-center bg-cover rounded-t lg:h-auto lg:w-48 lg:rounded-t-none lg:rounded-l"
            style="background-image: url('https://picsum.photos/id/0/192/213')"
            title="Woman holding a mug"
          /> -->
        <div
          class="flex flex-col justify-between p-4 leading-normal bg-white border-b border-l border-r border-gray-200 rounded-b lg:border-l-0 lg:border-t lg:border-gray-200 lg:rounded-b-none lg:rounded-r"
        >
          <div class="p-3">
            <div class="mb-2 text-xl font-bold text-gray-900">
              Nombre de la convocatoria
            </div>
            <p class="text-base text-gray-700">
              Descripción de la convocatoria
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>

            <div class="flex items-center mt-2 ml-8">
              <ul class="list-disc">
                <li><b>Fecha de Inicio:</b>  dd/mm/aa</li>
                <li><b>Fecha limite de postulación de la propuesta:</b>  dd/mm/aa</li>
                <li><b>Periodo de evaluación de las propuestas:</b>  dd/mm/aa al dd/mm/aa</li>
                <li><b>Fecha de publicación de resultados:</b>  dd/mm/aa</li>
              </ul>
            </div>

            <p class="text-base text-gray-700 mt-2">
              Obtenga más información acerca de la postulación de las propuestas y la convocatoria: <a href="/ruta-del-archivo" class="text-blue-500 hover:underline">Descargar Adjuntos</a>
            </p>

            <div class="flex justify-center mt-4">
              <button class="text-white px-6 py-2 rounded-md focus:outline-none focus:shadow-outline" style="background-color: #DD4B39;">
                Postularse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Convocatoria horizontal 2 -->
    <div class="mt-5 mb-9">
      <div class="w-full max-w-sm mt-6 lg:max-w-full lg:flex">
        <!-- <div
            class="flex-none h-48 overflow-hidden text-center bg-cover rounded-t lg:h-auto lg:w-48 lg:rounded-t-none lg:rounded-l"
            style="background-image: url('https://picsum.photos/id/0/192/213')"
            title="Woman holding a mug"
          /> -->
        <div
          class="flex flex-col justify-between p-4 leading-normal bg-white border-b border-l border-r border-gray-200 rounded-b lg:border-l-0 lg:border-t lg:border-gray-200 lg:rounded-b-none lg:rounded-r"
        >
          <div class="p-3">
            <div class="mb-2 text-xl font-bold text-gray-900">
              Nombre de la convocatoria
            </div>
            <p class="text-base text-gray-700">
              Descripción de la convocatoria
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>

            <div class="flex items-center mt-2 ml-8">
              <ul class="list-disc">
                <li><b>Fecha de Inicio:</b>  dd/mm/aa</li>
                <li><b>Fecha limite de postulación de la propuesta:</b>  dd/mm/aa</li>
                <li><b>Periodo de evaluación de las propuestas:</b>  dd/mm/aa al dd/mm/aa</li>
                <li><b>Fecha de publicación de resultados:</b>  dd/mm/aa</li>
              </ul>
            </div>

            <p class="text-base text-gray-700 mt-2">
              Obtenga más información acerca de la postulación de las propuestas y la convocatoria: <a href="/ruta-del-archivo" class="text-blue-500 hover:underline">Descargar Adjuntos</a>
            </p>

            <div class="flex justify-center mt-4">
              <button class="text-white px-6 py-2 rounded-md focus:outline-none focus:shadow-outline" style="background-color: #DD4B39;">
                Postularse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Adicionales -->
  <div class="mt-4 mb-3 grid grid-cols-1 gap-1 sm:grid-cols-2">
    <!-- <h3 class="text-3xl font-semibold text-gray-700">
          Convocatorias
        </h3> -->

    <div class="max-w-sm mx-auto overflow-hidden bg-white rounded shadow-lg">
      <img
        class="w-full"
        src="https://picsum.photos/id/1016/384/234"
        alt="Sunset in the mountains"
      >
      <div class="px-6 py-4">
        <div class="mb-2 text-xl font-bold text-gray-900">
          Título de la convocatoria
        </div>
        <p class="text-base text-gray-700">
          Descripción de la convocatoria
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Voluptatibus quia, nulla! Maiores et perferendis eaque,
          exercitationem praesentium nihil.
        </p>
      </div>
      <!-- <div class="px-6 pt-4 pb-2">
            <span
              class="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full"
            >#photography</span>
            <span
              class="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full"
            >#travel</span>
            <span
              class="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full"
            >#winter</span>
          </div> -->
    </div>
    <div class="max-w-sm mx-auto overflow-hidden bg-white rounded shadow-lg">
      <img
        class="w-full"
        src="https://picsum.photos/id/1016/384/234"
        alt="Sunset in the mountains"
      >
      <div class="px-6 py-4">
        <div class="mb-2 text-xl font-bold text-gray-900">
          The Coldest Sunset
        </div>
        <p class="text-base text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Voluptatibus quia, nulla! Maiores et perferendis eaque,
          exercitationem praesentium nihil.
        </p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span
          class="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full"
        >#photography</span>
        <span
          class="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full"
        >#travel</span>
        <span
          class="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full"
        >#winter</span>
      </div>
    </div>
  </div>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700">
      Card
    </h3>
    <div class="mt-4 mb-3">
      <h4 class="text-gray-700">
        Stacked
      </h4>

      <div class="max-w-sm mt-6 overflow-hidden bg-white rounded shadow-lg">
        <img
          class="w-full"
          src="https://picsum.photos/id/1016/384/234"
          alt="Sunset in the mountains"
        >
        <div class="px-6 py-4">
          <div class="mb-2 text-xl font-bold text-gray-900">
            The Coldest Sunset
          </div>
          <p class="text-base text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span
            class="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full"
          >#photography</span>
          <span
            class="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full"
          >#travel</span>
          <span
            class="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full"
          >#winter</span>
        </div>
      </div>
    </div>
    <hr>
    <div class="mt-5">
      <h4 class="text-gray-700">
        Horizontal
      </h4>
      <div class="w-full max-w-sm mt-6 lg:max-w-full lg:flex">
        <div
          class="flex-none h-48 overflow-hidden text-center bg-cover rounded-t lg:h-auto lg:w-48 lg:rounded-t-none lg:rounded-l"
          style="background-image: url('https://picsum.photos/id/0/192/213')"
          title="Woman holding a mug"
        />
        <div
          class="flex flex-col justify-between p-4 leading-normal bg-white border-b border-l border-r border-gray-200 rounded-b lg:border-l-0 lg:border-t lg:border-gray-200 lg:rounded-b-none lg:rounded-r"
        >
          <div class="mb-8">
            <p class="flex items-center text-sm text-gray-600">
              <svg
                class="w-3 h-3 mr-2 text-gray-500 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"
                />
              </svg>
              Members only
            </p>
            <div class="mb-2 text-xl font-bold text-gray-900">
              Can coffee make you a better developer?
            </div>
            <p class="text-base text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
          <div class="flex items-center">
            <img
              class="w-10 h-10 mr-4 rounded-full"
              src="https://via.placeholder.com/50"
              alt="Avatar of Jonathan Reinink"
            >
            <div class="text-sm">
              <p class="leading-none text-gray-900">
                Jonathan Reinink
              </p>
              <p class="text-gray-600">
                Aug 18
              </p>
            </div>
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
