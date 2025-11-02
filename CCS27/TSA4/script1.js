document.getElementById('save').addEventListener('click', function(event) {
event.preventDefault();

const IDnum = document.getElementById('IDnum').value;
const Fname = document.getElementById('Fname').value;
const Mname = document.getElementById('Mname').value;
const Lname = document.getElementById('Lname').value;
const Gender = document.getElementById('Gender').value;
const Bday = document.getElementById('Bday').value;

const tablebody = document.getElementById('datatable');

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
BdayCell.textContent = Bday;

document.getElementById('dataform').reset();

})

const savebutton = document.getElementById('save');

savebutton.addEventListener('mouseover', () => {
    savebutton.style.padding = '25px 40px';
    savebutton.style.backgroundColor = '#ffff00';
    savebutton.style.color = 'black';
})

savebutton.addEventListener('mouseout', () => {
    savebutton.style.padding = '10px 20px';
    savebutton.style.backgroundColor = '#ff00ff';
    savebutton.style.color = 'white';
})

const clearbutton = document.getElementById('clear');

clearbutton.addEventListener('mouseover', () => {
    clearbutton.style.padding = '25px 40px';
    clearbutton.style.backgroundColor = '#ff7900';
    clearbutton.style.color = 'black';
})

clearbutton.addEventListener('mouseout', () => {
    clearbutton.style.padding = '10px 20px';
    clearbutton.style.backgroundColor = '#ff00ff';
    clearbutton.style.color = 'white';
})


document.getElementById('clear').addEventListener('click', function(event){
    event.preventDefault();
    document.getElementById('dataform').reset();
    document.getElementById('datatable').innerHTML = "";
    
})