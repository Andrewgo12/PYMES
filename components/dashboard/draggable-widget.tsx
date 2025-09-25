"use client"

import type React from "react"

import { useState } from "react"

interface DraggableWidgetProps {
  id: string
  children: React.ReactNode
}

export function DraggableWidget({ id, children }: DraggableWidgetProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true)
    e.dataTransfer.setData("text/plain", id)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`transition-all duration-200 ${isDragging ? "opacity-50 scale-95" : ""}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {children}
    </div>
  )
}
