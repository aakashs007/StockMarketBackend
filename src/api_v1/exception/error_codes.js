module.exports = {
  TRANS_TYPE_MER: {
    status_code: 400,
    text: {
      en: 'Transaction type not specified for merchant!',
    }
  },
  TRANS_TYPE_CUST: {
    status_code: 400,
    text: {
      en: 'Transaction type not specified for customer!'
    }
  },
  MASTER_SETTINGS_NOT_FOUND: {
    status_code: 500,
    text: {
      en: 'Master settings not found!',
    }
  },
  ORDER_NOT_FOUND: {
    status_code: 404,
    text: {
      en: 'Order not found!',
    }
  },
  POINTS_NOT_MATCH: {
    status_code: 421,
    text: {
      en: 'Given points does not match the provided points!',
    }
  },
  PAYMENT_ID_NOT_FOUND: {
    status_code: 404,
    text: {
      en: 'No payment found with associated id!',    
    }
  },
  PAYMENT_ALREADY_CREATED: {
    status_code: 409,
    text: {
      en: 'Payment already created for the following id!',
    }
  },
  PRODUCT_ALREADY_CREATED: {
    status_code: 409,
    text: {
      en: 'Product already present in the database!',
    }
  },
  PRODUCT_NOT_FOUND: {
    status_code: 404,
    text: {
      en: 'Product not found in the database!',
    }
  },
  LOYALTY_SETTINGS_ALREADY_CREATED: {
    status_code: 409,
    text: {
      en: 'Loyalty settings already created in the database!',
    }
  },
  LOYALTY_SETTINGS_NOT_FOUND: {
    status_code: 404,
    text: {
      en: 'Loyalty settings not found in the database!',
    }
  },
  UNKNOWN_ERROR: {
    status_code: 500,
    text: {
      en: 'UNKNOWN_ERROR'
    }
  },
  CONSUMER_NOT_FOUND: {
    status_code: 404,
    text: {
      en: 'Consumer not found!'
    }    
  },
  MERCHANT_NOT_FOUND: {
    status_code: 404,
    text: {
      en: 'Merchant not found!'
    }
  },
  NOT_FOUND: {
    status_code: 404,
    text: {
      en: 'Not found!'
    }
  },
  UNAUTHORIZED: {
    status_code: 401,
    text: {
      en: 'Unauthorized request!'
    }
  },
  DUPLICATE: {
    status_code: 409,
    text: {
      en: 'Already exist in the database!'
    }
  },
  INTERNAL_ERROR: {
    status_code: 500,
    text: {
      en: 'Internal server error!'
    }
  }
};