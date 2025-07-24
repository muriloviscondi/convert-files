import * as XLSX from 'xlsx'
import Papa from 'papaparse'
import { saveAs } from 'file-saver'

import type { ConversionResult } from '../types'

export const convertCSVToXLSX = async (file: File): Promise<ConversionResult> => {
  try {
    const text = await file.text()
    const parsed = Papa.parse(text, { header: true })

    if (parsed.errors.length > 0) {
      return { success: false, error: 'Error parsing CSV file' }
    }

    const worksheet = XLSX.utils.json_to_sheet(parsed.data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })

    const filename = file.name.replace(/\.csv$/i, '.xlsx')
    saveAs(blob, filename)

    return { success: true, filename }
  } catch (error) {
    return { success: false, error: `Error converting CSV to XLSX: ${error}` }
  }
}
