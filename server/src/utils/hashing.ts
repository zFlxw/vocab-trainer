import crypto from 'crypto';

export class Hashing {
    delimiter = '';

    constructor(delimiter?: string) {
        this.delimiter = delimiter || '.';
    }

    hash(password: string, saltLength?: number): string {
        const salt: string = crypto.randomBytes(saltLength || 16).toString('hex');
        const hashKey = crypto
            .scryptSync(password, salt, 64)
            .toString('hex');

        return hashKey + this.delimiter + salt;
    }

    verify(hash: string, password: string): boolean {
        if (!hash.includes(this.delimiter)) {
            return false;
        }

        const [hashKey, salt] = hash.split(this.delimiter || ".");
        const newKey: string = crypto
            .scryptSync(password, salt, 64)
            .toString('hex');

        return hashKey === newKey;
    }
}