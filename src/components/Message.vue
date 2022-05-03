<template>
  <div class="message">
    <div v-if="sender">{{ name }}</div>
    <div class="flex" :class="sender ? 'flex-row-reverse' : ''">
      <div class="text w-3/4" :class="sender ? 'bg-green-800' : 'bg-gray-700'">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, default: '' },
    photoUrl: { type: String, default: '' },
    sender: { type: Boolean, default: false }
  }
}
</script>