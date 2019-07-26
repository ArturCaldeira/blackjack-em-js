// Cartas
let naipes = ["Copas", "Ouros", "Espadas", "Paus"];
let valores = [
  "Ás",
  "Rei",
  "Dama",
  "Valete",
  "Dez",
  "Nove",
  "Oito",
  "Sete",
  "Seis",
  "Cinco",
  "Quatro",
  "Três",
  "Dois"
];

// Variáveis do jogo
let jogoIniciado = false,
  jogoFinalizado = false,
  jogadorGanhou = false,
  dealerCartas = [],
  jogadorCartas = [],
  dealerPontos = [],
  jogadorPontos = [],
  deck = [];

//Variaveis DOM
let textArea1 = document.getElementById("text-area1");
let textArea2 = document.getElementById("text-area2");
let newGameButton = document.getElementById("new-game-b");
let hitButton = document.getElementById("hit-b");
let stayButton = document.getElementById("stay-b");

let mostrarStatus = () => {
  if (!jogoIniciado) {
    textArea1.innerText = "Bem-vindo ao joguin!";
    return;
  } else {
    let dealerCartasString = "";
    for (let i = 0; i < dealerCartas.length; i++) {
      dealerCartasString += 1+i + "a - " + montandoStringDaCarta(dealerCartas[i]) + "\n";
    }
    let jogadorCartasString = "";
    for (let i = 0; i < jogadorCartas.length; i++) {
      jogadorCartasString += 1+i + "a - " + montandoStringDaCarta(jogadorCartas[i]) + "\n";
    }

    atualizarScore();

    textArea1.innerText =
      "Cartas do jogador: \n" +
      jogadorCartasString +
      "\n Total: " +
      jogadorPontos +
      "\n \n";

    textArea2.innerText =
      "Cartas do dealer: \n" +
      dealerCartasString +
      "\n" +
      "Total: " +
      dealerPontos +
      "\n \n";

    if (jogoFinalizado) {
      if (jogadorGanhou || jogadorPontos == 21 && dealerPontos != 21) {
        textArea1.innerText += "JOGADOR 1 VENCEU!";
      } else {
        textArea2.innerText += "DEALER VENCEU!";
      }
    
    newGameButton.style.display = "inline";
    hitButton.style.display = "none";
    stayButton.style.display = "none";
    }
  }
};

hitButton.style.display = "none";
stayButton.style.display = "none";
mostrarStatus();

newGameButton.addEventListener("click", () => {
  jogoIniciado = true;
  jogoFinalizado = false;
  jogadorGanhou = false;

  deck = montandoDeck();
  embaralhar(deck);
  dealerCartas = [pegarProxCarta(), pegarProxCarta()];
  jogadorCartas = [pegarProxCarta(), pegarProxCarta()];

  newGameButton.style.display = "none";
  hitButton.style.display = "inline";
  stayButton.style.display = "inline";
  mostrarStatus();
});

hitButton.addEventListener("click", () => {
  jogadorCartas.push(pegarProxCarta());
  verificarEstadoDoJogo();
  mostrarStatus();
});

stayButton.addEventListener("click", () => {
    jogoFinalizado = true;
    verificarEstadoDoJogo();
    mostrarStatus();
})

let montandoDeck = () => {
  let deck = [];
  for (let naipeId = 0; naipeId < naipes.length; naipeId++) {
    for (let valorId = 0; valorId < valores.length; valorId++) {
      let carta = {
        valor: valores[valorId],
        naipe: naipes[naipeId]
      };
      deck.push(carta);
    }
  }

  return deck;
};

let embaralhar = deck => {
  for (let i = 0; i < deck.length; i++) {
    let trocarIdx = Math.trunc(Math.random() * deck.length);
    let tmp = deck[trocarIdx];
    deck[trocarIdx] = deck[i];
    deck[i] = tmp;
  }
};

let pegarProxCarta = () => {
  return deck.shift();
};

let montandoStringDaCarta = carta => {
  return `${carta.valor} de ${carta.naipe}`;
};

let pegarValorCarta = valorCarta => {
  switch (valorCarta) {
    case "Ás":
      return 1;
    case "Dois":
      return 2;
    case "Três":
      return 3;
    case "Quatro":
      return 4;
    case "Cinco":
      return 5;
    case "Seis":
      return 6;
    case "Sete":
      return 7;
    case "Oito":
      return 8;
    case "Nove":
      return 9;
    case "Dez":
      return 10;
    case "Valete":
      return 10;
    case "Dama":
      return 10;
    case "Rei":
      return 10;
  }
};

let calcularScore = cartas => {
  let temAs = false;
  let score = 0;
  for (let i = 0; i < cartas.length; i++) {
    score += pegarValorCarta(cartas[i].valor);
    if (cartas[i].valor == "Ás") {
      temAs = true;
    }
  }
  if (temAs && score + 10 <= 21) {
    return score + 10;
  }
  return score;
};

let atualizarScore = () => {
  dealerPontos = calcularScore(dealerCartas);
  jogadorPontos = calcularScore(jogadorCartas);
  jogoFinalizado = jogadorPontos > 21 ? true : jogoFinalizado;
  jogoFinalizado = jogadorPontos == 21 ? true : jogoFinalizado;
};

let verificarEstadoDoJogo = () => {

    atualizarScore();

    if(jogoFinalizado){
        //Vez do dealer
        while(dealerPontos < jogadorPontos
            && jogadorPontos <= 21
            && dealerPontos <= 21) {
                dealerCartas.push(pegarProxCarta());
                atualizarScore();
            }
    }

    if(jogadorPontos > 21) {
        jogadorGanhou = false;
        jogoFinalizado = true;
    } else if(dealerPontos > 21) {
        jogadorGanhou = true;
        jogoFinalizado = true;
    }
    else if (jogoFinalizado) {
        if (jogadorPontos > dealerPontos && jogadorPontos <= 21 ) {
            jogadorGanhou = true;
        } else {
            jogadorGanhou = false
        }
    }
}
