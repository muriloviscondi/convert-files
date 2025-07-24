export type KeyRequest =
  | 'CSV_to_XLSX'
  | 'XLSX_to_CSV'
  | 'JSON_to_CSV'
  | 'CSV_to_JSON'
  | 'XLSX_to_JSON'
  | 'JSON_to_XLSX'

export type ConversionKeyRequest = {
  keyRequest: KeyRequest
  file: File
}
