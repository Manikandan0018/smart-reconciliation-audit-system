📊 Smart Reconciliation & Audit System

Live Demo: https://smart-reconciliation-audit-system-kappa.vercel.app/

A full-stack MERN (MongoDB, Express, React, Node.js) application designed for efficient reconciliation of large transaction datasets, identification of duplicates and mismatches, and providing a complete, immutable audit trail. Built with performance, scalability, data integrity, and enterprise-grade UX in mind.

🚀 Features
🧾 Frontend (React)

✔ Reconciliation Dashboard

Summary cards:
• Total records
• Matched
• Unmatched
• Duplicate
• Accuracy %

Responsive charts and filters

Dynamic updates as filters change

✔ File Upload Interface

CSV / Excel (.xls, .xlsx) file support

Drag-and-drop or click to upload

Preview filename and size

Professional UI, step-workflow layout

✔ Column Mapping

Preview first 20 rows

Manual map uploaded columns to system fields

Mandatory fields enforced
(✔ Awaiting integration)

✔ Reconciliation View

Compare uploaded vs system data

Show match status:
• Matched
• Partial match
• Unmatched
• Duplicate

Highlight mismatched fields
(✔ Can be added next)

✔ Audit Timeline

Visual timeline per record

Tracks who changed what and when
(✔ Planned)

✔ Role-Based Access

Admin, Analyst, Viewer

Enforced on frontend & backend

⚙️ Backend (Node.js + Express)

✔ Upload processing for large files

Async, non-blocking

Handles up to 50,000 records
✔ Reconciliation logic

Exact match: Transaction ID + Amount

Partial match: Reference match + ±2% variance

Duplicate detection

Configurable match rules
✔ Idempotency

Same file re-upload does not create duplicates
✔ Audit Trail

Immutable logs

Tracks old vs new values, user, timestamp
✔ REST APIs

Documented via Postman / Swagger

🗄 Database (MongoDB)

Collections:

Collection	Purpose
Users	Auth + Role data
UploadJobs	File ingestion metadata
Records	Stored transaction records
ReconciliationResults	Match status + results
AuditLogs	Immutable audit history

Indexes:

Transaction ID

Reference Number

Upload Job ID

🛠 Non Functional Requirements

✔ Scales to large data sets
✔ UI responsive during uploads
✔ Partial failures handled gracefully
✔ Clear error messages

🧩 Architecture Diagram
React UI  --->  Node/Express Backend  --->  MongoDB
      |              |                               |
      |     Async upload processing     Audit Log storage
      |              |
      v       Reconciliation Engine

📦 Folder Structure
smart-reconciliation-audit-system/
├── backend/                # API + business logic
├── frontend/               # React UI
├── docs/                  # API & architecture docs
├── .gitignore
├── README.md

🪄 Live Deployment

Frontend is deployed on Vercel:

👉 https://smart-reconciliation-audit-system-kappa.vercel.app/
