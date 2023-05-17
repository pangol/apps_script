function makeDoc(startRow) {
  let values = readValues(startRow)[0]
  let templateDoc = getTemplateFile(values[0])
  createDoc(values, templateDoc)
}

function readValues(startRow){
  let ss = SpreadsheetApp.getActiveSheet()
  let range = ss.getRange(startRow, 1, 1, 5)
  return range.getValues()
}

function getTemplateFile(name){
  let sigFileNameF = 'CMS정기이체_'
  let templateFile = DriveApp.getFilesByName("template").next()
  let outputFolder = DriveApp.getFoldersByName("publish").next()
  let copiedTemplateDoc = templateFile.makeCopy(sigFileNameF + name, outputFolder)
  return copiedTemplateDoc
}

function createDoc(values, copiedTemplateDoc){
  let docId = copiedTemplateDoc.getId();
  let doc = DocumentApp.openById(docId);

  let body = doc.getBody();
  let signImg = readSignImg(values[0])
  replaceDoc(body, values)
  replaceTextToImage(body, "{sig}", signImg)
  doc.saveAndClose()
}

function readSignImg(name){
  return DriveApp.getFilesByName(name + ".png").next().getBlob()
}

function replaceDoc(body, values){
  body.replaceText('{name}', values[0]);
  body.replaceText('{address}', values[1]);
  body.replaceText('{phone}', values[2]);
  body.replaceText('{email}', values[3]);
}

function replaceTextToImage(body, searchText, image) {
  let width = 150
  let next = body.findText(searchText)

  let r = next.getElement()
  r.asText().setText("")

  let img = r.getParent().asParagraph().addPositionedImage(image)
  let w = img.getWidth()
  let h = img.getHeight()
  img.setWidth(width)
  img.setHeight(width * h / w)
}
