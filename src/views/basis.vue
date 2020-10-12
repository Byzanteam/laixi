<template>
  <div class="home">
    <div class="content">
      <header>
        <h1 class="h1">{{ title }}</h1>
      </header>
      <aside class="aside">
        <div :key="field.identity_key" v-for="field in formData">
          <div class="input-text" v-if="field.type === 'Field::TextField'">
            <!-- 文本 -->
            <van-field
              required
              :id="field.identity_key"
              :label="field.title"
              autocomplete="off"
              placeholder="请输入"
              type="text"
              v-model="field.value"
            />
          </div>

          <div class="radio-text" v-else-if="field.type === 'Field::RadioButton'">
            <div v-if="field.identity_key === 'type'">
              <van-field required :label="field.title">
                <template #input>
                  <van-radio-group :id="field.identity_key" direction="horizontal" v-model="field.option_id">
                    <div :key="option.id" v-for="option in field.options">
                      <van-radio :name="option.id" @click="chooseType(option)" checked-color="#00A862">
                        {{ option.value }}
                      </van-radio>
                    </div>
                  </van-radio-group>
                </template>
              </van-field>
            </div>
            <div v-else-if="field.identity_key === 'special'" v-show="specialValue">
              <van-field required :label="field.title">
                <template #input>
                  <van-radio-group :id="field.identity_key" direction="horizontal" v-model="field.option_id">
                    <div :key="option.id" v-for="option in field.options">
                      <van-radio :name="option.id" checked-color="#00A862">
                        {{ option.value }}
                      </van-radio>
                    </div>
                  </van-radio-group>
                </template>
              </van-field>
            </div>
            <div v-else-if="field.identity_key === 'focus'" v-show="focusValue">
              <van-field required :label="field.title">
                <template #input>
                  <van-radio-group :id="field.identity_key" direction="horizontal" v-model="field.option_id">
                    <div :key="option.id" v-for="option in field.options">
                      <van-radio :name="option.id" checked-color="#00A862">
                        {{ option.value }}
                      </van-radio>
                    </div>
                  </van-radio-group>
                </template>
              </van-field>
            </div>
            <div v-else>
              <van-field required :label="field.title">
                <template #input>
                  <van-radio-group :id="field.identity_key" direction="horizontal" v-model="field.option_id">
                    <div :key="option.id" v-for="option in field.options">
                      <van-radio :name="option.id" checked-color="#00A862">{{ option.value }}</van-radio>
                    </div>
                  </van-radio-group>
                </template>
              </van-field>
            </div>
          </div>
          <!-- 级联 -->
          <div class="input_text cascade" v-else-if="field.type === 'Field::CascadedSelect'">
            <p v-if="field.identity_key == 'grid'">
              <van-field
                required
                placeholder="点击选择房号"
                :id="field.identity_key"
                :label="field.title"
                :value="field.cascadeValue"
                @click="showPickerCascadeWorking = true"
                clickable
                readonly
              />
              <van-popup position="bottom" round v-model="showPickerCascadeWorking">
                <van-picker
                  :columns="field.columnsCe"
                  @cancel="showPickerCascadeWorking = false"
                  @confirm="onWorkingConfirm"
                  show-toolbar
                />
              </van-popup>
            </p>
          </div>
        </div>
      </aside>

      <footer @click="submitForm(formData)" class="footer">
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
      title: '',
      tableID: 5,
      formData: [],
      specialValue: false,
      focusValue: false,
      showPickerCascadeWorking: false
    }
  },
  mounted() {
    document.title = '莱西联保户人群'
    api.getFormAPI(this.tableID).then((res) => {
      this.title = res.data.title
      this.formData = total.ListData(res.data.fields)
    })
  },
  methods: {
    // 级联
    onWorkingConfirm(cascadeValue, index) {
      this.formData.forEach((element) => {
        if (element.identity_key === 'grid') {
          let cascade = element.columnsCe[index[0]].children[index[1]].children[index[2]]
          element.choice_id = cascade.id
          element.cascadeValue = cascadeValue.join('-')
          element.value = cascade.text
        }
      })
      this.showPickerCascadeWorking = false
    },
    chooseType(option) {
      if (option.value === '重点人群') {
        this.focusValue = true
        this.specialValue = false
      } else {
        this.focusValue = false
        this.specialValue = true
      }
    },
    submitForm(formData) {
      console.log(formData)
      const userID = 1
      const payload = total.payloadBuildTable(formData, userID)
      api.postFormAPI(this.tableID, payload).then((res) => {
        if (res.status === 201) {
          this.$toast('新建成功 ✨')
        } else {
          this.$toast('新建失败 >_<')
        }
      })
    }
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
    input::-webkit-input-placeholder {
      color: #d3d3d3;
    }

    .input-text {
      .van-field__control {
        border: none;
        outline: none;
        color: #2e2e2e;
        width: 100%;
        line-height: 26px;
        border-bottom: 1px solid rgba(97, 95, 108, 0.2);
      }
    }

    .van-radio {
      height: 1.875rem;
      line-height: 1.875rem;
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
