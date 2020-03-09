import { all } from 'redux-saga/effects';
import auth from './Auth';
import profile from './Profile';
import registerDapp from './RegisterDapp';
import dapp from './Dapp';
import socialFeed from './SocialFeed';

export default function* rootSaga(getState) {
  yield all([auth(), profile(), registerDapp(), dapp(), socialFeed()]);
}