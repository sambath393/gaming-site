import N from 'numeral';

export const asDollar = (n = 0) => N(n).format('0,0.00');
export const asNumber = (n = 0) => N(n).format('0,0');

export const asFaq = (arr) =>
  arr.map((load) => ({
    questionName: load.questionName,
    acceptedAnswerText: load.acceptedAnswerText,
  }));

export const asSeo = (obj) => ({
  linkTo: obj.linkTo,
  seo: obj,
});

export const asCaption = (gameId, gameServer, tel, type) => {
  return `User ID: ${gameId}\nZone ID: ${gameServer}\nTel: ${tel}\nType: ${type.qty}Diamonds + ${
    type.offer
  }Bonus\nPrice: ${type.price.toFixed(2)}$`;
};
