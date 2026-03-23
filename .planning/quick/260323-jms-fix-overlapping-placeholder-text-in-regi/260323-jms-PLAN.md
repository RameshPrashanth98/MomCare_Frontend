---
phase: quick
plan: 260323-jms
title: Fix overlapping placeholder text in Register Mother date fields
---

# Quick Task 260323-jms: Fix overlapping placeholder text in Register Mother date fields

## Task 1: Fix date input placeholder overlap
- Set `color: 'transparent'` in `dateInputStyle` when no value is present (instead of secondary color) so native browser "dd/mm/yyyy" text is hidden
- Add CSS rules in globals.css to hide WebKit native date picker indicators and make the full input clickable
- Custom placeholder spans remain visible and properly positioned
