import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as crypto from 'crypto-js';

const secretKey = 'httpholigans'; 

@Injectable()
export class DataHashService {

  async encryptData(data: string): Promise<string> {
    let ciphertext: string = await crypto.AES.encrypt(data, secretKey).toString();
    ciphertext = await ciphertext.replace('+', '$')
    return ciphertext;
  }
  async decryptData(encryptedData: string): Promise<string> {
    try{
      encryptedData = await encryptedData.replace('$', '+')
      const bytes = await crypto.AES.decrypt(encryptedData, secretKey);
      const originalData = await bytes.toString(crypto.enc.Utf8);
      return originalData;
    }
    catch
    {
      throw new HttpException("Ошибка запроса", HttpStatus.BAD_REQUEST)
    }
  }

}
