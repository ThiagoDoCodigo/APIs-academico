import sequelize from "./data/database";
import "./models/User";
import "./models/Post";

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Tabelas criadas no Aiven com sucesso!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Erro ao criar tabelas:", err);
    process.exit(1);
  });
