const scriptURL = 'https://script.google.com/macros/s/AKfycbzfo80aANoAbAQsEY4CKow8SfFOoibA_Lk0VnbZ-7n8rxrrF5pc62guVF2yxRabkx46/exec';
const form = document.forms['submit-to-google-sheet'];

form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(form);
  const jsonData = {};
  formData.forEach((value, key) => {
    jsonData[key] = value;
  });

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => console.log('Success!', response))
    .catch(error => console.error('Error!', error.message));
});

const navLinks = document.querySelector('.nav-links');

function onToggleMenu(e) {
  e.name = e.name === 'menu' ? 'close' : 'menu';
  navLinks.classList.toggle('top-[9%]');
}

document.getElementById('toggleFormBtn').addEventListener('click', function () {
  var form = document.getElementById('form');
  if (form.style.display === 'none') {
    form.style.display = 'block';
  } else {
    form.style.display = 'none';
  }
});

document.getElementById('messageForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);
  const jsonData = {};
  formData.forEach((value, key) => {
      jsonData[key] = value;
  });

  const responseData = await fetch('/saveData', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
  }).then(response => response.json());
  
  console.log(responseData);

  // Tambahkan kode untuk menampilkan popup sukses
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.textContent = 'Data berhasil terkirim!';
  document.body.appendChild(popup);

  // Setelah 3 detik, hilangkan popup dan sembunyikan form
  setTimeout(() => {
    popup.remove();
    document.getElementById('hilang').style.display = 'none';
  }, 3000);
});


// Mendapatkan data dari database.json
let httpDatabase = new XMLHttpRequest();
let databaseFilePath = 'database.json'; // Jalur relatif ke database.json dari scripts.js

httpDatabase.open('GET', databaseFilePath, true);
httpDatabase.send();

httpDatabase.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
        let database = JSON.parse(this.responseText);

        let output = "";
        for (let key in database) {
            if (database.hasOwnProperty(key)) {
                let item = database[key];
                output += `<div class="database"> <p class="name">Name : ${item.name}</p><p class="pesan">Pesan : ${item.pesan}</p></div>`;
            }
        }
        document.getElementById('adminDatas').innerHTML = output;
    }
};
