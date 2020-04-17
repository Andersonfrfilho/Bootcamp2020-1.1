const express = require("express");
const cors = require("cors");
const {uuid,isUuid} = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title,url,techs} = request.body;
  const newRepository = { id: uuid(), title, url: `http://github.com/${url}`, techs, likes: 0 };
  repositories.push(newRepository)
  return response.json(newRepository)
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title,url,techs} = request.body;
  const repositoryIndex = repositories.findIndex(repository=>repository.id===id)
  if(repositoryIndex<0){
    return response.status(400).json({
      error:'user not find'
    })
  }
  repositories[repositoryIndex] = {...repositories[repositoryIndex],title,url,techs}
  return response.json(
    repositories[repositoryIndex]
  )
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(repository=>repository.id===id)
  if(repositoryIndex<0){
    return response.status(400).json({
      error:'user not find'
    })
  }
  repositories.splice(projectIndex,1)
  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(repository=>repository.id===id)
  if(repositoryIndex<0){
    return response.status(400).json({
      error:'user not find'
    })
  }
  repositories[repositoryIndex] = {...repositories[repositoryIndex],like:repositories[repositoryIndex].like+=1}
  return response.json(
    repositories[repositoryIndex]
  )
});

module.exports = app;
