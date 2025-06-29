"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Download, Calendar, BarChart3, PieChart, TrendingUp } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export function ReportsManager() {
  const [reportType, setReportType] = useState("")
  const [dateRange, setDateRange] = useState({ from: "", to: "" })
  const [generating, setGenerating] = useState(false)

  const reportTypes = [
    {
      id: "connection_summary",
      name: "Connection Summary Report",
      description: "Overview of all connections and their status",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      id: "maintenance_report",
      name: "Maintenance Report",
      description: "Components requiring maintenance or repair",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      id: "inspection_report",
      name: "Inspection Report",
      description: "Scheduled and completed inspections",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      id: "component_analysis",
      name: "Component Analysis",
      description: "Detailed analysis of electrical components",
      icon: <PieChart className="h-5 w-5" />,
    },
  ]

  const handleGenerateReport = async () => {
    if (!reportType) {
      toast({
        title: "Error",
        description: "Please select a report type",
        variant: "destructive",
      })
      return
    }

    setGenerating(true)

    try {
      // Simulate report generation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real implementation, this would call an API to generate the PDF
      const reportData = generateReportData(reportType)
      downloadReport(reportData, reportType)

      toast({
        title: "Success",
        description: "Report generated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive",
      })
    } finally {
      setGenerating(false)
    }
  }

  const generateReportData = (type: string) => {
    // Sample report data generation
    const baseData = {
      generatedAt: new Date().toISOString(),
      dateRange: dateRange,
      type: type,
    }

    switch (type) {
      case "connection_summary":
        return {
          ...baseData,
          title: "Connection Summary Report",
          data: {
            totalConnections: 15,
            activeConnections: 12,
            pendingConnections: 2,
            disconnectedConnections: 1,
            connectionsByType: {
              residential: 8,
              commercial: 4,
              industrial: 3,
            },
          },
        }
      case "maintenance_report":
        return {
          ...baseData,
          title: "Maintenance Report",
          data: {
            componentsNeedingMaintenance: 5,
            faultyComponents: 2,
            scheduledMaintenance: 3,
            criticalIssues: 1,
          },
        }
      case "inspection_report":
        return {
          ...baseData,
          title: "Inspection Report",
          data: {
            scheduledInspections: 8,
            completedInspections: 12,
            overdueInspections: 1,
            averageInspectionTime: "2.5 hours",
          },
        }
      case "component_analysis":
        return {
          ...baseData,
          title: "Component Analysis Report",
          data: {
            totalComponents: 45,
            componentsByType: {
              capacitors: 18,
              resistors: 12,
              transformers: 8,
              switches: 7,
            },
            componentHealth: {
              working: 38,
              maintenance: 5,
              faulty: 2,
            },
          },
        }
      default:
        return baseData
    }
  }

  const downloadReport = (data: any, type: string) => {
    // Create a simple HTML report
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${data.title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { color: #2563eb; font-size: 24px; font-weight: bold; }
            .title { color: #1f2937; margin: 10px 0; }
            .meta { color: #6b7280; font-size: 14px; }
            .section { margin: 20px 0; }
            .section h3 { color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; }
            .data-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
            .data-card { background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb; }
            .data-label { font-weight: bold; color: #374151; }
            .data-value { font-size: 24px; color: #1f2937; margin: 5px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">⚡ ElectriBoard</div>
            <h1 class="title">${data.title}</h1>
            <div class="meta">Generated on ${new Date(data.generatedAt).toLocaleString()}</div>
          </div>
          
          <div class="section">
            <h3>Report Summary</h3>
            <div class="data-grid">
              ${Object.entries(data.data)
                .map(([key, value]) => {
                  if (typeof value === "object") {
                    return `
                    <div class="data-card">
                      <div class="data-label">${key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</div>
                      ${Object.entries(value)
                        .map(([subKey, subValue]) => `<div>${subKey}: ${subValue}</div>`)
                        .join("")}
                    </div>
                  `
                  } else {
                    return `
                    <div class="data-card">
                      <div class="data-label">${key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</div>
                      <div class="data-value">${value}</div>
                    </div>
                  `
                  }
                })
                .join("")}
            </div>
          </div>
        </body>
      </html>
    `

    // Create and download the file
    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${type}_report_${new Date().toISOString().split("T")[0]}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Reports & Analytics</h2>
        <p className="text-gray-600 mt-2">Generate comprehensive reports for connections and components</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Report Generation */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Generate Report</CardTitle>
              <CardDescription>Select report type and parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Report Type</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {reportTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        reportType === type.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setReportType(type.id)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {type.icon}
                        <h3 className="font-semibold text-gray-900">{type.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fromDate">From Date</Label>
                  <Input
                    id="fromDate"
                    type="date"
                    value={dateRange.from}
                    onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="toDate">To Date</Label>
                  <Input
                    id="toDate"
                    type="date"
                    value={dateRange.to}
                    onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <Button
                onClick={handleGenerateReport}
                disabled={generating}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {generating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating Report...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Connections</span>
                <span className="font-bold text-2xl text-blue-600">15</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Connections</span>
                <span className="font-bold text-2xl text-green-600">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending Inspections</span>
                <span className="font-bold text-2xl text-yellow-600">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Maintenance Required</span>
                <span className="font-bold text-2xl text-red-600">5</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Connection Summary</p>
                    <p className="text-xs text-gray-500">Generated 2 days ago</p>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Maintenance Report</p>
                    <p className="text-xs text-gray-500">Generated 1 week ago</p>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
