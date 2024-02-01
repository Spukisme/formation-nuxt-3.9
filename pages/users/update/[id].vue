<script setup lang="ts">
  import {userFormDefaultValueConst} from '~/domains/user/userFormDefaultValue.const'
  import FormUser from '~/domains/user/FormUser.vue'
  import {Methods} from '~/constants/httpMethods.const'
  import type {UserInterface} from '~/types/user'

  /** CONFIG **/
  const {id} = useRoute().params

  /** FETCH **/
  const {data: user, pending: userPending} = useFetch<
    UserInterface | Omit<UserInterface, 'id'>
  >(`/api/users/${id}`, {
    default: (): Omit<UserInterface, 'id'> =>
      JSON.parse(JSON.stringify(userFormDefaultValueConst)) satisfies Omit<
        UserInterface,
        'id'
      >,
  })

  const {pending, error, execute} = useFetch(`/api/users/${id}`, {
    method: Methods.PUT,
    immediate: false,
    watch: false,
    body: user,
    onResponse({response}) {
      if (response.ok) {
        useRouter().back()
      }
    },
  })

  /** COMPUTED **/
  const loadingComputed = computed(() => userPending.value || pending.value)

  /** HOOKS **/
  /** Corrige le bug immediate false de useFetch **/
  onBeforeMount(() => {
    pending.value = false
  })
</script>

<template>
  <AppFormLayout
    width="60%"
    title="Utilisateur"
    subtitle="Modification"
    :submit="execute"
    :loading="loadingComputed"
  >
    <FormUser v-model="user" />
  </AppFormLayout>
</template>

<style scoped></style>
