// vetor.push adiciona um elemento no final do vetor,
//  length é o tamanho do vetor
// vetor.unshift adiciona um elemento no inicio e desloca os outros 
// vetor.shift remove o primeiro elemento
//  vetor.pop remove o ultimo elemento

//obter os elementos da página
const frm = document.querySelector("form");
const respErros = document.getElementById("outErros");
const respChances = document.getElementById("outChances");
const respDicas = document.getElementById("outDica");
let aposta = document.getElementById('btSubmit');
let novamente = document.getElementById('btNovo');

// vetor global para armazenar os numeros ja apostados
const erros = [];
const chances = 6;
let maior = [100];
let menor = [1];
const sorteado = Math.floor(Math.random() * 100);
// Math.floor retira os numeros depois da virgula
console.log(sorteado);

frm.addEventListener("submit", (e) => {
    e.preventDefault(); //não enviar o formulario
    
    const numero = Number(frm.inNumero.value);

    if (numero == sorteado){
        respDicas.innerText = `Parabéns!! Você acertou o numero sorteado foi o ${sorteado}`
    }else{
        if (erros.includes(numero)){ //verifica se o numero ja existe no vetor - retorna true or false
            alert(`O genio você ja informou o número ${numero}. Tente outro!`)
        }else{
            erros.push(numero); // adicio o numero no vetor
            const numErros = erros.length;
            const numChances = chances - numErros;
            if (numChances ==0){
                alert(`Game Over`)
                aposta.setAttribute("class","oculta");
                novamente.setAttribute("class","exibe");
                // frm.btSubmit.disabled = true; //desabilita o botao, mas ele continua aparecendo
                // frm.btNovo.className="exibe";
                respDicas.innerText=`O numero sorteado era ${sorteado}`
            }else{
                respErros.innerText = `${numErros} (${erros.join(", ")})` //numero de erros e depois os elementos ja tentados
                respChances.innerText = numChances
                if(numero<sorteado){
                    menor.push(numero);
                    respDicas.innerText=`Dica:O numero sorteado esta entre ${Math.max(...menor)} e ${Math.min(...maior)}`
                }else{  
                    maior.push(numero);
                    respDicas.innerText=`Dica:O numero sorteado esta entre ${Math.max(...menor)} e ${Math.min(...maior)}`
                }
            }
        }
    }
    frm.inNumero.value='';
    frm.inNumero.focus();
})
frm.btNovo.addEventListener("click",()=>{
    location.reload(); //recarrega a pagina
})