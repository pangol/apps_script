function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function sendUserData(inputData){
  let ss = SpreadsheetApp.getActiveSheet()
  ss.appendRow(inputData)
}
