class messageQueue {
    /*消息队列类*/
    constructor(maxNumber) {
        (maxNumber === 0 || (typeof maxNumber !== 'number')) ? (this.maxNumber = 1)
            : (this.maxNumber = maxNumber);//设置最高队列内数量
        this.queue = [];//任务列表
        this.currentTaskNumber = 0;//当前任务数
        this.ifStop = false;//是否暂停
    }

    //清空队列
    clear() {
        this.queue.length=0;
        return this;
    }

    //暂停任务队列
    pause(){
        this.ifStop=true;
        return this;
    }

    //恢复任务队列
    resume(){
        this.ifStop=false;
        return this;
    }


    //添加任务
    add(msg){
        this.queue.push(msg);
        return this;
    }

    //查询任务数
    queryNumber(){
        return this.queue.length;
    }

    //运行
    fire(){
        if(!this.ifStop){
            //计算可以运行任务
            let leftRunTaskNumber = this.maxNumber - this.currentTaskNumber;
            let canRunTaskNumber = 0; //保存最终可以运行的任务数量
            let canRunTaskArray=[];
            leftRunTaskNumber - this.queue.length > 0 ? canRunTaskNumber = this.queue.length
                : canRunTaskNumber = leftRunTaskNumber;
            while(canRunTaskNumber){
                this.queue.length>0 &&canRunTaskArray.push(this.queue.shift()||function () {});
                canRunTaskNumber--;
            }
            ((obj)=>{
                if(canRunTaskArray.length>0){
                    canRunTaskArray.forEach((item)=>{
                        obj.currentTaskNumber++;
                        item().then((msg)=>{
                            console.log(msg);//todo:这里负责处理队列里的东西(核心处理函数)
                            if(obj.queryNumber() && obj.currentTaskNumber--){
                                if(obj.maxNumber-obj.currentTaskNumber>0 && obj.ifStop===false){
                                    setTimeout(()=>{
                                        obj.fire();
                                    },50);
                                }
                            }
                        });
                    });
                }else{
                    setTimeout(()=>{
                        obj.fire();
                    },50);
                }
            })(this);

        }
    }

}

const getData=(socket)=>{
    return new Promise((resolve, reject) => {
        socket.on('data',(data)=>{
            resolve(data);
        });
        socket.on('error',err=>{
            reject(err);
        });
        socket.on('close',info=>{
            reject(info);
        });
    });
};

//实验动作区
let messageQueue1 = new messageQueue(10);

console.log(messageQueue1.maxNumber);


