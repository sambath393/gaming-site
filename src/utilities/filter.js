export const getDifferenceByChatId = (left, right, compareFunction) =>
  left.filter((leftValue) => !right.some((rightValue) => compareFunction(leftValue, rightValue)));

export const removeDuplicate = (arr, compareFunction) =>
  arr.filter((value, index, self) => index === self.findIndex((t) => compareFunction(t, value)));
