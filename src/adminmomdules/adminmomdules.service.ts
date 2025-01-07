import { Injectable, HttpException } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class AdminmomdulesService {
  private readonly LK = 'aB$7*Jk@9oLp^z+Xy!3&dFq(W0#Vc1n1';

  constructor() {}

  encrypt(text: string, K: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(K), iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  }

  decrypt(encryptedText: string, K: string): string {
    const [ivHex, encrypted] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(K), iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
  }

  async showdata(file: Express.Multer.File): Promise<string> {
    if (!file || !file.buffer) {
      throw new HttpException('No valid file uploaded', 400);
    }

    const encryptedContent = file.buffer.toString('utf-8');
    console.log('Encrypted content:', encryptedContent);

    const decryptedData = this.decrypt(encryptedContent, this.LK);
    console.log('Decrypted data:', decryptedData);

    let data;
    try {
      data = JSON.parse(decryptedData);
      return data; 
    } catch (error) {
      console.error('Error parsing JSON:', decryptedData);
      throw new Error('Decrypted data is not valid JSON');
    }

  }

  async createacess(data: any, file: Express.Multer.File): Promise<void> {
    if (data?.canAccess === undefined || data?.canAccess === false) {
      data.canAccess = true;
    }
  
    const updatedJsonData = JSON.stringify(data, null, 2);
  
    const combinedKey = (data.pId + '2h%7J^yLn@Wt#4P|XsC<9z*(Rb?Qx>Vs').slice(0, 32).padEnd(32, '0');
    
    const reEncryptedData = this.encrypt(updatedJsonData, combinedKey);
  
    const uploadDir = path.resolve('uploads');
    const uploadPath = path.join(uploadDir, `${file.filename}-re-encrypted.enc`);
  
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
  
    fs.writeFileSync(uploadPath, reEncryptedData, 'utf-8');
    console.log('File re-encrypted and saved:', uploadPath);
  }
  
  
}
