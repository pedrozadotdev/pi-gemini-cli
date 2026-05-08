---
name: gemini-plan-review
description: Get Gemini's review of implementation plans. Use when the user wants a second opinion on a plan ("have Gemini review this plan", "get second opinion", "critique this plan"), or after Pi creates a plan file that needs validation before implementation.
---

# Plan Review via Gemini

Have Gemini critique implementation plans for a second perspective.

## Quick Start

Pipe plan content to Gemini via stdin since Gemini cannot read files outside the project directory:

```bash
cat path/to/plan.md | gemini "Review this implementation plan:

$(cat)

Do not make any changes. Provide critique and feedback only." -m gemini-3.1-pro-preview -o text 2>&1
```

## Standard Pattern

```bash
cat path/to/plan.md | gemini "Review this implementation plan:

$(cat)

Consider:
1. Are there gaps or missing steps?
2. Are there risks not addressed?
3. Is the approach optimal?
4. What alternatives should be considered?

Do not make any changes. Respond with feedback only." -m gemini-3.1-pro-preview -o text 2>&1
```

## With Source Context

Pipe the plan via stdin and let Gemini read source files from the project:

```bash
cat path/to/auth-refactor.md | gemini "Review this implementation plan:

$(cat)

Also read these source files for context:
- src/auth/login.ts
- src/middleware/session.ts

Evaluate if the plan addresses the actual codebase structure. Do not make any changes. Respond with feedback only." -m gemini-3.1-pro-preview -o text 2>&1
```

## Focused Reviews

**Risk assessment:**
```bash
cat path/to/migration.md | gemini "Review this plan for risks:

$(cat)

Evaluate:
- Breaking changes
- Data loss potential
- Rollback complexity
- Dependencies that could fail

Do not make any changes. Respond with feedback only." -m gemini-3.1-pro-preview -o text 2>&1
```

**Completeness check:**
```bash
cat path/to/feature.md | gemini "Review this plan for completeness:

$(cat)

Evaluate:
- Are all edge cases covered?
- Is testing addressed?
- Are there missing steps?

Do not make any changes. Respond with feedback only." -m gemini-3.1-pro-preview -o text 2>&1
```

## Notes

- **Gemini must not make any changes, provide feedback ONLY.**
- Pipe plan content via stdin using `$(cat)` — Gemini cannot read files outside the project root
- Gemini can explore the project using tools like `read_file`, `codebase_investigator`, `glob`, `search_file_content`, `list_directory`, and `write_todos`
- Gemini respects `.gitignore` — it cannot read files matching gitignore patterns
- May take 2–3 minutes for thorough review with source analysis
- Tool access is controlled via Policy Engine TOML rules in `~/.gemini/policies/` (see [Policy Engine docs](https://geminicli.com/docs/reference/policy-engine/))
- See `../../references/setup.md` for installation and troubleshooting
