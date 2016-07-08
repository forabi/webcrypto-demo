export const format = 'jwk';

export const algorithms = {
  dh: {
    name: 'ECDH',
    namedCurve: 'P-256', // can be "P-256", "P-384", or "P-521"
  },
  aes: {
    name: 'AES-CTR',
    length: 256, // can be  128, 192, or 256
  },
};
