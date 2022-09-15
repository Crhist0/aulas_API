import express, { Request, Response } from "express";
import {getRepositories,getUserFromGithub} from './atv1'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/", (request: Request, response: Response) => {
  return response.send("OK");
});

app.get("/user/:name",async (req, res)=>{
  const { name } = req.params;
  const userGH = await getUserFromGithub(name);

  res.json(userGH);
});

app.listen(8080, () => console.log("Servidor iniciado"));
