const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'token.json';

fs.readFile('./key/spreadsheet_key.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content), readSpreadsheet);
});

function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function printSpreadsheet(sheets, spreadsheetId, data) {
  let values = [];
  for (let i = 0; i < data.length; ++i) {
    let tmp = data[i].product.lastIndexOf('(');
    values.push([data[i].product, data[i].quantity.toString(), , data[i].product.slice(tmp + 1, -1) + ' ' + data[i].quantity.toString() + '세트']);
  }
  const resource = {
    values
  };
  let range = `order!A28:D${28 + data.length - 1}`;
  let valueInputOption = 'RAW';
  sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption,
    resource,
  }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
}

function handlingSpreadsheet(sheets, spreadsheetId, rows) {
  let totalResult = [];
  rows.sort((a, b) => a[0].localeCompare(b[0]));
  let i = 0;
  while (i < rows.length) {
    let tmp = { "product": rows[i][0], "quantity": parseInt(rows[i][1], 10) };
    let j = i + 1;
    while (j < rows.length && rows[i][0].localeCompare(rows[j][0]) === 0) {
      tmp.quantity += parseInt(rows[j][1], 10);
      ++j;
    }
    totalResult.push(tmp);
    i = j;
  }
  printSpreadsheet(sheets, spreadsheetId, totalResult);
}

function readSpreadsheet(auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1DAnX3DpW95NwsqPDgjF0DRS8OTrE9u6Wp55m4UmfLFM';

  sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: 'Form Responses 1!D61:E86',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      handlingSpreadsheet(sheets, spreadsheetId, rows);
    } else {
      console.log('No data found.');
    }
  });
}