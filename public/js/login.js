document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    // Contoh validasi sederhana
    if (username === 'admin' && password === 'admin') {
      // Redirect ke halaman admin.html
      window.location.href = 'admin.html';
    } else {
      document.getElementById('message').innerHTML = 'Username atau password salah!';
    }
  });
  

  function doGet() {
    var sheet = SpreadsheetApp.openById('AKfycbzfo80aANoAbAQsEY4CKow8SfFOoibA_Lk0VnbZ-7n8rxrrF5pc62guVF2yxRabkx46').getActiveSheet();
    var data = sheet.getDataRange().getValues();
    var jsonData = JSON.stringify(data);
    return ContentService.createTextOutput(jsonData).setMimeType(ContentService.MimeType.JSON);
  }
  