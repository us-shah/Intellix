# Intellix Enterprise Consolidated Release

This release consolidates the working CRM, authentication, LMS and dashboard code and adds integrated enterprise modules:

- Organizations and multi-company foundation
- HR departments, employees and leave requests
- Finance invoices and expenses
- Support ticket desk
- Knowledge-base ingestion and chunking
- Source-grounded AI assistant with conversation history
- Optional OpenAI-compatible LLM configuration
- Local retrieval fallback when no LLM key is configured
- Admin frontend workspaces for enterprise overview, employees, invoices, tickets, knowledge and AI

## Required database step
Run `database/enterprise_ai_upgrade.sql` in SQL Server Management Studio against `intellixDB`.

## Optional AI provider
Set these variables in `backend/.env`:

```
LLM_API_KEY=...
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4.1-mini
```

Without a key, the assistant remains functional as a source retrieval assistant and returns relevant excerpts.

## Honest production boundary
No repository can include live payment, email, SMS, WhatsApp, cloud storage or LLM credentials. Those integrations require accounts and secrets. This release provides integration points and working local functionality, but production launch still requires security review, tenant scoping of every legacy CRM table, automated tests, backups, monitoring and deployment configuration.
