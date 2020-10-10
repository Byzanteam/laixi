<template>
  <div class="home"></div>
</template>

<script>
import api from '@/api/api'

export default {
  data() {
    return {
      tableID: 1
    }
  },
  mounted() {
    document.title = '莱西联保户'
    api.getFormAPI(this.tableID).then((res) => {
      console.log(res)
    })
  }
}
</script>
