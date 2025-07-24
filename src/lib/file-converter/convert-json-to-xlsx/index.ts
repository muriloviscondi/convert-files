import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

import type { ConversionResult } from '../types'

export const convertJSONToXLSX = async (file: File): Promise<ConversionResult> => {
  try {
    const text = await file.text()
    const jsonData = JSON.parse(text)

    if (!Array.isArray(jsonData)) {
      return { success: false, error: 'JSON file must contain an array of objects' }
    }

    const worksheet = XLSX.utils.json_to_sheet(jsonData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })

    const filename = file.name.replace(/\.json$/i, '.xlsx')
    saveAs(blob, filename)

    return { success: true, filename }
  } catch (error) {
    return {
      success: false,
      error: `Error converting JSON to XLSX: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}
