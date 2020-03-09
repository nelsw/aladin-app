import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import Modal from './DynamicModal';
import successModalFlag from './SuccessModal';
import Auth from './Auth';
import User from './User';
import Dapp from './Dapp';
import Profile from './Profile';
import RegisterDapp from './RegisterDapp';
import SocialFeed from './SocialFeed';

export default history =>
  combineReducers({
    router: connectRouter(history),
    modal: Modal,
    successModal: successModalFlag,
    auth: Auth,
    user: User,
    dapp: Dapp,
    profile: Profile,
    dappRegister: RegisterDapp,
    socialFeed: SocialFeed,
  });
