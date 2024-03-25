
let http = new XMLHttpRequest();

http.open('get', 'database.json', true);

http.send();
http.onload = function (){
 if(this.readyState == 4 && this.status == 200){
     let database = JSON.parse(this.responseText);

     let output = "";
     for(let key in database){
         if (database.hasOwnProperty(key)) {
             let item = database[key];
             output += `<div class="database"> <p class="name">Name : ${item.name}</p><p class="pesan">Pesan : ${item.pesan}</p></div>`;
         }
     }
     document.getElementById('adminData').innerHTML = output;
 }
};

document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nameInput = document.getElementById('nameInput').value;
    const dataInput = document.getElementById('dataInput').value;
    sendDataToServer(nameInput, dataInput);
});
document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nameInput = document.getElementById('nameInput').value;
    const dataInput = document.getElementById('dataInput').value;
    sendDataToServer(nameInput, dataInput);
});

function sendDataToServer(nameInput, dataInput) {
    const dataArray = dataInput.split(',').map(item => item.trim());
    const payload = {
        name: nameInput,
        data: dataArray
    };

    fetch('/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Data sent successfully!');
        document.getElementById('nameInput').value = '';
        document.getElementById('dataInput').value = '';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error occurred while sending data!');
    });
}
