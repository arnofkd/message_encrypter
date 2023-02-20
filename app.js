//config
backendPort = ':8000'

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

    // Send a POST request to the backend
    axios.post('http://' + window.location.hostname + backendPort + '/encrypt', { inputText: inputText })
        .then(response => {
            let encryptedText = response.data;
            document.getElementById("outputBox").innerHTML = `***Encryption Start***\n\n${encryptedText}\n\n***Encryption End***`;
            document.getElementById("output-header").innerHTML = "Encrypted Text";
            toggleCopyButton();
            copyBtn.textContent = "Copy";
        })
        .catch(error => {
            console.log(error);
        });
}

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

    // Send a POST request to the backend
    axios.post('http://' + window.location.hostname + backendPort + '/decrypt', { encryptedText: encryptedText })
        .then(response => {
            let decryptedText = response.data;
            if (!decryptedText) {
                document.getElementById("outputBox").innerHTML = "Decryption failed. Please check input or key and try again.";
                return
            } else {
                document.getElementById("outputBox").innerHTML = decryptedText;
                document.getElementById("output-header").innerHTML = "Decrypted Text";
            }
            toggleCopyButton();
            copyBtn.textContent = "Copy";
        })
        .catch(error => {
            console.log(error);
        });
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
