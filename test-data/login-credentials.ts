export const loginCredentials = {
  credentials: {
    standard_user: {
      username: 'standard_user',
      password: 'secret_sauce',
    },
    locked_user: {
      username: 'locked_out_user',
      password: 'secret_sauce',
    },
     invalid_username: {
      username: 'invalid_user',
      password: 'secret_sauce',
    },
     incorrect_password: {
      username: 'standard_user',
      password: 'wrong_password',
    },
     blank_credentials: {
      username: '',
      password: '',
    },
  },
};
