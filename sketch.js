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
var imgTransparente;
var inicio = false;
let input, button, greeting;


function preload() {
  flocoDeNeve = loadImage('assets/neve.png');
  logo = loadImage('assets/logo.jpg');
  emote = loadImage('assets/emotepng.png');
  nuvem = loadImage('assets/nuvem.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight - 4);
  // background(200);
  
  imgTransparente = createImage(200, 200);
  // ImagemTransparente();
  imageMode(CENTER);
  frameRate(fr); // Attempt to refresh at starting FPS
  // clr = color(255, 0, 0);
  CriarPlano();
  criarCaixa();
 

  for (let index = 0; index < objetos; index++) {
    array[index] = new Floco();
  }
  // console.log(array.length);
  // console.log(blocosNumero);
}

function draw() {
  
  
  // image(logo, 100, 100, 200, 200);
  frameAtual++;
  if(frameAtual == 10 && segundo < blocosNumero){
    frameAtual = 0;
    blocoAtual++;
    // console.log(segundo);
  }
  // return '';
  // tint(255, 255);
  if(inicio){
    CriarPlano();
    for (var index = 0; index < blocoAtual * blocosDeFloco; index++) {
      if(array[index]){
        array[index].atualizarPosicao();
        array[index].carregarSprite();
      }
      
    }
    if(!array[blocoAtual * blocosDeFloco]){
      textSize(30);
      fill(255, 255, 255, transparencia);
      text(numero, width/2 + 20, height/2 + 40);
      if(transparencia < 255){
        transparencia = transparencia + 2;
      }
      
    }
  }
  

}

function CriarPlano(){

  background(0, 135, 214);
  noStroke();
  fill(10, 200, 230);
  rect(0, 0, width, 20);
  image(nuvem, 30, -40, 300, 159);
  image(nuvem, 300, -40, 300, 159);
  image(nuvem, 400, -40, 300, 159);
  image(nuvem, 900, -40, 300, 159);
  image(nuvem, width, -40, 300, 159);
  image(nuvem, width - 300, -30, 300, 159);
  image(nuvem, width - 600, -50, 300, 159);
  // ImagemTransparente();
  image(emote, width/2, height/2, 112, 112);

}

function criarCaixa(){
  input = createInput();
  input.position(20, 65);

  button = createButton('Enviar');
  button.position(input.x + input.width, 65);
  button.mousePressed(iniciar);

  greeting = createElement('h2', '');
  greeting.position(20, 5);

  textAlign(CENTER);
  textSize(50);
}

function iniciar(){
  var numeroInput = parseInt(input.value());
  numero = parseInt(random(0, numeroInput));
  input.remove();
  button.remove();
  inicio = true;
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
