
const net = require('net');

let client = new net.Socket();
client.connect(6001,'localhost');
client.setEncoding('utf8');
client.on('data',(chunk)=>{
    console.log(`客户端接收到信息: ${chunk}`);
});
setTimeout(()=>{
    client.write('客户端发出信息');
},3000);

client.on('error',(e)=>{
    console.log(e.message);
});

/*
关键是客户端如何解决队列问题
主要是两个难题：1.解决队列本身；2.如何将promise和socket函数融合进来
*/


