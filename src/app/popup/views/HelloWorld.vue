<template>
  <div>
    <h1 v-once>
      {{ i18nService.get('hello_world') }}
    </h1>
  </div>
</template>

<script setup>
import i18nService from '@/app/popup/services/i18n'
import messagingService from '@/app/popup/services/messaging'

messagingService
  .send('hello-world')
  .then(() => {
    console.log('Hello world sent to background!')
  })
</script>
