<script setup lang="ts">
  import {userFormDefaultValueConst} from '~/domains/user/userFormDefaultValue.const'
  import FormUser from '~/domains/user/FormUser.vue'
  import {Methods} from '~/constants/httpMethods.const'
  import type {UserInterface} from '~/types/user'
  import type {RouteLocation} from 'vue-router'

  definePageMeta({
    validate: (route: RouteLocation) => isRouteValid(route),
  })
  /** CONFIG **/
  const {id, action} = useRoute().params

  const method = action === 'update' ? Methods.PUT : Methods.POST
  const url = action === 'update' ? `/api/users/${id}` : '/api/register'
  const subtitle = action === 'update' ? 'Modification' : 'Création'

  /** FETCH **/
  /**
   * Permet de récupérer les données de l'utilisateur à modifier
   * Ou affecte la valeur par défaut pour une création
   */
  const {data: user, pending: userPending} = useFetch<
    UserInterface | Omit<UserInterface, 'id'>
  >(`/api/users/${id}`, {
    immediate: action === 'update',
    watch: false,
    default: (): Omit<UserInterface, 'id'> =>
      JSON.parse(JSON.stringify(userFormDefaultValueConst)) satisfies Omit<
        UserInterface,
        'id'
      >,
  })

  /**
   * Permet de creer/modifier l'utilisateur
   */
  const {pending, error, execute} = useFetch(url, {
    method,
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
    if (action === 'create') {
      userPending.value = false
    }
  })
</script>

<template>
  <AppFormLayout
    width="60%"
    title="Utilisateur"
    :subtitle="subtitle"
    :submit="execute"
    :loading="loadingComputed"
  >
    <FormUser v-model="user" />
  </AppFormLayout>
</template>

<style scoped></style>
