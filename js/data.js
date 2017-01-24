/**
 * Created by Moon7 on 16/12/24.
 */
var dataObj = function () {
    this.fruitNum = 0;
    this.double = 1;
    this.score = 0;
    this.gameOver = false;
    this.alpha = 0;
}


dataObj.prototype.draw = function () {
    var w = can1.width;
    var h = can1.height;

    ctx1.save();
    ctx1.fillStyle = "#999";
    ctx1.shadowColor = "#fff";
    ctx1.shadowBlur = 20;
    ctx1.font = "30px Verdana";
    ctx1.textAlign = "center";

    if(this.gameOver){
        this.alpha += deltaTime *0.001;
        if (this.alpha > 1){
            this.alpha = 1;
        }
        ctx1.fillStyle = "rgba(255,255,200," + this.alpha + ")";
        ctx1.fillText("GAME OVER",w*0.5,h*0.5);
    }
    ctx1.restore();

// 头部style
    ctx1.fillText("KISS FISH", w*0.5,h-550);
    ctx1.fillText("得分: "+this.score, w*0.5,h-80);
    ctx1.fillStyle = "rgba(225,255,220,0.7)";
    ctx1.font = "17px Verdana";
    ctx1.textAlign = "center";


};
dataObj.prototype.addScore = function () {
    this.score += this.fruitNum * 100 * this.double;
    this.fruitNum = 0;
    this.double = 1;
}