import axios from "axios";

async function getUserFromGithub(user: string) {
  try {
    const { data } = await axios.get(`https://api.github.com/users/${user}`);
    console.log(data);
    return data;
  } catch (error) {
    console.error("Usuário não existe", error);
  }
  // .then((response) => {
  //   console.log(response.data);
  // })
  // .catch((err) => {
  //   console.log('Usuário não existe');
  // });
}
// getUserFromGithub('djunior97');
// getUserFromGithub('djunioriqdivqv97');

async function getRepositories(repo: string) {
  try {
    const { data } = await axios.get(`https://api.github.com/repos/${repo}`);
    console.log(data);
    return data;
  } catch (error) {
    console.error("Repositório não existe", error);
  }
}

// Github.getRepositories('marcelo-growdev/scrapbook-es6');
// Github.getRepositories('marcelo-growdev/qdbqqbqwn');

export { getRepositories, getUserFromGithub };
