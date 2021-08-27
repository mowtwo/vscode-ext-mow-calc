const { ref } = Vue
const app = Vue.createApp({
  setup() {
    const name = ref('Mowtwo')
    return {
      name,
    }
  },
})
app.mount('#app')
