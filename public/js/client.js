const socket = io();
const user = document.getElementById('user-input');
const message = document.getElementById('message-input');
const btn = document.getElementById('btn-submit');
const chat = document.getElementById('chat-message');
const dataWrite =document.getElementById('txtWrite');

message.addEventListener('keypress',()=>{
    socket.emit('messageWrite',`${user.value} está escribiendo...`)    
});
message.addEventListener('touchstart',()=>{
    socket.emit('messageWrite',`${user.value} está escribiendo...`)    
});

socket.on('messageServerWrite',(data)=>{
    dataWrite.innerHTML = `<p class="mt-2">${data}</p>`;
})

btn.addEventListener('click',()=>{
    socket.emit('messageClient',{
        userName:user.value,
        message:message.value
    });
    message.value='';
});
socket.on('messageServer',(data)=>{
    dataWrite.innerHTML='';
    chat.innerHTML +=`
    <p><strong>${data.userName}</strong>: ${data.message}</p>
    `;
})
