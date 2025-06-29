"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X, Calendar } from "lucide-react"

interface ScheduleInspectionModalProps {
  onClose: () => void
  onSchedule: (inspection: any) => void
}

export function ScheduleInspectionModal({ onClose, onSchedule }: ScheduleInspectionModalProps) {
  const [formData, setFormData] = useState({
    connectionId: "",
    customerName: "",
    scheduledDate: "",
    scheduledTime: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const scheduledDateTime = `${formData.scheduledDate}T${formData.scheduledTime}:00`

    onSchedule({
      ...formData,
      scheduledDate: scheduledDateTime,
    })
  }

  // Sample connections for dropdown
  const connections = [
    { id: "CONN-001", customer: "John Smith" },
    { id: "CONN-002", customer: "ABC Industries" },
    { id: "CONN-003", customer: "Green Energy Corp" },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Schedule Inspection</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="connection">Connection *</Label>
            <Select
              value={formData.connectionId}
              onValueChange={(value) => {
                const connection = connections.find((c) => c.id === value)
                setFormData({
                  ...formData,
                  connectionId: value,
                  customerName: connection?.customer || "",
                })
              }}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select connection" />
              </SelectTrigger>
              <SelectContent>
                {connections.map((connection) => (
                  <SelectItem key={connection.id} value={connection.id}>
                    {connection.id} - {connection.customer}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                required
                className="mt-1"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div>
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={formData.scheduledTime}
                onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                required
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Inspection notes or special requirements"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="mt-1 min-h-[80px]"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Schedule Inspection
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
