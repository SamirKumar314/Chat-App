const API_URL = 'http://localhost:5000';

//fetched messages from backend
async function loadMessages() {
    const res = await fetch(`${API_URL}/messages`);
    const messages = await res.json();
    const container = document.querySelector('.chat-messages');
    container.innerHTML = "";
    messages.forEach(msg => {
        const div = document.createElement('div');
        div.classList.add('message');
        div.classList.add((msg.sender === 'Myself' || msg.sender === 'Anonymous') ? 'sent' : 'received');
        div.innerHTML = `<b>${msg.sender}:</b> ${msg.message}`;
        container.appendChild(div);
    });
}

//send message to backend
document.querySelector('#sendBtn').addEventListener('click', async () => {
    const input = document.querySelector('#messageInput');
    const message = input.value.trim();
    if (!message) return;
    await fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: "Myself", message })
    })
    input.value = "";
    loadMessages();
})

//toggle incognito mode
document.querySelector('#hideBtn').addEventListener('click', async () => {
    const res = await fetch(`${API_URL}/toggle-incognito`, { method: "POST" });
    const data = await res.json();
    console.log('Incognito mode is now: ', data.incognito);
    if(data.incognito){
        document.querySelector('#incgImg').setAttribute("src", "images/incognitoON.png")
        document.querySelector('.chat-mode').innerHTML = "You are now appearing as Anonymous";
    }else{
        document.querySelector('#incgImg').setAttribute("src", "images/incognito.png")
        document.querySelector('.chat-mode').innerHTML = "";
    }

    loadMessages();
})

setInterval(loadMessages, 5000)
loadMessages();