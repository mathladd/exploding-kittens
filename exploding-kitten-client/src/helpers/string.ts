import { ENCRYPTION_SALT } from 'constants/config';

const textToChars = (text: string) => text.split('').map((c) => c.charCodeAt(0));

export const stringEncryption = (salt: string, str: string) => {
  if (!str) return '';

  const byteHex = (n: number) => `0${Number(n).toString(16)}`.slice(-2);
  // eslint-disable-next-line no-bitwise
  const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code) as number;
  return str?.split('')?.map(textToChars)?.map(applySaltToChar)?.map(byteHex)?.join('');
};

export const stringDecryption = (salt: string, encoded: string) => {
  if (!encoded) return '';
  // eslint-disable-next-line no-bitwise
  const applySaltToChar = (code: number) => textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded
    ?.match(/.{1,2}/g)
    ?.map((hex) => parseInt(hex, 16))
    ?.map(applySaltToChar)
    ?.map((charCode) => String.fromCharCode(charCode))
    ?.join('');
};

export const hashPass = ({ username, password }: { username: string; password: string }) =>
  stringEncryption(ENCRYPTION_SALT, `${username}${password}`);
