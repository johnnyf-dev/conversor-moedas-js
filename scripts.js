/* ============================================
   FLUXOGRAMA DO CONVERSOR DE MOEDAS
   ============================================

[Usuário interage]
       │
       ├── Digita valor no input
       │       └── dispara → conversaoDeValores()
       │               └── calcula resultado
       │               └── chama formatacao()
       │                       └── aplica formatadores e mostra valores
       │
       ├── Troca moeda no select1 (origem)
       │       ├── dispara → moedas()
       │       │       └── atualiza bandeira1, nome1, valorDigitadoTela zerado
       │       └── dispara → conversaoDeValores()
       │               └── calcula resultado
       │               └── chama formatacao()
       │
       ├── Troca moeda no select2 (destino)
       │       ├── dispara → moedas()
       │       │       └── atualiza bandeira2, nome2, valorResultado zerado
       │       └── dispara → conversaoDeValores()
       │               └── calcula resultado
       │               └── chama formatacao()
       │
       └── Clica no botão converter
               └── dispara → conversaoDeValores()
                       └── calcula resultado
                       └── chama formatacao()

FUNÇÕES:
- moedas() → interface básica (bandeiras, nomes, valores zerados)
- conversaoDeValores() → cálculos da conversão
- formatacao() → aplica formatadores e mostra valores na tela

============================================ */


/* ============================
   VARIÁVEIS GLOBAIS
   ============================ */

// valores fixos de referência para conversão
const valorDolar = 5;   // 1 dólar = 5 reais
const valorEuro = 6;    // 1 euro = 6 reais

// variáveis para armazenar resultados
let valorConvertido = 0; // inicializa como zero
let resultado = valorConvertido; // resultado final da conversão

/* ============================
   FORMATADORES GLOBAIS
   ============================ */

// formatadores para cada moeda usando Intl.NumberFormat
const formatadorBRL = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});
const formatadorUSD = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "USD"
});
const formatadorEUR = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "EUR"
});

/* ============================
   ELEMENTOS NA TELA (DOM)
   ============================ */

// parte de cima (moeda de origem)
const bandeira1 = document.getElementById("bandeira-select1"); // imagem da bandeira
const moeda1 = document.getElementById("nome-moeda-select1");  // nome da moeda
const valorDigitadoTela = document.getElementById("valor-digitado-tela"); // valor digitado exibido

// parte de baixo (moeda de destino)
const bandeira2 = document.getElementById("bandeira-select2"); // imagem da bandeira
const moeda2 = document.getElementById("nome-moeda-select2");  // nome da moeda
const valorResultado = document.getElementById("valor-resultado"); // resultado exibido

/* ============================
   INTERAÇÃO DO USUÁRIO
   ============================ */

const input = document.getElementById("valor-entrada"); // campo de entrada do valor
const botao = document.getElementById("button-converter"); // botão de conversão

/* ============================
   SELECTS DE MOEDAS
   ============================ */

const select1 = document.getElementById("tipos-de-moedas-primeiro-select"); // moeda de origem
const select2 = document.getElementById("tipos-de-moedas-segundo-select"); // moeda de destino

/* ============================
   EVENTOS
   ============================ */

// ao clicar no botão → chama conversão
botao.addEventListener("click", conversaoDeValores);

// ao mudar moeda de origem → atualiza bandeira/nome e zera valores
select1.addEventListener("change", moedas);
// ao mudar moeda de destino → atualiza bandeira/nome e zera valores
select2.addEventListener("change", moedas);

// ao mudar selects → recalcula conversão
select1.addEventListener("change", conversaoDeValores);
select2.addEventListener("change", conversaoDeValores);

// ao carregar página → já calcula conversão inicial
document.addEventListener("DOMContentLoaded", conversaoDeValores);

// ao digitar no input → recalcula em tempo real
input.addEventListener("input", conversaoDeValores);

/* ============================
   FUNÇÃO moedas()
   ============================ */
// Atualiza bandeiras, nomes e valores zerados
function moedas() {
    // parte de cima (origem)
    if (select1.value === "real") {
        bandeira1.src = "./assets/real.png";
        moeda1.innerHTML = "Real";
        valorDigitadoTela.innerHTML = "R$ 0,00";
    }
    if (select1.value === "dolar") {
        bandeira1.src = "./assets/dolar.png";
        moeda1.innerHTML = "Dólar";
        valorDigitadoTela.innerHTML = "US$ 0.00";
    }
    if (select1.value === "euro") {
        bandeira1.src = "./assets/euro.png";
        moeda1.innerHTML = "Euro";
        valorDigitadoTela.innerHTML = "€ 0.00";
    }

    // parte de baixo (destino)
    if (select2.value === "real") {
        bandeira2.src = "./assets/real.png";
        moeda2.innerHTML = "Real";
        valorResultado.innerHTML = "R$ 0,00";
    }
    if (select2.value === "dolar") {
        bandeira2.src = "./assets/dolar.png";
        moeda2.innerHTML = "Dólar";
        valorResultado.innerHTML = "US$ 0.00";
    }
    if (select2.value === "euro") {
        bandeira2.src = "./assets/euro.png";
        moeda2.innerHTML = "Euro";
        valorResultado.innerHTML = "€ 0.00";
    }
}

/* ============================
   FUNÇÃO formatacao()
   ============================ */
// Aplica os formatadores globais ao valor digitado e ao resultado
function formatacao() {
    const valorEntrada = Number(input.value); // número digitado pelo usuário

    // parte de cima: valor digitado formatado
    if (select1.value === "real") {
        valorDigitadoTela.innerHTML = formatadorBRL.format(valorEntrada);
    }
    if (select1.value === "dolar") {
        valorDigitadoTela.innerHTML = formatadorUSD.format(valorEntrada);
    }
    if (select1.value === "euro") {
        valorDigitadoTela.innerHTML = formatadorEUR.format(valorEntrada);
    }

    // parte de baixo: resultado da conversão formatado
    if (select2.value === "real") {
        valorResultado.innerHTML = formatadorBRL.format(resultado);
    }
    if (select2.value === "dolar") {
        valorResultado.innerHTML = formatadorUSD.format(resultado);
    }
    if (select2.value === "euro") {
        valorResultado.innerHTML = formatadorEUR.format(resultado);
    }
}

/* ============================
   FUNÇÃO conversaoDeValores()
   ============================ */
// Faz os cálculos de conversão e chama formatacao()
function conversaoDeValores() {
    const valorEntrada = Number(input.value); // pega número digitado

    // só calcula se o valor for diferente de zero
    if (valorEntrada !== 0) {
        // destino: REAL
        if (select2.value === "real") {
            if (select1.value === "real") {
                resultado = valorEntrada;
            }
            if (select1.value === "dolar") {
                resultado = valorEntrada * valorDolar;
            }
            if (select1.value === "euro") {
                resultado = valorEntrada * valorEuro;
            }
        }

        // destino: DÓLAR
        if (select2.value === "dolar") {
            if (select1.value === "real") {
                resultado = valorEntrada / valorDolar;
            }
            if (select1.value === "dolar") {
                resultado = valorEntrada;
            }
            if (select1.value === "euro") {
                resultado = valorEntrada / valorEuro;
            }
        }

        // destino: EURO
        if (select2.value === "euro") {
            if (select1.value === "real") {
                resultado = valorEntrada / valorEuro;
            }
            if (select1.value === "dolar") {
                resultado = valorEntrada * 0.87; // taxa aproximada
            }
            if (select1.value === "euro") {
                resultado = valorEntrada;
            }
        }

        // aplica formatação e atualiza interface
        formatacao();
    }
}
