const fs = require('fs');
const path = require('path');

// Defina o caminho do arquivo JSON onde os dados serão salvos
const filePath = path.join(__dirname, 'vehicles.json');

// Função para ler os dados do arquivo JSON
const readVehiclesFromFile = () => {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data); // Retorna os veículos a partir do arquivo JSON
  }
  return []; // Caso o arquivo não exista, retorna um array vazio
};

// Função para salvar os dados no arquivo JSON
const saveVehiclesToFile = (vehicles) => {
  fs.writeFileSync(filePath, JSON.stringify(vehicles, null, 2), 'utf8'); // Salva os dados no formato JSON
};

// Exportando as funções para serem usadas nos controllers
module.exports = {
  readVehiclesFromFile,
  saveVehiclesToFile
};
