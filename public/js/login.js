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
  