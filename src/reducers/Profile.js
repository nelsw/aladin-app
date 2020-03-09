import * as actions from '../constants/ActionTypes';

const INITIALSTATE = {
  passwordForAnotherAccount: {
    value: '',
    message: '',
    isValid: false,
    isTouched: false,
  },
  currentPassword: {
    value: '',
    message: '',
    isValid: false,
    isTouched: false,
  },
  newPassword: {
    value: '',
    message: '',
    isValid: false,
    isTouched: false,
  },
  confirmPassword: {
    value: '',
    message: '',
    isValid: false,
    isTouched: false,
  },
  disabledButton: false,
  profilePicture: '',
  userProfileData: {
    name: null,
    description: null,
  },

  userSecretRecoveryCode: '',
  senderWalletAddress: {
    value: '',
    isValid: false,
    message: '',
    isTouched: false,
  },
  recieverWalletAddress: {
    value: '',
    isValid: false,
    message: '',
    isTouched: false,
  },
  storeWalletAmmount: {
    value: '',
    isValid: false,
    message: '',
    isTouched: false,
  },

  storePasswordOnSendTokken: {
    value: '',
    isValid: false,
    message: '',
    isTouched: false,
  },
  alaAmount: {
    value: '',
    isValid: false,
    message: '',
    isTouched: false,
  },
  createdAnotherAccount: false,
  transactionId: '',
  accountNo: '',
  loaderFlag: '',
  user: {
    value: '',
  },
  tokenError: '',
  accountDetails:[],
  cpuAmount: {
    value: '',
    isValid: false,
    message: '',
    isTouched: false,
  },
  netAmount: {
    value: '',
    isValid: false,
    message: '',
    isTouched: false,
  },
  fileLoader: false,
  uploaded: false,
};

const passwordRegEx = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

export default (state = INITIALSTATE, action) => {
  switch (action.type) {
    case actions.STORE_PASSWORD_FOR_ANOTHER_ACCOUNT:
      // console.log(typeof action.payload);
      if (typeof action.payload === 'object') {
        if(action.payload != null) {
          let response;
          let datas;
          ({ msg: response, data: datas } = action.payload);
          return {
            ...state,
            newPassword: {
              value: state.newPassword.value,
              message: response !== 'Success' ? datas : '',
              isValid: response === 'Success',
              isTouched: true,
            },
          };
        } else {
          return {
            ...state,
            newPassword: {
              value: '',
              message: 'Please enter password',
              isValid: false,
              isTouched: false,
            },
          };
        }
      }
      return {
        ...state,
        newPassword: {
          value: action.payload,
          message: action.payload.length != 0 ? passwordRegEx.test(action.payload) ? '' : 'Your password must be 8-15 characters long, contain 1 uppercase letter, 1 special character and a number.' : 'Your password must be 8-15 characters long, contain 1 uppercase letter, 1 special character and a number.',
          isValid: passwordRegEx.test(action.payload),
          isTouched: true,
        },
      };
    case actions.SHOW_API_RESPONSE:
      const { msg, data } = action.payload;
      return {
        ...state,
        passwordForAnotherAccount: {
          value: state.passwordForAnotherAccount.value,
          message: data || 'Please enter password',
          isValid: msg === 'Success',
          isTouched: true,
        },
      };
    case actions.CLEAR_STORE_PASSWORD_FOR_ANOTHER_ACCOUNT:
      return {
        ...state,
        passwordForAnotherAccount: {
          value: '',
          message: '',
          isValid: false,
          isTouched: false,
        },
      };
    case actions.STORE_CURRENT_PASSWORD:
      if (typeof action.payload !== 'string') {
        let responce;
        let datas;
        ({ msg: responce, data: datas } = action.payload);

        return {
          ...state,
          currentPassword: {
            value: state.currentPassword.value,
            message: responce !== 'Success' ? datas : '',

            isValid: responce === 'Success',
            isTouched: true,
          },
        };
      }

      return {
        ...state,
        currentPassword: {
          value: action.payload,
          message: passwordRegEx.test(action.payload) ? '' : 'Your password must be 8-15 characters long, contain 1 uppercase letter, 1 special character and a number.',
          isValid: passwordRegEx.test(action.payload),
          isTouched: true,
        },
      };
    case actions.STORE_NEW_PASSWORD:
      return {
        ...state,
        newPassword: {
          value: action.payload,
          message: passwordRegEx.test(action.payload)
                ? ''
                : 'Your password must be 8-15 characters long, contain 1 uppercase letter, 1 special character and a number.',
             
          isValid: passwordRegEx.test(action.payload),
          isTouched: true,
        },
      };
    case actions.STORE_CONFIRM_PASSWORD:
      return {
        ...state,
        confirmPassword: {
          value: action.payload,
          message:
            action.payload.length > 0
              ? action.payload === state.newPassword.value
                ? ''
                : "Password doesn't match"
              : 'Please enter password',
          isValid: action.payload === state.newPassword.value,
          isTouched: true,
        },
      };
    case actions.DISABLED_BUTTON:
      return {
        ...state,
        disabledButton: action.payload || false,
      };
    case actions.CLEAR_STORED_PASSWORD:
      return {
        ...state,
        currentPassword: {
          value: '',
          message: '',
          isValid: false,
          isTouched: false,
        },
        newPassword: {
          value: '',
          message: '',
          isValid: false,
          isTouched: false,
        },
        confirmPassword: {
          value: '',
          message: '',
          isValid: false,
          isTouched: false,
        },
      };
    case actions.UPLOAD_PROFILE_PICTURE:
      return {
        ...state,
        profilePicture: action.payload,
      };
    case actions.GET_PROFILE_DATA_SUCCESS:
      let profileImage = '';
      if (action.payload.hasOwnProperty('Image')) {
        profileImage = action.payload.Image[0].contentUrl;
      }
      return {
        ...state,
        userProfileData: {
          name: action.payload.name || '',
          description: action.payload.description || '',
        },
        profilePicture: profileImage,
      };
    case actions.RECOVER_WALLET_SUCCESS:
      return {
        ...state,
        userSecretRecoveryCode: action.payload || '',
      };
    case actions.RECOVER_KEY_SUCCESS:
      return {
        ...state,
        userSecretRecoveryCode: action.payload || '',
      };
    case actions.STORE_ADDRESS_OF_SENDER:
      return {
        ...state,
        senderWalletAddress: {
          value: action.payload,
          isValid: action.payload.length > 0,
          message: action.payload.length > 0 ? '' : 'Please enter your address',
          isTouched: true,
        },
      };
    case actions.STORE_ADDRESS_OF_RECIEVER:
      return {
        ...state,
        recieverWalletAddress: {
          value: action.payload,
          isValid:
            action.payload.length > 0 && 
            action.payload.length < 13 && 
            !/^\d+$/.test(action.payload) && 
            /^[a-z1-5]*$/.test(action.payload),
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
      // return {
      //   ...state,
      //   recieverWalletAddress: {
      //     value: action.payload,
      //     isValid: action.payload.length > 0,
      //     message:
      //       action.payload.length > 0 ? '' : 'Please enter reciever address',
      //     isTouched: true,
      //   },
      // };
    case actions.STORE_WALLET_AMMOUNT:
      return {
        ...state,
        storeWalletAmmount: {
          value: action.payload,
          isValid: (action.payload.length > 0 || !isNaN(action.payload)) && /^[0-9]+$/.test(action.payload),
          message:
            (action.payload.length > 0 || !isNaN(action.payload)) ? /^[0-9]+$/.test(action.payload) ? '' : 'Please enter digits only' : 'Please enter wallet amount',
          isTouched: true,
        },
      };
    case actions.BUY_ALA_ERROR: 
      return {
        ...state,
        storeWalletAmmount: {
          ...state.storeWalletAmmount,
          isValid: action.payload,
          message: action.payload ? '' : 'Please enter valid amount(maximum stripe transaction limit is 999999)',
          isTouched: true,
        }
      }
    case actions.STORE_PASSWORD_ON_SEND_TOKKEN:
    
      if(action.payload != null) {
        return {
          ...state,
          storePasswordOnSendTokken: {
            value: action.payload,
            isValid: passwordRegEx.test(action.payload),
            message:
               passwordRegEx.test(action.payload) ? '' :  'Your password must be 8-15 characters long, contain 1 uppercase letter, 1 special character and a number.',
            isTouched: true,
          },
        };
      } else {
        return {
          ...state,
          storePasswordOnSendTokken: {
            value: '',
            isValid: false,
            message: '',
            isTouched: false,
          },
        }
      }
      
    case actions.CLEAR_SEND_TOKKEN_DATA:
      return {
        ...state,
        senderWalletAddress: {
          value: '',
          isValid: false,
          message: '',
          isTouched: false,
        },
        recieverWalletAddress: {
          value: '',
          isValid: false,
          message: '',
          isTouched: false,
        },
        storeWalletAmmount: {
          value: '',
          isValid: false,
          message: '',
          isTouched: false,
        },
        storePasswordOnSendTokken: {
          value: '',
          isValid: false,
          message: '',
          isTouched: false,
        },
      };
    case actions.INCORRECT_RECOVERY_CODE_AT_REDIRECT:
      // let errorMsg = '';
      // if (action.payload.length > 0) {
      //   errorMsg = 'Please enter valid password';
      // }
      // if (action.payload.length == 0) {
      //   errorMsg = 'Please enter password';
      // }
      return {
        passwordForAnotherAccount: {
          message: 'Please enter valid password',
          isValid: false,
          isTouched: true,
        },
      };
    case actions.ALA_COIN_ID_CHANGED:
      return {
        ...state,
        alaCoinId: {
          value: action.payload,
          isValid: action.payload.length > 0,
          isTouched: true,
          message: 'Please enter Ala coin id.'
        }
      }
    case actions.CLEAR_CHANGE_PASSWORD_DATA:
      return {
        ...state,
        currentPassword: {
          value: '',
          message: '',
          isValid: false,
          isTouched: false,
        },
        newPassword: {
          value: '',
          message: '',
          isValid: false,
          isTouched: false,
        },
        confirmPassword: {
          value: '',
          message: '',
          isValid: false,
          isTouched: false,
        },
      }
    case actions.CLEAR_ANOTHER_ID_DATA:
      return {
        ...state,
        passwordForAnotherAccount: {
          value: '',
          message: '',
          isValid: false,
          isTouched: false,
        },
      }
    case actions.CREATE_ANOTHER_ACCOUNT_SUCCESS:
      return {
        ...state,
        createdAnotherAccount: true
      }

    case actions.STORE_TRANSACTION_ID:
      return {
        ...state,
        transactionId: action.payload,
      }
    case actions.SET_ACCOUNT_NO:
      return {
        ...state,
        accountNo: action.payload,
      }
    case actions.SHOW_LOADER:
      return {
        ...state,
        loaderFlag: action.payload,
      }
    case actions.ALA_AMOUNT_CHANGED:
      return {
        ...state,
        alaAmount: {
          value: action.payload,
          message: action.payload.length === 0 ? 'Please enter amount' : '',
          isValid: action.payload.length > 0,
          isTouched: true,
        }
      }
    case actions.USER_NAME_CHANGED:
      return {
        ...state,
        user: {
          value: action.payload,
        }
      }
    case actions.SEND_TOKEN_ERROR:
      if (typeof action.payload !== 'string') {
        let responce;
        let datas;
        ({ msg: responce, data: datas } = action.payload);
        datas.message = datas.message.replace('assertion failure with message: ','');
        return {
          ...state,
          tokenError: responce !== 'Success' ? (datas.message.includes('balance') && datas.message.includes('object')) ? "Insufficient balance" : datas.message.charAt(0).toUpperCase() + datas.message.slice(1) : '',
        };
      }
      return {
        ...state,
        tokenError: '',
      }
    case actions.CLEAR_AMOUNT:
      return {
        ...state,
        storeWalletAmmount: {
          value: '',
          isValid: false,
          message: '',
          isTouched: false,
        },
      }

      case actions.GET_ACCOUNT_DETAILS_SUCCESS:
        return{
          ...state,
          accountDetails: action.payload != undefined ? action.payload :[]
        }

        case actions.CPU_STAKE_AMOUNT_CHANGED:
          return{
            ...state,
            cpuAmount: {
              value: action.payload,
              isValid: action.payload.length > 0,
              message: action.payload.length > 0 ? '' : 'Please enter amount',
              isTouched: true,
            }
          }

          case actions.NET_STAKE_AMOUNT_CHANGED:
            return{
              ...state,
              netAmount: {
                value: action.payload,
                isValid: action.payload.length > 0,
                message: action.payload.length > 0 ? '' : 'Please enter amount',
                isTouched: true,
              }
            }

            case actions.CLEAR_STAKE_AMOUNTS:
              return{
                ...state,
                cpuAmount: {
                  value: '',
                  isValid: false,
                  message: '',
                  isTouched: false,
                },
                netAmount: {
                  value: '',
                  isValid: false,
                  message: '',
                  isTouched: false,
                }
              }
    case actions.CLEAR_PASSWORD:
      return {
        ...state,
        newPassword: {
          value: '',
          message: '',
          isValid: false,
          isTouched: false,
        },
      }
    case actions.FILE_LOADER: 
      return {
        ...state,
        fileLoader: action.payload.fileLoader,
        uploaded: action.payload.uploaded,
      }
    default:
      return state;
  }
};
