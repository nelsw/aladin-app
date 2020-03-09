import * as actions from '../constants/ActionTypes';

const InitialState = {
  title: '',
  body: '',
  buttonClick: '',
  cancelButton: '',
  backButton: '',
  buttonName: '',
  cancelButtonFlag: '',
  cancelButtonName: '',
  signInModalFlag: false,
  modalName: '',
  disabled: false,
  cancelIconFlag: true,
  hideButton: false,
  data: '',
};

export default (state = InitialState, action) => {
  switch (action.type) {
    case actions.OPEN_SIGNIN_MODAL:
      // action.payload
      const {
        title,
        body,
        buttonClick,
        cancelButton,
        backButton,
        buttonName,
        cancelButtonFlag,
        cancelButtonName,
        cancelIconFlag,
        modalName,
        disabled,
        hideButton,
        data,
      } = action.payload;
      return {
        title: title || '',
        body: body || '',
        backButton: backButton || '',
        buttonClick: buttonClick || '',
        cancelButton: cancelButton || '',
        buttonName: buttonName || '',
        cancelButtonFlag: cancelButtonFlag || '',
        cancelButtonName: cancelButtonName || '',
        cancelIconFlag: cancelIconFlag != false,
        signInModalFlag: true,
        modalName: modalName || '',
        disabled: disabled || false,
        hideButton: hideButton || false,
        data: data || '',
      };

    case actions.CLOSE_SIGNIN_MODAL:
      return {
        title: '',
        body: '',
        buttonClick: '',
        cancelButton: '',
        backButton: '',
        buttonName: '',
        cancelButtonName: '',
        cancelButtonFlag: '',
        signInModalFlag: false,
        modalName: '',
        disabled: false,
        cancelIconFlag: true,
        hideButton: false,
        data: '',
      };

    default:
      return state;
  }
};
