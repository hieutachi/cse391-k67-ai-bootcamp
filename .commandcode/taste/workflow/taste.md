# Taste

## Workflow & content-production
- Runs a recurring "working-with AI" course-generation workflow: specs live in a folder (e.g., GUIDE.md + PROJECT.md), and prior sibling courses already exist on disk with a fixed anatomy — README.md, PLAN.md, course-lessons/{en,vi}/, templates/, skills/, agents/, docs/. New course content is expected to mirror that existing structure rather than invent a new one. Confidence: 0.7
- Course lessons are produced bilingually (Vietnamese + English) in parallel folder trees with titles matching across languages. Confidence: 0.6
- Each lesson follows a fixed format: `# Title` → learning-objectives bullets → body with real, runnable modern code → at least one labeled sample AI prompt (```text) with context/requirement/constraints tied to the course project → Practice → "What's next" linking to the next lesson (final lesson ends with a celebratory closing instead of "next"). Confidence: 0.6
- Values consistent, production-quality output: shared design tokens/palette and data shapes across all chapters, no placeholder text or filler, no empty/too-short files, balanced code fences, coherent cross-chapter links. Confidence: 0.6
- Delegates large repetitive file-generation batches to parallel sub-agents carrying detailed per-file conventions, then verifies completeness programmatically (counts per chapter, required sections, placeholders, links). Confidence: 0.5
- Prefers the assistant to investigate existing context/examples before asking; questions only asked when genuinely blocked. Confidence: 0.4
- Wants standardized, reusable prompt kits (a curated "bộ prompt mẫu chuẩn" — e.g., canonical Figma-design-analysis → Bootstrap-code-generation → targeted-fix prompts, with a result checklist) delivered as first-class shareable template assets alongside course lessons, not just one-off inline examples. Confidence: 0.4
