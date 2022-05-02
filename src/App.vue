<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <Nav/>
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Nav from './components/Nav.vue'


export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
