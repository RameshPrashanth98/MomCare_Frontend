---
phase: quick
plan: 260322-lzk
type: execute
wave: 1
depends_on: []
files_modified:
  - app/dashboard/records/[id]/vaccination/page.tsx
  - app/dashboard/records/page.tsx
autonomous: true
---

<objective>
Build the Vaccination Records screen at /dashboard/records/[id]/vaccination showing a mother's vaccination history and upcoming vaccinations. Wire the Vaccination button on the Search Records page to navigate to this screen.
</objective>

<tasks>

<task type="auto">
  <name>Task 1: Create Vaccination Records page</name>
  <files>app/dashboard/records/[id]/vaccination/page.tsx</files>
  <action>Create vaccination records page with mother info card, vaccination history, upcoming vaccinations, add button, and bottom nav</action>
  <done>Page renders with all sections from wireframe</done>
</task>

<task type="auto">
  <name>Task 2: Wire Vaccination button on Search Records</name>
  <files>app/dashboard/records/page.tsx</files>
  <action>Add router and onClick to Vaccination button navigating to /dashboard/records/[id]/vaccination</action>
  <done>Clicking Vaccination on any mother card navigates to their vaccination records</done>
</task>

</tasks>
