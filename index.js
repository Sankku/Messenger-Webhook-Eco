/* const { MessengerClient } = require('messaging-api-messenger');
const Excel = require('exceljs');

const { google } = require('googleapis');
const { JWT } = require('google-auth-library');

const privateKey = require('./client_secret_573965010443-k09h79iknvfikm550h45a4qqabcirfd2.apps.googleusercontent.com.json');

const scopes = ['https://www.googleapis.com/auth/spreadsheets'];
const jwtClient = new JWT({
  email: privateKey.client_email,
  key: privateKey.private_key,
  scopes,
});

const sheets = google.sheets('v4');
 */
/* const spreadsheetId = 'TU_ID_DE_HOJA_DE_CÁLCULO';
const range = 'Datos!A1:C1';
const values = [[datos.texto, datos.fecha, datos.usuario]];

await jwtClient.authorize();
await sheets.spreadsheets.values.append({
  auth: jwtClient,
  spreadsheetId,
  range,
  valueInputOption: 'USER_ENTERED',
  resource: { values },
});

const client = MessengerClient.connect({
  accessToken: 'EAADKdGF3v9YBAB2jrnIBHiLNQEilfSg3NObzSkb316svcMopp7kGzgmmg4gCs6jqgeZCKcL7UIXgx0Me770CLR6ev4V0iAqhn2HajdweuCNZCnppjQuZAf78T014ZCZB9TrKn1MiZCvIaFdKJxgrDgrtAmBdGa6YNF4uRKIatWaotfv2yZBnMUK',
});

const workbook = new Excel.Workbook();
const worksheet = workbook.addWorksheet('Datos');

client.on('message', async (context) => {
  const message = context.event.message.text;
  const datos = {
    texto: message,
    fecha: new Date(),
    usuario: context.session.user.id,
  };

  worksheet.addRow([datos.texto, datos.fecha, datos.usuario]);

  await workbook.xlsx.writeFile('datos.xlsx');
}); */
// EAADKdGF3v9YBAB2jrnIBHiLNQEilfSg3NObzSkb316svcMopp7kGzgmmg4gCs6jqgeZCKcL7UIXgx0Me770CLR6ev4V0iAqhn2HajdweuCNZCnppjQuZAf78T014ZCZB9TrKn1MiZCvIaFdKJxgrDgrtAmBdGa6YNF4uRKIatWaotfv2yZBnMUK


const express = require('express');
const bodyParser = require('body-parser');
const { Workbook } = require('exceljs');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const workbook = new Workbook();
const worksheet = workbook.addWorksheet('Data');

app.get('/', function(req, response){
  response.send('Hola Mundo!')
})

app.post('/webhook', async (req, res) => {
  const { body } = req;

  // Validacion de facebook (auth)
  if (body.object !== 'page') {
    return res.status(400).send('La autenticación de Facebook ha fallado');
  }

  try {
    // Funcion para almacenar los datos en la planilla de excel
    const { sender_id, message } = body.entry[0].messaging[0];
    await worksheet.addRow([sender_id, message.text]);
    await workbook.xlsx.writeFile(process.env.EXCEL_FILE_PATH);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor iniciado');
});


app.post('/webhook', (req, res) => {
  const challenge = req.query['hub.challenge'];
  
  if (challenge) {
    res.status(200).send(challenge);
  } else {
    // Manejar otros tipos de solicitudes de webhook aquí
  }
});


/* const ExcelJS = require('exceljs');

// Crear una nueva planilla de Excel
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Datos de clientes');

// Escribir encabezados de columnas
worksheet.columns = [
  { header: 'Nombre', key: 'nombre' },
  { header: 'Correo electrónico', key: 'correo' },
  { header: 'Número de teléfono', key: 'telefono' }
];

// Función para escribir un nuevo registro en la planilla
function escribirRegistro(nombre, correo, telefono) {
  worksheet.addRow({ nombre, correo, telefono });
}

// Ejemplo de cómo llamar a la función escribirRegistro
escribirRegistro('Juan', 'juan@mail.com', '123456789'); */