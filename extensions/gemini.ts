import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

/**
 * Gemini CLI integration extension for Pi.
 *
 * Registers /gemini-search, /gemini-review, /gemini-plan, and /gemini-analyze
 * slash commands as shortcuts to load the corresponding skills.
 *
 * Skills are still the primary interface; these commands are convenience wrappers
 * that expand to the skill invocation prompt so the agent loads the full SKILL.md.
 */
export default function (pi: ExtensionAPI) {
  // ─── Session start: verify Gemini CLI is available ─────────────────────────
  pi.on("session_start", async (_event, ctx) => {
    const result = await pi.exec("gemini", ["--version"], { timeout: 5000 });
    const geminiAvailable = result.code === 0 && !result.killed;

    if (geminiAvailable) {
      ctx.ui.notify(
        "Gemini skills ready: /gemini-search, /gemini-review, /gemini-plan, /gemini-analyze",
        "info"
      );
    } else {
      ctx.ui.notify(
        "⚠ Gemini CLI not found. Run: npm install -g @google/gemini-cli  See references/setup.md for details.",
        "warn"
      );
    }
  });

  // ─── /gemini-search ────────────────────────────────────────────────────────
  pi.registerCommand("gemini-search", {
    description:
      "Web search via Gemini. Usage: /gemini-search <topic>  — Triggers the gemini-web-search skill.",
    handler: async (args, _ctx) => {
      const topic = args?.trim();
      const prompt = topic
        ? `Use the gemini-web-search skill to search for: ${topic}`
        : "Use the gemini-web-search skill to search the web.";
      await pi.sendUserMessage(prompt);
    },
  });

  // ─── /gemini-review ────────────────────────────────────────────────────────
  pi.registerCommand("gemini-review", {
    description:
      "Code review of git changes via Gemini. Triggers the gemini-diff-review skill.",
    handler: async (args, _ctx) => {
      const focus = args?.trim();
      const prompt = focus
        ? `Use the gemini-diff-review skill to review my changes with focus on: ${focus}`
        : "Use the gemini-diff-review skill to review my current git changes.";
      await pi.sendUserMessage(prompt);
    },
  });

  // ─── /gemini-plan ──────────────────────────────────────────────────────────
  pi.registerCommand("gemini-plan", {
    description:
      "Plan critique via Gemini. Usage: /gemini-plan <plan-file>  — Triggers the gemini-plan-review skill.",
    handler: async (args, _ctx) => {
      const planFile = args?.trim();
      const prompt = planFile
        ? `Use the gemini-plan-review skill to review the plan at ${planFile}`
        : "Use the gemini-plan-review skill to review the current implementation plan.";
      await pi.sendUserMessage(prompt);
    },
  });

  // ─── /gemini-analyze ───────────────────────────────────────────────────────
  pi.registerCommand("gemini-analyze", {
    description:
      "Deep codebase analysis via Gemini. Triggers the gemini-codebase-analysis skill.",
    handler: async (args, _ctx) => {
      const focus = args?.trim();
      const prompt = focus
        ? `Use the gemini-codebase-analysis skill to analyze: ${focus}`
        : "Use the gemini-codebase-analysis skill to analyze this codebase.";
      await pi.sendUserMessage(prompt);
    },
  });
}
