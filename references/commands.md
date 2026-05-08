# Gemini CLI Quick Reference

For complete documentation, see [official Gemini CLI docs](https://github.com/google-gemini/gemini-cli).

## Basic Usage

```bash
gemini "[prompt]" -o text 2>&1
```

## Common Options

| Option | Description |
|--------|-------------|
| `-o text` | Human-readable output |
| `-o json` | Structured output with stats |
| `-m gemini-3-flash-preview` | Faster model for simple tasks |
| `-m gemini-3.1-pro-preview` | Deep analysis (explicit override of default) |
| `-r [index]` | Resume session by index |
| `--list-sessions` | List available sessions |
| `--allowed-tools <list>` | Comma-separated list of tools Gemini may use |

## JSON Output Structure

```json
{
  "response": "actual content",
  "stats": {
    "models": { "tokens": {} },
    "tools": { "byName": {} }
  }
}
```

## Session Management

```bash
gemini --list-sessions               # List sessions
echo "follow-up" | gemini -r 1 -o text   # Resume by index
```

## Tool Allowlists

```bash
# Web search only
gemini "..." --allowed-tools google_web_search -o text

# File reading + analysis
gemini "..." --allowed-tools read_file,codebase_investigator,glob,search_file_content,list_directory,write_todos -o text

# Codebase analysis only
gemini "..." --allowed-tools codebase_investigator -o text
```

## More Information

- Full CLI reference: `gemini --help`
- Official docs: https://github.com/google-gemini/gemini-cli
