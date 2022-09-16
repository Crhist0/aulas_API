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


app.listen(8080, () => console.log("Servidor iniciado"));



