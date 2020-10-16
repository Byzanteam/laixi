<template>
  <div>
    <p v-show="!show">第一次进入需要授权，请等待...</p>
    <p v-show="show">✨授权成功,跳转中...</p>
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
      // url: 'http://localhost:8080/laixi/code',
      url: 'http://lx.web.cdyoue.com/laixi/code',
      client_id: 'dc645fe88b34d01845ba2b4db6c8e2118ff9e52d09c4f0d898532e13b233b0c2',
      client_secret: '7ad944b2da2c8a115b3bdbe571d7faf79424570a1fc132575c5fbd68a6f820a6'
    }
  },
  mounted() {
    this.code = this.$route.query.code
    this.path = JSON.parse(sessionStorage.getItem('callback'))

    if (!this.code) {
      window.location.href = `http://lx.web.cdyoue.com/oauth/authorize?client_id=${this.client_id}&redirect_uri=${this.url}&response_type=code`
    } else {
      this.show = true
      let params = {
        client_id: this.client_id,
        client_secret: this.client_secret,
        code: this.code,
        grant_type: 'authorization_code',
        redirect_uri: this.url
      }
      api.postOauthTokenAPI(params).then((res) => {
        let token = res.data.access_token
        api.getUserAPI(token).then((res) => {
          const data = res.data
          localStorage.setItem('user_id', data.id)
          localStorage.setItem('user_phone', data.phone)
          localStorage.setItem('user_name', data.name)
          this.$router.push({ name: this.path })
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
p {
  margin: 20px;
}
</style>
