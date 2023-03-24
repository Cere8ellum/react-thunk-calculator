export function checkCondition(min, max, value) {
  return Math.max(min, Math.min(max, Number(value)));
}
