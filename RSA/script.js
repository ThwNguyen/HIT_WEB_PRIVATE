function multiplied(mx, ex, nx) {
    let a = [];

    let k = 0;
    do {
        a[k] = ex % 2;
        k++;

        ex = Math.floor(ex / 2);
    } while (ex != 0);

    let kq = 1;

    for (let i = k - 1; i >= 0; i--) {
        kq = (kq * kq) % nx;

        if (a[i] == 1) {
            kq = (kq * mx) % nx;
        }
    }

    return kq;
}

function isPrime(n) {
    if (n < 2) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}

// Kiểm tra xem hai số có phải là số nguyên tố cùng nhau hay không
function isCo_prime(a, b) {
    let u = a;
    let v = b;
    while (v != 0) {
        let r = u % v;
        u = v;
        v = r;
    }
    return (u == 1);
}

// Hàm tìm số nguyên tố cùng nhau với một số n trong khoảng [1, n]
function co_prime(n) {
    for (let i = 2; i < n; i++) {
        if (isCo_prime(i, n))
            return i;
    }
    return false;
}

// Hàm tính nghịch đảo modulo của a modulo n
function extendEuclid(a, n) {
    let t = 0, t1 = 1, r = n, r1 = a;
    while (r1 != 0) {
        let q = Math.floor(r / r1);
        let temp = t;
        t = t1;
        t1 = temp - q * t1;
        temp = r;
        r = r1;
        r1 = temp - q * r1;
    }
    if (t < 0) t = (t % n + n) % n;
    return t;
}

// Hàm sinh số nguyên tố ngẫu nhiên trong khoảng [min, max]
function randomPrime(min, max) {
    let prime;
    do {
        prime = Math.floor(Math.random() * 1000 + 17);
    } while (!isPrime(prime));
    return prime;
}

// Kiểm tra xem một số có phải là số nguyên tố hay không

// Khởi tạo một cặp khóa RSA ngẫu nhiên
function generateKeyPair() {
    var p, q, n, phi, e, d;
    do {
        p = randomPrime(1000, 17);
        q = randomPrime(1000, 15);
        n = p * q;
        phi = (p - 1) * (q - 1);
        e = co_prime(phi);
        d = extendEuclid(e, phi);
    } while (p == q || e == false);

    // Trả về một object chứa khóa công khai và khóa bí mật
    return {
        publicKey: { e: e, n: n },
        privateKey: { d: d, n: n }
    }
}
const key = generateKeyPair();

function showKey() {
    let pubKey = document.querySelector('#public_key');
    let prKey = document.querySelector('#private_key');
    pubKey.value = (`E: ${key.publicKey.e}, N: ${key.publicKey.n}`);
    prKey.value = (`D: ${key.privateKey.d}, N: ${key.privateKey.n}`);

}
showKey()
function encrypt(m, e, n) {
    let k = "";

    for (let i = 0; i < m.length; i++) {
        let temp = m.charCodeAt(i);

        k += multiplied(temp, e, n);

        if (i != m.length - 1) k += "-";
    }

    return k;
}


function decrypt(c, d, n) {
    let s = [];
    let count = 0;
    for (let i = 0; i < c.length; i++)
        if (c[i] == "-") count++;

    count += 1;

    let tokens = c.split("-");
    let i = 0;
    for (let token of tokens) {
        s[i] = parseInt(token);
        i++;
    }

    let m = "";

    for (let i = 0; i < count; i++) {
        m += String.fromCharCode(multiplied(s[i], d, n));
    }

    return m;
}


var plaintext, ciphertext;

function doEncrypt() {
    var textareaContentLeftInput = document.querySelector(".main_left_content_input");
    if (textareaContentLeftInput.value == "") {
        alert("Bạn cần nhập văn bản ký!")
    }
    plaintext = textareaContentLeftInput.value; // Chuỗi ban đầu
    ciphertext = encrypt(plaintext, key.publicKey.e, key.publicKey.n); // Mã hóa
    var textareaContentLeftAfterInput = document.querySelector("#main_left_content_after_input");
    textareaContentLeftAfterInput.value = ciphertext;
    console.log(plaintext, ciphertext)
    // console.log("Chuỗi ban đầu: " + vanban);
    // console.log("Chữ ký: " + chuky);
}

function moveValue() {
    let value1 = document.querySelector('#main_left_content_after_input');
    let value2 = document.querySelector('.main_right_content_input');
    value2.value = value1.value;
}

function doDecrypt() {
    var textareaContentRightInput = document.querySelector('.main_right_content_input');
    ciphertext = textareaContentRightInput.value;
    plaintext = decrypt(ciphertext, key.privateKey.d, key.privateKey.n); // Giải mã
    var textareaContentRightAfterInput = document.querySelector('#decryption');
    textareaContentRightAfterInput.value = plaintext;

}

var textareaContent = document.querySelector('.main_left_content_input');

function parseWordDocxFile(inputElement) {
    const fileNormal = inputElement.files[0];
    if (fileNormal.type === 'text/plain') {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            const fileContent = reader.result;
            textareaContent.value = fileContent;
        });
        reader.readAsText(fileNormal);
    }
    else {
        var files = inputElement.files || [];
        if (!files.length)
            return;
        var file = files[0];
        console.time();
        var reader = new FileReader();
        reader.onloadend = function (event) {
            var arrayBuffer = reader.result;
            mammoth.extractRawText({ arrayBuffer: arrayBuffer }).then(function (resultObject) {
                var textarea = document.querySelector('.main_left_content_input');
                textarea.innerHTML = resultObject.value;
                console.log(resultObject.value);
            });
            console.timeEnd();
        };
        reader.readAsArrayBuffer(file);
    }
}

function activateInput() {
    let input = document.getElementById('main_left_content_btn_sub_file');
    input.click();
}

function activateInput2() {
    let input = document.getElementById('main_right_content_btn_sub_file');
    input.click();
}

const saveBtn = document.querySelector('.main_left_content_btn_save');
const textarea = document.querySelector('#main_left_content_after_input');


function saveFile() {
    const textareaValue = textarea.value;
    if (textareaValue == '')
        alert('ban ro trong');
    const blob = new Blob([textareaValue], { type: 'text/plain' }); //chua gia tri tra ve
    const link = document.createElement('a'); //anchor thuc hien tai ve
    const url = window.URL.createObjectURL(blob); //link de tai xuong
    link.href = url;
    link.setAttribute('download', 'file.txt');

    //them anchor vao DOM va kich
    document.body.appendChild(link);
    link.click();

    //xoa anchor va url
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

saveBtn.addEventListener('click', saveFile);

// const textareaContentRight = document.querySelector('.btn main_right_content_btn');
var textareaContentRight = document.querySelector('.main_right_content_input');
// console.log(textareaContentRight.value)

function parseWordDocxFile2(inputElement) {
    var fileNormal2 = inputElement.files[0];
    if (fileNormal2.type === 'text/plain') {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            const fileContent2 = reader.result;
            console.log(typeof fileContent2);
            textareaContentRight.value = fileContent2;
            // console.log(textareaContentRight.value);
        });
        reader.readAsText(fileNormal2);
    }
    else {
        let files = inputElement.files || [];
        if (!files.length)
            return;
        let file = files[0];
        console.time();
        let reader = new FileReader();
        reader.onloadend = function (event) {
            let arrayBuffer = reader.result;
            mammoth.extractRawText({ arrayBuffer: arrayBuffer }).then(function (resultObject) {
                let textarea = document.querySelector('.main_right_content_btn');
                textarea.innerHTML = resultObject.value;
                console.log(resultObject.value);
            });
            console.timeEnd();
        };
        reader.readAsArrayBuffer(file);
    }
}




