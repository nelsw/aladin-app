import * as actions from '../constants/ActionTypes';

const InitialState = {
  title: '',
  message: '',
  redirectUrl: '',
  modalStatus: 0,
  buttonClick: '',
  closeModal: '',
  showIcon: false,
  successModalFlag: false,
  cancelIconFlag: true,
};

export default (state = InitialState, action) => {
  switch (action.type) {
    case actions.OPEN_SUCCESS_MODAL:
      const {
        title,
        redirectUrl,
        modalStatus,
        message,
        buttonClick,
        showIcon,
        closeModal,
        cancelIconFlag,
      } = action.payload;
      return {
        title: title || '',
        redirectUrl: redirectUrl || '',
        modalStatus: modalStatus || 0,
        message: message || '',
        buttonClick: buttonClick || '',
        closeModal: closeModal || '',
        showIcon: showIcon || false,
        successModalFlag: true,
        cancelIconFlag: cancelIconFlag != false,
      };

    case actions.CLOSE_SUCCESS_MODAL:
      return {
        title: '',
        redirectUrl: '',
        modalStatus: 0,
        message: '',
        buttonClick: '',
        closeModal: '',
        showIcon: false,
        successModalFlag: false,
        cancelIconFlag: true,
      };

    default:
      return state;
  }
};
