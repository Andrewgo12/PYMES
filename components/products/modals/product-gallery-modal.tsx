"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, Edit, Trash2, Download, Share, ZoomIn, Grid3X3, List, Star, Eye } from "lucide-react"
import { useState } from "react"

interface ProductGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  product: any
}

export function ProductGalleryModal({ isOpen, onClose, product }: ProductGalleryModalProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  if (!product) return null

  const images = [
    {
      id: 1,
      url: product.image,
      title: "Imagen Principal",
      type: "main",
      size: "2.4 MB",
      dimensions: "1920x1080",
      uploadDate: "2024-01-15",
      featured: true,
    },
    {
      id: 2,
      url: "/product-angle-2.png",
      title: "Vista Lateral",
      type: "angle",
      size: "1.8 MB",
      dimensions: "1920x1080",
      uploadDate: "2024-01-15",
      featured: false,
    },
    {
      id: 3,
      url: "/product-back-view.png",
      title: "Vista Trasera",
      type: "angle",
      size: "2.1 MB",
      dimensions: "1920x1080",
      uploadDate: "2024-01-15",
      featured: false,
    },
    {
      id: 4,
      url: "/modern-product-packaging.png",
      title: "Empaque",
      type: "packaging",
      size: "1.5 MB",
      dimensions: "1920x1080",
      uploadDate: "2024-01-14",
      featured: false,
    },
    {
      id: 5,
      url: "/product-accessories.jpg",
      title: "Accesorios Incluidos",
      type: "accessories",
      size: "1.9 MB",
      dimensions: "1920x1080",
      uploadDate: "2024-01-14",
      featured: false,
    },
    {
      id: 6,
      url: "/product-lifestyle.png",
      title: "Imagen Lifestyle",
      type: "lifestyle",
      size: "3.2 MB",
      dimensions: "1920x1080",
      uploadDate: "2024-01-13",
      featured: false,
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "main":
        return "bg-blue-500"
      case "angle":
        return "bg-green-500"
      case "packaging":
        return "bg-purple-500"
      case "accessories":
        return "bg-orange-500"
      case "lifestyle":
        return "bg-pink-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeName = (type: string) => {
    switch (type) {
      case "main":
        return "Principal"
      case "angle":
        return "Ángulo"
      case "packaging":
        return "Empaque"
      case "accessories":
        return "Accesorios"
      case "lifestyle":
        return "Lifestyle"
      default:
        return "Otro"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Galería de Imágenes - {product.name}
          </DialogTitle>
          <DialogDescription>Gestiona todas las imágenes del producto</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Controles */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">{images.length} imágenes</span>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Descargar Todas
              </Button>
              <Button size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Subir Imágenes
              </Button>
            </div>
          </div>

          {/* Imagen Destacada */}
          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden">
                  <img
                    src={images.find((img) => img.featured)?.url || "/placeholder.svg"}
                    alt="Imagen destacada"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">Imagen Destacada</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Esta imagen se muestra como principal en el catálogo y páginas de producto
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Cambiar Destacada
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Galería */}
          {viewMode === "grid" ? (
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {images.map((image) => (
                <Card key={image.id} className="bg-card border-border hover:shadow-lg transition-shadow">
                  <CardContent className="p-3">
                    <div className="space-y-3">
                      <div className="relative group">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.title}
                          className="w-full h-32 object-cover rounded-lg bg-muted cursor-pointer"
                          onClick={() => setSelectedImage(image.id)}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Button variant="secondary" size="sm">
                            <ZoomIn className="h-4 w-4 mr-2" />
                            Ver
                          </Button>
                        </div>
                        {image.featured && (
                          <div className="absolute top-2 left-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </div>
                        )}
                        <div className="absolute top-2 right-2">
                          <Badge variant="outline" className={`text-xs ${getTypeColor(image.type)} text-white`}>
                            {getTypeName(image.type)}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-medium text-sm line-clamp-1">{image.title}</h4>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{image.dimensions}</span>
                          <span>{image.size}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{image.uploadDate}</p>
                      </div>

                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="flex-1">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1">
                          <Share className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1 text-red-500 hover:text-red-600">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border">
                      <tr className="text-left">
                        <th className="p-4">Vista Previa</th>
                        <th className="p-4">Título</th>
                        <th className="p-4">Tipo</th>
                        <th className="p-4">Dimensiones</th>
                        <th className="p-4">Tamaño</th>
                        <th className="p-4">Fecha</th>
                        <th className="p-4">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {images.map((image) => (
                        <tr key={image.id} className="border-b border-border hover:bg-muted/50">
                          <td className="p-4">
                            <div className="relative">
                              <img
                                src={image.url || "/placeholder.svg"}
                                alt={image.title}
                                className="w-16 h-16 object-cover rounded-lg bg-muted cursor-pointer"
                                onClick={() => setSelectedImage(image.id)}
                              />
                              {image.featured && (
                                <Star className="absolute -top-1 -right-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                              )}
                            </div>
                          </td>
                          <td className="p-4 font-medium">{image.title}</td>
                          <td className="p-4">
                            <Badge variant="outline" className={`${getTypeColor(image.type)} text-white`}>
                              {getTypeName(image.type)}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">{image.dimensions}</td>
                          <td className="p-4 text-sm text-muted-foreground">{image.size}</td>
                          <td className="p-4 text-sm text-muted-foreground">{image.uploadDate}</td>
                          <td className="p-4">
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Estadísticas de la Galería */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-2xl font-bold">{images.length}</div>
                    <div className="text-sm text-muted-foreground">Total Imágenes</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="text-2xl font-bold">
                      {images.reduce((sum, img) => sum + Number.parseFloat(img.size), 0).toFixed(1)} MB
                    </div>
                    <div className="text-sm text-muted-foreground">Tamaño Total</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <div>
                    <div className="text-2xl font-bold">{images.filter((img) => img.featured).length}</div>
                    <div className="text-sm text-muted-foreground">Destacadas</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-purple-500" />
                  <div>
                    <div className="text-2xl font-bold">1,234</div>
                    <div className="text-sm text-muted-foreground">Visualizaciones</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
