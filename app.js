const { createApp } = Vue

createApp({
  data() {
    return {
      message: 'test'
    }
  },
  computed: {
    makeProblem() {
        return 2+2;
    }

  }
}).mount('#grid-container')