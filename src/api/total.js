// 公用方法
export default {
  ListData(fields) {
    let tableList = []
    fields.forEach((field) => {
      let objData = {
        identity_key: '',
        type: '',
        title: '',
        options: '',
        value: '',
        option_id: ''
      }
      switch (field.type) {
        case 'Field::RadioButton': {
          Object.keys(objData).forEach((res) => {
            objData[res] = field[res]
          })
          objData.field_id = field.id

          break
        }
        case 'Field::CheckBox': {
          Object.keys(objData).forEach((res) => {
            objData[res] = field[res]
          })
          objData.field_id = field.id
          objData.option_id = []
          objData.other_option = field.other_option
          break
        }

        case 'Field::CascadedSelect': {
          objData.field_id = field.id
          objData.identity_key = field.identity_key
          objData.type = field.type
          objData.title = field.title
          objData.value = []
          objData.cascadeValue = ''
          objData.columnsCe = this.cascade(field.cascaded_select.choices)
          break
        }
        case 'Field::DateTime': {
          objData.field_id = field.id
          objData.identity_key = field.identity_key
          objData.type = field.type
          objData.title = field.title
          objData.value = ''
          break
        }
        default: {
          Object.keys(objData).forEach((res) => {
            objData[res] = field[res]
          })
          objData.field_id = field.id
        }
      }
      tableList.push(objData)
    })
    return tableList
  },

  // 时间选择器时间格式处理
  formatDate: function(date) {
    return date.getFullYear() + '-' + this.setDate(date.getMonth() + 1) + '-' + this.setDate(date.getDate())
  },
  setDate(date) {
    return date < 10 ? '0' + date : date
  },

  // 获取今天时间
  formatDateTime() {
    let date = new Date()
    let y = date.getFullYear()
    let MM = date.getMonth() + 1
    MM = MM < 10 ? '0' + MM : MM
    let d = date.getDate()
    d = d < 10 ? '0' + d : d
    // let h = date.getHours();
    // h = h < 10 ? "0" + h : h;
    // let m = date.getMinutes();
    // m = m < 10 ? "0" + m : m;
    return y + '-' + MM + '-' + d
  },

  // 时间格式化
  createData(data) {
    for (let i = 0; i < data.length; i++) {
      let firstDataTime = data[i].created_at.slice(0, 10)
      let lastDataTime = data[i].created_at.slice(11, 16)
      data[i].dataTime = firstDataTime + '  ' + lastDataTime
    }
    return data
  },
  // 时间格式化（年-月-日）
  timeFormatting(data, attribute) {
    for (let i = 0; i < data.length; i++) {
      if (data[i][attribute]) {
        data[i][attribute] = data[i][attribute].slice(0, 10)
      }
    }
    return data
  },

  // 级联数据渲染
  cascade(res) {
    let columns = []
    res.forEach((el) => {
      let obj = {}
      if (!el.parent_id) {
        obj.text = el.name
        obj.id = el.id
        columns.push(obj)
      }
    })
    // 二级级联
    this.cascadeChildren(columns, res)
    return columns
  },
  cascadeChildren(columns, res) {
    columns.forEach((columns) => {
      let children = []
      res.forEach((res) => {
        let obj = {}
        if (columns.id === res.parent_id) {
          obj.text = res.name
          obj.id = res.id
          if (obj.text) {
            children.push(obj)
          }
        }
      })
      columns.children = children
      this.cascadeChildrenThird(children, res)
    })
  },
  cascadeChildrenThird(children, res) {
    children.forEach((children) => {
      let childrens = []
      res.forEach((res) => {
        let obj = {}
        if (children.id === res.parent_id) {
          obj.text = res.name
          obj.id = res.id
          if (obj.text) {
            childrens.push(obj)
          }
        }
      })
      children.children = childrens
    })
  },

  // 流水号填充值
  filling(count) {
    let len = count.toString().length
    let fill = ''
    for (let i = len; i < 7; i++) {
      fill = '0' + fill
    }
    return fill + count
  },

  // 修改表单数据（部分优化）
  payloadBuildTable(formData, userID) {
    let payload = { response: { entries_attributes: [] }, user_id: userID }
    let entries = payload.response.entries_attributes
    formData.forEach((element) => {
      switch (element.type) {
        case 'Field::RadioButton': {
          if (element.option_id) {
            if (element.id) {
              entries.push({
                id: element.id,
                value: element.value,
                option_id: element.option_id
              })
            } else {
              entries.push({
                field_id: element.field_id,
                value: element.value,
                option_id: element.option_id
              })
            }
          }
          break
        }
        case 'Field::CascadedSelect': {
          if (element.value) {
            entries.push({
              field_id: element.field_id,
              choice_id: element.choice_id,
              value: element.value
            })
          }
          break
        }
        // 文本+时间类型
        default: {
          if (element.value) {
            if (element.id) {
              entries.push({
                id: element.id,
                field_id: element.field_id,
                value: element.value
              })
            } else {
              entries.push({
                field_id: element.field_id,
                value: element.value
              })
            }
          }
        }
      }
    })
    return payload
  }
}
