// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { onUnmounted } from "vue";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6RvyoMAr53XWfuQDm63MK76Yu6IsO1Lo",
  authDomain: "vite-chat-31733.firebaseapp.com",
  projectId: "vite-chat-31733",
  storageBucket: "vite-chat-31733.appspot.com",
  messagingSenderId: "529419213983",
  appId: "1:529419213983:web:b09f19ed8d06348abe16aa",
  measurementId: "G-EHCG7FSEM0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Auth
const auth = firebase.auth();

export function useAuth(){
    const user = ref(null)
    const unsubscribe = auth.onAuthStateChange(_user => (user.value = _user))
    onUnmounted(unsubscribe)
    const isLogin = computed(() => user.value !== null)

    const signIn = async() => {
      const googleProvider = new firebase.auth.GoogleAuthProvider()
      await auth.signInWithPopup(googleProvider)
    }

    const signOut = () => auth.signOut()

    return { user, isLogin, signIn, signOut }
}

const firestore = firebase.firestore()
const messageCollection = firestore.collection('messages')
const messagesQuery = messageCollection.orderBy('created_at', 'desc').limit(100)

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
    messageCollection.add({
      userName: displayName,
      userId: uid,
      userPhotoURL: photoURL,
      text: text,
      createdAt: firebase.firestoreFieldValue.serverTimestamp()
    })
  }

  return { messages, sendMessage }
}