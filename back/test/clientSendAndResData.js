const {getDataFromJava,sendDataToJava} =require('./socketClient');

/*
for(let i=0;i< 10; i++){
    //这里的log_id统一用i来表示
    let data='';
    console.log(`客戶端傳輸數據了${i}`);
    sendDataToJava(new Buffer(JSON.stringify({log_id:i,msg:`这是第${i}次数据传输`})));

    while(getDataFromJava(i)==='01' || getDataFromJava(i)==='02' ){
        getDataFromJava(i);
    }
    data=getDataFromJava(i);
    console.log(data);
}*/



for(let i=0;i< 3; i++){
    //这里的log_id统一用i来表示
    let data='';
    console.log(`客戶端傳輸數據了${i}`);
    sendDataToJava(new Buffer(JSON.stringify({log_id:i,msg:`这是第${i}次数据传输`})));

    while(getDataFromJava(i)==='01'  ){
        getDataFromJava(i);
    }
    data=getDataFromJava(i);
    console.log('最終展示數據'+data);
}
