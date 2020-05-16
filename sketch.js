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
var objetos = 500;
var blocosDeFloco = 10;
var blocosNumero = parseInt(objetos/blocosDeFloco);
var transparencia = 0;
var imgTransparente;
var inicio = false;
var mostrarResultado = false;
let input, button, greeting;


function preload() {
  flocoDeNeve = loadImage('assets/nevev2.png');
  logo = loadImage('assets/logo.jpg');
  emote = loadImage('assets/emotemelhor.png');
  nuvem = loadImage('assets/nuvem.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight - 4);
  // background(200);
  // numero = parseInt(random(1, 3));
  // console.log(numero);
  imgTransparente = createImage(200, 200);
  // ImagemTransparente();
  imageMode(CENTER);
  frameRate(fr); // Attempt to refresh at starting FPS
  // clr = color(255, 0, 0);
  criarPlano();
  criarCaixa();
 

  for (let index = 0; index < objetos; index++) {
    array[index] = new Floco();
  }
  // console.log(array.length);
  // console.log(blocosNumero);
}

function draw() {

  if(inicio){
    frameAtual++;
    if(frameAtual == 10 && segundo < blocosNumero){
      frameAtual = 0;
      blocoAtual++;
      // console.log(segundo);
    }
    criarPlano();
    for (var index = 0; index < blocoAtual * blocosDeFloco; index++) {
      if(array[index]){
        array[index].atualizarPosicao();
        array[index].carregarSprite();
      }
      
    }
    array[array.length - 1].verificarPosicao();

    criarNuvens();
    if(mostrarResultado){
      resultado();
    }
  }
}

function resultado(){
      textSize(27);
      fill(255, 255, 255, transparencia);
      if(transparencia < 255){
        transparencia = transparencia + 2;
      }else{
        strokeWeight(4);
        stroke(51);
      }
      text(numero, width/2 + 20, height/2 + 40);
}

function criarPlano(){

  background(0, 135, 214);
  noStroke();
  fill(10, 200, 230);
  rect(0, 0, width, 20);
  
  // ImagemTransparente();
  image(emote, width/2, height/2, 112, 112);

}

function criarNuvens(){
  image(nuvem, 30, -40, 300, 159);
  image(nuvem, 300, -40, 300, 159);
  image(nuvem, 400, -40, 300, 159);
  image(nuvem, 900, -40, 300, 159);
  image(nuvem, width, -40, 300, 159);
  image(nuvem, width - 300, -30, 300, 159);
  image(nuvem, width - 600, -50, 300, 159);
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
  numero = parseInt(random(1, numeroInput + 1));
  // console.log(numero);
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

  verificarPosicao(){
    this.posiY 
    if(this.posiY > height){
      mostrarResultado = true;
    }
  }

  carregarSprite(){
    image(this.asset, this.posiX, this.posiY, 50, 50);
  }

}
