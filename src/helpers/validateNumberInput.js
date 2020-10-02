export const validateNumberInput = (value, minNum = 0, maxNum = 600) => {
  const validNumber = /^-?\d+\.?\d*$/

  return (
    validNumber.test(value) &&
    Number(value) >= minNum &&
    Number(value) <= maxNum
  )
}
