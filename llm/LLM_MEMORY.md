# LLM Memory Log

This file documents all important questions, answers, preferences, and persistent instructions from the user to ensure alignment and eliminate ambiguity.

---

## User Preferences & Standing Instructions
- Immediately fix lint or formatting errors in all Markdown or code files when detected.
- Always review and address the result of every file change or command, especially if the output is unexpected.
- Document all questions and answers exchanged to clarify scope and eliminate ambiguity.
- Use the `llm` directory for assistant-specific memory and meta-data.
- Add a `CONTENTS.md` file to every folder in the repo (if missing).
- Project documentation, plan, and code must always be in sync.

---

## Open Questions for the User

1. **Game Features:**
    - Are there any additional gameplay features (e.g., power-ups, levels, scoring system, sound effects) you want included beyond the classic Asteroids mechanics?
2. **Design/UX Preferences:**
    - Do you have a preferred color palette, UI style, or specific visual themes for the game?
3. **Testing:**
    - Should we integrate automated tests (unit, integration, or UI) as part of the CI/CD pipeline? If so, what frameworks do you prefer?
4. **Deployment:**
    - Is there a preferred deployment method or platform (e.g., GitHub Pages, Netlify, Vercel) for the finished game?
5. **Documentation:**
    - Should in-code documentation follow a specific style (e.g., JSDoc) or is the current modular, commented approach sufficient?
6. **Task Management:**
    - Should I continue logging all tasks in `docs/TASKS.md` or attempt to sync with GitHub Projects (new experience) when possible?

---

## User Answers
<!-- Fill in as user responds -->

---

## Important User Requests
- Use polling to monitor GitHub Actions builds, with interval based on EWMA of last 10 build times.
- Only poll when a commit is working through the pipeline.
- If a build fails, pause current work at a logical break and fix the build immediately.
- Do not return control to the user until the latest commit passes all quality gates.
- Always keep documentation, code, and project plan in sync.

---

## To-Do (LLM)
- Ensure `CONTENTS.md` exists in every folder in the repo.
- Keep this memory file up to date as new instructions/questions/answers arise.
