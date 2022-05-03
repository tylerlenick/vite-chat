<template>
  <Nav />
  <Chat />
</template>

<script>
import Nav from './components/Nav.vue'
import Chat from './components/Chat.vue'

export default {
  name: 'App',
  components: {
    Chat,
    Nav
  }
}
</script>
