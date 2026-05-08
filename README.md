# pi-gemini-cli

Gemini CLI integration for [Pi Coding Agent](https://pi.dev) — real-time web search, code review, plan critique, and deep codebase analysis via Google Gemini.

Ported and adapted from [robbyt/claude-skills](https://github.com/robbyt/claude-skills/tree/main/plugins/gemini).

## Skills

### `gemini-web-search`
Real-time web research using Gemini's Google Search integration.

**Triggers:** "search with Gemini", "find current info about X", "what's the latest on Y"

### `gemini-diff-review`
Code review of git changes for a second perspective.

**Triggers:** "have Gemini review my changes", "get code review from Gemini", "review this diff"

### `gemini-plan-review`
Review and critique implementation plans.

**Triggers:** "have Gemini review this plan", "get second opinion", "critique this plan"

### `gemini-codebase-analysis`
Deep architectural analysis using Gemini's `codebase_investigator` tool.

**Triggers:** "analyze this codebase", "map dependencies", "architecture overview"

## Slash Commands (Extension)

The included TypeScript extension also registers convenience slash commands:

| Command | Description |
|---------|-------------|
| `/gemini-search <topic>` | Trigger web search |
| `/gemini-review [focus]` | Review current git changes |
| `/gemini-plan <file>` | Review a plan file |
| `/gemini-analyze [focus]` | Analyze the codebase |

## Setup

### Prerequisites

1. Install Gemini CLI:
   ```bash
   npm install -g @google/gemini-cli@latest
   ```
2. Authenticate: see [references/setup.md](references/setup.md)

### Install in Pi

**Local (project-level):**
```bash
# In your project root, add to .pi/settings.json:
{
  "skills": ["path/to/gemini-skill/skills"],
  "extensions": ["path/to/gemini-skill/extensions/gemini.ts"]
}
```

**Global:**
```bash
# Copy or symlink into Pi's global skill directory
cp -r skills/* ~/.pi/agent/skills/
cp extensions/gemini.ts ~/.pi/agent/extensions/
```

**As a Pi package :**
```bash
# From git
pi install git:github.com/pedrozadotdev/pi-gemini-cli
```

### Quick Test

```bash
pi --skill ./skills/gemini-web-search -e ./extensions/gemini.ts
```

Then type: `/gemini-search latest Gemini models`

## Models Used

| Task | Model |
|------|-------|
| Deep analysis, code review, plan review | `gemini-3.1-pro-preview` (default) |
| Quick searches, simple lookups | `gemini-3-flash-preview` |

## References

- [Setup & Troubleshooting](references/setup.md)
- [CLI Quick Reference](references/commands.md)
- [Integration Patterns](references/patterns.md)
- [Gemini CLI Docs](https://github.com/google-gemini/gemini-cli)
- [Pi Coding Agent](https://pi.dev)
