/**
 * 倒计时
 * @param {时间戳（毫秒）} time
 * @param {格式格式} fmt
 */
export function getCountTime(endTime) {
  const now = new Date().getTime(); // 当前时间
  let restTime = endTime - now; // 倒计时毫秒数
  const restDay = Math.floor(restTime / (60 * 60 * 24 * 1000)); // 转换为天
  restTime -= restDay * 60 * 60 * 24 * 1000; // 除去天的毫秒数
  const restHour = Math.floor(restTime / (60 * 60 * 1000)); // 除去天的毫秒数转换成小时
  restTime -= restHour * 60 * 60 * 1000; // 除去天、小时的毫秒数
  const restMin = Math.floor(restTime / (60 * 1000)); // 除去天的毫秒数转换成分钟
  restTime -= restMin * 60 * 1000;
  const S = Math.floor(restTime / 1000); // 除去天、小时、分的毫秒数转化为秒
  return {
    day: restDay,
    hour: restHour > 10 ? restHour : `0${restHour}`,
    min: restMin > 10 ? restMin : `0${restMin}`,
    s: S > 10 ? S : `0${S}`,
  };
}
