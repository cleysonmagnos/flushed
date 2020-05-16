let fr = 60;
var x = 50;
var y = 50;
var flocoDeNeve;
var numero = 0;
var array = [];
var arrayNuvens = [];
var frameAtual = 0;
var segundo = 1;
var blocoAtual = 1;
var nuvens = 15;
var posicaoInicialNuvem = 100;
var objetos = 500;
var blocosDeFloco = 10;
var blocosNumero = parseInt(objetos/blocosDeFloco);
var transparencia = 0;
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
  imageMode(CENTER);
  frameRate(fr);
  criarPlano();
  criarCaixa();
  for (let index = 0; index < objetos; index++) {
    if(index == array.length - 1){
      array[index] = new Floco(3);
    }else{
      array[index] = new Floco(2);
    }
    
  }

  for (let index = 0; index < nuvens; index++) {
    arrayNuvens[index] = new Nuvem(posicaoInicialNuvem);
    posicaoInicialNuvem = posicaoInicialNuvem + 150;
  }
  criarNuvens();
}

function draw() {

  if(inicio){
    frameAtual++;
    if(frameAtual == 10){
      frameAtual = 0;
      blocoAtual++;
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
  for (var index = 0; index < arrayNuvens.length; index++) {
    if(arrayNuvens[index]){
      arrayNuvens[index].atualizarPosicao();
      arrayNuvens[index].carregarSprite();
    }
    
  }
}

function criarCaixa(){
  input = createInput();
  input.position(20, 65);

  button = createButton('Sortear');
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
	constructor(velocidadeLimite){
    
    this.posiX = random(0, windowWidth);
    this.posiY = -60;
    this.velocidadeY = random(1, velocidadeLimite);
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

class Nuvem {
	constructor(posicaoX = 300){
    
    this.posiX = posicaoX;
    this.posiY = -40;
    this.velocidadeX = random(-1, 1);
    this.aceleracao = 0.25;
    // this.velocidadeX = random(1, 5);
    this.asset = nuvem;
    this.limite = 60;
    this.contadorLimite = 0;

  }

  atualizarPosicao(){
    if(this.contadorLimite > this.limite){
      this.contadorLimite = 0;
      this.velocidadeX = random(-1, 1);
    }
    this.contadorLimite++;

    this.posiX = this.posiX + this.velocidadeX;
  }

  carregarSprite(){
    image(this.asset, this.posiX, this.posiY, 300, 159);
  }

}
