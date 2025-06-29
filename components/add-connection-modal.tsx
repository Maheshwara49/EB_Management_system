"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X, Zap } from "lucide-react"

interface AddConnectionModalProps {
  onClose: () => void
  onAdd: (connection: any) => void
}

export function AddConnectionModal({ onClose, onAdd }: AddConnectionModalProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    address: "",
    connectionType: "",
    voltage: "",
    status: "pending" as const,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await onAdd(formData)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Zap className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">New Connection</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="customerName" className="text-sm font-medium text-gray-700">
              Customer Name *
            </Label>
            <Input
              id="customerName"
              placeholder="Enter customer name"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="address" className="text-sm font-medium text-gray-700">
              Installation Address *
            </Label>
            <Textarea
              id="address"
              placeholder="Enter complete address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
              className="mt-1 min-h-[80px]"
            />
          </div>

          <div>
            <Label htmlFor="connectionType" className="text-sm font-medium text-gray-700">
              Connection Type *
            </Label>
            <Select
              value={formData.connectionType}
              onValueChange={(value) => setFormData({ ...formData, connectionType: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select connection type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Residential">🏠 Residential</SelectItem>
                <SelectItem value="Commercial">🏢 Commercial</SelectItem>
                <SelectItem value="Industrial">🏭 Industrial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="voltage" className="text-sm font-medium text-gray-700">
              Voltage Rating *
            </Label>
            <Select value={formData.voltage} onValueChange={(value) => setFormData({ ...formData, voltage: value })}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select voltage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="110V">110V - Low Voltage</SelectItem>
                <SelectItem value="220V">220V - Standard Residential</SelectItem>
                <SelectItem value="440V">440V - Commercial</SelectItem>
                <SelectItem value="11kV">11kV - High Voltage</SelectItem>
                <SelectItem value="33kV">33kV - Extra High Voltage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? "Creating..." : "Create Connection"}
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
