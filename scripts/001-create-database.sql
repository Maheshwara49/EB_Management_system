-- Create Users table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'technician' CHECK(role IN ('admin', 'technician', 'inspector')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create Connections table
CREATE TABLE IF NOT EXISTS connections (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    address TEXT NOT NULL,
    connection_type TEXT NOT NULL CHECK(connection_type IN ('Residential', 'Commercial', 'Industrial')),
    voltage TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK(status IN ('active', 'pending', 'disconnected', 'maintenance')),
    install_date DATE NOT NULL,
    last_inspection DATE,
    created_by INTEGER REFERENCES users(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create Components table
CREATE TABLE IF NOT EXISTS components (
    id TEXT PRIMARY KEY,
    connection_id TEXT NOT NULL REFERENCES connections(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    value TEXT NOT NULL,
    location TEXT NOT NULL,
    status TEXT DEFAULT 'working' CHECK(status IN ('working', 'faulty', 'maintenance')),
    x_position REAL DEFAULT 0,
    y_position REAL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create Inspections table
CREATE TABLE IF NOT EXISTS inspections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    connection_id TEXT NOT NULL REFERENCES connections(id) ON DELETE CASCADE,
    inspector_id INTEGER REFERENCES users(id),
    scheduled_date DATETIME NOT NULL,
    completed_date DATETIME,
    status TEXT DEFAULT 'scheduled' CHECK(status IN ('scheduled', 'completed', 'cancelled', 'rescheduled')),
    notes TEXT,
    findings TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create Reports table
CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('connection_summary', 'maintenance_report', 'inspection_report', 'component_analysis')),
    generated_by INTEGER REFERENCES users(id),
    parameters TEXT, -- JSON string of report parameters
    file_path TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_connections_status ON connections(status);
CREATE INDEX IF NOT EXISTS idx_connections_type ON connections(connection_type);
CREATE INDEX IF NOT EXISTS idx_components_connection ON components(connection_id);
CREATE INDEX IF NOT EXISTS idx_components_status ON components(status);
CREATE INDEX IF NOT EXISTS idx_inspections_date ON inspections(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_inspections_status ON inspections(status);
