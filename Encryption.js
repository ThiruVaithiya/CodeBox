const crypto = require('crypto');

// Key derivation
var password = 'hjrrffutdlyWkQdL7Oo';
var salt = crypto.randomBytes(16); // some random salt
var digest = 'sha256';
var length = 16;
var iterations = 10000; 
var key = crypto.pbkdf2Sync(password, salt, iterations, length, digest);
//Checking the crypto module

const algorithm = 'aes-128-cbc'; //Using AES encryption
// const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

//Encrypting text
function encrypt(text) {
   let cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(key), iv);
   let encrypted = cipher.update(text);
   encrypted = Buffer.concat([encrypted, cipher.final()]);
   return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

// Decrypting text
function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

// Text send to encrypt function
var hw = encrypt("ArZEtS0UtI6O7F1AmfV5sdffeeeeddg")
console.log(hw)
console.log(decrypt(hw))
