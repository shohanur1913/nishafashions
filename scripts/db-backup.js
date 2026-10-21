/**
 * Production Database Backup Script
 * Exports full MySQL database schema and records to a timestamped SQL dump.
 */
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

async function backup() {
  const host = process.env.DB_HOST || "127.0.0.1";
  const port = Number(process.env.DB_PORT) || 3306;
  const user = process.env.DB_USER || "root";
  const password = process.env.DB_PASSWORD || "";
  const database = process.env.DB_NAME || "nishafashions";

  console.log(`Connecting to database ${database} at ${host}:${port}...`);
  const conn = await mysql.createConnection({ host, port, user, password, database });

  const backupDir = path.join(process.cwd(), "backups");
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `backup-${database}-${timestamp}.sql`;
  const filePath = path.join(backupDir, filename);

  const writeStream = fs.createWriteStream(filePath, { encoding: "utf8" });
  writeStream.write(`-- Nisha Fashions Wear Database Backup\n`);
  writeStream.write(`-- Generated: ${new Date().toISOString()}\n\n`);
  writeStream.write(`SET FOREIGN_KEY_CHECKS=0;\n\n`);

  const [tables] = await conn.query("SHOW TABLES");
  const tableKey = `Tables_in_${database}`;

  for (const row of tables) {
    const tableName = row[tableKey];
    console.log(`Dumping table: ${tableName}`);

    const [createResult] = await conn.query(`SHOW CREATE TABLE \`${tableName}\``);
    writeStream.write(`DROP TABLE IF EXISTS \`${tableName}\`;\n`);
    writeStream.write(`${createResult[0]["Create Table"]};\n\n`);

    const [dataRows] = await conn.query(`SELECT * FROM \`${tableName}\``);
    if (dataRows.length > 0) {
      for (const dataRow of dataRows) {
        const columns = Object.keys(dataRow).map(c => `\`${c}\``).join(", ");
        const values = Object.values(dataRow).map(val => {
          if (val === null || val === undefined) return "NULL";
          if (typeof val === "number" || typeof val === "boolean") return val;
          if (val instanceof Date) return `'${val.toISOString().slice(0, 19).replace('T', ' ')}'`;
          return `'${val.toString().replace(/'/g, "''").replace(/\\/g, "\\\\")}'`;
        }).join(", ");

        writeStream.write(`INSERT INTO \`${tableName}\` (${columns}) VALUES (${values});\n`);
      }
      writeStream.write(`\n`);
    }
  }

  writeStream.write(`SET FOREIGN_KEY_CHECKS=1;\n`);
  writeStream.end();

  await conn.end();
  console.log(`Backup completed successfully: ${filePath}`);
}

backup().catch((err) => {
  console.error("Backup failed:", err.message);
  process.exit(1);
});
