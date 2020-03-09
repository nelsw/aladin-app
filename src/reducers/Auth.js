import * as actions from '../constants/ActionTypes';
import { validateAndCleanRecoveryInput } from '../util/encryption-utils';

const InitialState = {
  userName: {
    value: '',
    isValid: false,
    message: 'Please enter username',
    isTouched: false,
    userNameApiResponse: false,
    timer: false,
  },

  userEmail: {
    value: '',
    isValid: false,
    message: 'Please enter email',
    isTouched: false,
  },
  userPassword: {
    value: '',
    isValid: false,
    message: 'Please enter password',
    isTouched: false,
  },

  userConfirmPassword: {
    value: '',
    isValid: false,
    message: 'Please enter confirm password',
    isTouched: false,
  },
  password: {
    value: '',
    isValid: false,
    message: 'Please enter password',
    isTouched: false,
  },
  createPassword: {
    value: '',
    isValid: false,
    message: 'Please enter password',
    isTouched: false,
  },
  confirmCreatePassword: {
    value: '',
    isValid: false,
    message: 'Please enter confirm password',
    isTouched: false,
  },
  email: {
    value: '',
    isValid: false,
    message: 'Please enter email',
    isTouched: false,
  },

  userMnemonic: '',
  disabledInputs: false,
  usernameApiValidation: false,
  balance: 0,
  usdBalance: 0,
  ALAPrice: 0,
  qrCode: '',
  recoveryKey: {
    value: '',
    isValid: false,
    message: 'Please enter recovery key or magic recovery code',
    isTouched: false,
    type: '',
  },
  stripeToken: '',
  displayPayment: false,
  paymentSuccess: false,
  paymtMessage: '',
};
const regEx = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
const passwordRegEx = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
let message = '';
export default (state = InitialState, action) => {
  switch (action.type) {
    case actions.STORE_USERNAME_ON_CHECK_AVAILAIBILITY:
      return {
        ...state,
        userName: {
          value: action.payload,
          isValid:
            action.payload.length > 0 &&
            action.payload.length < 13 &&
            !/^\d+$/.test(action.payload) &&
            /^[a-z1-5]*$/.test(action.payload),
          // && /(?=\s|^)[^.\s]+\.[^.\s]+\.[^.\s]/gm.test(action.payload)
          message:
            action.payload.length > 0
              ? action.payload.length < 13
               ? !/^\d+$/.test(action.payload)
                ? /^[a-z1-5]+$/.test(action.payload)
                  ? ''
                  : 'Please enter valid username. It must only contain a-z, 1-5.'
                  : 'Username should not contain only numbers.'
                : 'Please enter username of 12 characters'
              : 'Please enter username',
          isTouched: true,
        },
      };
    case actions.RECOVERY_KEY_CHANGED:
      const test = {
        value: '',
        isValid: false,
        message: `Please enter recovery key or magic recovery code`,
        isTouched: false,
        type: '',
      };
      if (action.payload != null) {
        test.value = action.payload;
        test.isTouched = true;
        if (action.payload.length === 0) {
          test.isValid = false;
          test.message = 'Please enter recovery key or magic recovery code';
        } else {
          const valid = validateAndCleanRecoveryInput(action.payload);
          test.isValid = valid.isValid;
          test.message = valid.isValid
            ? ''
            : `Please enter valid recovery key or magic recovery code`;
          test.type =
            valid.type != undefined && valid.type === 'encrypted'
              ? 'code'
              : 'key';
        }
      }
      return {
        ...state,
        recoveryKey: test,
      };
    case actions.STORE_USER_EMAIL:
      if (action.payload.length > 0) {
        if (!regEx.test(action.payload)) {
          message = 'Please enter valid email';
        } else {
          message = '';
        }
      } else {
        message = 'Please enter email';
      }

      return {
        ...state,
        userEmail: {
          value: action.payload,
          isValid: action.payload.length > 0 && regEx.test(action.payload),
          message,
          isTouched: true,
        },
      };
    case actions.STORE_USER_PASSWORD:
      // if (action.payload.length > 0) {
      //   if (action.payload.length < 16 && action.payload.length > 7) {
      //       if ( passwordRegEx.test(action.payload)) {
      //         message = '';
      //       } else {
      //         message = 'Password must contain one uppercase, one digit and one special character.'
      //       }
      //   } else {
      //     message = 'Please enter password minimum of 8 and maximum 15 characters';
      //   }
      // } else {
      //   message = 'Please enter password';
      // }

      return {
        ...state,
        userPassword: {
          value: action.payload,
          isValid: passwordRegEx.test(action.payload),
          message: passwordRegEx.test(action.payload) ? '' : 'Your password must be 8-15 characters long, contain 1 uppercase letter, 1 special character and a number.',

          isTouched: true,
        },
      };
    case actions.USER_PASSWORD_CHANGED:
        if (passwordRegEx.test(action.payload)) {
          message = '';
        } else {
          message = 'Your password must be 8-15 characters long, contain 1 uppercase letter, 1 special character and a number.';
        }
    
      return {
        ...state,
        password:
          action.payload != null
            ? {
                value: action.payload || '',
                isValid:
                  passwordRegEx.test(action.payload),
                message,

                isTouched: true,
              }
            : {
                value: '',
                isValid: false,
                message: 'Your password must be 8-15 characters long, contain 1 uppercase letter, 1 special character and a number.',
                isTouched: false,
              },
      };
    case actions.STORE_USER_CONFIRMPASSWORD:
      if (action.payload.length > 0) {
        if (action.payload === state.userPassword.value) {
          message = '';
        } else {
          message = "Password doesn't match";
        }
      } else {
        message = 'Please enter password';
      }
      return {
        ...state,
        userConfirmPassword:
          action.payload != null
            ? {
                value: action.payload,
                isValid:
                  action.payload.length > 0 &&
                  action.payload === state.userPassword.value,
                message,

                isTouched: true,
              }
            : {
                value: '',
                isValid: false,
                message: 'Please enter confirm password',
                isTouched: false,
              },
      };
    case actions.FORM_VALIDATOR_ON_CHECK_USER:
      const { msg, data } = action.payload;
      let timer = false;
      if (data == 'Subdomain avalible,You can register this name!!!') {
        timer = true;
      }
      return {
        ...state,
        userName: {
          // valid: valid || false,
          value: state.userName.value,
          isValid: msg === 'Success',
          message: data || 'Please enter username',
          isTouched: true,
          userNameApiResponse: msg === 'Success',
          timer,
        },
      };
    case actions.STORE_USER_MNEMONIC_ON_SIGN_UP:
      return {
        ...state,
        userMnemonic: action.payload,
        displayPayment: false,
        // paymentSuccess: ,
      };
    case actions.GET_BALANCE_SUCCESS:
      return {
        ...state,
        balance: action.payload.balance,
        qrCode: action.payload.qrcode,
        usdBalance: action.payload.usdBalance,
        ALAPrice: action.payload.ALAPrice,
      };
    case actions.DISABLED_INPUTS:
      return {
        ...state,
        disabledInputs: true,
      };
    case actions.DISPLAY_ERROR_MESSAGE:
      return {
        ...state,
        signUpErrorMessage: '',
      };
    // case actions.SIGN_IN_REQUEST_SUCCESS:
    //   return {
    //     ...state,
    case actions.SIGN_IN_REQUEST_SUCCESS:
      const { res, mes } = action.payload;
      return {
        ...state,
        password: {
          value: state.password.value,
          isValid: res,
          message: mes || 'Please enter password',
          isTouched: true,
        },
      };
    case actions.SIGN_IN_REQUEST_ERROR:
      const { val, msgg } = action.payload;
      return {
        ...state,
        password: {
          value: state.password.value,
          isValid: val,
          message: msgg || 'Please enter valid key or password',
          isTouched: true,
        },
      };
    case actions.CREATE_PASSWORD_CHANGED:
      const temp = {
        value: '',
        isValid: false,
        message: `Please enter password`,
        isTouched: false,
      };
      if (action.payload != null) {
        temp.value = action.payload;
        temp.isTouched = true;
            if (passwordRegEx.test(action.payload)) {
              temp.message = '';
              temp.isValid = true;
            } else {
              temp.message = 'Your password must be 8-15 characters long, contain 1 uppercase letter, 1 special character and a number.';
            }
        }
      
      return {
        ...state,
        createPassword: temp,
      };
    case actions.CONFIRM_CREATE_PASSWORD_CHANGED:
      const temp1 = {
        value: '',
        isValid: false,
        message: `Please enter confirm password`,
        isTouched: false,
      };
      if (action.payload != null) {
        temp1.value = action.payload;
        temp1.isTouched = true;
        if (action.payload.length === 0) {
          temp1.isValid = false;
          temp1.message = 'Please enter confirm password';
        }
        if (action.payload.length > 0) {
          if (action.payload === state.createPassword.value) {
            temp1.message = '';
            temp1.isValid = true;
          } else {
            temp1.message = "Password doesn't match";
          }
        }
      }
      return {
        ...state,
        confirmCreatePassword: temp1,
      };

    case actions.USER_EMAIL_CHANGED:
      if (action.payload.length > 0) {
        if (!regEx.test(action.payload)) {
          message = 'Please enter valid email';
        } else {
          message = '';
        }
      } else {
        message = 'Please enter email';
      }

      return {
        ...state,
        email:
          action.payload != null
            ? {
                value: action.payload,
                isValid:
                  action.payload.length > 0 && regEx.test(action.payload),
                message,
                isTouched: true,
              }
            : {
                value: '',
                isValid: false,
                message: 'Please enter email',
                isTouched: false,
              },
      };
    case actions.CLEAR_STORED_USERNAME:
      return {
        ...state,
        userName: {
          value: '',
          isValid: false,
          message: 'Please enter username',
          isTouched: false,
          userNameApiResponse: false,
        },
      };
    case actions.CLEAR_CREATE_ID_DATA:
      return {
        ...state,
        userName: {
          value: '',
          isValid: false,
          message: 'Please enter username',
          isTouched: false,
          userNameApiResponse: false,
        },
        userEmail: {
          value: '',
          isValid: false,
          message: 'Please enter email',
          isTouched: false,
        },
        userPassword: {
          value: '',
          isValid: false,
          message: 'Please enter password',
          isTouched: false,
        },
        userConfirmPassword: {
          value: '',
          isValid: false,
          message: 'Please enter confirm password',
          isTouched: false,
        },
        disabledInputs: false,
        userMnemonic: '',
      };
    case actions.STRIPE_TOKEN_CHANGED:
      return {
        ...state,
        stripeToken: action.payload,
      };
    case actions.DISPLAY_PAYMENT:
      return {
        ...state,
        displayPayment: action.payload,
      };
    case actions.PAYMENT_MESSAGE:
      return {
        ...state,
        paymtMessage: action.payload,
      };
    case actions.WRONG_PASSWORD_AT_ADD_ACCOUNT:
      return {
        ...state,
        userPassword: {
          isValid: false,
          message: action.payload,
          isTouched: true,
        },
      };
    case actions.CLEAR_ANOTHER_ID_DATA:
      return {
        ...state,
        userName: {
          value: '',
          isValid: false,
          message: 'Please enter username',
          isTouched: false,
          userNameApiResponse: false,
        },
        userEmail: {
          value: '',
          isValid: false,
          message: 'Please enter email',
          isTouched: false,
        },
        userPassword: {
          value: '',
          isValid: false,
          message: 'Please enter password',
          isTouched: false,
        },
      };
    case actions.RESET_AUTH:
      return {
        ...state,
        userName: {
          value: '',
          isValid: false,
          message: 'Please enter username',
          isTouched: false,
          userNameApiResponse: false,
          timer: false,
        },

        userEmail: {
          value: '',
          isValid: false,
          message: 'Please enter email',
          isTouched: false,
        },
        userPassword: {
          value: '',
          isValid: false,
          message: 'Please enter password',
          isTouched: false,
        },

        userConfirmPassword: {
          value: '',
          isValid: false,
          message: 'Please enter confirm password',
          isTouched: false,
        },
        password: {
          value: '',
          isValid: false,
          message: 'Please enter password',
          isTouched: false,
        },
        createPassword: {
          value: '',
          isValid: false,
          message: 'Please enter password',
          isTouched: false,
        },
        confirmCreatePassword: {
          value: '',
          isValid: false,
          message: 'Please enter confirm password',
          isTouched: false,
        },
        email: {
          value: '',
          isValid: false,
          message: 'Please enter email',
          isTouched: false,
        },

        userMnemonic: '',
        disabledInputs: false,
        usernameApiValidation: false,
        balance: 0,
        qrCode: '',
        recoveryKey: {
          value: '',
          isValid: false,
          message: 'Please enter recovery key or magic recovery code',
          isTouched: false,
          type: '',
        },
        stripeToken: '',
        displayPayment: false,
        paymentSuccess: false,
        paymtMessage: '',
        ALAPrice: 0,
      };

    default:
      return state;
  }
};
