let rectX = 0;
let fr = 60; //starting FPS
let clr;
var x = 50;
var y = 50;
var flocoDeNeve;
var numero = 0;
var array = [];
var frameAtual = 0;
var segundo = 1;
var blocoAtual = 1;
var objetos = 1000;
var blocosDeFloco = 10;
var blocosNumero = parseInt(objetos/blocosDeFloco);
var transparencia = 0;


function preload() {
  flocoDeNeve = loadImage('assets/neve.png');
  jailson = loadImage('assets/jailson.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // background(200);
  imageMode(CENTER);
  background(0, 197, 214);
  frameRate(fr); // Attempt to refresh at starting FPS
  // clr = color(255, 0, 0);
  numero = parseInt(random(0, 121));

  for (let index = 0; index < objetos; index++) {
    array[index] = new Floco();
  }
  // console.log(array.length);
  // console.log(blocosNumero);
}

function draw() {
  background(0, 135, 214);
  image(jailson, width/2, height/2);
  frameAtual++;
  if(frameAtual == 10 && segundo < blocosNumero){
    frameAtual = 0;
    blocoAtual++;
    // console.log(segundo);
  }
  // tint(255, 255);
  for (var index = 0; index < blocoAtual * blocosDeFloco; index++) {
    if(array[index]){
      array[index].atualizarPosicao();
      array[index].carregarSprite();
    }
    
  }
  if(!array[blocoAtual * blocosDeFloco]){
    textSize(30);
    fill(255, 255, 255, transparencia);
    text(numero, width/2, height/2);
    if(transparencia < 255){
      transparencia = transparencia + 0.5;
    }
    
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Floco {
	constructor(){
    
    this.posiX = random(0, windowWidth);
    this.posiY = -60;
    this.velocidadeY = random(1, 3);
    this.aceleracao = 0.25;
    // this.velocidadeX = random(1, 5);
    this.asset = flocoDeNeve;

  }

  atualizarPosicao(){
    this.posiY = this.posiY + this.velocidadeY + this.aceleracao;
  }

  carregarSprite(){
    image(this.asset, this.posiX, this.posiY, 50, 50);
  }

}
