<script setup lang="ts">
  interface Props {
    submit?: () => void
  }

  const props = defineProps<Props>()

  const valid = ref(false)
  const handleClickCancel = () => {
    useRouter().back()
  }
  const handleSubmit = () => {
    valid.value && props.submit?.()
  }
</script>

<template>
  <VCard width="40%">
    <VForm
      v-model="valid"
      @submit.prevent="handleSubmit"
      @keydown.enter.prevent="handleSubmit"
    >
      <VCardTitle>Formation VueJS</VCardTitle>
      <VCardText>
        <slot />
      </VCardText>
      <VCardActions class="pa-4">
        <slot
          name="actions"
          :valid="valid"
        >
          <VBtn
            color="warning"
            @click="handleClickCancel"
            size="large"
            variant="text"
            text="Annuler"
          />
          <VBtn
            color="warning"
            type="submit"
            size="large"
            variant="flat"
            text="Valider"
          />
        </slot>
      </VCardActions>
    </VForm>
  </VCard>
</template>

<style scoped></style>
