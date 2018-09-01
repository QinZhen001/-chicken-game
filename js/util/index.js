/**
 *
 * @param min 最小值
 * @param max 最大值
 * @returns {number} 带一位小数的随机数
 */
export function getRandomDecimal(min, max) {
  return Number((min + (max - min) * Math.random()).toFixed(1))
}