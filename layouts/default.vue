<script setup lang="ts">
  import AppDarkModeBtn from '~/components/AppDarkModeBtn.vue'
  import AppNavigationDrawer from '~/components/AppNavigationDrawer.vue'

  const darkMode = ref<'light' | 'dark'>('dark')
  const {mobile} = useDisplay()
  const drawer = ref(!mobile.value)

  const handleClick = () => {
    drawer.value = !drawer.value
  }
</script>

<template>
  <VApp :theme="darkMode">
    <VLayout class="rounded rounded-md">
      <AppNavigationDrawer v-model="drawer" />
      <VAppBar title="Application bar">
        <template
          #prepend
          v-if="mobile"
        >
          <AppNavigationDrawerBtn @click="handleClick" />
        </template>
        <template #append>
          <AppDarkModeBtn v-model="darkMode" />
        </template>
      </VAppBar>

      <VMain
        class="d-flex align-center justify-center"
        style="min-height: 300px"
      >
        <slot />
      </VMain>
    </VLayout>
  </VApp>
</template>

<style>
  html {
    overflow: auto;
  }
</style>
