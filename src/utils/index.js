/**
 * 时间格式转时间戳
 * date格式为日期格式
 * 例如：2019-08-14 11:57
 */
export function timeStamp(date) {
  const time1 = date.replace(/-/g, '/')
  const time2 = new Date(time1)

  return Date.parse(time2)
}

/**
 * 时间戳转时间格式
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (!time) return
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
// 时间戳转换时间格式===没有秒
export function parseTimeNoS(time, cFormat) {
  if (!time) return
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
// 验证手机号
export function checkPhone(data) {
  const TEL_REGEXP = /^1[3456789]\d{9}$/
  return TEL_REGEXP.test(data)
}

// 生成随机数
export function randomNumBoth(Min, Max) {
  let Range = Max - Min;
  let Rand = Math.random();
  let num = Min + Math.round(Rand * Range); //四舍五入
  return num;
}

/**
 * 处理下载的报表
 * @param {file}  文件对象
 * @param {filename}  需要保存的文件对象名称
 * 保存的文件格式为：filename-年月日.xlsx
 * responseType: 'blob'
 *
 * downTable(data).then(res => {
        this.listLoading = false
        operateFile(res, '用户列表')
      }).catch((res) => {
        console.log(res)
      })
 */
export function getNowFormatDate(){
    var day = new Date();
    var Year = 0;
    var Month = 0;
    var Day = 0;
    var CurrentDate = "";
    //初始化时间
    //Year       = day.getYear();//有火狐下2008年显示108的bug
    Year       = day.getFullYear();//ie火狐下都可以
    Month      = day.getMonth()+1;
    Day        = day.getDate();
    CurrentDate += Year;
    if (Month >= 10 )
    {
    CurrentDate += Month;
    }
    else
    {
    CurrentDate += "0" + Month;
    }
    if (Day >= 10 )
    {
    CurrentDate += Day ;
    }
    else
    {
    CurrentDate += "0" + Day ;
    }

    return CurrentDate;
}

export function operateFile(file, filename) {
  var nowdate = getNowFormatDate();
  const fileName = filename + '-' + nowdate + '.xls'
  const blobObject = new Blob([file], { type: 'application/octet-stream' })
  // 是IE浏览器
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    window.navigator.msSaveOrOpenBlob(blobObject, fileName)
  } else { // 火狐谷歌都兼容
    // 模板中要有一个预定义好的a标签
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blobObject)
    link.download = fileName
    link.click()
  }
}

export function get_role_function(id) {
  if(this.$store.getters.functionCode.indexOf(id.toString()) > -1){
    return true
  }
  else{
    return false
  }
}
