# Gemini CLI Setup & Troubleshooting

Shared reference for all Gemini skills.

## Prerequisites

Gemini CLI must be installed and authenticated before using any Gemini skill.

**Installation:**
```bash
# Cross-platform (recommended)
npm install -g @google/gemini-cli@latest

# macOS via Homebrew
brew install gemini-cli
```

**Verify:**
```bash
gemini --version  # Should show the latest version
gemini "test" -o text  # Should respond with output
```

## Authentication

Pi will NOT configure authentication. Complete setup manually using the [official docs](https://github.com/google-gemini/gemini-cli).

## File Access

Gemini can only read files within the workspace directory (project root). It cannot access directories outside the project.

```bash
# Save to project root for Gemini to read
git diff > .gemini-review.diff
gemini "Review .gemini-review.diff" -o text 2>&1
rm .gemini-review.diff
```

## Troubleshooting

### Command Execution

Gemini cannot run shell commands in the current environment. Pi must run commands and save output to files for Gemini to review.

```bash
git diff > .gemini-review.diff
gemini "Review the diff at .gemini-review.diff" -o text 2>&1
rm .gemini-review.diff
```

### Authentication Errors

If `gemini` returns an auth error:

```bash
# Re-authenticate
gemini auth login

# Or set API key directly
export GEMINI_API_KEY=your-key-here
```

## Working with Files

Gemini can read files directly from disk. Pass file paths instead of embedding content.

```bash
gemini "Review the script at path/to/file.sh" -o text
```

**Why paths are better:**
- Avoids shell escaping issues
- Preserves exact file content
- More efficient for large files

## Model Selection

| Use Case | Model Flag | Notes |
|----------|-----------|-------|
| Deep analysis, reviews | *(default)* `gemini-3.1-pro-preview` | Best reasoning, slower |
| Quick searches, simple tasks | `-m gemini-3-flash-preview` | Faster, separate quota |

## Response Time

Gemini may take several minutes for complex tasks (file analysis, web search, codebase investigation). Allow up to 10 minutes before assuming timeout.

## Rate Limits

Free tier: 60 requests/min, 1000/day. The CLI auto-retries with backoff.

Use `-m gemini-3-flash-preview` for faster, lower-priority tasks.
