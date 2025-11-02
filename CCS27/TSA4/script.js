document.getElementById('dataform').addEventListener('save', function(event) {

let IDnum = document.getElementById('IDnum');
let Fname = document.getElementById('Fname');
let Mname = document.getElementById('Mname');
let Lname = document.getElementById('Lname');
let Gender = document.getElementById('Gender')
let Bday = document.getElementById('Bday')

let save = document.getElementById('save');

let tablebody = document.getElementByID('datatable');

let newRow = tablebody.insertRow();

let IDnumCell= newRow.insertCell ();
let FnameCell= newRow.insertCell ();
let MnameCell= newRow.insertCell ();
let LnameCell= newRow.insertCell ();
let GenderCell= newRow.insertCell ();
let BdayCell= newRow.insertCell ();

IDnumCell.textContent = IDnum;
FnameCell.textContent = Fname;
MnameCell.textContent = Mname;
LnameCell.textContent = Lname;
GenderCell.textContent = Gender;
BdayCell.dateContent = Bday;

})

