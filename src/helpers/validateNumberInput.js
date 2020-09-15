export const validateNumberInput = (value, minNum = 0, maxNum = 600) => {
  const validNumber = /^(0|[1-9]\d*)(\.\d+)?$/

  return (
    validNumber.test(value) && Number(value) > minNum && Number(value) < maxNum
  )
}
