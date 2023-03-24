export const fetchResult = async (
  carPrice,
  initFee,
  leaseTerm,
  summury,
  monthFee
) => {
  // Between 1 and 10
  const rnd = Math.floor(Math.random() * 9) + 1;
  const asyncData = await new Promise((resolve, reject) => {
    setTimeout(() => {
      rnd > 5
        ? resolve(`You are invited to our office to receive a loan.`)
        : reject(":( Error happened. Repeat again plz.");
    }, rnd * 500);
  });
  return asyncData;
};
