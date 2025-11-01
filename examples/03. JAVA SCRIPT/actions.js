// Select all input elements
let firstnum = document.getElementById('firstnum');
let secondnum = document.getElementById('secondnum');

// Select all buttons
let btnadd = document.getElementById('btnadd');
let btnsubtract = document.getElementById('btnsubtract');
let btnmultiply = document.getElementById('btnmultiply');
let btndivide = document.getElementById('btndivide');

// Select the result element
let result = document.getElementById('result');

// Set event listeners to buttons
btnadd.addEventListener('click',()=>{
    var num1 = parseFloat(firstnum.value);
    var num2 = parseFloat(secondnum.value);
    var sum = num1 + num2;

    result.textContent = sum;
});

btnsubtract.addEventListener('click',()=>{
    var num1 = parseFloat(firstnum.value);
    var num2 = parseFloat(secondnum.value);
    var difference = num1 - num2;

    result.textContent = difference;
});

btnmultiply.addEventListener('click',()=>{
    var num1 = parseFloat(firstnum.value);
    var num2 = parseFloat(secondnum.value);
    var product = num1 * num2;

    result.textContent = product;
});

btndivide.addEventListener('click',()=>{
    var num1 = parseFloat(firstnum.value);
    var num2 = parseFloat(secondnum.value);
    var quotient = num1 / num2;

    result.textContent = quotient;
});