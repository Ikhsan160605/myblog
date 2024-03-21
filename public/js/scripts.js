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

document.getElementById('messageForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Menghentikan pengiriman form

  // Mengambil nilai input nama dan pesan
  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('pesan').value.trim();

  // Membuat objek pesan
  const newMessage = {
    name: name,
    message: message
  };
  let existingMessages = localStorage.getItem('chatMessages');
  existingMessages = existingMessages ? JSON.parse(existingMessages) : [];
  fetch('db/chat.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMessage) // Mengubah objek menjadi JSON
  })
    .then(response => {
      if (response.ok) {
        console.log('Form data has been successfully saved.');
        // Clear the form after successful submission if needed
        messageForm.reset();
      } else {
        throw new Error('Failed to save form data. Server returned ' + response.status);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
