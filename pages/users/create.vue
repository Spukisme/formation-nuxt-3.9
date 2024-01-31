<script setup lang="ts">
  import {userFormDefaultValueConst} from '~/domains/user/userFormDefaultValue.const'
  import FormUser from '~/domains/user/FormUser.vue'
  import {Methods} from '~/constants/httpMethods.const'

  const user = ref(JSON.parse(JSON.stringify(userFormDefaultValueConst)))

  const {pending, error, execute} = useFetch('/api/register', {
    method: Methods.POST,
    immediate: false,
    watch: false,
    body: user,
    onResponse({response}) {
      if (response.status === 201) {
        useRouter().back()
      }
    },
  })

  /** Corrige le bug immediate false de useFetch **/
  onBeforeMount(() => {
    pending.value = false
  })
</script>

<template>
  <AppFormLayout
    width="60%"
    title="Utilisateur"
    subtitle="Création"
    :submit="execute"
    :loading="pending"
  >
    <FormUser v-model="user" />
  </AppFormLayout>
</template>

<style scoped></style>
