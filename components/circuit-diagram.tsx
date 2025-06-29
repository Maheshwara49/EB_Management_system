"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

interface Component {
  id: string
  type: string
  value: string
  location: string
  status: "working" | "faulty" | "maintenance"
  x_position: number
  y_position: number
}

interface CircuitDiagramProps {
  components: Component[]
  connectionId: string
}

export function CircuitDiagram({ components, connectionId }: CircuitDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (svgRef.current && components.length > 0) {
      generateCircuitDiagram()
    }
  }, [components, zoom, pan])

  const generateCircuitDiagram = () => {
    const svg = svgRef.current
    if (!svg) return

    // Clear existing content
    svg.innerHTML = ""

    // Set up SVG dimensions
    const width = 800
    const height = 600
    svg.setAttribute("viewBox", `${-pan.x} ${-pan.y} ${width / zoom} ${height / zoom}`)

    // Create background grid
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs")
    const pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern")
    pattern.setAttribute("id", "grid")
    pattern.setAttribute("width", "20")
    pattern.setAttribute("height", "20")
    pattern.setAttribute("patternUnits", "userSpaceOnUse")

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    path.setAttribute("d", "M 20 0 L 0 0 0 20")
    path.setAttribute("fill", "none")
    path.setAttribute("stroke", "#e5e7eb")
    path.setAttribute("stroke-width", "1")

    pattern.appendChild(path)
    defs.appendChild(pattern)
    svg.appendChild(defs)

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    rect.setAttribute("width", "100%")
    rect.setAttribute("height", "100%")
    rect.setAttribute("fill", "url(#grid)")
    svg.appendChild(rect)

    // Draw components
    components.forEach((component, index) => {
      const x = component.x_position || 100 + (index % 4) * 150
      const y = component.y_position || 100 + Math.floor(index / 4) * 120

      drawComponent(svg, component, x, y)
    })

    // Draw connections between components
    drawConnections(svg, components)
  }

  const drawComponent = (svg: SVGSVGElement, component: Component, x: number, y: number) => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g")
    group.setAttribute("transform", `translate(${x}, ${y})`)

    // Component symbol based on type
    let symbol: SVGElement
    const statusColor = getComponentStatusColor(component.status)

    switch (component.type.toLowerCase()) {
      case "capacitor":
        symbol = createCapacitorSymbol(statusColor)
        break
      case "resistor":
        symbol = createResistorSymbol(statusColor)
        break
      case "transformer":
        symbol = createTransformerSymbol(statusColor)
        break
      case "switch":
        symbol = createSwitchSymbol(statusColor)
        break
      case "breaker":
        symbol = createBreakerSymbol(statusColor)
        break
      default:
        symbol = createGenericSymbol(statusColor)
    }

    group.appendChild(symbol)

    // Component label
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
    text.setAttribute("x", "0")
    text.setAttribute("y", "50")
    text.setAttribute("text-anchor", "middle")
    text.setAttribute("font-size", "12")
    text.setAttribute("font-family", "Arial, sans-serif")
    text.setAttribute("fill", "#374151")
    text.textContent = `${component.type}\n${component.value}`

    const tspan1 = document.createElementNS("http://www.w3.org/2000/svg", "tspan")
    tspan1.setAttribute("x", "0")
    tspan1.setAttribute("dy", "0")
    tspan1.textContent = component.type

    const tspan2 = document.createElementNS("http://www.w3.org/2000/svg", "tspan")
    tspan2.setAttribute("x", "0")
    tspan2.setAttribute("dy", "14")
    tspan2.setAttribute("font-size", "10")
    tspan2.setAttribute("fill", "#6b7280")
    tspan2.textContent = component.value

    text.appendChild(tspan1)
    text.appendChild(tspan2)
    group.appendChild(text)

    // Status indicator
    const statusCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    statusCircle.setAttribute("cx", "25")
    statusCircle.setAttribute("cy", "-25")
    statusCircle.setAttribute("r", "6")
    statusCircle.setAttribute("fill", statusColor)
    statusCircle.setAttribute("stroke", "white")
    statusCircle.setAttribute("stroke-width", "2")
    group.appendChild(statusCircle)

    svg.appendChild(group)
  }

  const createCapacitorSymbol = (color: string) => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g")

    // Capacitor plates
    const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line")
    line1.setAttribute("x1", "-8")
    line1.setAttribute("y1", "-15")
    line1.setAttribute("x2", "-8")
    line1.setAttribute("y2", "15")
    line1.setAttribute("stroke", color)
    line1.setAttribute("stroke-width", "3")

    const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line")
    line2.setAttribute("x1", "8")
    line2.setAttribute("y1", "-15")
    line2.setAttribute("x2", "8")
    line2.setAttribute("y2", "15")
    line2.setAttribute("stroke", color)
    line2.setAttribute("stroke-width", "3")

    // Connection lines
    const line3 = document.createElementNS("http://www.w3.org/2000/svg", "line")
    line3.setAttribute("x1", "-20")
    line3.setAttribute("y1", "0")
    line3.setAttribute("x2", "-8")
    line3.setAttribute("y2", "0")
    line3.setAttribute("stroke", color)
    line3.setAttribute("stroke-width", "2")

    const line4 = document.createElementNS("http://www.w3.org/2000/svg", "line")
    line4.setAttribute("x1", "8")
    line4.setAttribute("y1", "0")
    line4.setAttribute("x2", "20")
    line4.setAttribute("y2", "0")
    line4.setAttribute("stroke", color)
    line4.setAttribute("stroke-width", "2")

    g.appendChild(line1)
    g.appendChild(line2)
    g.appendChild(line3)
    g.appendChild(line4)

    return g
  }

  const createResistorSymbol = (color: string) => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g")

    // Resistor zigzag
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    path.setAttribute("d", "M -20 0 L -15 0 L -12 -8 L -8 8 L -4 -8 L 0 8 L 4 -8 L 8 8 L 12 -8 L 15 0 L 20 0")
    path.setAttribute("stroke", color)
    path.setAttribute("stroke-width", "2")
    path.setAttribute("fill", "none")

    g.appendChild(path)
    return g
  }

  const createTransformerSymbol = (color: string) => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g")

    // Primary coil
    const circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    circle1.setAttribute("cx", "-10")
    circle1.setAttribute("cy", "0")
    circle1.setAttribute("r", "12")
    circle1.setAttribute("stroke", color)
    circle1.setAttribute("stroke-width", "2")
    circle1.setAttribute("fill", "none")

    // Secondary coil
    const circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    circle2.setAttribute("cx", "10")
    circle2.setAttribute("cy", "0")
    circle2.setAttribute("r", "12")
    circle2.setAttribute("stroke", color)
    circle2.setAttribute("stroke-width", "2")
    circle2.setAttribute("fill", "none")

    // Core lines
    const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line")
    line1.setAttribute("x1", "0")
    line1.setAttribute("y1", "-15")
    line1.setAttribute("x2", "0")
    line1.setAttribute("y2", "15")
    line1.setAttribute("stroke", color)
    line1.setAttribute("stroke-width", "2")

    g.appendChild(circle1)
    g.appendChild(circle2)
    g.appendChild(line1)

    return g
  }

  const createSwitchSymbol = (color: string) => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g")

    // Switch contacts
    const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line")
    line1.setAttribute("x1", "-20")
    line1.setAttribute("y1", "0")
    line1.setAttribute("x2", "-5")
    line1.setAttribute("y2", "0")
    line1.setAttribute("stroke", color)
    line1.setAttribute("stroke-width", "2")

    const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line")
    line2.setAttribute("x1", "5")
    line2.setAttribute("y1", "0")
    line2.setAttribute("x2", "20")
    line2.setAttribute("y2", "0")
    line2.setAttribute("stroke", color)
    line2.setAttribute("stroke-width", "2")

    // Switch blade
    const line3 = document.createElementNS("http://www.w3.org/2000/svg", "line")
    line3.setAttribute("x1", "-5")
    line3.setAttribute("y1", "0")
    line3.setAttribute("x2", "0")
    line3.setAttribute("y2", "-10")
    line3.setAttribute("stroke", color)
    line3.setAttribute("stroke-width", "2")

    // Contact points
    const circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    circle1.setAttribute("cx", "-5")
    circle1.setAttribute("cy", "0")
    circle1.setAttribute("r", "2")
    circle1.setAttribute("fill", color)

    const circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    circle2.setAttribute("cx", "5")
    circle2.setAttribute("cy", "0")
    circle2.setAttribute("r", "2")
    circle2.setAttribute("fill", color)

    g.appendChild(line1)
    g.appendChild(line2)
    g.appendChild(line3)
    g.appendChild(circle1)
    g.appendChild(circle2)

    return g
  }

  const createBreakerSymbol = (color: string) => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g")

    // Breaker box
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    rect.setAttribute("x", "-15")
    rect.setAttribute("y", "-10")
    rect.setAttribute("width", "30")
    rect.setAttribute("height", "20")
    rect.setAttribute("stroke", color)
    rect.setAttribute("stroke-width", "2")
    rect.setAttribute("fill", "none")

    // Connection lines
    const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line")
    line1.setAttribute("x1", "-25")
    line1.setAttribute("y1", "0")
    line1.setAttribute("x2", "-15")
    line1.setAttribute("y2", "0")
    line1.setAttribute("stroke", color)
    line1.setAttribute("stroke-width", "2")

    const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line")
    line2.setAttribute("x1", "15")
    line2.setAttribute("y1", "0")
    line2.setAttribute("x2", "25")
    line2.setAttribute("y2", "0")
    line2.setAttribute("stroke", color)
    line2.setAttribute("stroke-width", "2")

    // Breaker symbol
    const line3 = document.createElementNS("http://www.w3.org/2000/svg", "line")
    line3.setAttribute("x1", "-10")
    line3.setAttribute("y1", "-5")
    line3.setAttribute("x2", "10")
    line3.setAttribute("y2", "5")
    line3.setAttribute("stroke", color)
    line3.setAttribute("stroke-width", "2")

    g.appendChild(rect)
    g.appendChild(line1)
    g.appendChild(line2)
    g.appendChild(line3)

    return g
  }

  const createGenericSymbol = (color: string) => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g")

    // Generic component box
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    rect.setAttribute("x", "-15")
    rect.setAttribute("y", "-10")
    rect.setAttribute("width", "30")
    rect.setAttribute("height", "20")
    rect.setAttribute("stroke", color)
    rect.setAttribute("stroke-width", "2")
    rect.setAttribute("fill", "none")

    // Connection lines
    const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line")
    line1.setAttribute("x1", "-25")
    line1.setAttribute("y1", "0")
    line1.setAttribute("x2", "-15")
    line1.setAttribute("y2", "0")
    line1.setAttribute("stroke", color)
    line1.setAttribute("stroke-width", "2")

    const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line")
    line2.setAttribute("x1", "15")
    line2.setAttribute("y1", "0")
    line2.setAttribute("x2", "25")
    line2.setAttribute("y2", "0")
    line2.setAttribute("stroke", color)
    line2.setAttribute("stroke-width", "2")

    g.appendChild(rect)
    g.appendChild(line1)
    g.appendChild(line2)

    return g
  }

  const drawConnections = (svg: SVGSVGElement, components: Component[]) => {
    // Draw connecting wires between components
    for (let i = 0; i < components.length - 1; i++) {
      const comp1 = components[i]
      const comp2 = components[i + 1]

      const x1 = comp1.x_position || 100 + (i % 4) * 150
      const y1 = comp1.y_position || 100 + Math.floor(i / 4) * 120
      const x2 = comp2.x_position || 100 + ((i + 1) % 4) * 150
      const y2 = comp2.y_position || 100 + Math.floor((i + 1) / 4) * 120

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
      line.setAttribute("x1", (x1 + 25).toString())
      line.setAttribute("y1", y1.toString())
      line.setAttribute("x2", (x2 - 25).toString())
      line.setAttribute("y2", y2.toString())
      line.setAttribute("stroke", "#374151")
      line.setAttribute("stroke-width", "2")
      line.setAttribute("stroke-dasharray", "5,5")

      svg.appendChild(line)
    }
  }

  const getComponentStatusColor = (status: string) => {
    switch (status) {
      case "working":
        return "#10b981"
      case "faulty":
        return "#ef4444"
      case "maintenance":
        return "#f59e0b"
      default:
        return "#6b7280"
    }
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.2, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.2, 0.5))
  }

  const handleReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const handleDownload = () => {
    const svg = svgRef.current
    if (!svg) return

    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svg)
    const blob = new Blob([svgString], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `circuit_diagram_${connectionId}.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Circuit Diagram</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Interactive electrical circuit visualization</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {components.length > 0 ? (
          <div className="border rounded-lg overflow-hidden bg-white">
            <svg ref={svgRef} width="100%" height="400" className="cursor-move" style={{ minHeight: "400px" }} />
            <div className="p-4 bg-gray-50 border-t">
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Working</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>Maintenance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Faulty</span>
                </div>
                <div className="ml-auto text-gray-500">Zoom: {Math.round(zoom * 100)}%</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
            <p>No components available for circuit diagram</p>
            <p className="text-sm mt-1">Add components to generate the circuit visualization</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
