// Use environment variable or other secure alternative as key
const secret_key = 'Placholder key';

// Get references to the radio buttons and submit button
const encryptRadio = document.getElementById('encrypt');
const decryptRadio = document.getElementById('decrypt');
const submitButton = document.getElementById('submit-button');
const copyBtn = document.getElementById('copy-button');
const clipboard = new ClipboardJS('#copy-button');

// Encryption function
function encryptMessage() {
    let inputText = document.getElementById("inputBox").value;
    if (inputText === "") {
        alert("Please enter some text in the input box");
        return;
    }
    let encryptedText = CryptoJS.AES.encrypt(inputText, secret_key).toString();
    document.getElementById("outputBox").innerHTML = `***Encryption Start***\n\n${encryptedText}\n\n***Encryption End***`
    document.getElementById("output-header").innerHTML = "Encrypted Text";
    toggleCopyButton();
    copyBtn.textContent = "Copy"
}

// Decryption function
function decryptMessage() {
    let inputText = document.getElementById("inputBox").value;
    let encryptedText = "";

    // Check if the input text starts with "***Encryption Start***" and ends with "***Encryption End***"
    if (inputText.startsWith("***Encryption Start***\n") && inputText.endsWith("\n***Encryption End***")) {
        // Remove the start and end lines from the input text
        inputText = inputText.split("\n");
        encryptedText = inputText[2];
    } //otherwise just use the input text
    else {
        encryptedText = inputText;
    }

    let decryptedText = CryptoJS.AES.decrypt(encryptedText, secret_key).toString(CryptoJS.enc.Utf8);
    if (!decryptedText) {
        document.getElementById("outputBox").innerHTML = "Decryption failed. Please check input or key and try again.";
        return
    } else {
        document.getElementById("outputBox").innerHTML = decryptedText;
        document.getElementById("output-header").innerHTML = "Decrypted Text";
    }
    toggleCopyButton();
    copyBtn.textContent = "Copy"
}

// Copy button toggle
function toggleCopyButton() {
    if (outputBox.textContent) {
        copyBtn.style.display = "block";
    } else {
        copyBtn.style.display = "none";
    }
}

// Copy button function on click
clipboard.on('success', function (e) {
    e.clearSelection();
    copyBtn.textContent = "Copied!";
});

clipboard.on('error', function (e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});

// Add event listeners to the radio buttons
encryptRadio.addEventListener("change", function () {
    submitButton.onclick = encryptMessage;
    toggleCopyButton();
});

decryptRadio.addEventListener("change", function () {
    submitButton.onclick = decryptMessage;
    toggleCopyButton();
});


// Initialize the submit button to encrypt by default
submitButton.onclick = encryptMessage;


