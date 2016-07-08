import { omit } from 'lodash';
import { algorithms, format } from '../crypto';

export default class User {
  constructor(name) {
    this.name = name;
  }

  static importPublicKey(publicKey) {
    return window.crypto.subtle.importKey(
      format,
      publicKey,
      algorithms.dh,
      true,
      ['deriveKey']
    );
  };

  static async exportPublicKey(publicKey) {
    const k = await window.crypto.subtle.exportKey(format, publicKey);
    return omit(k, 'key_ops', 'ext');
  }

  generateKeyPair() {
    return window.crypto.subtle.generateKey(
      algorithms.dh,
      true,
      ['deriveKey']
    )
    .then(keyPair => {
      this.privateKey = keyPair.privateKey;
      this.publicKey = keyPair.publicKey;
      return keyPair;
    });
  }


  deriveSharedKey(publicKey) {
    return window.crypto.subtle.deriveKey(
      { 
        ...algorithms.dh,
        public: publicKey,
      },
      this.privateKey,
      algorithms.aes,
      true,
      ['encrypt', 'decrypt']
    );
  }
}
