import { randomUUID } from 'crypto';
import * as os from 'os';
import dns from 'dns';
import { nanoid } from 'nanoid';
import * as bcrypt from 'bcrypt';

export const codeGenerate = (): string => {
  return randomUUID().slice(0, 6);
};

export const encodePassword = (password: string) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

export const generateID = async (): Promise<any> => {
  return new Promise((resolve) => {
    resolve(nanoid(12));
  });
};

export const getServerIp = (): string => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    const nets = interfaces[name];
    if (nets) {
      for (const net of nets) {
        if (net.family === 'IPv4' && !net.internal) {
          return net.address;
        }
      }
    }
  }
  return '127.0.0.1';
};

export const hasInternetConnection = (): Promise<boolean> => {
  return new Promise((resolve) => {
    dns.lookup('google.com', (err) => {
      resolve(!err);
    });
  });
};
