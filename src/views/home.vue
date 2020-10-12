<template>
  <div class="home">
    <div class="content">
      <header>
        <h1 class="h1">联保户走访登记</h1>
      </header>
      <aside class="aside">
        <div :key="field.identity_key" v-for="field in formData">
          <div class="input_text" v-if="field.type === 'Field::TextField'">
            <div v-if="field.identity_key === 'location'" class="location">
              <!-- 文本 -->
              <h3>{{ field.title }}</h3>
              <div class="location-button">
                <span>点击定位</span>
                <van-icon name="location"></van-icon>
              </div>
            </div>
            <div v-else>
              <!-- 文本 -->
              <van-field
                required
                error
                :id="field.identity_key"
                :label="field.title"
                autocomplete="off"
                placeholder="请输入"
                type="text"
                v-model="field.value"
              />
            </div>
          </div>
        </div>
      </aside>

      <footer @click="newTable(formData)" class="footer">
        提交
      </footer>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
import total from '@/api/total'

export default {
  data() {
    return {
      tableID: 1,
      fields: [],
      formData: []
    }
  },
  create() {},
  mounted() {
    document.title = '莱西联保户'
    api.getFormAPI(this.tableID).then((res) => {
      console.log(res)
      this.formData = total.ListData(res.data.fields)
    })
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 60vw;
  min-width: 370px;
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
    color: #ee0a24;
    font-size: 28px;
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

    .van-field__control {
      border: none;
      outline: none;
      width: 100%;
      line-height: 26px;
      border-bottom: 1px solid rgba(97, 95, 108, 0.2);
    }

    input::-webkit-input-placeholder {
      color: #d3d3d3;
    }
  }

  .location {
    text-align: left;
    padding: 20px;
    position: relative;

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
      top: 22px;
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
      margin: 0.6rem 0;
      color: #615f6c;
      font-size: 0.7rem;
      cursor: pointer;
      min-width: 8em;
      text-align: center;
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
