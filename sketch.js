//varíaveis jogo

var trex, trex_correndo, trex_colidiu;
var solo, soloinvisivel, imagemdosolo;
var nuvem, imagemdanuvem;
var grupodenuvens;
var obs1,obs2,obs3,obs4,obs5,obs6;
var grupodeobs;
var score=0;
var JOGAR = 1;
var ENCERRAR = 0;
var estado = JOGAR;
var imagemgameover, imagemrestart;
var gameover, restart;
var somderestart,sompular;
var somcheckpoint;
//var mensagem = "Isso é uma mensagem";

function preload() {
// carregar animações
  
trex_correndo = loadAnimation("trex1.png", "trex3.png", "trex4.png");
// carregar imagems
trex_colidiu = loadAnimation("trex_collided.png");
imagemdosolo = loadImage("ground2.png");
imagemdanuvem= loadImage("cloud.png"); 
obs1= loadImage("obstacle1.png");  
obs2= loadImage("obstacle2.png");
obs3= loadImage("obstacle3.png"); 
obs4= loadImage("obstacle4.png");
obs5= loadImage("obstacle5.png");
obs6= loadImage("obstacle6.png");
imagemgameover= loadImage("gameOver.png");
imagemrestart= loadImage ("restart.png");
somderestart= loadSound("die.mp3");
sompular=loadSound("jump.mp3");
somcheckpoint=loadSound("checkPoint.mp3");
}



function setup() {
  
  //console.log(mensagem);
  
// criar a área do jogo 
createCanvas(600, 200);
//criar um sprite do trex
trex = createSprite(50,160,20,50);
// adicionando animações  
trex.addAnimation("running", trex_correndo);
trex.addAnimation("collide",trex_colidiu);  
trex.scale = 0.5;
//criar um sprite do solo
solo = createSprite(200,180,400,20);
// adicionando imagem  
solo.addImage("ground",imagemdosolo);
// configuração da animação do solo
solo.x = solo.width /2;
// cria sprite do solo ínvisivel

// deixa o solo ínvisivel  
soloinvisivel= createSprite(200,190,400,10);
soloinvisivel.visible= false;
// cria os grupos  
  grupodenuvens = new Group();
  grupodeobs = new Group();
  
  //var aleatorio = Math.round(random(0,100));
  //console.log(aleatorio);
  
  //console.log("Oi"+trex.y);
  
  //Configuração de colisão
  trex.setCollider("circle",0,0,35);
  //trex.debug = true;
  
  //Criou os sprites pro texto de game Over e o botão de restart
gameover= createSprite(300,100);
gameover.addImage(imagemgameover);
restart= createSprite(300,140);
restart.addImage(imagemrestart); 
gameover.scale= 0.5
restart.scale= 0.5
}


function draw() {
  
  
  
background(230);
  //console.log(trex.y);
// adiciona texto na nossa tela
 text("score="+score,500,50); 
  
  //console.log(frameCount);
  // avaliar os estados do jogo
  if(estado === JOGAR){
gameover.visible= false;
restart.visible= false;    
// sistema de gravidade
    trex.velocityY = trex.velocityY + 1
// faz o solo se movimentar   
solo.velocityX = -(4+score/100);
// dando comando para pular 
if (keyDown("space")&&trex.y>=150) {
trex.velocityY = -10;
sompular.play();
 }
 gerarnuvens();
  
gerarobstaculos();
 

// reseta a animação do solo
if(solo.x<0){
solo.x=solo.width/2;   
 }
// soma a pontuação do jogador 
score= score+Math.round(frameRate()/60);
if(score>0&&score%100===0){
somcheckpoint.play();  
}    
// se o trex morrer muda o estado do jogo para encerrar
if(grupodeobs.isTouching(trex)){
estado= ENCERRAR;  
somderestart.play();
}    

  }

else if (estado === ENCERRAR){
gameover.visible= true;
restart.visible= true;  
 //Muda a animação para quando o trex colide (olho arregalado)
  trex.changeAnimation("collide",trex_colidiu); 
  //zera as velocidades dos objetos contídos no jogo  
grupodeobs.setVelocityXEach(0);
grupodenuvens.setVelocityXEach(0);
solo.velocityX = 0;
trex.velocityY= 0; 
  //Tempo de vida negativo para as nuvens e obs não sumirem no estado ENCERRAR
grupodenuvens.setLifetimeEach(-1);
grupodeobs.setLifetimeEach(-1);
if(mousePressedOver(restart)){
    reset();
  }
}
    
// para não aparecer que está flutuando 
 trex.collide(soloinvisivel);
  
  

drawSprites();
}

function reset(){
 estado= JOGAR;
gameover.visible= false;
restart.visible= false;
grupodeobs.destroyEach();
grupodenuvens.destroyEach();
trex.changeAnimation("running",trex_correndo);  
score= 0;
}

function gerarnuvens(){
 
 if(frameCount%60===0) {
nuvem=createSprite(600,100,40,10);
nuvem.addImage(imagemdanuvem);
nuvem.y= Math.round(random(10,80));   
nuvem.scale= 0.8;   
nuvem.velocityX= -3;
   
nuvem.lifetime = 250;
   
grupodenuvens.add(nuvem);
   
nuvem.depth= trex.depth;
trex.depth= trex.depth+1;   
 }
  
}

function gerarobstaculos(){
 if(frameCount%60===0) {
var obstaculo=createSprite(600,170,10,40); 
obstaculo.velocityX=-(6+score/100);  
var aleatorio= Math.round(random(1,6));
switch(aleatorio){
case 1:obstaculo.addImage(obs1);
break;
case 2:obstaculo.addImage(obs2);
break;
case 3:obstaculo.addImage(obs3);
break;
case 4:obstaculo.addImage(obs4);
break;
case 5:obstaculo.addImage(obs5);
break;
case 6:obstaculo.addImage(obs6);
break;

default:break;

}  
 obstaculo.scale=0.5; 
obstaculo.lifetime=250; 
   
grupodeobs.add(obstaculo);
 
 }

}


