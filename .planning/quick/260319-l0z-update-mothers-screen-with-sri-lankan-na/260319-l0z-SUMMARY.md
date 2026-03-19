---
quick_id: 260319-l0z
title: "Update Mothers screen with Sri Lankan names, areas, NIC on cards, and wireframe card layout"
status: complete
commits: ["99c795c"]
files_changed: 3
---

# Summary: 260319-l0z

## What Changed

### Mother Factory (`lib/mock/factories/mother.factory.ts`)
- Replaced Faker-generated names with 20 Sri Lankan first names + 20 last names
- Replaced Kenyan communities with 13 Sri Lankan areas (Colombo, Kandy, Galle, Matara, etc.)
- Added 5 clinic names (Clinic A-E) exported for filter use
- NIC now generates proper Sri Lankan format: old (pre-2000 DOB) = 9 digits + V/X, new = 12 digits
- Phone numbers use +94 Sri Lankan format

### Staff Factory (`lib/mock/factories/staff.factory.ts`)
- Updated with 12 Sri Lankan staff names
- Updated facilities to Sri Lankan hospitals/health centres

### Mothers Page (`app/dashboard/mothers/page.tsx`)
- **Avatar circles** with color-coded initials (10-color rotation)
- **NIC displayed** below name on each card
- **Warning triangle icon** next to high-risk mother names
- **Risk badges**: "High Risk" (red) or "Normal" (green/amber)
- **Trimester + Assigned Midwife** row per card
- **3 action buttons**: View Profile (outlined), Record Visit (filled pink), Records (outlined)
- **Clinic filter** added as first filter chip
- **"MOTHER LIST"** section label above cards
- **B/EN** language badge in header (matching wireframe)
- Empty state message when no results

## Decisions

- Medium and Low risk both show "Normal" label to match wireframe
- Avatar colors rotate through 10 predefined colors by list index
- Midwife name shows first name only (matching wireframe: "Malani", "Nirmala")
