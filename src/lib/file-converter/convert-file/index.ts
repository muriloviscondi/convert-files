import {
  convertCSVToJSON,
  convertCSVToXLSX,
  convertJSONToCSV,
  convertJSONToXLSX,
  convertXLSXToCSV,
  convertXLSXToJSON,
} from '..'
import type { ConversionKeyRequest, ConversionResult } from '../types'

export const convertFile = ({
  keyRequest,
  file,
}: ConversionKeyRequest): Promise<ConversionResult> => {
  switch (keyRequest) {
    case 'CSV_to_XLSX':
      return convertCSVToXLSX(file)

    case 'XLSX_to_CSV':
      return convertXLSXToCSV(file)

    case 'JSON_to_CSV':
      return convertJSONToCSV(file)

    case 'CSV_to_JSON':
      return convertCSVToJSON(file)

    case 'XLSX_to_JSON':
      return convertXLSXToJSON(file)

    case 'JSON_to_XLSX':
      return convertJSONToXLSX(file)

    default:
      return Promise.resolve({
        success: false,
        error: `Error converting ${String(keyRequest).replaceAll('_', ' ')}`,
      })
  }
}
