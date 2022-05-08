var cvs = document.getElementById("canvas");//подключаенмся к html файлу по id
var ctx = cvs.getContext("2d");//указывает вид игры(двухмерная)
//Загружаем фото

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/m_bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

//начальные установки птички
var gap = 85; // отступ между препятствиями
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;

//подключаем звуки
var fly = new Audio();
var scor = new Audio();

fly.src = "audio/duck.mp3";
scor.src = "audio/score.mp3";
//при нажатии на клавишу птичка взлетает
document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 25;
    fly.play();
}
// создаем блоки
var pipe = [];

pipe[0] = {
    x : cvs.width,//за видимой частью 
    y : 0
};

//создаем препятствия
function draw(){
    
    ctx.drawImage(bg,0,0); //координаты заднего фона
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);//создание препятсвий с щелью для птички
             
        pipe[i].x--;//передвижение
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); //рандомное распределение препятствий
        }
        
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
            location.reload(); //если птичка ударилась о препятствие, игра перезапускается
        }
        //прибавление счета
        if(pipe[i].x == 5){
            score++;
            scor.play();
        }
        
        
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();