/**
 * Created by Moon7 on 16/12/22.
 */
var babyObj;
babyObj = function () {
    this.x;
    this.y;
    this.angle;

    // this.babyEye = new Image();
    // this.babyBody = new Image();
    // this.babyTail = new Image();

    this.babyTailTimer = 0;
    this.babyTailCount = 0;

    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000; // 图片持续时间..然后播后一张图片..眨眼

    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;

};

babyObj.prototype.init = function () {
    this.x = canWidth * 0.5 - 30;
    this.y = canHeight * 0.5 + 30;
    this.angle = 0;

    // this.babyBody.src = "./src/babyFade0.png";

};

babyObj.prototype.draw = function () {

    // lerp  趋向mom 坐标
    this.x = lerpDistance(mom.x, this.x, 0.985)
    this.y = lerpDistance(mom.y, this.y, 0.985)

    // lerp mom
    var deltaY = mom.y -this.y;
    var deltaX = mom.x - this.x;
    var beta = Math.atan2(deltaY,deltaX) + Math.PI;

    this.angle = lerpAngle(beta , this.angle, 0.6);   // 趋向 mom角度


    //baby tail 时间间隔
    this.babyTailTimer += deltaTime;
    if (this.babyTailTimer > 50)
    {
        this.babyTailCount = (this.babyTailCount + 1) % 8;
        this.babyTailTimer %= 50;
    }

    // baby eye
    this.babyEyeTimer += deltaTime;
    if (this.babyEyeTimer > this.babyEyeInterval){

        this.babyEyeCount = (this.babyEyeCount + 1) % 2; // 让数值在 0 和 1 之间循环
        this.babyEyeTimer %= this.babyEyeInterval;

        if (this.babyEyeCount == 0) {
            this.babyEyeInterval = Math.random() * 1500 + 2000;
        }else {
            this.babyEyeInterval = 200;
        }
    }

    // baby body
    this.babyBodyTimer += deltaTime;
    if(this.babyBodyTimer > 300){
        this.babyBodyCount = this.babyBodyCount + 1;
        this.babyBodyTimer %= 200;
       if( this.babyBodyCount > 19){

           this.babyBodyCount = 19;

           // 19为全白图片 然后提示 game over
           data.gameOver = true;
       }
    }

    // ctx1
    ctx1.save();

    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);

    var babyTailCount = this.babyTailCount;
    ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount ].width * 0.5 + 27, -babyTail[babyTailCount ].height * 0.5);

    var babyBodyCount = this.babyBodyCount;
    ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width * 0.5, -babyBody[babyBodyCount].height * 0.5);

    var babyEyeCount = this.babyEyeCount;
    ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5, -babyEye[babyEyeCount].height * 0.5);

    ctx1.restore();
}