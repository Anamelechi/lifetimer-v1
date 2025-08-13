#!/usr/bin/env node
// Append a dated entry to life-timer/COPILOT_NOTES.md under the change log section.
// Usage:
//   node scripts/append-notes.js --summary "Fix prod build" --files "Dockerfile,src/app/page.js" --notes "Wrapped useSearchParams in Suspense"
//   node scripts/append-notes.js --auto   # uses last commit subject and files

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const NOTES_PATH = path.resolve(__dirname, '..', 'COPILOT_NOTES.md');

function parseArgs(argv) {
  const args = { summary: '', files: '', notes: '', auto: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--summary') args.summary = argv[++i] || '';
    else if (a === '--files') args.files = argv[++i] || '';
    else if (a === '--notes') args.notes = argv[++i] || '';
    else if (a === '--auto') args.auto = true;
  }
  return args;
}

function today() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function getGitSummaryAndFiles() {
  try {
    const summary = execSync('git log -1 --pretty=%s', { encoding: 'utf8' }).trim();
    const files = execSync('git diff-tree --no-commit-id --name-only -r HEAD', { encoding: 'utf8' })
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .join(', ');
    return { summary, files };
  } catch {
    return { summary: '', files: '' };
  }
}

function buildEntry({ summary, files, notes }) {
  const lines = [];
  const date = today();
  lines.push(`- ${date}: ${summary || 'Update'}`);
  if (files) {
    lines.push(`  - Files: ${files}`);
  }
  if (notes) {
    lines.push(`  - Notes: ${notes}`);
  }
  return lines.join('\n') + '\n';
}

function insertIntoChangeLog(doc, entry) {
  // Match either "## Decision and change log" or the variant with parenthetical
  const headerRegex = /##\s+Decision and change log(?:[^\n]*)?\n/;
  const match = doc.match(headerRegex);
  if (!match) return (doc.trimEnd() + '\n\n' + entry);
  const insertPos = match.index + match[0].length;
  return doc.slice(0, insertPos) + entry + doc.slice(insertPos);
}

function main() {
  const args = parseArgs(process.argv);
  if (!fs.existsSync(NOTES_PATH)) {
    console.error('Notes file not found at', NOTES_PATH);
    process.exit(1);
  }
  let { summary, files, notes } = args;
  if (args.auto) {
    const auto = getGitSummaryAndFiles();
    if (!summary) summary = auto.summary;
    if (!files) files = auto.files;
  }
  const current = fs.readFileSync(NOTES_PATH, 'utf8');
  const entry = buildEntry({ summary, files, notes });
  const updated = insertIntoChangeLog(current, entry);
  fs.writeFileSync(NOTES_PATH, updated, 'utf8');
  console.log('Appended entry to COPILOT_NOTES.md');
}

main();
