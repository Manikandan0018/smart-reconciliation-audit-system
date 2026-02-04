Smart Reconciliation & Audit System

Live Application:
👉 https://smart-reconciliation-audit-system-kappa.vercel.app/

This project is a full-stack MERN application built as part of a technical assignment to demonstrate real-world system design, async processing, data reconciliation, and auditability.

The goal of the system is to ingest large transaction files, reconcile them against existing system data, identify mismatches or duplicates, and maintain a clear, immutable audit trail of all actions performed on the data.

Why This Project

In many real systems (finance, operations, compliance), data reconciliation is not just about CRUD operations.
It requires:

Handling large datasets efficiently

Clear matching rules

Repeatable and idempotent processing

Full audit history

Role-based access control

This project focuses on those concerns, rather than just UI or basic APIs.

What the System Does
1. Reconciliation Dashboard

The dashboard provides a high-level overview of the reconciliation state:

Total records uploaded

Matched records

Unmatched records

Duplicate records

Overall reconciliation accuracy

The data updates dynamically based on filters such as date range and upload source.

2. File Upload & Ingestion

Users can upload CSV or Excel files containing transaction data.

Key points:

Supports drag & drop and manual file selection

Handles large files (up to tens of thousands of records)

Upload processing is asynchronous and non-blocking

Duplicate uploads are detected and handled safely

3. Reconciliation Logic

Each uploaded record is reconciled against system records using configurable rules:

Exact Match
Transaction ID + Amount match exactly

Partial Match
Reference number matches with amount variance within ±2%

Duplicate
Same transaction ID appears more than once

Unmatched
No matching system record found

These rules are not hardcoded, allowing flexibility for future changes.

4. Audit Trail

Every important action in the system is logged:

Who made the change

What changed (old value → new value)

When the change occurred

Source of the change

Audit logs are stored in a separate collection and are immutable, ensuring traceability and compliance.

Tech Stack
Frontend

React

Tailwind CSS

Axios

Lucide Icons

Deployed on Vercel

Backend

Node.js

Express.js

MongoDB

JWT Authentication

Async processing for uploads

Database Design (MongoDB)

Main collections used:

Users – authentication and roles

UploadJobs – metadata and status of file uploads

Records – normalized transaction data

ReconciliationResults – match status and comparison data

AuditLogs – immutable audit history

Indexes are applied on:

Transaction ID

Reference Number

Upload Job ID

Authentication & Authorization


