export const TEST_DATA = {
  credentials: {
    standard_user: {
      username: 'standard_user',
      password: 'secret_sauce',
    },
    locked_user: {
      username: 'locked_out_user',
      password: 'secret_sauce',
    },
  },
  checkout: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
  },
  expectedUrls: {
    home: 'https://www.saucedemo.com/',
    inventory: 'https://www.saucedemo.com/inventory.html',
    cart: 'https://www.saucedemo.com/cart.html',
    checkout: 'https://www.saucedemo.com/checkout-step-one.html',
  },
};
