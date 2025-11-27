import { Button } from '@/components/ui/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems?: number
  itemsPerPage?: number
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  totalItems,
  itemsPerPage
}: PaginationProps) {
  if (totalPages <= 1) return null

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)
      
      // Calculate start and end of sliding window
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)
      
      // Adjust if close to beginning
      if (currentPage <= 3) {
        end = Math.min(totalPages - 1, 4)
      }
      
      // Adjust if close to end
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 3)
      }
      
      // Add ellipsis if gap from 1
      if (start > 2) {
        pages.push('...')
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      // Add ellipsis if gap to last
      if (end < totalPages - 1) {
        pages.push('...')
      }
      
      // Always show last page
      pages.push(totalPages)
    }
    
    return pages
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 px-2">
      {totalItems !== undefined && itemsPerPage !== undefined && (
        <p className="text-sm text-muted-foreground">
          Mostrando <span className="font-medium">{Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}</span> a <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> de <span className="font-medium">{totalItems}</span> resultados
        </p>
      )}
      
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">...</span>
            ) : (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className={`h-8 w-8 ${currentPage === page ? 'pointer-events-none' : ''}`}
                onClick={() => onPageChange(page as number)}
              >
                {page}
              </Button>
            )
          ))}
        </div>
        
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Página siguiente"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
