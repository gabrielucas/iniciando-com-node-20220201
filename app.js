const express = require("express");
const app = express();
const { randomUUID } = require("crypto");
const fs = require("fs");

app.use(express.json());

let products = [];

/** criando um arquivo.json com o FileSystem para armazenar os produtos */
fs.readFile("products.json", "utf-8", (error, data) => {
  if (error) console.log(error);
  else products = JSON.parse(data);
});

/** rota para adicionar um produto */
app.post("/product", (req, res) => {
  const { name, price } = req.body;
  const product = {
    id: randomUUID(),
    name,
    price,
  };

  products.push(product);
  fillProductsFile();

  return res.send(product);
});

/** rota para retornar todos os produtos em .json */
app.get("/products", (req, res) => {
  return res.json(products);
});

/** rota para retornar um produto específico em um .json */
app.get("/products/:id", (req, res) => {
  const { id } = req.params;

  const product = products.find((product) => product.id === id);

  return res.json(product);
});

/** rota para alterar um produto específico */
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const index = products.findIndex((product) => product.id === id);

  products[index] = {
    ...products[index],
    name,
    price,
  };
  fillProductsFile();

  return res.json({
    message: `Produto ${products[index].id} alterado com sucesso!`,
  });
});

/** rota para excluir um produto específico */
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((product) => product.id === id);

  products.splice(index, 1);
  fillProductsFile();

  return res.json({
    message: `O produto ${products[index].id} foi removido com sucesso!`,
  });
});

// função criada para popular o arquivo com o array de produtos
function fillProductsFile() {
  fs.writeFile("products.json", JSON.stringify(products), (error) => {
    if (error) console.log(error);
    else console.log("Produto inserido com sucesso!");
  });
}

app.listen(4002, () => console.log("Servidor está rodando na porta 4002..."));
