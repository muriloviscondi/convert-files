import { saveAs } from 'file-saver'
import Papa from 'papaparse'

import type { ConversionResult } from '../types'

export const convertCSVToJSON = async (file: File): Promise<ConversionResult> => {
  try {
    const text = await file.text()
    const parsed = Papa.parse(text, { header: true })

    if (parsed.errors.length > 0) {
      return { success: false, error: 'Error parsing CSV file' }
    }

    const jsonString = JSON.stringify(parsed.data, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' })
    const filename = file.name.replace(/\.csv$/i, '.json')
    saveAs(blob, filename)

    return { success: true, filename }
  } catch (error) {
    return { success: false, error: `Error converting CSV to JSON: ${error}` }
  }
}
