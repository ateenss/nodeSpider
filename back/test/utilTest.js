class messageQueue {
    /*消息队列类*/
    constructor(maxNumber) {
        (maxNumber === 0 || (typeof maxNumber !== 'number')) ? (this.maxNumber = 1)
            : (this.maxNumber = maxNumber);//上来设置最高并发数
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
            let canRunTaskNumber = this.maxNumber - this.currentTaskNumber;
            let realRunTaskNumber = 0; //保存最终可以运行的任务数量
            let canRunTaskArray=[];
            canRunTaskNumber - this.queue.length > 0 ? realRunTaskNumber = this.queue.length
                : realRunTaskNumber = canRunTaskNumber;
            while(realRunTaskNumber){
                this.queue.length>0 &&canRunTaskArray.push(this.queue.shift()||function () {});
                realRunTaskNumber--;
            }
            ((obj)=>{
                canRunTaskArray.forEach((item)=>{
                    obj.currentTaskNumber++;
                    item().then((msg)=>{
                        console.log(msg);//todo:这里负责处理队列里的东西(核心处理函数)
                        if(obj.queryNumber() && obj.currentTaskNumber--){
                            if(obj.maxNumber-obj.currentTaskNumber>0 && obj.ifStop===false){
                                obj.fire();
                            }
                        }
                    });
                });
            })(this);

        }
    }



    /*add(unit,socket,content){
        setTimeout(()=>{
            this.queue.push(unit);
            socket.write(content);
        },500);
    }
    fire(fn){
        this.queue.length>0 && setTimeout(()=>{
            fn(this.queue.shift());
        },500);
    }*/
}

//实验动作区
let messageQueue1 = new messageQueue(10);

console.log(messageQueue1.maxNumber);
/*function add(){
    // this.queue=['a','b'];
    this.queue=[];
    this.k=[];
    this.k.push(this.queue.shift()||function () {});
    // return this.k[0];
    return this.k[0];
}

console.log(add());*/

