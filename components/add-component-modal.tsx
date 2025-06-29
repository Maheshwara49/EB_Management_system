"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Zap } from "lucide-react"

interface AddComponentModalProps {
  onClose: () => void
  onAdd: (component: any) => void
  loading?: boolean
}

export function AddComponentModal({ onClose, onAdd, loading = false }: AddComponentModalProps) {
  const [formData, setFormData] = useState({
    type: "",
    value: "",
    location: "",
    status: "working" as const,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onAdd(formData)
  }

  const componentTypes = [
    { value: "Capacitor", label: "🔋 Capacitor", examples: "1µF, 220nF, 10µF" },
    { value: "Resistor", label: "⚡ Resistor", examples: "47nΩ, 100kΩ, 1MΩ" },
    { value: "Transformer", label: "🔄 Transformer", examples: "500VA, 1kVA, 10kVA" },
    { value: "Switch", label: "🔘 Switch", examples: "630A, 100A, 25A" },
    { value: "Breaker", label: "🛡️ Circuit Breaker", examples: "20A, 50A, 100A" },
    { value: "Fuse", label: "🔥 Fuse", examples: "10A, 20A, 30A" },
    { value: "Relay", label: "🔗 Relay", examples: "12V, 24V, 110V" },
    { value: "Contactor", label: "⚙️ Contactor", examples: "25A, 40A, 65A" },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Zap className="h-5 w-5 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Add Component</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} disabled={loading}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="type" className="text-sm font-medium text-gray-700">
              Component Type *
            </Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select component type" />
              </SelectTrigger>
              <SelectContent>
                {componentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div>
                      <div>{type.label}</div>
                      <div className="text-xs text-gray-500">Examples: {type.examples}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="value" className="text-sm font-medium text-gray-700">
              Value/Rating *
            </Label>
            <Input
              id="value"
              placeholder="e.g., 1µF, 220V, 100kΩ"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              required
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">Include units (µF, nF, kΩ, V, A, etc.)</p>
          </div>

          <div>
            <Label htmlFor="location" className="text-sm font-medium text-gray-700">
              Installation Location *
            </Label>
            <Input
              id="location"
              placeholder="e.g., Main Panel, Circuit A, Distribution Board"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="status" className="text-sm font-medium text-gray-700">
              Current Status
            </Label>
            <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="working">✅ Working</SelectItem>
                <SelectItem value="maintenance">⚠️ Maintenance Required</SelectItem>
                <SelectItem value="faulty">❌ Faulty</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading ? "Adding..." : "Add Component"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
