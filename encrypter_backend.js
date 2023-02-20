const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const CryptoJS = require("crypto-js");
const cors = require('cors');

// using environment variable
const secret_key = process.env.YOUR_SECRET_KEY


app.use(express.static('public'));
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());



app.post('/encrypt', (req, res) => {
    // Get the input text from the request body
    const inputText = req.body.inputText;

    // Use the encryption function from the 'crypto-js' library to encrypt the input text
    const encryptedText = CryptoJS.AES.encrypt(inputText, secret_key).toString();

    // Send the encrypted text back to the front-end as the response
    res.send(encryptedText);
});


app.post('/decrypt', (req, res) => {
    // Get the input text from the request body
    const encryptedText = req.body.encryptedText;

    // Use the decryption function from the 'crypto-js' library to decrypt the input text
    const decryptedText = CryptoJS.AES.decrypt(encryptedText, secret_key).toString(CryptoJS.enc.Utf8);

    // Send the decrypted text back to the front-end as the response
    res.send(decryptedText);
});

app.listen(8000, () => {
    console.log('Server listening on port 8000');
});