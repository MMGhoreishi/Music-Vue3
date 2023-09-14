import { defineStore } from 'pinia'
import { auth, usersCollection } from '@/includes/firebase'

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    async register({ name, email, age, password, country, role }) {
      const userCred = await auth.createUserWithEmailAndPassword(email, password)

      await usersCollection.doc(userCred.user.uid).set({ name, email, age, country, role })

      await userCred.user.updateProfile({
        displayName: name
      })

      this.userLoggedIn = true
    },
    async authenticate({ email, password }) {
      await auth.signInWithEmailAndPassword(email, password)

      this.userLoggedIn = true
    },
    async signOut() {
      await auth.signOut()

      this.userLoggedIn = false
    }
  }
})
