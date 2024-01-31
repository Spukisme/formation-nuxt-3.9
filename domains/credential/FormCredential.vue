<script setup lang="ts">
  import type {CredentialsInterface} from '~/types/credentials'
  import {FORM_VALIDATIONS_RULES} from '~/constants/formValidationsRules.const'

  const credentials = ref<CredentialsInterface>({
    email: '',
    password: '',
  })

  const {data, pending, error, execute} = useFetch('/api/login', {
    method: 'POST',
    immediate: false,
    watch: false,
    body: credentials,
    onResponse({response}) {
      if (response.ok) {
        useRouter().push('/users')
      }
    },
  })

  /** Corrige le bug immediate false de useFetch **/
  onBeforeMount(() => {
    pending.value = false
  })

  const valid = ref(false)
  const handleValidate = () => {
    valid.value && execute()
  }
</script>

<template>
  <VCard
    width="40%"
    :loading="pending"
  >
    <VForm
      v-model="valid"
      @keydown.enter.prevent="handleValidate"
      @submit.prevent="handleValidate"
    >
      <VCardTitle>Formation VueJS</VCardTitle>
      <VCardText>
        <VTextField
          v-model="credentials.email"
          :rules="[
            FORM_VALIDATIONS_RULES.required,
            FORM_VALIDATIONS_RULES.email,
          ]"
          label="Identifiant"
        />
        <VTextField
          v-model="credentials.password"
          :rules="[FORM_VALIDATIONS_RULES.required]"
          label="Mot de passe"
          type="password"
        />
      </VCardText>
      <VCardActions class="pa-4">
        <VBtn
          color="warning"
          type="submit"
          size="large"
          variant="flat"
          :block="true"
          >Se connecter</VBtn
        >
      </VCardActions>
    </VForm>
  </VCard>
</template>

<style scoped></style>
