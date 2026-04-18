# Competition Schema Validations Design

**Date:** 2026-04-18
**File:** `src/sanity/schemaTypes/competition.ts`

## Overview

Add Sanity Rule-based validations to the `competition` document schema. The goal is to enforce required fields and catch common data-entry mistakes (e.g., negative season numbers, end date before start date) without over-constraining the schema.

## Approach

Option B — Required fields + sensible field-level constraints. Matches the lightweight style already used in `team.ts`.

## Validation Rules

### Required Fields

The following fields must have a value before a document can be published:

| Field | Rule |
|---|---|
| `name` | `Rule.required()` |
| `slug` | `Rule.required()` |
| `type` | `Rule.required()` |
| `format` | `Rule.required()` |
| `gender` | `Rule.required()` |
| `startDate` | `Rule.required()` |
| `status` | `Rule.required()` |

### Optional Fields with Constraints

| Field | Rule | Reason |
|---|---|---|
| `season` | `Rule.min(1)` | Season numbers start at 1; negative or zero seasons are invalid |
| `endDate` | Custom cross-field: must be ≥ `startDate` | An end date before the start date is a data-entry error |

### No Validation

| Field | Reason |
|---|---|
| `logo` | Fully optional; no constraints needed |

## Cross-field Validation Detail

`endDate` uses `Rule.custom` with access to `context.document` to compare against `startDate`:

```ts
validation: (Rule) =>
  Rule.custom((endDate, context) => {
    const startDate = (context.document as any)?.startDate;
    if (!endDate || !startDate) return true;
    return endDate >= startDate || "End date must be on or after start date";
  }),
```

Both `startDate` and `endDate` are Sanity `date` fields stored as ISO 8601 date strings (`YYYY-MM-DD`), so string comparison is safe for this check.

## Out of Scope

- Regex validation on `name`
- Strict enum enforcement via `Rule.custom` for list fields (Sanity already restricts input to defined list values in the Studio UI)
- Any changes to other schema files
