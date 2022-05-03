
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'


import { ref, onUnmounted, computed } from 'vue'

firebase.initializeApp({
  apiKey: "AIzaSyA6RvyoMAr53XWfuQDm63MK76Yu6IsO1Lo",
  authDomain: "vite-chat-31733.firebaseapp.com",
  projectId: "vite-chat-31733",
  storageBucket: "vite-chat-31733.appspot.com",
  messagingSenderId: "529419213983",
  appId: "1:529419213983:web:b09f19ed8d06348abe16aa",
  measurementId: "G-EHCG7FSEM0"
})

const auth = firebase.auth()

export function useAuth() {
  const user = ref(null)
  const unsubscribe = auth.onAuthStateChanged(_user => (user.value = _user))
  onUnmounted(unsubscribe)
  const isLogin = computed(() => user.value !== null)

  const signIn = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    await auth.signInWithPopup(googleProvider)
  }
  const signOut = () => auth.signOut()

  return { user, isLogin, signIn, signOut }
}

const firestore = firebase.firestore()
const messagesCollection = firestore.collection('messages')
const messagesQuery = messagesCollection.orderBy('createdAt', 'desc').limit(100)

export function useChat() {
  const messages = ref([])
  const unsubscribe = messagesQuery.onSnapshot(snapshot => {
    messages.value = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .reverse()
  })
  onUnmounted(unsubscribe)

  const { user, isLogin } = useAuth()
  const sendMessage = text => {
    if (!isLogin.value) return
    const { photoURL, uid, displayName } = user.value
    messagesCollection.add({
      userName: displayName,
      userId: uid,
      userPhotoURL: photoURL,
      text: text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  return { messages, sendMessage }
}