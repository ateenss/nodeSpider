
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
class messageQueue{
    constructor(maxNumber){
        (maxNumber===0 & (typeof maxNumber !== 'number')) && (this.maxNumber=1);
        this.maxNumber=maxNumber;//上来设置最高并发数
    }
    /*消息队列类*/
    queue=[];//任务列表
    currentTaskNumber=0;//当前任务数
    ifStop=false;//是否暂停



    add(unit,socket,content){
        setTimeout(()=>{
            this.queue.push(unit);
            socket.write(content);
        },500);
    }
    fire(fn){
        this.queue.length>0 && setTimeout(()=>{
            fn(this.queue.shift());
        },500);
    }
}

