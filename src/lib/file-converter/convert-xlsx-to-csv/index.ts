import * as XLSX from 'xlsx'
import Papa from 'papaparse'
import { saveAs } from 'file-saver'

import type { ConversionResult } from '../types'

export const convertXLSXToCSV = async (file: File): Promise<ConversionResult> => {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const workbook = XLSX.read(arrayBuffer, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]

    const jsonData = XLSX.utils.sheet_to_json(worksheet)
    const csv = Papa.unparse(jsonData)

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const filename = file.name.replace(/\.xlsx$/i, '.csv')
    saveAs(blob, filename)

    return { success: true, filename }
  } catch (error) {
    return { success: false, error: `Error converting XLSX to CSV: ${error}` }
  }
}
