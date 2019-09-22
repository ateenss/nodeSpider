const net=require('net');

const server = net.createServer((socket) => {
    /*setTimeout(()=>{
        socket.write('这是服务器发出的信息');
    },3000);*/
    socket.on('data',(data)=>{
        console.log(`这是服务器端接收到的信息: ${data}`);
        /*data.msg=data.msg+'：：這其實是服務段處理的數據';
        socket.write(data);*/

    });
});

server.on('error', (e) => {
    // 处理错误
    if (e.code === 'EADDRINUSE') {
        console.log('地址正被使用，重试中...');
        setTimeout(() => {
            server.close();
            server.listen(6001, '127.0.0.1');
        }, 1000);
    }
});

server.listen(6001,() => {
    console.log('打开服务器', server.address());
});