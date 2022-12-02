// IMPORTATION__________________________________________________
const http = require("http");//  package HTTP natif de Node
const app = require("./app");

// fonction renvoie un port valide, qu'il soit sous forme 
// de chiffres ou de chaîne.
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// 
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// 
// Recherche les différentes erreurs afin de les gérer,
// Elle est ensuite enregistrée dans le serveur:
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// 
// serveur Node basique démarré avec la méthode:
// "createServer"  du package  http:
const server = http.createServer(app);

// 
// écouteur d'évènements est également enregistré, 
// consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console:
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);
