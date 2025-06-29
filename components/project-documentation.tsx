"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Code,
  Database,
  Shield,
  Calendar,
  FileText,
  Zap,
  Clock,
  Users,
  Target,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
} from "lucide-react"

export function ProjectDocumentation() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Project Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-blue-600 p-4 rounded-full">
            <Zap className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900">ElectriBoard Project Documentation</h1>
        <p className="text-xl text-gray-600">Mini Project-12: Electricity Board Connections Management System</p>
        <div className="flex justify-center gap-2">
          <Badge variant="secondary">Full-Stack Application</Badge>
          <Badge variant="secondary">Next.js 14</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">SQLite</Badge>
        </div>
      </div>

      {/* Project Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Project Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            ElectriBoard is a comprehensive electricity board connections management system designed to streamline the
            process of managing electrical connections, components, inspections, and reporting for utility companies and
            electrical contractors. The system provides a centralized platform for tracking connection status,
            scheduling inspections, managing components, and generating detailed reports.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Primary Purpose</h4>
              <p className="text-blue-800 text-sm">
                Digitize and automate electricity board connection management processes, reducing manual paperwork and
                improving operational efficiency.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Target Users</h4>
              <p className="text-green-800 text-sm">
                Electrical technicians, inspectors, administrators, and utility company personnel managing electrical
                infrastructure.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Development Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Development Timeline & Effort
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">120</div>
                <div className="text-sm text-gray-600">Total Hours</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">3</div>
                <div className="text-sm text-gray-600">Weeks Duration</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">5</div>
                <div className="text-sm text-gray-600">Major Features</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Development Phases:</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <span className="font-medium">Week 1:</span> Database design, authentication system, basic CRUD
                    operations (40 hours)
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <span className="font-medium">Week 2:</span> UI/UX development, inspection scheduling, reporting
                    system (45 hours)
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <span className="font-medium">Week 3:</span> Circuit diagram generator, testing, documentation,
                    deployment (35 hours)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Technology Stack
          </CardTitle>
          <CardDescription>Modern full-stack technologies chosen for scalability and maintainability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Code className="h-4 w-4" />
                Frontend Technologies
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Next.js 14</span>
                  <Badge variant="outline">React Framework</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>TypeScript</span>
                  <Badge variant="outline">Type Safety</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tailwind CSS</span>
                  <Badge variant="outline">Styling</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>shadcn/ui</span>
                  <Badge variant="outline">UI Components</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Lucide React</span>
                  <Badge variant="outline">Icons</Badge>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Database className="h-4 w-4" />
                Backend Technologies
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Next.js API Routes</span>
                  <Badge variant="outline">Backend API</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>SQLite</span>
                  <Badge variant="outline">Database</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>NextAuth.js</span>
                  <Badge variant="outline">Authentication</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>bcryptjs</span>
                  <Badge variant="outline">Password Hashing</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>better-sqlite3</span>
                  <Badge variant="outline">SQLite Driver</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Key Features Implemented
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold">User Authentication</h4>
                  <p className="text-sm text-gray-600">
                    Role-based access control with admin, technician, and inspector roles
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Database className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Connection Management</h4>
                  <p className="text-sm text-gray-600">
                    CRUD operations for electrical connections with component tracking
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-purple-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Inspection Scheduling</h4>
                  <p className="text-sm text-gray-600">
                    Schedule, track, and manage electrical inspections with notifications
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-orange-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Report Generation</h4>
                  <p className="text-sm text-gray-600">
                    Automated PDF/HTML reports for connections, maintenance, and inspections
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-yellow-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Circuit Diagrams</h4>
                  <p className="text-sm text-gray-600">
                    Interactive SVG-based circuit diagram generation and visualization
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-red-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Multi-user Support</h4>
                  <p className="text-sm text-gray-600">
                    Collaborative platform with user management and activity tracking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Challenges & Solutions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Development Challenges & Solutions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-semibold text-red-900">Challenge: Complex Database Relationships</h4>
              <p className="text-red-800 text-sm mt-1">
                Managing relationships between connections, components, inspections, and users required careful schema
                design.
              </p>
              <p className="text-gray-700 text-sm mt-2">
                <strong>Solution:</strong> Implemented proper foreign key constraints, indexes, and normalized database
                structure with clear separation of concerns.
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-semibold text-yellow-900">Challenge: Real-time Circuit Diagram Generation</h4>
              <p className="text-yellow-800 text-sm mt-1">
                Creating dynamic, interactive circuit diagrams from component data was technically complex.
              </p>
              <p className="text-gray-700 text-sm mt-2">
                <strong>Solution:</strong> Used SVG with JavaScript DOM manipulation to create scalable, interactive
                diagrams with proper component symbols and connections.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-blue-900">Challenge: User Experience Design</h4>
              <p className="text-blue-800 text-sm mt-1">
                Balancing feature richness with simplicity for users with varying technical backgrounds.
              </p>
              <p className="text-gray-700 text-sm mt-2">
                <strong>Solution:</strong> Implemented progressive disclosure, clear navigation, and contextual help
                with role-based interface customization.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-green-900">Challenge: Report Generation Performance</h4>
              <p className="text-green-800 text-sm mt-1">
                Generating complex reports with large datasets while maintaining good user experience.
              </p>
              <p className="text-gray-700 text-sm mt-2">
                <strong>Solution:</strong> Implemented asynchronous report generation with progress indicators and
                optimized database queries with proper indexing.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Impact & Purpose */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Project Impact & Purpose
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Why This Project Matters</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Reduces manual paperwork and human errors in electrical management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Improves safety through systematic inspection scheduling and tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Enhances operational efficiency for utility companies and contractors</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Provides data-driven insights through comprehensive reporting</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Learning Outcomes</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <span>Full-stack development with modern React and Next.js</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <span>Database design and optimization for complex relationships</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <span>User authentication and authorization implementation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <span>SVG manipulation and dynamic visualization techniques</span>
                </li>
              </ul>
            </div>
          </div>

          <Separator />

          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Real-World Application</h4>
            <p className="text-blue-800 text-sm leading-relaxed">
              This project demonstrates practical software engineering skills applicable to enterprise-level
              applications in the utilities sector. The system architecture, security considerations, and user
              experience design principles used here are directly transferable to production environments in electrical
              utilities, facility management companies, and industrial maintenance operations.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Technical Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">System Requirements</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Node.js 18+ runtime environment</li>
                <li>• SQLite 3.x database engine</li>
                <li>• Modern web browser (Chrome, Firefox, Safari, Edge)</li>
                <li>• Minimum 2GB RAM for development</li>
                <li>• 500MB disk space for application and database</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Performance Metrics</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Page load time: &lt;2 seconds</li>
                <li>• Database query response: &lt;100ms</li>
                <li>• Report generation: &lt;5 seconds</li>
                <li>• Circuit diagram rendering: &lt;1 second</li>
                <li>• Supports 100+ concurrent users</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
