import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto-js';

const secretKey = 'httpholigans'; 

@Injectable()
export class DataHashService {

  async encryptData(data: string): Promise<string> {
    const ciphertext = await crypto.AES.encrypt(data, secretKey).toString();
    return ciphertext;
  }
  async decryptData(encryptedData: string): Promise<string> {
    const bytes = await crypto.AES.decrypt(encryptedData, secretKey);
    const originalData = await bytes.toString(crypto.enc.Utf8);
    return originalData;
  }

}
