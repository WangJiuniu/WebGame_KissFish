/**
 * Created by Moon7 on 16/12/22.
 */

// 判断 大鱼和果实的距离.来判定果实消失
function momFruitsCollision() {

    if (!data.gameOver){
        for(var i =0; i<fruit.num; i++){
            if(fruit.alive[i]){
                var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
                if(l < 900){
                    fruit.dead(i);

                    data.fruitNum++;
                    mom.momBodyCount++;
                    if(mom.momBodyCount > 7){
                        mom.momBodyCount = 7
                    }
                    if(fruit.fruitType[i] == "blue"){
                        data.double = 2;
                    }
                    wave.born(fruit.x[i],fruit.y[i]);
                }
            }
        }

    }

}

// mom baby fruit 三者碰撞检测
function momBabyCollision() {

    if(data.fruitNum > 0 && !data.gameOver){
        var a = calLength2(mom.x, mom.y, baby.x, baby.y);
        if (a < 900) {
            // baby recover 颜色恢复到初始
            baby.babyBodyCount = 0;

            //data ==> 0
            mom.momBodyCount = 0;

            //分数更新数值
            data.addScore()

            //画小鱼圆圈
            halo.born(baby.x, baby.y);
        }
    }


}