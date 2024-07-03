const passwordBox = document.getElementById("password");
const length = 18;

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "`~!@#{$%^&*(){}[]-_=+\|;:,./<>?";

const allChars = upperCase + lowerCase + numbers + symbols;

function getRandomChar(str) {
    // This line creates a new Uint8Array (an array of 8-bit unsigned integers) with one element.
    // Initially, the value in the array is 0.
    const byte = new Uint8Array(1);
    // This line fills the byte array with cryptographically strong random values.
    // The value inside byte will be a random number between 0 and 255. For example, let's say it's 163.
    window.crypto.getRandomValues(byte);
    // It takes the random byte value and finds the remainder when dividing by the length of the str string.
    // This ensures that the index is within the bounds of the string.
    // If str is the uppercase alphabet "ABCDEFGHIJKLMNOPQRSTUVWXYZ", then str.length is 26.
    // So, 163 % 26 equals 7.
    const index = byte[0] % str.length;
    // This line returns the character at the calculated index in the string str.
    // So, if str is "ABCDEFGHIJKLMNOPQRSTUVWXYZ" and the random byte value was 163, the function would return "H".
    // str[index] = str[7]
    return str[index];
}

function createPassword() {
    let password = [
        getRandomChar(upperCase),
        getRandomChar(lowerCase),
        getRandomChar(numbers),
        getRandomChar(symbols)
    ];

    for (let i = 4; i < length; i++) {
        password.push(getRandomChar(allChars));
    }

    // Shuffle to avoid predictable character sequence.
    // If Math.random() returns a number less than 0.5, the result will be positive.
    // If Math.random() returns a number greater than 0.5, the result will be negative.
    // A positive return value (0.5 - Math.random() > 0) means the first element should come after the second.
    // A negative return value (0.5 - Math.random() < 0) means the first element should come before the second.
    password = password.sort(() => 0.5 - Math.random());

    passwordBox.value = password.join('');
}

function copyPassword() {
    navigator.clipboard.writeText(passwordBox.value)
        .then(() => alert('Password copied to clipboard!'))
        .catch(err => console.error('Error in copying text: ', err));
}
