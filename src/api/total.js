// 公用方法
export default {
  // 流程数据处理
  flowListData(fields) {
    let tableList = []
    fields.forEach((field) => {
      let objData = {
        identity_key: '',
        type: '',
        title: '',
        field_id: ''
      }
      if (field.type === 'Field::Detail') {
        Object.keys(objData).forEach((res) => {
          if (res === 'field_id') {
            objData[res] = field.id
          } else {
            objData[res] = field[res]
          }
        })
        objData.button_name = field.settings.button_name || '明细'
        objData.children = []
        objData.parent = []
        // 明细字段内部构建
        field.children.forEach((field) => {
          let objDataChildren = {
            identity_key: '',
            type: '',
            title: '',
            field_id: ''
          }
          switch (field.type) {
            case 'Field::RadioButton': {
              Object.keys(objDataChildren).forEach((res) => {
                if (res === 'field_id') {
                  objDataChildren[res] = field.id
                } else {
                  objDataChildren[res] = field[res]
                }
              })
              objDataChildren.option_id = ''
              objDataChildren.options = field.options
              break
            }
            case 'Field::DateTime': {
              Object.keys(objDataChildren).forEach((res) => {
                if (res === 'field_id') {
                  objDataChildren[res] = field.id
                } else {
                  objDataChildren[res] = field[res]
                }
              })
              objDataChildren.value = ''
              break
            }
            default: {
              Object.keys(objDataChildren).forEach((res) => {
                if (res === 'field_id') {
                  objDataChildren[res] = field.id
                } else {
                  objDataChildren[res] = field[res]
                }
              })
              objDataChildren.value = ''
            }
          }
          objData.children.push(objDataChildren)
        })
        let child = JSON.parse(JSON.stringify(objData.children))
        child.forEach((element) => {
          element.group_id = new Date().getTime()
        })
        objData.parent.push(child)
      } else {
        switch (field.type) {
          case 'Field::RadioButton': {
            objData.field_id = field.id
            objData.identity_key = field.identity_key
            objData.type = field.type
            objData.title = field.title
            objData.option_id = ''
            objData.options = field.options
            break
          }
          case 'Field::CheckBox': {
            objData.field_id = field.id
            objData.identity_key = field.identity_key
            objData.type = field.type
            objData.title = field.title
            objData.option_id = []
            objData.value = ''
            objData.other_option = field.other_option
            objData.options = field.options
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
            objData.field_id = field.id
            objData.identity_key = field.identity_key
            objData.type = field.type
            objData.title = field.title
            objData.value = ''
          }
        }
      }
      switch (field.identity_key) {
        // 换房 or 票据打印级联
        case 'new_room_number': {
          objData.field_id = field.id
          objData.identity_key = field.identity_key
          objData.type = field.type
          objData.title = field.title
          objData.value = []
          objData.columnsCe = this.cascade(field.cascaded_select.choices)
          break
        }
        default: {
          objData.field_id = field.id
          objData.identity_key = field.identity_key
          objData.type = field.type
          objData.title = field.title
          objData.value = ''
        }
      }
      tableList.push(objData)
    })

    return tableList
  },
  ListData(fields) {
    let tableList = []
    fields.forEach((field) => {
      let objData = {
        field_id: '',
        identity_key: '',
        type: '',
        title: ''
      }
      if (field.type === 'Field::Detail') {
        objData.field_id = field.id
        objData.identity_key = field.identity_key
        objData.type = field.type
        objData.title = field.title
        objData.button_name = field.settings.button_name || '明细'
        objData.children = []
        objData.parent = []
        // 明细字段内部构建
        field.children.forEach((field) => {
          let objDataChildren = {}
          switch (field.type) {
            case 'Field::RadioButton': {
              objDataChildren.field_id = field.id
              objDataChildren.identity_key = field.identity_key
              objDataChildren.type = field.type
              objDataChildren.title = field.title
              objDataChildren.option_id = ''
              objDataChildren.options = field.options
              break
            }
            case 'Field::DateTime': {
              objDataChildren.field_id = field.id
              objDataChildren.identity_key = field.identity_key
              objDataChildren.type = field.type
              objDataChildren.title = field.title
              objDataChildren.value = ''
              break
            }
            default: {
              objDataChildren.field_id = field.id
              objDataChildren.identity_key = field.identity_key
              objDataChildren.type = field.type
              objDataChildren.title = field.title
              objDataChildren.value = ''
            }
          }
          objData.children.push(objDataChildren)
        })
        let child = JSON.parse(JSON.stringify(objData.children))
        // child.forEach((element) => {
        //   element.group_id = new Date().getTime()
        // })
        objData.parent.push(child)
      } else {
        switch (field.type) {
          case 'Field::RadioButton': {
            objData.field_id = field.id
            objData.identity_key = field.identity_key
            objData.type = field.type
            objData.title = field.title
            objData.option_id = ''
            objData.options = field.options
            break
          }
          case 'Field::CheckBox': {
            objData.field_id = field.id
            objData.identity_key = field.identity_key
            objData.type = field.type
            objData.title = field.title
            objData.option_id = []
            objData.value = ''
            objData.other_option = field.other_option
            objData.options = field.options
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
            objData.field_id = field.id
            objData.identity_key = field.identity_key
            objData.type = field.type
            objData.title = field.title
            objData.value = ''
          }
        }
        switch (field.identity_key) {
          case 'new_room_number': {
            objData.field_id = field.id
            objData.identity_key = field.identity_key
            objData.type = field.type
            objData.title = field.title
            objData.value = []
            objData.columnsCe = this.cascade(field.cascaded_select.choices)
            break
          }
          default: {
            objData.field_id = field.id
            objData.identity_key = field.identity_key
            objData.type = field.type
            objData.title = field.title
            objData.value = ''
          }
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
  // 房屋状态
  houseStatus(array) {
    array.forEach((el) => {
      switch (el.room_status) {
        case '签约': {
          el.class = 'signing'
          break
        }
        case '认购': {
          el.class = 'buy'
          break
        }
        case '退房': {
          el.class = 'change'
          break
        }
        case '空闲': {
          break
        }
      }
    })
    return array
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
  // 表单数据处理
  tableListData(fields, orderFieldList) {
    let tableList = []
    orderFieldList.forEach((element) => {
      let field = fields.find((field) => field.identity_key === element)
      let objData = {}
      if (field) {
        switch (field.type) {
          case 'Field::RadioButton': {
            objData.field_id = field.id
            objData.identity_key = field.identity_key
            objData.type = field.type
            objData.title = field.title
            objData.option_id = ''
            objData.options = field.options
            break
          }
          case 'Field::CheckBox': {
            objData.field_id = field.id
            objData.identity_key = field.identity_key
            objData.type = field.type
            objData.title = field.title
            objData.option_id = []
            objData.value = ''
            objData.other_option = field.other_option
            objData.options = field.options
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
            objData.field_id = field.id
            objData.identity_key = field.identity_key
            objData.type = field.type
            objData.title = field.title
            objData.value = ''
          }
        }
        switch (field.identity_key) {
          case 'working_area': {
            objData.field_id = field.id
            objData.identity_key = field.identity_key
            objData.type = field.type
            objData.title = field.title
            objData.value = []
            objData.columnsCe = this.cascade(field.cascaded_select.choices)
            break
          }
          default: {
            objData.field_id = field.id
            objData.identity_key = field.identity_key
            objData.type = field.type
            objData.title = field.title
            objData.value = ''
          }
        }
        tableList.push(objData)
      }
    })
    return tableList
  },
  // 排行榜排序
  rank(list) {
    for (let i = 0; i < list.length; i++) {
      list[i].top = i + 1
    }
    return list
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
  // 千分位处理
  format(num) {
    var str = num + ''
    return (
      '¥' +
      str
        .split('')
        .reverse()
        .reduce((prev, next, index) => {
          return (index % 3 ? next : next + ',') + prev
        }) +
      '.00'
    )
  },
  //
  //  * @description 数字转中文数码
  //  *
  //  * @param {Number|String}   num     数字[正整数]
  //  * @param {String}          type    文本类型，lower|upper，默认upper
  //  *
  //  * @example number2text(100000000) => "壹亿元整"
  number2text(number, type = 'upper') {
    // 配置
    const confs = {
      lower: {
        num: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
        unit: ['', '十', '百', '千', '万'],
        level: ['', '万', '亿']
      },
      upper: {
        num: ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'],
        unit: ['', '拾', '佰', '仟'],
        level: ['', '万', '亿']
      },
      decimal: {
        unit: ['分', '角']
      },
      maxNumber: 999999999999.99
    }
    // 过滤不合法参数
    if (Number(number) > confs.maxNumber) {
      console.error(`The maxNumber is ${confs.maxNumber}. ${number} is bigger than it!`)
      return false
    }
    const conf = confs[type]
    const numbers = String(Number(number).toFixed(2)).split('.')
    const integer = numbers[0].split('')
    const decimal = Number(numbers[1]) === 0 ? [] : numbers[1].split('')
    // 四位分级
    const levels = integer.reverse().reduce((pre, item, idx) => {
      let level = pre[0] && pre[0].length < 4 ? pre[0] : []
      let value = item === '0' ? conf.num[item] : conf.num[item] + conf.unit[idx % 4]
      level.unshift(value)

      if (level.length === 1) {
        pre.unshift(level)
      } else {
        pre[0] = level
      }
      return pre
    }, [])

    // 整数部分
    const _integer = levels.reduce((pre, item, idx) => {
      let _level = conf.level[levels.length - idx - 1]
      let _item = item.join('').replace(/(零)\1+/g, '$1') // 连续多个零字的部分设置为单个零字

      // 如果这一级只有一个零字，则去掉这级
      if (_item === '零') {
        _item = ''
        _level = ''

        // 否则如果末尾为零字，则去掉这个零字
      } else if (_item[_item.length - 1] === '零') {
        _item = _item.slice(0, _item.length - 1)
      }
      return pre + _item + _level
    }, '')
    // 小数部分
    let _decimal = decimal
      .map((item, idx) => {
        const unit = confs.decimal.unit
        const _unit = item !== '0' ? unit[unit.length - idx - 1] : ''
        return `${conf.num[item]}${_unit}`
      })
      .join('')
    // 如果是整数，则补个整字
    return `${_integer}元` + (_decimal || '整')
  },
  // 构建流程传输的JSON格式(简易版)
  payloadBuild(formData, userID, url) {
    let payload = {
      assignment: {
        response_attributes: {
          entries_attributes: []
        },
        operation: 'route'
      },
      user_id: userID,
      webhook: {
        payload_url: url,
        subscribed_events: ['JourneyStatusEvent']
      }
    }
    let entries = payload.assignment.response_attributes.entries_attributes
    formData.forEach((element) => {
      switch (element.type) {
        case 'Field::RadioButton': {
          if (element.option_id) {
            entries.push({
              field_id: element.field_id,
              option_id: element.option_id
            })
          }
          break
        }
        // 明细字段
        case 'Field::Detail': {
          const detailID = element.field_id
          element.parent.forEach((res) => {
            res.forEach((el) => {
              if (el.value) {
                entries.push({
                  field_id: el.field_id,
                  group_id: el.group_id,
                  value: el.value,
                  detail_id: detailID
                })
              }
            })
          })
          break
        }
        // 文本+时间类型
        default: {
          if (element.value) {
            entries.push({
              field_id: element.field_id,
              value: element.value
            })
          }
        }
      }
    })
    return payload
  },
  createdTableHeadersDetail(fields, admin) {
    let columns = []
    if (admin === 'admin') {
      fields.forEach((field) => {
        let column = {
          key: '',
          title: ''
        }
        switch (field.identity_key) {
          case 'saler':
            Object.keys(column).forEach((res) => {
              if (res === 'key') {
                column[res] = field.identity_key
              } else {
                column[res] = field[res]
              }
            })
            column.width = 100
            column.resizable = true
            column.fixed = 'left'
            break
          case 'saler_phone':
            break
          default:
            Object.keys(column).forEach((res) => {
              if (res === 'key') {
                column[res] = field.identity_key
              } else {
                column[res] = field[res]
              }
            })
            column.width = 150
            column.resizable = true
            break
        }
        if (column.key) {
          columns.push(column)
        }
      })
    } else {
      fields.forEach((field) => {
        let column = {}
        switch (field.identity_key) {
          case 'saler':
            Object.keys(column).forEach((res) => {
              if (res === 'key') {
                column[res] = field.identity_key
              } else {
                column[res] = field[res]
              }
            })
            column.width = 100
            column.resizable = true
            column.fixed = 'left'
            break
          case 'saler_phone':
            break
          case 'phone':
            break
          default:
            Object.keys(column).forEach((res) => {
              if (res === 'key') {
                column[res] = field.identity_key
              } else {
                column[res] = field[res]
              }
            })
            column.width = 150
            column.resizable = true
            break
        }
        if (column.key) {
          columns.push(column)
        }
      })
    }
    return columns
  },
  // 表头
  createdTableHeaders(fields) {
    let columns = []
    fields.forEach((field) => {
      let column = {
        key: '',
        title: ''
      }
      switch (field.identity_key) {
        case 'room_number':
          Object.keys(column).forEach((res) => {
            if (res === 'key') {
              column[res] = field.identity_key
            } else {
              column[res] = field[res]
            }
          })
          column.width = 100
          column.resizable = true
          column.fixed = 'left'
          break
        case 'detail':
          column.width = 0
          break

        default:
          Object.keys(column).forEach((res) => {
            if (res === 'key') {
              column[res] = field.identity_key
            } else {
              column[res] = field[res]
            }
          })
          column.width = 200
          column.resizable = true
          break
      }
      if (column.width) {
        columns.push(column)
      }
    })
    return columns
  },
  // 修改表单数据（优化）
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
