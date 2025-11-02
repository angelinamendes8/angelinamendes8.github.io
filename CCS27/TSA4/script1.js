document.getElementById('dataform').addEventListener('save', function(event) {

const IDnum = document.getElementById('IDnum').value;
const Fname = document.getElementById('Fname').value;
const Mname = document.getElementById('Mname').value;
const Lname = document.getElementById('Lname').value;
const Gender = document.getElementById('Gender').value;
const Bday = document.getElementById('Bday').value;

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

document.getElementById('dataform').reset();

})

