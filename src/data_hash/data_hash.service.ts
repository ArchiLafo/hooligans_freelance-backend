import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

const secretKey = 'httpholigans'; 

@Injectable()
export class DataHashService {

    public async generateKey(secret: string): Promise<Buffer> {
        return await crypto.createHash('sha256').update(secret).digest();
      }

    public async encryptData(data: string) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', await this.generateKey(secretKey), iv);
        let encryptedData = cipher.update(data, 'utf8', 'hex');
        encryptedData += cipher.final('hex');
        return encryptedData;   
    }


    public async decryptData(encryptedData: string) {
        const iv = crypto.randomBytes(16);
        const decipher = crypto.createDecipheriv('aes-256-cbc', await this.generateKey(secretKey), iv);
        let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
        decryptedData += decipher.final('utf8');
        return decryptedData;
      }

}
