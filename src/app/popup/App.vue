<template>
  <div>
    <div class="main-container">
      <transition name="slide-fade" mode="out-in">
        <component :is="page"></component>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import HelloWorld from '@/app/popup/views/HelloWorld.vue'

const page = ref(null)
const reverse = ref(false)

const translationAmountEnter = computed(() => {
  return reverse.value ? '-100px' : '100px'
})

const translationAmountLeave = computed(() => {
  return reverse.value ? '100px' : '-100px'
})

const pages = {
  'HelloWorld': HelloWorld
}

goToPage({ name: 'HelloWorld' })


// public methods -------------------------------------------------------------


// go to page
function goToPage(toPage) {
  page.value = pages[toPage.name]
  reverse.value = !!toPage.reverse
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(v-bind(translationAmountEnter));
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(v-bind(translationAmountLeave));
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.1s ease;
}
</style>
