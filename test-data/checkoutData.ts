export interface GuestInfo {
  email: string;
  firstName: string;
  lastName: string;
}
export interface AddressInfo {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
export const checkoutData = {
  guestInfo: {
    email: "ana@popescu.com",
    firstName: "Ana",
    lastName: "Popescu",
  },
  addressInfo: {
    street: "Main Street",
    city: "Botosani",
    state: "Botosani",
    country: "Romania",
    postalCode: "710717",
  },

  paymentInfo: {
    bankTransfer: {
      bankName: "Banca Pisiceasca",
      accountName: "Ana Popescu",
      accountNumber: "1234567890",
    },

    creditCard: {
      creditCardNumber: "0000-0000-1234-0000",
      expirationDate: "11/2026",
      cVV: "123",
      holderName: "Ana Popescu",
    },
    giftCard: {
      giftCardNumber: "RO12345667",
      validationCode: "A123",
    },
    buyNowPayLater: {
      installments: "6",
    },
  },
};
export const invalidCheckoutData = {
  guestInfo: {
    email: "ana_popescu_com",
    firstName: "Ana",
    lastName: "Popescu",
  },
  addressInfo: {
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  },

  paymentInfo: {
    bankTransfer: {
      bankName: "565567657756",
      accountName: "",
      accountNumber: "gfhgfhfjghjj",
    },

    creditCard: {
      creditCardNumber: "1234567890",
      expirationDate: "12-07-2026",
      cVV: "1",
      holderName: "Ana Popescu",
    },
    giftCard: {
      giftCardNumber: "^%$%^$%^&",
      validationCode: "%$@$#@#%$ ",
    },

    buyNowPayLater: {
      installments: "10",
    },
  },
};
