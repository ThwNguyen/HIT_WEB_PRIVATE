const obj = {
    name: "Thư Nguyễn",
    age: 19,
    email: "nguyenthithu270603@gmail.com"
}

function run(obj) {
    let a = [];
    var i = 0;
    for (const b in obj)
        a[i++] = b + " : " + obj[b];
    return a;
}

console.log(run(obj));