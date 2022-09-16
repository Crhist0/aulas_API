import axios from "axios";
import express, { Request, Response } from "express";
import { getRepositories, getUserFromGithub } from "./atv1";
import calcular from "./atv2";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (request: Request, response: Response) => {
  return response.send("OK");
});

app.get("/user/:name", async (req, res) => {
  const { name } = req.params;
  const userGH = await getUserFromGithub(name);

  res.json(userGH);
});

//===========================atividade2====================================================

app.get("/calculadora", (req, res) => {
  const { operacao, valorA, valorB } = req.query;
  try {
    if (!operacao || !valorA || !valorB) {
      return res.status(404).send("<h1>Falta parametro</h1>");
    }
    const response = calcular(
      operacao as string,
      Number(valorA),
      Number(valorB)
    );
    return res
      .status(200)
      .send(
        `<h1>A operaçao ${operacao} com os valores ${valorA} e ${valorB} resultou em ${response}</h1>`
      );
  } catch (erro: any) {
    console.error({ erro });
    return res.status(500).send(`<h1>${erro.message}</h1>`);
  }
});
//==================fim atividade2=============================================

//=====================================Atividade 03=================================================
let contador = 0;

app.get("/contador", (req, res) => {
  contador++;
  if (contador >= 10) {
    contador = 0;
    return res.status(200).send("<h1>Parabéns, você chegou ao 10!</h1>");
  }
  return res
    .status(200)
    .send(`<h1>O valor atual do contador: ${contador}</h1>`);
});
//==================fim atividade3=============================================


//==================atividade 4=================================================

app.get("/numeral",(req, res) => {
  const { numero, operacao} = req.query;
  if(!numero || !operacao || (operacao !== "proximo" && operacao != "anterior")){
    return res.status(400).send("<h1>É necessário passar um número e uma operação</h1>")
  } 

  return operacao as string === "anterior" 
    ? res.send(`<h1> O numero ${operacao} ao ${numero} é ${Number(numero)-1 }`)
    : res.send(`<h1> O numero ${operacao} ao ${numero} é ${Number(numero)+1 }`)
  // return res.send(`${numero} e ${operacao}`)
})

//================================fim atividade 4 =================================================

//================================atividade 5=====================================================
app.get("/inverter-string",(req,res)=> {
  const {valor} = req.query;
  if(!valor){
    return res.status(400).send("<h1>É necessário passar um valor</h1>")
  } 
  return res.status(200).send(Array.from(valor as string).reverse().join(''))
})
//================================fim atividade 5 =================================================

//==================atividade 6=================================================
let letras: Array<string> = []
let vogais = "aeiou"
app.get("/remover-vogais",(req, res) => {
  const {valor} = req.query;
  if(!valor){
    return res.status(400).send("<h1>É necessário passar um valor</h1>")
  } 
  let valorAtual = Array.from((valor as string).toLowerCase()).filter(letra => !vogais.includes(letra)).join("")
  letras.push(valorAtual)
  return res.status(200).send(letras)
})

//================================fim atividade 6 =================================================


function randomIntFromInterval(min:number, max:number) {  
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const ids =[ 
  '007',
  '008',
  '009',
  '009',
  '054',
  '055',
  '060',
  '061',
  '062',
  '072',
  '073',
  '079',
  '080',
  '080',
  '086',
  '087',
  '090',
  '091',
  '098',
  '099',
  '116',
  '117',
  '118',
  '119',
  '120',
  '121',
  '129',
  '130',
  '130',
  '131',
  '134',
  '138',
  '139',
  '140',
  '141',
  '158',
  '159',
  '160',
  '170',
  '171',
  '183',
  '184',
  '186',
  '194',
  '195',
  '199',
  '211',
  '222',
  '223',
  '224',
  '226',
  '230',
  '245',
  '258',
  '259',
  '260',
  '260',
  '270',
  '271',
  '272',
  '278',
  '279',
  '283',
  '318',
  '319',
  '319',
  '320',
  '321',
  '339',
  '340',
  '341',
  '342',
  '349',
  '350',
  '351',
  '363',
  '364',
  '365',
  '366',
  '367',
  '368',
  '369',
  '370',
  '382',
  '382',
  '393',
  '394',
  '395',
  '400',
  '418',
  '419',
  '422',
  '423',
  '456',
  '457',
  '458',
  '479',
  '484',
  '484',
  '489',
  '490',
  '493',
  '501',
  '502',
  '503',
  '503',
  '515',
  '516',
  '535',
  '536',
  '537',
  '550',
  '550',
  '550',
  '564',
  '565',
  '580',
  '581',
  '592',
  '593',
  '594',
  '647',
  '647',
  '656',
  '657',
  '658',
  '658',
  '688',
  '689',
  '690',
  '692',
  '693',
  '721',
  '728',
  '729',
  '730',
  '746',
  '746',
  '747',
  '748',
  '751',
  '752',
  '767',
  '768',
  '771',
  '773',
  '779',
  '788',
  '816',
  '817',
  '818',
  '833',
  '834',
  '845',
  '846',
  '847',
  '882',
  '883',
  '892',
  '902',
  '902',
] 

app.get('/pescar',  (request: Request, response: Response) => {
  const res = axios.get('https://pokeapi.co/api/v2/pokemon/' + Number(ids[randomIntFromInterval(0, ids.length-1)])).then(res=>{
      return response.send(`
      <div style='display:flex; flex-direction:column;align-items:center;justify-content:center;height:100%'>
          <img src='${res.data.sprites.front_default}' alt='${res.data.name}' /> </br> <h4>Você pescou um ${res.data.name} selvagem!</h4>
      </div>
      `)
  }).catch(err=>{
      return response.json(JSON.stringify(err))
  })
});
  



app.listen(8080, () => console.log("Servidor iniciado"));



