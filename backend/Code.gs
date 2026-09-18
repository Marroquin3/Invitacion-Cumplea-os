const SHEET_NAME = 'Respuestas';

function doPost(event) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = event.parameter;
  sheet.appendRow([
    new Date(),
    data.nombre || '',
    data.asistencia || '',
    data.mensaje || ''
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function setupSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  sheet.clear();
  sheet.appendRow(['Fecha de respuesta', 'Nombre', 'Asistencia', 'Mensaje']);
  sheet.getRange('A1:D1').setFontWeight('bold');
  sheet.setFrozenRows(1);
}
