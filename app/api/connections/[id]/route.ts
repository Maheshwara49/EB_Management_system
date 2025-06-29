import { type NextRequest, NextResponse } from "next/server"

// Import the connections array (in production, this would be a database query)
const connections = [
  {
    id: "CONN-001",
    customerName: "John Smith",
    address: "123 Main St, Springfield",
    connectionType: "Residential",
    voltage: "220V",
    status: "active",
    installDate: "2023-01-15",
    lastInspection: "2024-01-10",
    components: [
      { id: "C1", type: "Capacitor", value: "1µF", location: "Main Panel", status: "working" },
      { id: "C2", type: "Capacitor", value: "220nF", location: "Sub Panel", status: "working" },
      { id: "R1", type: "Resistor", value: "47nΩ", location: "Circuit A", status: "working" },
      { id: "R2", type: "Resistor", value: "100kΩ", location: "Circuit B", status: "maintenance" },
    ],
  },
  {
    id: "CONN-002",
    customerName: "ABC Industries",
    address: "456 Industrial Ave, Metro City",
    connectionType: "Commercial",
    voltage: "440V",
    status: "pending",
    installDate: "2024-02-01",
    lastInspection: "2024-01-25",
    components: [
      { id: "C3", type: "Capacitor", value: "2.2µF", location: "Main Distribution", status: "working" },
      { id: "T1", type: "Transformer", value: "500VA", location: "Entry Point", status: "working" },
    ],
  },
  {
    id: "CONN-003",
    customerName: "Green Energy Corp",
    address: "789 Solar Blvd, Tech Park",
    connectionType: "Industrial",
    voltage: "11kV",
    status: "active",
    installDate: "2023-06-20",
    lastInspection: "2024-01-05",
    components: [
      { id: "C4", type: "Capacitor", value: "10µF", location: "HV Panel", status: "faulty" },
      { id: "S1", type: "Switch", value: "630A", location: "Main Breaker", status: "working" },
    ],
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const connection = connections.find((c) => c.id === params.id)

  if (!connection) {
    return NextResponse.json({ error: "Connection not found" }, { status: 404 })
  }

  return NextResponse.json({ connection })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const connectionIndex = connections.findIndex((c) => c.id === params.id)

    if (connectionIndex === -1) {
      return NextResponse.json({ error: "Connection not found" }, { status: 404 })
    }

    connections[connectionIndex] = { ...connections[connectionIndex], ...body }

    return NextResponse.json({ connection: connections[connectionIndex] })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update connection" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const connectionIndex = connections.findIndex((c) => c.id === params.id)

  if (connectionIndex === -1) {
    return NextResponse.json({ error: "Connection not found" }, { status: 404 })
  }

  connections.splice(connectionIndex, 1)

  return NextResponse.json({ message: "Connection deleted successfully" })
}
