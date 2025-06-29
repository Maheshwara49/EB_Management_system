"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Edit, Plus, Trash2, MapPin, Calendar, Zap, Activity } from "lucide-react"
import { AddComponentModal } from "./add-component-modal"
import { CircuitDiagram } from "./circuit-diagram"
import { toast } from "@/hooks/use-toast"

interface Component {
  id: string
  type: string
  value: string
  location: string
  status: "working" | "faulty" | "maintenance"
  x_position?: number
  y_position?: number
}

interface Connection {
  id: string
  customerName: string
  address: string
  connectionType: string
  voltage: string
  status: "active" | "pending" | "disconnected"
  installDate: string
  lastInspection: string
  components: Component[]
}

interface ConnectionDetailsProps {
  connection: Connection
  onClose: () => void
  onUpdate: (connection: Connection) => void
}

export function ConnectionDetails({ connection, onClose, onUpdate }: ConnectionDetailsProps) {
  const [showAddComponent, setShowAddComponent] = useState(false)
  const [currentConnection, setCurrentConnection] = useState(connection)
  const [loading, setLoading] = useState(false)

  const getComponentStatusColor = (status: string) => {
    switch (status) {
      case "working":
        return "bg-green-100 text-green-800 border-green-200"
      case "faulty":
        return "bg-red-100 text-red-800 border-red-200"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "disconnected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleAddComponent = async (componentData: any) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/connections/${currentConnection.id}/components`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(componentData),
      })

      if (response.ok) {
        const data = await response.json()
        const updatedConnection = {
          ...currentConnection,
          components: [...currentConnection.components, data.component],
        }
        setCurrentConnection(updatedConnection)
        onUpdate(updatedConnection)
        setShowAddComponent(false)
        toast({
          title: "Success",
          description: "Component added successfully",
        })
      } else {
        throw new Error("Failed to add component")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add component",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveComponent = (componentId: string) => {
    const updatedConnection = {
      ...currentConnection,
      components: currentConnection.components.filter((c) => c.id !== componentId),
    }
    setCurrentConnection(updatedConnection)
    onUpdate(updatedConnection)
    toast({
      title: "Success",
      description: "Component removed successfully",
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{currentConnection.customerName}</h2>
              <p className="text-blue-600 font-medium">{currentConnection.id}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Connection Information */}
            <Card className="border-gray-200">
              <CardHeader className="bg-gray-50 rounded-t-lg">
                <CardTitle className="flex items-center justify-between text-lg">
                  <span className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    Connection Details
                  </span>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Connection ID</span>
                    <p className="text-gray-900 font-mono">{currentConnection.id}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Status</span>
                    <div className="mt-1">
                      <Badge className={`${getStatusColor(currentConnection.status)} border`}>
                        {currentConnection.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    Address
                  </span>
                  <p className="text-gray-900 mt-1">{currentConnection.address}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Connection Type</span>
                    <p className="text-gray-900">{currentConnection.connectionType}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Voltage Rating</span>
                    <p className="text-gray-900 font-semibold">{currentConnection.voltage}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Install Date
                    </span>
                    <p className="text-gray-900">{new Date(currentConnection.installDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Last Inspection
                    </span>
                    <p className="text-gray-900">{new Date(currentConnection.lastInspection).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Components */}
            <Card className="border-gray-200">
              <CardHeader className="bg-gray-50 rounded-t-lg">
                <CardTitle className="flex items-center justify-between text-lg">
                  <span className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    Components ({currentConnection.components.length})
                  </span>
                  <Button variant="outline" size="sm" onClick={() => setShowAddComponent(true)} disabled={loading}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {currentConnection.components.map((component) => (
                    <div
                      key={component.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-900">{component.type}</span>
                          <Badge className={`${getComponentStatusColor(component.status)} border text-xs`}>
                            {component.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>
                            <span className="font-medium">Value:</span> {component.value}
                          </div>
                          <div>
                            <span className="font-medium">Location:</span> {component.location}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveComponent(component.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {currentConnection.components.length === 0 && (
                    <div className="text-center py-8">
                      <Activity className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 mb-2">No components added yet</p>
                      <Button variant="outline" size="sm" onClick={() => setShowAddComponent(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Component
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Circuit Diagram */}
          <CircuitDiagram components={currentConnection.components} connectionId={currentConnection.id} />
        </div>

        {showAddComponent && (
          <AddComponentModal onClose={() => setShowAddComponent(false)} onAdd={handleAddComponent} loading={loading} />
        )}
      </div>
    </div>
  )
}
