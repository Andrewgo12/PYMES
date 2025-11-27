import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { type Product } from '@/store/productsStore'

// Export products to Excel
export function exportProductsToExcel(products: Product[]) {
  const data = products.map(p => ({
    'Nombre': p.name,
    'SKU': p.sku,
    'Categoría': p.category,
    'Precio': p.price,
    'Stock': p.stock,
    'Stock Mínimo': p.minStock,
    'Descripción': p.description || '',
  }))

  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Productos')
  
  XLSX.writeFile(wb, `productos_${new Date().toISOString().split('T')[0]}.xlsx`)
}

// Export products to PDF
export function exportProductsToPDF(products: Product[]) {
  const doc = new jsPDF()
  
  doc.setFontSize(18)
  doc.text('Reporte de Productos', 14, 22)
  doc.setFontSize(11)
  doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 14, 30)

  const tableData = products.map(p => [
    p.name,
    p.sku,
    p.category,
    `€${p.price.toFixed(2)}`,
    p.stock.toString(),
    p.minStock.toString(),
  ])

  autoTable(doc, {
    head: [['Producto', 'SKU', 'Categoría', 'Precio', 'Stock', 'Mín.']],
    body: tableData,
    startY: 35,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [59, 130, 246] },
  })

  doc.save(`productos_${new Date().toISOString().split('T')[0]}.pdf`)
}

// Export inventory report to Excel
export function exportInventoryToExcel(products: Product[]) {
  const data = products.map(p => ({
    'Producto': p.name,
    'SKU': p.sku,
    'Ubicación': 'Almacén Principal',
    'Stock Mínimo': p.minStock,
    'Stock Actual': p.stock,
    'Estado': p.stock <= p.minStock ? 'Crítico' : 'OK',
    'Valor Total': (p.price * p.stock).toFixed(2),
  }))

  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Inventario')
  
  XLSX.writeFile(wb, `inventario_${new Date().toISOString().split('T')[0]}.xlsx`)
}

// Export reports to PDF
export function exportReportsToPDF(
  valueByCategory: Record<string, number>,
  stockByCategory: Record<string, number>,
  totalValue: number
) {
  const doc = new jsPDF()
  
  doc.setFontSize(18)
  doc.text('Reporte de Análisis', 14, 22)
  doc.setFontSize(11)
  doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 14, 30)

  // Summary
  doc.setFontSize(14)
  doc.text('Resumen Financiero', 14, 45)
  doc.setFontSize(11)
  doc.text(`Valor Total del Inventario: €${totalValue.toFixed(2)}`, 14, 55)

  // Value by category
  const categories = Object.keys(valueByCategory)
  const valueData = categories.map(cat => [
    cat,
    `€${valueByCategory[cat].toFixed(2)}`,
    `${stockByCategory[cat]} unidades`,
  ])

  autoTable(doc, {
    head: [['Categoría', 'Valor', 'Stock']],
    body: valueData,
    startY: 65,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [59, 130, 246] },
  })

  doc.save(`reporte_${new Date().toISOString().split('T')[0]}.pdf`)
}

// Export reports to Excel
export function exportReportsToExcel(
  valueByCategory: Record<string, number>,
  stockByCategory: Record<string, number>
) {
  const categories = Object.keys(valueByCategory)
  const data = categories.map(cat => ({
    'Categoría': cat,
    'Valor Total': valueByCategory[cat].toFixed(2),
    'Stock Total': stockByCategory[cat],
  }))

  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Análisis')
  
  XLSX.writeFile(wb, `reporte_${new Date().toISOString().split('T')[0]}.xlsx`)
}
