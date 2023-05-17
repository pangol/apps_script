function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function sendUserData(inputData){
  Logger.log(inputData)
  let imgFilePath = saveImg(inputData[4], inputData[0])
  saveDataToSheet(inputData, imgFilePath)
}

function saveDataToSheet(userData, imgFilePath){
  let sheet = SpreadsheetApp.getActiveSheet()
  sheet.appendRow([userData[0], userData[1], userData[2], userData[3], imgFilePath]);
}

function saveImg(imgData, name) {
  let encoded_image = imgData.split(",")[1]
  let decoded_image = Utilities.base64Decode(encoded_image)
  let sigImg = Utilities.newBlob(decoded_image).setName(name + ".png")

  let folder = DriveApp.getFoldersByName("signImg").next()
  folder.createFile(sigImg)
  return name + ".png"
}