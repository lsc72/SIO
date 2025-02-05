function base32ToHex(base32) {
    const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let bits = '';
    let hex = '';

    for (let i = 0; i < base32.length; i++) {
        const val = base32Chars.indexOf(base32.charAt(i).toUpperCase());
        bits += val.toString(2).padStart(5, '0');
    }

    for (let i = 0; i + 4 <= bits.length; i += 4) {
        const chunk = bits.substring(i, i + 4);
        hex += parseInt(chunk, 2).toString(16);
    }

    return hex;
}

function generateTOTP(secret) {
    const key = base32ToHex(secret);
    const epoch = Math.round(new Date().getTime() / 1000.0);
    const time = Math.floor(epoch / 30).toString(16).padStart(16, '0');

    // CryptoJS should be available in your environment
    const hmac = CryptoJS.HmacSHA1(CryptoJS.enc.Hex.parse(time), CryptoJS.enc.Hex.parse(key));
    const offset = parseInt(hmac.toString(CryptoJS.enc.Hex).substr(-1), 16);
    const otp = (parseInt(hmac.toString(CryptoJS.enc.Hex).substr(offset * 2, 8), 16) & 0x7fffffff).toString().slice(-6);

    return otp;
}
