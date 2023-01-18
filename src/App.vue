<template>
  <div>
    <div class="val">keks: {{keks}}</div>
    <div class="click" @click="addNum">click</div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

import { defineComponent, ref } from '@/pomposition-api.ts'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup () {
    const keks = ref(0)
    const addNum = () => {
      keks.value += 1
      console.log(keks.value)
    }

    return {
      addNum,
      keks
    }
  }
})
</script>
