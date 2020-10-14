// 公用方法
export default {
  // * 校验手机号
  // * @param {String} str 待验证的手机号
  // * @return {Boolean} 正确返回true，否则返回false
  isValidphone(str) {
    var reg = /^1[3-9]\d{9}$/
    return reg.test(str)
  },
  // * 校验身份证号(15位和18位)
  // * @param {String} str 待验证的身份证号
  // * @return {Boolean} 正确返回true，否则返回false
  isValidIDCard(idCard) {
    // 15位和18位身份证号码的正则表达式
    var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/

    // 如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(idCard)) {
      if (idCard.length == 18) {
        var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2) // 将前17位加权因子保存在数组里
        var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2) // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
        var idCardWiSum = 0 // 用来保存前17位各自乖以加权因子后的总和
        for (var i = 0; i < 17; i++) {
          idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i]
        }
        var idCardMod = idCardWiSum % 11 // 计算出校验码所在数组的位置
        var idCardLast = idCard.substring(17) // 得到最后一位身份证号码
        // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
        if (idCardMod == 2) {
          if (idCardLast == 'X' || idCardLast == 'x') {
            //alert("恭喜通过验证啦！");
            return true
          } else {
            //alert("身份证号码错误！");
            return false
          }
        } else {
          // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
          if (idCardLast == idCardY[idCardMod]) {
            //alert("恭喜通过验证啦！");
            return true
          } else {
            //alert("身份证号码错误！");
            return false
          }
        }
      } else {
        return true
      }
    } else {
      //alert("身份证格式不正确!");
      return false
    }
  },
  // 表单对象
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
