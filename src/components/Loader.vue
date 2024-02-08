<template>
  <div v-if="isLoading" class="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
    <div class="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-500"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isLoading = ref(false);
</script>
