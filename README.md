# Purpose
App to encrypt & decrypt messages.

## Config
1)
Set a secret in environment variables.
In encrypter_backend, edit the secret_key variable to use your env variable
In encrypter_backend, edit the port to your preference


2)
In app.js (frontend), edit the backendPort variable to match the port you set up for the backend.

3)
Start the backend using
{code}node encrypt_backend{code} or {code}pm2 start encrypt_backend{code}

4)
Setup and start nginx to serve the index.html

## How to use

#### Encrypt
Select the "Encryt" button and input your text/message.
Clicking submit will show the encrypted message in the output field.
You can copy the output using the copy button.

#### Decrypt
Enter the encrypted message into the input field.
Selet the "Decrypt" button and submit.
The decrypted message shows in the output field.