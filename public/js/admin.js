document.getElementById('logoutBtn').addEventListener('click', function() {
    window.location.href = 'login.html';
})

document.addEventListener('DOMContentLoaded', function() {
    // Select elements
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatMessages = document.getElementById('chatMessages');
    const params = new URLSearchParams(window.location.search);
    const message = params.get('message');
    if (message) {
        // Tampilkan pesan yang diterima dari index.html
        appendMessage(message, 'received');
    }

    // Function to append a message
    function appendMessage(message, type) {
      const messageWrapper = document.createElement('div');
      const messageBox = document.createElement('div');
      const deleteButton = document.createElement('button');    
      messageWrapper.classList.add('flex', 'items-start', 'mb-2');
      messageBox.classList.add('py-2', 'px-3', 'rounded-lg', 'relative');
      deleteButton.innerHTML = '&times;';
      deleteButton.classList.add('absolute', 'top-0', 'right-0', 'text-sm', 'text-gray-400', 'p-1', 'cursor-pointer');
      deleteButton.onclick = function() {
        messageWrapper.remove();
      };

      messageBox.textContent = message;

      if (type === 'sent') {
        messageWrapper.classList.add('justify-end');
        messageBox.classList.add('bg-blue-500', 'text-white');
      } else {
        messageBox.classList.add('bg-gray-100', 'text-gray-800');
      }

      messageBox.appendChild(deleteButton);
      messageWrapper.appendChild(messageBox);
      chatMessages.appendChild(messageWrapper);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Event listener for sending message
    sendMessageBtn.addEventListener('click', function() {
      const message = messageInput.value.trim();
      if (message !== '') {
        appendMessage(message, 'sent');
        messageInput.value = '';
      }
    });

  });