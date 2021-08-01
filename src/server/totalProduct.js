import fs from 'fs';
import util from 'util';
import readline from 'readline';
import { google } from "googleapis";

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'token.json';

export default async function totalProduct(fromRow, toRow) {
  try {
    let content = fs.readFileSync('../key/spreadsheet_key.json');
    let result = await authorize(JSON.parse(content), readSpreadsheet, fromRow, toRow);
    return result;
  }
  catch (err) {
    return 'Error loading client secret file:' + err;
  }
}

async function authorize(credentials, callback, fromRow, toRow) {
  let result;

  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);
  try {
    let token = fs.readFileSync(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
    result = await callback(oAuth2Client, fromRow, toRow); 
  }
  catch (err) {
    result = await getNewToken(oAuth2Client, callback, fromRow, toRow);
  }
  return result;
}

async function getNewToken(oAuth2Client, callback, fromRow, toRow) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const question = util.promisify(rl.question).bind(rl);
  try {
    let code = await question('Enter the code from that page here: ');
    rl.close();
    try {
      let result = await oAuth2Client.getToken(code);
      let token = result.tokens;
      await oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      try {
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
        console.log('Token stored to', TOKEN_PATH);
      }
      catch (err) {
        return err;
      };
      let result1 = await callback(oAuth2Client, fromRow, toRow);
      return result1;
    }
    catch (err) {
      return 'Error while trying to retrieve access token' + err;
    }
  }
  catch (err) {
    return 'Question rejected' + err;
  }
}

async function printSpreadsheet(sheets, spreadsheetId, data) {
  let values = [];
  for (let i = 0; i < data.length; ++i) values.push([data[i].product, data[i].quantity.toString()]);
  const resource = {
    values
  };
  let valueInputOption = 'RAW';
  let range = `Admin Tools!A2:B${2 + data.length - 1}`;
  try {
    let result = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption,
      resource,
    });
    return result.statusText;
  }
  catch (err) {
    return err;
  }
}

async function handlingSpreadsheet(sheets, spreadsheetId, rows) {
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
  let result = await printSpreadsheet(sheets, spreadsheetId, totalResult);
  return result;
}

async function readSpreadsheet(auth, fromRow, toRow) {
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1UcmNyg_nh6mhRt_5q6Pj7IXzkRDx4A1pL3F2H6WL8MU'
  const request = {
    spreadsheetId: spreadsheetId,
    range: `Form Records!D${fromRow}:E${toRow}`,
  }
  try {
    let res = await sheets.spreadsheets.values.get(request);
    let rows = res.data.values;
    if (rows.length) {
      let result = await handlingSpreadsheet(sheets, spreadsheetId, rows);
      return result;
    } else {
      return 'No data found.';
    }
  }
  catch (err) {
    console.log(err);
    return 'The API returned an error: ' + err;
  }
}