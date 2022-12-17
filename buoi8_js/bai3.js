var courses = ['C++', 'Java', 'JavaScript'];

function addCourses(arr, add) {
    arr.push(add);
}
//them phan tu vao mang 
addCourses(courses, 'Go');
console.log(courses);
//lay phan tu dau tien 
function getFirstElement(arr) {
    return arr[0]
}

var firstElement = getFirstElement(courses);
console.log(firstElement);

//noi cac phan tu mang thanh 1 chuoi
function joinArr(arr, b) {
    var a = '';
    for (var i = 0; i < arr.length; i++) {
        if (i == arr.length - 1) //phan tu cuoi cung
            a += arr[i];
        else
            a += arr[i] + b;
    }
    return a;
}

var result1 = joinArr(courses, ", ");
var result2 = joinArr(courses, " * ")
console.log(result1);
console.log(result2);