<!-- eslint-disable no-console -->
<script>
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'

export default {
  components: {
    Sidebar,
    // eslint-disable-next-line vue/no-reserved-component-names
    Header,
  },
}
</script>

<template>
  <div class="flex h-screen bg-gray-200 font-roboto">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container mx-auto px-4 py-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
