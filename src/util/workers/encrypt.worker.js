import * as encryptMain from './encrypt.main';

export default async function encrypt(mnemonic, password) {
  return encryptMain.encrypt(mnemonic, password);
}
