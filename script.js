const ws = new WebSocket('ws://localhost:8080');


ws.onopen = () => {
    console.log('Conexão WebSocket estabelecida');
};


ws.onmessage = (event) => {
    if (event.data instanceof Blob) {
        console.log('Recebido um Blob, convertendo para texto...');
        const reader = new FileReader();
        reader.onload = function() {
            const messageText = reader.result; // Aqui você terá a mensagem em texto
            const messagesDiv = document.getElementById('messages');
            // Dica aplicada: Adicionada a classe msg-item na tag p
            messagesDiv.innerHTML += `<p class="msg-item">${messageText}</p>`;
        };
        reader.readAsText(event.data); // Converte o Blob para texto
    } else {
        const messagesDiv = document.getElementById('messages');
        // Dica aplicada: Adicionada a classe msg-item na tag p
        messagesDiv.innerHTML += `<p class="msg-item">${event.data}</p>`;
    }
};


ws.onerror = (error) => {
    console.error('Erro no WebSocket:', error);
};


ws.onclose = () => {
    console.log('Conexão WebSocket fechada');
};


function sendMessage() {
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;


    if (name && message) { // Verifica se os campos não estão vazios
        ws.send(`${name}: ${message}`);
        document.getElementById('message').value = '';
    } else {
        alert('Por favor, preencha seu nome e a mensagem.');
    }
}