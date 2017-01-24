/**
 * Created by Moon7 on 16/12/21.
 */
var fruitObj = function () {
    this.alive =[]; //布尔值.果实是否活着
    this.x = [];
    this.y = [];
    this.aneNO = []
    this.l = [] ;  // 果实的大小
    this.spd = []; // 果实的速度 生长和漂
    this.fruitType = [];
    this.orange = new Image();
    this.blue = new Image();

}

fruitObj.prototype.num = 30;

fruitObj.prototype.init = function () {

    for(var i=0;i<this.num;i++)
    {
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.aneNO[i] = 0;

        this.spd[i] = Math.random() * 0.017+0.003;  // 0.003-0.02
        this.fruitType[i] = "";
    }
    this.orange.src= "./src/fruit.png";
    this.blue.src = "./src/blue.png";
}


//画海葵
fruitObj.prototype.draw = function () {
    for(var i=0;i<this.num;i++){
        //找到海葵位置 ==>生长 ===>往外漂
        if(this.alive[i] ) {
            if(this.fruitType[i] == "blue"){
                //noinspection JSDuplicatedDeclaration
                var pic = this.blue;
            }else {
                var pic = this.orange;
            }

            if (this.l[i] <= 14) {
                var NO = this.aneNO[i];
                this.x[i] = ane.headx[NO];
                this.y[i] = ane.heady[NO];
                this.l[i] += this.spd[i] * deltaTime;
                // console.log(this.aneNO[i])

                // console.log(this.x[i])
            } else {
                this.y[i] -= this.spd[i] * 4 * deltaTime;

            }
            ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
            if (this.y[i] < 10) {
                this.alive[i] = false;
            }
        }
    }

}


//生长
fruitObj.prototype.born= function (i) {

    this.aneNO[i] = Math.floor(Math.random() * ane.num);
    this.l[i] = 0;
    this.alive[i] = true;

    var ran = Math.random();
    if(ran < 0.2){
        this.fruitType[i] = "blue"
    }else {
        this.fruitType[i] = "orange";
    }
}

//果实消失/死亡
fruitObj.prototype.dead = function (i) {
    this.alive[i] = false;
}

//果实监测..
function fruitMonitor() {
    var num = 0;
    for(var i = 0; i<fruit.num;i++){
        if (fruit.alive[i]) num++
    }
    if(num < 15){  //如果数量少于15,就生成一个果实
        sendFruit();
    }
}
//  判断果实是否闲置

function sendFruit() {
    for(var i = 0; i<fruit.num; i++){
        if (!fruit.alive[i]){
            fruit.born(i);
            return;
        }
    }
}


