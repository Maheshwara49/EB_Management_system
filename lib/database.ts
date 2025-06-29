import Database from "better-sqlite3"
import { join } from "path"

const dbPath = join(process.cwd(), "database.sqlite")
const db = new Database(dbPath)

// Enable foreign keys
db.pragma("foreign_keys = ON")

// Initialize database with schema
export function initializeDatabase() {
  // This would run the SQL scripts in a real implementation
  console.log("Database initialized")
}

export default db
