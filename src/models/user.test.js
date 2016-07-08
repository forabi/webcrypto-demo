import User from './user';
import bluebird from 'bluebird';
import expect from 'expect';
import { format } from '../crypto';

describe('User', () => {
  before(function() {
    this.person = new User('Alice');
  });

  it('should be able to generate public+private key pair', async function() {
    await this.person.generateKeyPair();
    expect(this.person.publicKey).toExist();
    expect(this.person.privateKey).toExist();
  });

  it('should be able to export public key in specified format', function() {
    return window.crypto.subtle.exportKey(format, this.person.publicKey);
  });
});

describe('Sharing secrets', function() {
  beforeEach(function() {
    this.alice = new User('Alice');
    this.bob = new User('Bob');
  });

  it('each side should be able to derive the shared key', async function() {
    const [aKey, bKey] = await bluebird.each([
      this.alice,
      this.bob,
    ], p => p.generateKeyPair())

    const [aliceKey, bobKey] = await bluebird.map([
      this.alice.deriveSharedKey(this.bob.publicKey),
      this.bob.deriveSharedKey(this.alice.publicKey),
    ], derivedKey => window.crypto.subtle.exportKey('jwk', derivedKey));

    expect(aliceKey).toEqual(bobKey);
  });

  it('each side should be able to derive the shared key after export', async function() {
    const [aKey, bKey] = await bluebird.each([
      this.alice,
      this.bob,
    ], p => p.generateKeyPair())
    .map(({ publicKey }) => User.exportPublicKey(publicKey))
    .map(exportedKey => User.importPublicKey(exportedKey))

    const [aliceKey, bobKey] = await bluebird.map([
      this.alice.deriveSharedKey(this.bob.publicKey),
      this.bob.deriveSharedKey(this.alice.publicKey),
    ], derivedKey => window.crypto.subtle.exportKey(format, derivedKey));

    expect(aliceKey).toEqual(bobKey);
  });
});


