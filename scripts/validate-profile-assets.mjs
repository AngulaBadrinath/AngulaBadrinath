import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assert(condition, message) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  [PASS] ${message}`);
  } else {
    failedChecks++;
    console.error(`  [FAIL] ${message}`);
  }
}

console.log('====================================================');
console.log('🔍 ANGULA BADRINATH PROFILE ASSET & MARKDOWN VALIDATOR');
console.log('====================================================\n');

// 1. Verify README.md exists and is readable
const readmePath = path.join(rootDir, 'README.md');
assert(fs.existsSync(readmePath), 'README.md exists');
const readmeContent = fs.readFileSync(readmePath, 'utf8');
assert(readmeContent.length > 500, `README.md has substantial content (${readmeContent.length} bytes)`);

// 2. Verify all local image paths referenced in README.md
console.log('\n--- 1. Validating Image Paths in README.md ---');
const imgRegex = /<(?:img|source)[^>]+src=["'](\.[^"']+)["']|!\[[^\]]*\]\((\.[^)]+)\)/g;
let match;
const referencedImages = new Set();
while ((match = imgRegex.exec(readmeContent)) !== null) {
  const relPath = match[1] || match[2];
  if (relPath && !relPath.startsWith('http')) {
    referencedImages.add(relPath);
  }
}

for (const imgPath of referencedImages) {
  const cleanPath = imgPath.split('?')[0]; // strip query params like ?palette=...
  const absPath = path.resolve(rootDir, cleanPath);
  assert(fs.existsSync(absPath), `Referenced local asset exists: ${imgPath}`);
}

// 3. Verify GitHub Heading Anchors in README.md
console.log('\n--- 2. Validating Internal Heading Anchors ---');
const headings = [];
const headingRegex = /^#{1,6}\s+(.+)$/gm;
let hMatch;
while ((hMatch = headingRegex.exec(readmeContent)) !== null) {
  const rawHeading = hMatch[1].trim();
  // GitHub heading slug: lowercase, remove non-alphanumeric except hyphen and space, replace spaces with hyphens
  const slug = rawHeading
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  headings.push(slug);
}

const anchorRegex = /(?:\[([^\]]+)\]\(#([a-z0-9_-]+)\)|<a[^>]+href=["']#([a-z0-9_-]+)["'][^>]*>([^<]+)<\/a>)/g;
let aMatch;
const checkedAnchors = new Set();
while ((aMatch = anchorRegex.exec(readmeContent)) !== null) {
  const target = aMatch[2] || aMatch[3];
  const label = aMatch[1] || aMatch[4];
  if (!checkedAnchors.has(target)) {
    checkedAnchors.add(target);
    const exists = headings.includes(target);
    assert(exists, `Anchor target '#${target}' corresponds to rendered heading (${label})`);
  }
}

// 4. Verify SVG Files Security and Structure
console.log('\n--- 3. Validating SVG Security & XML Integrity ---');
function scanDir(dir, ext, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath, ext, fileList);
    } else if (file.endsWith(ext)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const svgFiles = scanDir(path.join(rootDir, 'assets'), '.svg');
assert(svgFiles.length >= 6, `Found ${svgFiles.length} local SVG assets (minimum 6 required)`);

for (const svgFile of svgFiles) {
  const rel = path.relative(rootDir, svgFile);
  const content = fs.readFileSync(svgFile, 'utf8');
  assert(content.includes('<svg') && content.includes('</svg>'), `${rel} contains valid SVG tags`);
  assert(content.includes('viewBox='), `${rel} specifies responsive viewBox attribute`);
  assert(!content.includes('<script'), `${rel} contains NO forbidden <script> tags`);
  assert(!content.includes('<foreignObject'), `${rel} contains NO forbidden <foreignObject> tags`);
}

// 5. Verify GitHub Actions Workflows
console.log('\n--- 4. Validating GitHub Actions Workflows ---');
const workflowsDir = path.join(rootDir, '.github', 'workflows');
const activityWf = path.join(workflowsDir, 'profile-activity.yml');
const snakeWf = path.join(workflowsDir, 'contribution-snake.yml');

assert(fs.existsSync(activityWf), 'profile-activity.yml exists');
assert(fs.existsSync(snakeWf), 'contribution-snake.yml exists');

if (fs.existsSync(activityWf)) {
  const content = fs.readFileSync(activityWf, 'utf8');
  assert(content.includes('workflow_dispatch:'), 'profile-activity.yml has manual workflow_dispatch');
  assert(content.includes('contents: write'), 'profile-activity.yml has scoped contents: write');
  assert(content.includes('cicirello/user-statistician@'), 'profile-activity.yml references user-statistician');
}

if (fs.existsSync(snakeWf)) {
  const content = fs.readFileSync(snakeWf, 'utf8');
  assert(content.includes('workflow_dispatch:'), 'contribution-snake.yml has manual workflow_dispatch');
  assert(content.includes('contents: write'), 'contribution-snake.yml has scoped contents: write');
  assert(content.includes('Platane/snk/svg-only@'), 'contribution-snake.yml references Platane/snk');
}

// 6. Summary
console.log('\n====================================================');
console.log(`TOTAL CHECKS: ${totalChecks} | PASSED: ${passedChecks} | FAILED: ${failedChecks}`);
console.log('====================================================');

if (failedChecks > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL PROFILE QUALITY CHECKS PASSED SUCCESSFULLY!\n');
  process.exit(0);
}
