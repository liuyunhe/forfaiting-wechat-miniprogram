export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('-') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export const getDay = (day: number) => {

  const doHandleMonth = (month: number) => {
    let m = String(month)
    if (month.toString().length == 1) {
      m = "0" + month
    }
    return m
  }
  var today = new Date()
  var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
  today.setTime(targetday_milliseconds)

  var tYear = today.getFullYear()
  var tMonth = today.getMonth()
  var tDate = today.getDate()
  tMonth = Number(doHandleMonth(tMonth + 1))
  tDate = Number(doHandleMonth(tDate))
  return tYear + "-" + tMonth + "-" + tDate
}
