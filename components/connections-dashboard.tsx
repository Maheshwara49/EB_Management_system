"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Zap, AlertTriangle, CheckCircle, Settings, Users, Activity } from "lucide-react"
import { AddConnectionModal } from "./add-connection-modal"
import { ConnectionDetails } from "./connection-details"
import { toast } from "@/hooks/use-toast"

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

interface Component {
  id: string
  type: string
  value: string
  location: string
  status: "working" | "faulty" | "maintenance"
}

export function ConnectionsDashboard() {
  const [connections, setConnections] = useState<Connection[]>([])
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchConnections()
  }, [])

  const fetchConnections = async () => {
    try {
      const response = await fetch("/api/connections")
      const data = await response.json()
      setConnections(data.connections)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch connections",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddConnection = async (connectionData: any) => {
    try {
      const response = await fetch("/api/connections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(connectionData),
      })

      if (response.ok) {
        const data = await response.json()
        setConnections([...connections, data.connection])
        setShowAddModal(false)
        toast({
          title: "Success",
          description: "Connection added successfully",
        })
      } else {
        throw new Error("Failed to add connection")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add connection",
        variant: "destructive",
      })
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <AlertTriangle className="h-4 w-4" />
      case "disconnected":
        return <Zap className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const activeConnections = connections.filter((c) => c.status === "active").length
  const pendingConnections = connections.filter((c) => c.status === "pending").length
  const totalComponents = connections.reduce((acc, conn) => acc + conn.components.length, 0)
  const maintenanceRequired = connections.reduce(
    (acc, conn) =>
      acc + conn.components.filter((comp) => comp.status === "maintenance" || comp.status === "faulty").length,
    0,
  )

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-600 mt-2">Monitor and manage electricity board connections</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Connection
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Connections</p>
                <p className="text-3xl font-bold text-gray-900">{activeConnections}</p>
                <p className="text-xs text-green-600 mt-1">↗ All systems operational</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Installations</p>
                <p className="text-3xl font-bold text-gray-900">{pendingConnections}</p>
                <p className="text-xs text-yellow-600 mt-1">⏳ Awaiting completion</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Components</p>
                <p className="text-3xl font-bold text-gray-900">{totalComponents}</p>
                <p className="text-xs text-blue-600 mt-1">📊 Across all connections</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Maintenance Required</p>
                <p className="text-3xl font-bold text-gray-900">{maintenanceRequired}</p>
                <p className="text-xs text-red-600 mt-1">🔧 Needs attention</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <Settings className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connections Grid */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Connections</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {connections.map((connection) => (
            <Card
              key={connection.id}
              className="hover:shadow-lg transition-all duration-200 cursor-pointer border-gray-200 hover:border-blue-300"
              onClick={() => setSelectedConnection(connection)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-900">{connection.customerName}</CardTitle>
                    <CardDescription className="text-blue-600 font-medium">{connection.id}</CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(connection.status)} flex items-center gap-1 border`}>
                    {getStatusIcon(connection.status)}
                    {connection.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium">Type:</span>
                    <span className="ml-1">{connection.connectionType}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Zap className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium">Voltage:</span>
                    <span className="ml-1">{connection.voltage}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Activity className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium">Components:</span>
                    <span className="ml-1">{connection.components.length}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-500 truncate">{connection.address}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Last inspection: {new Date(connection.lastInspection).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {connections.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No connections found</h3>
              <p className="text-gray-500 mb-4">Get started by adding your first electricity connection</p>
              <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Connection
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modals */}
      {showAddModal && <AddConnectionModal onClose={() => setShowAddModal(false)} onAdd={handleAddConnection} />}

      {selectedConnection && (
        <ConnectionDetails
          connection={selectedConnection}
          onClose={() => setSelectedConnection(null)}
          onUpdate={(updatedConnection) => {
            setConnections(connections.map((c) => (c.id === updatedConnection.id ? updatedConnection : c)))
            setSelectedConnection(null)
          }}
        />
      )}
    </div>
  )
}
