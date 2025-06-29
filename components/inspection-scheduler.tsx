"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Plus, CheckCircle, AlertTriangle, X } from "lucide-react"
import { ScheduleInspectionModal } from "./schedule-inspection-modal"
import { toast } from "@/hooks/use-toast"

interface Inspection {
  id: number
  connectionId: string
  customerName: string
  scheduledDate: string
  status: "scheduled" | "completed" | "cancelled" | "rescheduled"
  inspector: string
  notes?: string
  findings?: string
}

export function InspectionScheduler() {
  const [inspections, setInspections] = useState<Inspection[]>([])
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  useEffect(() => {
    // Simulate loading inspections
    setTimeout(() => {
      setInspections([
        {
          id: 1,
          connectionId: "CONN-001",
          customerName: "John Smith",
          scheduledDate: "2024-02-15T10:00:00",
          status: "scheduled",
          inspector: "Sarah Inspector",
          notes: "Routine quarterly inspection",
        },
        {
          id: 2,
          connectionId: "CONN-002",
          customerName: "ABC Industries",
          scheduledDate: "2024-02-20T14:00:00",
          status: "scheduled",
          inspector: "Sarah Inspector",
          notes: "Post-installation inspection",
        },
        {
          id: 3,
          connectionId: "CONN-003",
          customerName: "Green Energy Corp",
          scheduledDate: "2024-02-10T09:00:00",
          status: "completed",
          inspector: "Sarah Inspector",
          notes: "Annual safety inspection",
          findings: "All components functioning properly. Minor maintenance required on capacitor C4.",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      case "rescheduled":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <X className="h-4 w-4" />
      case "rescheduled":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const handleScheduleInspection = (inspectionData: any) => {
    const newInspection: Inspection = {
      id: Date.now(),
      ...inspectionData,
      status: "scheduled" as const,
      inspector: "Sarah Inspector",
    }
    setInspections([...inspections, newInspection])
    setShowScheduleModal(false)
    toast({
      title: "Success",
      description: "Inspection scheduled successfully",
    })
  }

  const handleCompleteInspection = (id: number, findings: string) => {
    setInspections(
      inspections.map((inspection) =>
        inspection.id === id ? { ...inspection, status: "completed" as const, findings } : inspection,
      ),
    )
    toast({
      title: "Success",
      description: "Inspection marked as completed",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const upcomingInspections = inspections.filter((i) => i.status === "scheduled")
  const completedInspections = inspections.filter((i) => i.status === "completed")

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Inspection Scheduler</h2>
          <p className="text-gray-600 mt-2">Schedule and manage electrical inspections</p>
        </div>
        <Button onClick={() => setShowScheduleModal(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Inspection
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-3xl font-bold text-gray-900">{upcomingInspections.length}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900">{completedInspections.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-3xl font-bold text-gray-900">{inspections.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Inspections */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Inspections</CardTitle>
          <CardDescription>Scheduled inspections requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingInspections.map((inspection) => (
              <div
                key={inspection.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{inspection.customerName}</h3>
                    <Badge className={`${getStatusColor(inspection.status)} border flex items-center gap-1`}>
                      {getStatusIcon(inspection.status)}
                      {inspection.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">Connection:</span> {inspection.connectionId}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span> {new Date(inspection.scheduledDate).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium">Inspector:</span> {inspection.inspector}
                    </p>
                    {inspection.notes && (
                      <p>
                        <span className="font-medium">Notes:</span> {inspection.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleCompleteInspection(inspection.id, "Inspection completed successfully")}
                  >
                    Complete
                  </Button>
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                </div>
              </div>
            ))}
            {upcomingInspections.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No upcoming inspections scheduled</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Completed Inspections */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Completed Inspections</CardTitle>
          <CardDescription>Recently completed inspection reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {completedInspections.map((inspection) => (
              <div key={inspection.id} className="p-4 border rounded-lg bg-green-50 border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{inspection.customerName}</h3>
                  <Badge className={`${getStatusColor(inspection.status)} border flex items-center gap-1`}>
                    {getStatusIcon(inspection.status)}
                    {inspection.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">Connection:</span> {inspection.connectionId}
                  </p>
                  <p>
                    <span className="font-medium">Completed:</span>{" "}
                    {new Date(inspection.scheduledDate).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-medium">Inspector:</span> {inspection.inspector}
                  </p>
                  {inspection.findings && (
                    <div className="mt-2 p-2 bg-white rounded border">
                      <p className="font-medium text-gray-700">Findings:</p>
                      <p className="text-gray-600">{inspection.findings}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {showScheduleModal && (
        <ScheduleInspectionModal onClose={() => setShowScheduleModal(false)} onSchedule={handleScheduleInspection} />
      )}
    </div>
  )
}
