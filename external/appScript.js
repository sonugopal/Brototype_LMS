// Google Sheet script needed for lead generation

const sheets = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/12zV47ujQm6G2_OGEBonJUCGyPhc4gHc06pV5wI7X-VQ/edit#gid=0");
const sheet = sheets.getSheetByName("Sheet1");

function doPost(e){
  let data = JSON.parse(e.postData.contents);
  
  data.map(item => {
    // Get all the data in the sheet
    let range = sheet.getDataRange();
    let values = range.getValues();
    
    for (let i = 0; i < values.length; i++) {
      // Check for matching email or phone number
      if (values[i][4] === item.phoneNumber) {
        sheet.deleteRow(i+1);
        break;
      }
    }
    
    // Append the new row
    sheet.appendRow([item.name, item.email, item.qualification, item.watchTime, item.phoneNumber, item.leadStatus, item.createdAt]);
  });
  
  return ContentService.createTextOutput("Your message was successfully sent to the Googlesheet database!");
}