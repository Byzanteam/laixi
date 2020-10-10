<template>
  <div>
    <p v-show="!show">登录中...</p>
    <p v-show="show">授权成功,请等待页面跳转...</p>
  </div>
</template>

<script>
import api from '@/api/api'
export default {
  data() {
    return {
      show: '',
      code: '',
      token: '',
      path: '',
      url: 'http://localhost:8080/laixi/code',
      // url: 'https://gxzh.cdht.gov.cn/laixi/code',
      client_id: 'dc645fe88b34d01845ba2b4db6c8e2118ff9e52d09c4f0d898532e13b233b0c2',
      client_secret: '7ad944b2da2c8a115b3bdbe571d7faf79424570a1fc132575c5fbd68a6f820a6'
    }
  },
  mounted() {
    this.code = this.$route.query.code
    this.path = sessionStorage.getItem('callback')

    if (!this.code) {
      window.location.href = `https://gxzh.cdht.gov.cn/oauth/authorize?client_id=${this.client_id}&redirect_uri=${this.url}&response_type=code`
    } else {
      this.show = true

      this.$axios({
        method: 'POST',
        url: '/oauth/token',
        headers: { 'Content-Type': 'application/json' },
        params: {
          client_id: this.client_id,
          client_secret: this.client_secret,
          code: this.code,
          grant_type: 'authorization_code',
          redirect_uri: this.url
        }
      }).then((res) => {
        let token = res.data.access_token
        api.getUserAPI(token).then((res) => {
          const data = res.data
          localStorage.setItem('user_id', data.id)
          localStorage.setItem('user_phone', data.phone)
          localStorage.setItem('user_name', data.name)
          localStorage.setItem('user_imgUrl', data.headimgurl)
          this.$router.push({ name: 'my' })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 20px;
}
</style>
