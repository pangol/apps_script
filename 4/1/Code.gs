function myFunction() {
  let calendarSheet = getSheet('캘린더');
  let scheduleSheet = getSheet('스케쥴');
  let calendarId = getValueFromSheet(calendarSheet,1,2);

  let scheduleList = []
  for( let i = 1; i < 6; i++){
    let scheduleInfo = getScheduleInfo( scheduleSheet, i);
    changeCalTime(scheduleInfo)
    scheduleList.push(scheduleInfo)
  }

  let calendar = getCalender(calendarId)

  scheduleList.forEach( function(schedule){
    registerSchedule(calendar, schedule)
  })
 
}

function registerSchedule(calendar, schedule){
  calendar.createEvent(schedule[0],new Date(schedule[1]), new Date(schedule[2]))
}

function getCalender(id){
  return CalendarApp.getCalendarById(id);
}

function changeCalTime(info){
  info[1] = convertKST(info[1])
  info[2] = convertKST(info[2])
}

function convertKST(data){
  return Utilities.formatDate(new Date(data), "GMT+9", "MM dd, yyyy HH:mm:ss +0900")
}

function getScheduleInfo( sheet, row ){
  let rowScheduleInfo = []
   for(let i = 1; i < 4; i++){
    rowScheduleInfo[i-1] = getValueFromSheet(sheet,row,i)
  }
  return rowScheduleInfo
}

function getValueFromSheet(sheet, row, column){
  return sheet.getRange(row, column).getValue();
}

function getSheet(sheetName){
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)
}

