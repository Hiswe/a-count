// this a basis of business form
function createBlank(quotationIndex) {
  return {
    type: 'quotation',
    // store only counting
    // displaying ID will be made by server
    // index: {
    //   quotation: quotationIndex,
    // },
    time: {
      created:    new Date(),
      send:       false,
      validated:  false,
      signed:     false,
      done:       false,
    },
    // payments: {
    //   advance:    {
    //     amount: false,
    //   },
    // },
    products: [],
    tax: 0,
    price: {
      net: 0,
      taxes: 0,
      total: 0,
    },
  };
};

module.exports = {
  createBlank: createBlank,
};
