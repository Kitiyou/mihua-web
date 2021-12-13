import dateFormat from "dateformat" 

export function formatDateTime(date) {
  const d = new Date(date);
  return dateFormat(d, 'yyyy-mm-dd HH:MM:ss')
}

// 给数字补零，返回补零后的字符串
function fixZero(n) {
  return n.toString().padStart(2, '0');
}

export function formatRemainingTime(sec) {
  let s = fixZero(sec % 60);
  sec = Math.floor(sec / 60);
  let m = fixZero(sec % 60);
  sec = Math.floor(sec / 60);
  let h = fixZero(sec % 24);
  let d= Math.floor(sec / 24);
  let dStr = d ? d + '天 ' : '';
  return dStr + `${h}:${m}:${s}`;
}