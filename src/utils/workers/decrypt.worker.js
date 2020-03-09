import * as decryptMain from './decrypt.main';

export default async function decrypt(hexEncryptedKey, password) {
  return decryptMain.decrypt(hexEncryptedKey, password);
}
