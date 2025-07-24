import { saveAs } from 'file-saver'
import Papa from 'papaparse'

import type { ConversionResult } from '../types'

export const convertJSONToCSV = async (file: File): Promise<ConversionResult> => {
  try {
    const text = await file.text()
    const jsonData = JSON.parse(text)

    if (!Array.isArray(jsonData)) {
      return { success: false, error: 'JSON file must contain an array of objects' }
    }

    const csv = Papa.unparse(jsonData)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const filename = file.name.replace(/\.json$/i, '.csv')
    saveAs(blob, filename)

    return { success: true, filename }
  } catch (error) {
    return {
      success: false,
      error: `Error converting JSON to CSV: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}
