<script setup lang="ts">
  import FormCredential from '~/domains/credential/FormCredential.vue'
  import AppFormLayout from '~/components/AppFormLayout.vue'
  import type {CredentialsInterface} from '~/types/credentials'

  enum Methods {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
  }

  const credentials = ref<CredentialsInterface>({
    email: 'dev@test.com',
    password: 'bestPassw0rd',
  })

  const {data, pending, error, execute} = useFetch('/api/login', {
    method: Methods.POST,
    immediate: false,
    watch: false,
    body: credentials,
  })

  /** Corrige le bug immediate false de useFetch **/
  onBeforeMount(() => {
    pending.value = false
  })

  const textError = computed(() => {
    if (error.value?.statusCode === 400) {
      return 'Identifiant ou mot de passe incorrect'
    } else if (error.value) {
      return 'Une erreur est survenue'
    }
  })
</script>

<template>
  <AppFormLayout :submit="execute">
    <FormCredential v-model="credentials" />
    <template #error>
      <VAlert
        v-if="!pending && error"
        class="ma-4"
        type="error"
        :text="textError"
        closable
      />
    </template>
    <template #actions="{valid}">
      <VBtn
        :loading="pending"
        color="warning"
        type="submit"
        size="large"
        variant="flat"
        :block="true"
        :disabled="!valid"
      >
        Se connecter
      </VBtn>
    </template>
  </AppFormLayout>
</template>

<style scoped></style>
