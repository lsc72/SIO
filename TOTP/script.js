        // Fonction pour générer un code TOTP
        function generateTOTP(secret) {
            const epoch = Math.floor(Date.now() / 1000);
            const time = Math.floor(epoch / 30);
            // Implémentation simple de l'algorithme TOTP
            function sha1(message) {
                const crypto = window.crypto.subtle;
                const encoder = new TextEncoder();
                const data = encoder.encode(message);
                return crypto.digest('SHA-1', data).then(hash => {
                    return Array.from(new Uint8Array(hash));
                });
            }
	    function base32Encode(str) {
            	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
            	let binString = '';
            	for (let i = 0; i < str.length; i++) {
                	binString += str.charCodeAt(i).toString(2).padStart(8, '0');
            	}
            	let base32 = '';
            	for (let i = 0; i < binString.length; i += 5) {
                	base32 += alphabet[parseInt(binString.slice(i, i + 5), 2)];
            	}
            	return base32;
            }
            function base32ToUint8Array(base32) {
                const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
                const bytes = [];
                let bits = 0;
                let buffer = 0;

                for (let char of base32) {
                    buffer = (buffer << 5) | base32Chars.indexOf(char);
                    bits += 5;

                    if (bits >= 8) {
                        bytes.push((buffer >> (bits - 8)) & 255);
                        bits -= 8;
                    }
                }

                return new Uint8Array(bytes);
            }

            function truncate(bytes) {
                const offset = bytes[bytes.length - 1] & 0xf;
                return (
                    ((bytes[offset] & 0x7f) << 24) |
                    ((bytes[offset + 1] & 0xff) << 16) |
                    ((bytes[offset + 2] & 0xff) << 8) |
                    (bytes[offset + 3] & 0xff)
                );
            }

            // Génération du code TOTP
            const hmacKey = base32ToUint8Array(secret);
            const message = new Uint8Array(8);
            const view = new DataView(message.buffer);
            view.setBigUint64(0, BigInt(time), false);

            crypto.subtle.importKey(
                'raw', 
                hmacKey, 
                { name: 'HMAC', hash: 'SHA-1' }, 
                false, 
                ['sign']
            ).then(key => 
                crypto.subtle.sign('HMAC', key, message)
            ).then(signature => {
                const bytes = new Uint8Array(signature);
                const code = truncate(bytes) % 1000000;
                document.getElementById('totp').textContent = 
                    `${code.toString().padStart(6, '0')}`;
            });
        }

        // Mise à jour de l'heure et du code TOTP
        function updateTimeAndTOTP() {
            const now = new Date();
            document.getElementById('time').textContent = `${now.toLocaleTimeString()}`;
            generateTOTP(document.getElementById('sB32').value);
        }