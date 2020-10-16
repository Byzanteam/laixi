<template>
  <div class="home">
    <div class="content">
      <header>
        <h1 class="h1">联保户走访登记</h1>
      </header>
      <aside class="aside">
        <div :key="field.identity_key" v-for="field in formData">
          <div v-if="field.type === 'Field::TextField'">
            <div v-if="field.identity_key === 'VisitMark'">
              <!-- 文本 -->
              <div class="location" v-show="locationShow">
                <h3>{{ field.title }}</h3>
                <div class="location-button" @click="getLocation(formData)">
                  <span>点击定位</span>
                  <van-icon name="location"></van-icon>
                </div>
              </div>
              <van-field
                v-show="!locationShow"
                readonly
                required
                :id="field.identity_key"
                :label="field.title"
                autocomplete="off"
                type="text"
                v-model="field.value"
              />
            </div>
            <div v-else-if="field.identity_key === 'VisitLianName'">
              <van-field
                required
                readonly
                clickable
                :label="field.title"
                :value="field.value"
                placeholder="选择联保户"
                @click="showPicker = true"
              />
              <van-popup v-model="showPicker" round position="bottom">
                <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
              </van-popup>
            </div>
            <div v-else>
              <!-- 文本 -->
              <van-field
                class="input-text"
                required
                :id="field.identity_key"
                :label="field.title"
                autocomplete="off"
                placeholder="请输入"
                type="text"
                v-model="field.value"
              />
            </div>
          </div>
          <div v-if="field.identity_key === 'VisitDocu'">
            <van-field required :label="field.title">
              <template #input>
                <van-uploader v-model="uploader" multiple :after-read="afterRead" />
              </template>
            </van-field>
          </div>
        </div>
      </aside>
      <footer class="footer" @click="submitForm(formData)">
        提交
      </footer>
    </div>
  </div>
</template>
<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=vZ2qzqpvBYXFibWK5oYnUaK52fWMlbwm"></script>
<script>
import api from '@/api/api'
import total from '@/api/total'
export default {
  data() {
    return {
      tableID: 1,
      formData: [],
      uploader: [],
      dataID: '',
      uptoken: '',
      locationShow: true,
      showPicker: false,
      columns: [],
      submitFormStatus: true,
      valueID: ''
    }
  },
  mounted() {
    document.title = '莱西联保户'
    api.getFormAPI(this.tableID).then((res) => {
      this.formData = total.ListData(res.data.fields)
    })
    // 获取党员的联保户
    let name = localStorage.getItem('user_name')
    let data = { sql: `SELECT * FROM sdqdlx_form_1_5 WHERE ("LianMember" ~ '${name}')` }
    api.postSqlJsonAPI(data).then((res) => {
      res.data.forEach((element) => {
        this.columns.push(element.LianName)
      })
    })
  },
  methods: {
    // 提交表单
    submitForm(formData) {
      const userID = localStorage.getItem('user_id')
      const payload = total.payloadBuildTable(formData, userID)
      payload.response.entries_attributes.push({
        field_id: 107,
        value: '走访照片',
        value_id: this.valueID
      })
      if (this.submitFormStatus) {
        this.submitFormStatus = false
        api.postFormAPI(this.tableID, payload).then((res) => {
          if (res.status === 201) {
            this.$toast('新建成功 ✨')
            this.$router.go(0)
          } else {
            this.$toast('新建失败 >_<')
          }
          this.submitFormStatus = true
        })
      }
    },
    getLocation(formData, locationShow) {
      this.$toast.loading({
        message: '定位中...',
        duration: 700,
        forbidClick: true
      })
      this.locationShow = false
      // 创建百度地理位置实例，代替 navigator.geolocation
      var geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(function(e) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          const location = [e.point.lat, e.point.lng]
          api.baiduMapAPI(location).then((res) => {
            formData.forEach((el) => {
              if (el.identity_key === 'VisitMark') {
                el.value = res.data.result.formatted_address
              }
            })
          })
        } else {
          alert('failed' + this.getStatus())
        }
      })
    },
    // 选择联保户
    onConfirm(value) {
      this.formData.forEach((element) => {
        if (element.identity_key === 'VisitLianName') {
          element.value = value
        }
      })
      this.showPicker = false
    },
    // 文件的上传
    afterRead(file) {
      api.getUptokenAPI().then((res) => {
        console.log(res.data)
        // this.uptoken = res.data.uptoken
        this.uptoken =
          'A02msK5084aaUq-gB1MdVJnPnO9g2p9jD87oMMPg:Kxpebq6E6GY0jIitZ1SVyHhkq9U=:eyJzY29wZSI6InlxZnctYXR0YWNobWVudCIsInNhdmVLZXkiOiIxL2NyZWF0ZV9yZXNwb25zZXMvLTE2MDI4MTUxNTgtM2Q5MzNhNjdkNzAyNGNkMDliNjNhY2MyNzVhYjg4NWMtJCh4OmtleSkiLCJjYWxsYmFja1VybCI6Imh0dHA6Ly9seC53ZWIuY2R5b3VlLmNvbS9hdHRhY2htZW50cy5qc29uIiwiY2FsbGJhY2tCb2R5Ijoia2V5PSQoa2V5KVx1MDAyNm5hbWU9JChmbmFtZSlcdTAwMjZzaXplPSQoZnNpemUpXHUwMDI2bWltZV90eXBlPSQobWltZVR5cGUpIiwiZGVhZGxpbmUiOjE2MDI4MTg3NTgsImZzaXplTGltaXQiOjEwNDg1NzYwMCwidXBob3N0cyI6WyJodHRwOi8vdXAucWluaXUuY29tIiwiaHR0cDovL3VwbG9hZC5xaW5pdS5jb20iLCItSCB1cC5xaW5pdS5jb20gaHR0cDovLzE4My4xMzEuNy4zIl0sImdsb2JhbCI6ZmFsc2V9'
        let formData = new FormData()
        // 此时可以自行将文件上传至服务器
        formData.append('file', file.file)
        formData.append('token', this.uptoken)
        formData.append('x:key', '1597796993541')
        let data = formData
        let headers = {
          'content-type': false
        }
        api.postQiNiuApi(data, headers).then((res) => {
          console.log(res)
          if (res.status === 200) {
            this.valueID = res.data.id
          } else {
            this.$toast('网络波动，请再试一次')
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 88vw;
  margin: 0rem auto;
  background: #f6f6f6;
  padding: 1.25rem;

  .h1 {
    font-size: 21px;
    color: #2e2e2e;
    letter-spacing: 1px;
    text-align: left;
  }
}
.aside {
  margin: 0 auto;
  border-radius: 4px;
  padding: 0.8rem 1.2rem;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);

  .table_aside_select {
    width: 60%;
  }
  /deep/ .van-field__label {
    width: 14.5rem;
  }
  .van-cell--required::before {
    left: 0px;
    top: 22px;
    font-size: 28px;
  }

  .input-text {
    /deep/ .van-field__control {
      border: none;
      outline: none;
      width: 100%;
      line-height: 26px;
      border-bottom: 1px solid rgba(97, 95, 108, 0.2);
    }
  }
  /deep/ .van-field {
    flex-direction: column;

    .van-field__label {
      text-align: left;
      font-size: 18px;
      line-height: 2.5rem;
      padding: 0px;
      font-weight: bold;
      color: #2e2e2e;
      width: 18.75rem;
      position: relative;
    }

    input::-webkit-input-placeholder {
      color: #d3d3d3;
    }
  }

  .location {
    text-align: left;
    padding: 10px 16px;
    position: relative;

    .van-icon-location::before {
      position: absolute;
      font-size: 14px;
      top: -12px;
      left: 20px;
    }

    h3 {
      text-align: left;
      font-size: 18px;
      line-height: 2rem;
      margin: 0px;
      font-weight: bold;
      color: #2e2e2e;
    }

    h3::before {
      position: absolute;
      left: 0px;
      top: 15px;
      color: #ee0a24;
      font-size: 28px;
      content: '*';
      font-weight: 400;
    }

    .location-button {
      display: inline-block;
      background-color: rgba(97, 95, 108, 0.2);
      line-height: 1.6rem;
      padding: 0 0.75rem;
      margin: 0.4rem 0;
      color: #615f6c;
      font-size: 0.7rem;
      cursor: pointer;
      min-width: 8em;
      text-align: left;
    }
  }
}

.footer {
  margin-top: 1.25rem;
  border-radius: 2rem;
  padding: 0.8rem 1.2rem;
  color: #fff;
  background-color: #00a862;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}
</style>
