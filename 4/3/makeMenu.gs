function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('CMS문서발행')
    .addItem('실행', 'showSidebar')
    .addToUi();
}

function showSidebar(){
  let html = HtmlService.createHtmlOutputFromFile('sidebar').setTitle('CMS 정기이체 설정하기');
  SpreadsheetApp.getUi().showSidebar(html);
}
