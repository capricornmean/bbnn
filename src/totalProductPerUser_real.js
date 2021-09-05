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

function printSpreadsheet(sheets, spreadsheetId, values) {
  const resource = {
    values
  };
  let range = `order!A28:E${28 + values.length - 1}`;
  let valueInputOption = 'USER_ENTERED';
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

function calculateProfit(products, prices) {
  let res = [0, 0, 0];
  for (let i = 0; i < products.length; ++i)
    for (let j = 0; j < prices.length; ++j) {
      if (products[i].product === prices[j][0]) {
        res[0] += parseInt(prices[j][1], 10);
        res[1] += parseInt(prices[j][2], 10);
        res[2] += parseInt(prices[j][3], 10);
        break;
      }
    }
  return res;
}

async function handlingSpreadsheet(sheets, spreadsheetId, orders, prices) {
  let totalResult = [];
  orders = orders.map(order => [order[0].toLowerCase().trim(), order[1], order[2]]);
  orders.sort(function (a, b) {
    if (a[0].localeCompare(b[0]) != 0)
      return a[0].localeCompare(b[0]);
    return a[1].localeCompare(b[1]);
  });
  let i = 0;
  while (i < orders.length) {
    let j = i + 1;
    let products = [{ "product": orders[i][1], "quantity": parseInt(orders[i][2], 10) }];
    while (j < orders.length && orders[i][0].localeCompare(orders[j][0]) === 0) {
      if (products[products.length - 1].product != orders[j][1])
        products.push({ "product": orders[j][1], "quantity": parseInt(orders[j][2], 10) });
      else
        products[products.length - 1].quantity += parseInt(orders[j][2], 10);
      ++j;
    }
    let profit = calculateProfit(products, prices);
    let combinedProducts = "";
    for (let k = 0; k < products.length; ++k) {
      if (products[k].quantity === 1)
        combinedProducts += products[k].product.slice(0, products[k].product.lastIndexOf('(')) + "set";
      else
        combinedProducts += products[k].product.slice(0, products[k].product.lastIndexOf('(')) + " * "
          + products[k].quantity.toString();
      if (k < products.length - 1) combinedProducts += "\n";
    }
    totalResult.push([orders[i][0], combinedProducts, profit[0].toString(), profit[1].toString(), profit[2].toString()]);
    i = j;
  }
  printSpreadsheet(sheets, spreadsheetId, totalResult);
}

async function getPrices(sheets, spreadsheetId) {
  const request = {
    spreadsheetId: spreadsheetId,
    range: 'price!A2:D27',
  }
  try {
    let res = await sheets.spreadsheets.values.get(request);
    return res.data.values;
  }
  catch (err) {
    console.log(err);
    return 'The API returned an error: ' + err;
  }
}

async function getOrders(sheets, spreadsheetId, prices) {
  const request = {
    spreadsheetId: spreadsheetId,
    range: 'Form Responses 1!C53:E60',
  }
  try {
    let res = await sheets.spreadsheets.values.get(request);
    const orders = res.data.values;
    if (orders.length) {
      handlingSpreadsheet(sheets, spreadsheetId, orders, prices);
    } else {
      console.log('No data found.');
    }
  }
  catch (err) {
    console.log(err);
    return 'The API returned an error: ' + err;
  }
}

async function readSpreadsheet(auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1DAnX3DpW95NwsqPDgjF0DRS8OTrE9u6Wp55m4UmfLFM';
  let prices = await getPrices(sheets, spreadsheetId);
  await getOrders(sheets, spreadsheetId, prices);
}