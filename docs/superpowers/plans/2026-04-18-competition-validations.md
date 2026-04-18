# Competition Schema Validations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Sanity Rule-based validations to `src/sanity/schemaTypes/competition.ts` — required fields + sensible constraints.

**Architecture:** Single file modification. Sanity's `validation` property accepts a function `(Rule) => Rule.<method>()`. For cross-field validation on `endDate`, `Rule.custom` receives the field value and a `context` object containing the parent document.

**Tech Stack:** Sanity (Rule-based validation API), TypeScript

---

### Task 1: Add validations to `competition.ts`

**Files:**
- Modify: `src/sanity/schemaTypes/competition.ts`

**Validation rules to apply:**

| Field | Validation |
|---|---|
| `name` | `Rule.required()` |
| `slug` | `Rule.required()` |
| `season` | `Rule.min(1)` |
| `type` | `Rule.required()` |
| `format` | `Rule.required()` |
| `gender` | `Rule.required()` |
| `startDate` | `Rule.required()` |
| `endDate` | Custom — if present, must be ≥ `startDate` |
| `status` | `Rule.required()` |

- [ ] **Step 1: Apply validations to all fields**

Replace the contents of `src/sanity/schemaTypes/competition.ts` with:

```ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "competition",
  title: "Competition",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "season",
      title: "Season",
      type: "number",
      description: "e.g. 1, 2, 3",
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "League", value: "league" },
          { title: "Tournament", value: "tournament" },
          { title: "Preseason", value: "preseason" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "string",
      options: {
        list: [
          { title: "7s", value: "7" },
          { title: "5s", value: "5" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gender",
      title: "Gender",
      type: "string",
      options: {
        list: [
          { title: "Co-ed", value: "coed" },
          { title: "Men", value: "men" },
          { title: "Women", value: "women" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      validation: (Rule) =>
        Rule.custom((endDate, context) => {
          const startDate = (context.document as any)?.startDate;
          if (!endDate || !startDate) return true;
          return endDate >= startDate || "End date must be on or after start date";
        }),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Active", value: "active" },
          { title: "Completed", value: "completed" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Competition Logo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      name: "name",
      type: "type",
      season: "season",
    },
    prepare({ name, type, season }: { name: string; type: string; season: number }) {
      return {
        title: name,
        subtitle: [season ? `Season ${season}` : null, type].filter(Boolean).join(" · "),
      };
    },
  },
});
```

- [ ] **Step 2: Verify TypeScript compiles cleanly**

Run: `pnpm build`

Expected: Build succeeds with no TypeScript errors related to `competition.ts`. (Next.js build output ends with `✓ Compiled successfully` or similar.)

- [ ] **Step 3: Commit**

```bash
git add src/sanity/schemaTypes/competition.ts
git commit -m "feat: add validations to competition schema"
```
