document.getElementById('dataform').addEventListener('save', function(event) {

const IDnum = document.getElementById('IDnum');
const Fname = document.getElementById('Fname');
const Mname = document.getElementById('Mname');
const Lname = document.getElementById('Lname');
const Gender = document.getElementById('Gender')
const Bday = document.getElementById('Bday')

const save = document.getElementById('save');

const tablebody = document.getElementByID('datatable');

const newRow = tablebody.insertRow();

const IDnumCell= newRow.insertCell ();
const FnameCell= newRow.insertCell ();
const MnameCell= newRow.insertCell ();
const LnameCell= newRow.insertCell ();
const GenderCell= newRow.insertCell ();
const BdayCell= newRow.insertCell ();

IDnumCell.textContent = IDnum;
FnameCell.textContent = Fname;
MnameCell.textContent = Mname;
LnameCell.textContent = Lname;
GenderCell.textContent = Gender;
BdayCell.dateContent = Bday;

document.getElementById('dataform').requestFullscreen();

})

