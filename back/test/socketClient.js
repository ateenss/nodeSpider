
const net = require('net');

let client = new net.Socket();
client.connect(6001,'localhost');
client.setEncoding('utf8');
//现在需要解决的问题是为啥用别的文件调用的话，数据发不出来，感觉就是没有成功连接上
// client.write('客户端成功连接');
client.on('connect',()=>{
    console.log('客户端已经连接');
});


client.on('error',(e)=>{
    console.log(e.message);
});


const sendDataToJava=(data)=>{
    client.write(data);
};

//都在socketClient文件里面
const tempArray=[];//可以直接把data放进去


client.on('data',(data)=>{
    // 这里必须保证用uphead拿到一个完整的数据报文，然后放到缓存数组里面
    tempArray.push(data);
});


const getDataFromJava=(log_id)=>{
    let tempData='';
    tempArray.length>0 ? tempArray.forEach((item,index)=>{
        if(log_id===item.log_id){
            tempData=item;
            tempArray.splice(index,1);
        }else{
            tempData='01';
        }
    }):tempData = '02';
    // console.log(tempData);
    return tempData;
};



module.exports={
    getDataFromJava,
    sendDataToJava
};





