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