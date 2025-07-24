import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

import type { ConversionResult } from '../types'

export const convertXLSXToJSON = async (file: File): Promise<ConversionResult> => {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const workbook = XLSX.read(arrayBuffer, { type: 'array' })
    const [sheetName] = workbook.SheetNames
    const worksheet = workbook.Sheets[sheetName]

    const jsonData = XLSX.utils.sheet_to_json(worksheet)
    const jsonString = JSON.stringify(jsonData, null, 2)

    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' })
    const filename = file.name.replace(/\.xlsx$/i, '.json')
    saveAs(blob, filename)

    return { success: true, filename }
  } catch (error) {
    return {
      success: false,
      error: `Error converting XLSX to JSON: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}
