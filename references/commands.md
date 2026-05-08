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

## Tool Access Control (Policy Engine)

Tool restrictions are managed via **Policy Engine** TOML rules instead of the deprecated `--allowed-tools` flag.

Create policy rules in `~/.gemini/policies/*.toml`:

```toml
# Example: Allow google_web_search automatically
[[rule]]
toolName = "google_web_search"
decision = "allow"
priority = 100

# Example: Deny write tools for read-only analysis
[[rule]]
toolName = ["write_file", "replace"]
decision = "deny"
priority = 100
```

See [Policy Engine docs](https://geminicli.com/docs/reference/policy-engine/) for full reference.

## More Information

- Full CLI reference: `gemini --help`
- Official docs: https://github.com/google-gemini/gemini-cli
