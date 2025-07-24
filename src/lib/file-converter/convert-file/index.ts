import {
  convertCSVToJSON,
  convertCSVToXLSX,
  convertJSONToCSV,
  convertJSONToXLSX,
  convertXLSXToCSV,
  convertXLSXToJSON,
} from '..'
import type { ConversionKeyRequest } from '../types'

export const convertFile = async ({ keyRequest, file }: ConversionKeyRequest) => {
  switch (keyRequest) {
    case 'CSV_to_XLSX':
      return await convertCSVToXLSX(file)

    case 'XLSX_to_CSV':
      return await convertXLSXToCSV(file)

    case 'JSON_to_CSV':
      return await convertJSONToCSV(file)

    case 'CSV_to_JSON':
      return await convertCSVToJSON(file)

    case 'XLSX_to_JSON':
      return await convertXLSXToJSON(file)

    case 'JSON_to_XLSX':
      return await convertJSONToXLSX(file)

    default:
      return {
        success: false,
        error: `Error converting ${String(keyRequest).replaceAll('_', ' ')}`,
      }
  }
}
