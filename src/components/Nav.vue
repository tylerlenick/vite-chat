<template>
  <nav>
    <div>
      <h1>Vite Chat App</h1>
      <div v-if="isLogin" class="login">
        <button @click="signOut">
          Sign Out
        </button>
      </div>
      <button v-else @click="signIn">
          Sign In
        </button>
    </div>
  </nav>
</template>

<script>
import { useAuth } from '@/firebase'
export default {
  setup() {
    const { user, isLogin, signOut, signIn } = useAuth()
    return { user, isLogin, signOut, signIn }
  }
}
</script>
