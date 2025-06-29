-- Insert sample users
INSERT OR IGNORE INTO users (id, email, password_hash, name, role) VALUES
(1, 'admin@electriboard.com', '$2a$10$rOzJqQZQQQQQQQQQQQQQQu', 'System Administrator', 'admin'),
(2, 'tech1@electriboard.com', '$2a$10$rOzJqQZQQQQQQQQQQQQQQu', 'John Technician', 'technician'),
(3, 'inspector@electriboard.com', '$2a$10$rOzJqQZQQQQQQQQQQQQQQu', 'Sarah Inspector', 'inspector');

-- Insert sample connections
INSERT OR IGNORE INTO connections VALUES
('CONN-001', 'John Smith', '123 Main St, Springfield', 'Residential', '220V', 'active', '2023-01-15', '2024-01-10', 2, '2023-01-15 10:00:00', '2024-01-10 14:30:00'),
('CONN-002', 'ABC Industries', '456 Industrial Ave, Metro City', 'Commercial', '440V', 'pending', '2024-02-01', '2024-01-25', 2, '2024-02-01 09:00:00', '2024-01-25 16:00:00'),
('CONN-003', 'Green Energy Corp', '789 Solar Blvd, Tech Park', 'Industrial', '11kV', 'active', '2023-06-20', '2024-01-05', 2, '2023-06-20 11:00:00', '2024-01-05 13:00:00');

-- Insert sample components
INSERT OR IGNORE INTO components VALUES
('C1', 'CONN-001', 'Capacitor', '1µF', 'Main Panel', 'working', 100, 50, '2023-01-15 10:30:00', '2023-01-15 10:30:00'),
('C2', 'CONN-001', 'Capacitor', '220nF', 'Sub Panel', 'working', 200, 50, '2023-01-15 10:30:00', '2023-01-15 10:30:00'),
('R1', 'CONN-001', 'Resistor', '47nΩ', 'Circuit A', 'working', 150, 100, '2023-01-15 10:30:00', '2023-01-15 10:30:00'),
('R2', 'CONN-001', 'Resistor', '100kΩ', 'Circuit B', 'maintenance', 250, 100, '2023-01-15 10:30:00', '2023-01-15 10:30:00'),
('C3', 'CONN-002', 'Capacitor', '2.2µF', 'Main Distribution', 'working', 100, 50, '2024-02-01 09:30:00', '2024-02-01 09:30:00'),
('T1', 'CONN-002', 'Transformer', '500VA', 'Entry Point', 'working', 200, 150, '2024-02-01 09:30:00', '2024-02-01 09:30:00'),
('C4', 'CONN-003', 'Capacitor', '10µF', 'HV Panel', 'faulty', 100, 50, '2023-06-20 11:30:00', '2023-06-20 11:30:00'),
('S1', 'CONN-003', 'Switch', '630A', 'Main Breaker', 'working', 200, 100, '2023-06-20 11:30:00', '2023-06-20 11:30:00');

-- Insert sample inspections
INSERT OR IGNORE INTO inspections (connection_id, inspector_id, scheduled_date, status, notes) VALUES
('CONN-001', 3, '2024-02-15 10:00:00', 'scheduled', 'Routine quarterly inspection'),
('CONN-002', 3, '2024-02-20 14:00:00', 'scheduled', 'Post-installation inspection'),
('CONN-003', 3, '2024-02-10 09:00:00', 'completed', 'Annual safety inspection completed');
