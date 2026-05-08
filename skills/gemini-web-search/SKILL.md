---
name: gemini-web-search
description: Real-time web research using Gemini's Google Search integration. Use when the user needs current information ("search with Gemini", "find current info about X", "what's the latest on Y"), library/API research, security vulnerability lookups, or comparisons requiring recent data.
---

# Web Search via Gemini

Use Gemini's `google_web_search` tool for real-time internet research.

## Quick Start

```bash
gemini "Use Google Search to find [topic]. Do not make any changes. Respond with the results only." -o text 2>&1
```

Use `-m gemini-3-flash-preview` for faster searches:
```bash
gemini "Latest version of React? Use Google Search. Do not make any changes. Respond with the results only." -m gemini-3-flash-preview -o text 2>&1
```

## When to Use

- Current events and news
- Latest library versions and documentation
- Security vulnerabilities (CVEs)
- Community opinions and benchmarks
- Best practices research
- Comparison research

## Examples

**Current info:**
```bash
gemini "What are the latest Next.js 15 features? Use Google Search. Do not make any changes. Respond with the results only." -o text
```

**Vulnerability research:**
```bash
gemini "What are known CVEs for lodash 4.x? Use Google Search. Do not make any changes. Respond with the results only." -o text
```

**Comparison:**
```bash
gemini "Compare Zustand vs Jotai for React state management. Use Google Search for recent benchmarks. Do not make any changes. Respond with the results only." -o text
```

**Best practices:**
```bash
gemini "Current best practices for Node.js 22 error handling? Use Google Search. Do not make any changes. Respond with the results only." -o text
```

## Notes

- **Gemini must not make any changes, provide feedback ONLY.**
- May take 1–2 minutes for comprehensive searches
- Validate findings against official documentation
- Tool access is controlled via Policy Engine TOML rules in `~/.gemini/policies/` (see [Policy Engine docs](https://geminicli.com/docs/reference/policy-engine/))
- See `../../references/setup.md` for installation and troubleshooting
- For rate limits and patterns, see `../../references/patterns.md`
