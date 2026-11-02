import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

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

console.log('================================================================');
console.log('🛡️  ANGULA BADRINATH PROFILE HARDENED QUALITY & SECURITY SUITE');
console.log('================================================================\n');

// -----------------------------------------------------------------------------
// 1. Markdown & Relative Asset Path Integrity
// -----------------------------------------------------------------------------
console.log('--- 1. Markdown Integrity & Relative Path Resolution ---');
const readmePath = path.join(rootDir, 'README.md');
assert(fs.existsSync(readmePath), 'README.md exists on disk');
const readmeContent = fs.readFileSync(readmePath, 'utf8');
assert(readmeContent.length > 500, `README.md content size is valid (${readmeContent.length} bytes)`);

// Extract all local relative paths in README
const relPathRegex = /(?:src|href)=["'](\.[^"']+)["']|\[[^\]]*\]\((\.[^)]+)\)/g;
let m;
const checkedPaths = new Set();
while ((m = relPathRegex.exec(readmeContent)) !== null) {
  const target = m[1] || m[2];
  if (target && !target.startsWith('http') && !target.startsWith('mailto:')) {
    const cleanTarget = target.split('?')[0].split('#')[0];
    if (cleanTarget && !checkedPaths.has(cleanTarget)) {
      checkedPaths.add(cleanTarget);
      const abs = path.resolve(rootDir, cleanTarget);
      assert(fs.existsSync(abs), `Referenced local path exists: ${cleanTarget}`);
    }
  }
}

// -----------------------------------------------------------------------------
// 2. Strict GitHub Heading Anchor Slug Validation
// -----------------------------------------------------------------------------
console.log('\n--- 2. GitHub Heading Slug Anchor Resolution ---');
const headings = [];
const headingRegex = /^#{1,6}\s+(.+)$/gm;
let hMatch;
while ((hMatch = headingRegex.exec(readmeContent)) !== null) {
  const rawHeading = hMatch[1].trim();
  // Exact GitHub Markdown slug algorithm:
  // Lowercase, remove characters that are not alphanumeric, whitespace, or hyphen, then replace spaces with hyphens
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
  const label = (aMatch[1] || aMatch[4] || '').trim();
  if (target && !checkedAnchors.has(target)) {
    checkedAnchors.add(target);
    const exists = headings.includes(target);
    assert(exists, `Anchor '#${target}' resolves to rendered heading: "${label}"`);
  }
}

// -----------------------------------------------------------------------------
// 3. Real XML Parser & SVG Structural Security Check
// -----------------------------------------------------------------------------
console.log('\n--- 3. Real XML Parsing & SVG Reference Integrity ---');
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
assert(svgFiles.length >= 8, `Found ${svgFiles.length} SVG assets (minimum 8 required)`);

// Python XML validator script for deep element & ID integrity
const pythonXmlScript = `
import xml.etree.ElementTree as ET
import sys, re

filepath = sys.argv[1]
try:
    tree = ET.parse(filepath)
    root = tree.getroot()
except Exception as e:
    print(f"XML_PARSE_ERROR: {e}")
    sys.exit(1)

# Check root tag and viewBox
if not root.tag.endswith('svg'):
    print(f"INVALID_ROOT_TAG: {root.tag}")
    sys.exit(1)

viewbox = root.attrib.get('viewBox')
if not viewbox:
    print("MISSING_VIEWBOX")
    sys.exit(1)

# Check duplicate IDs and malformed references
all_ids = set()
dup_ids = set()
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Check forbidden tags
for forbidden in ['<script', '<foreignObject', '<iframe', '<object', '<embed']:
    if forbidden in content.lower():
        print(f"FORBIDDEN_TAG: {forbidden}")
        sys.exit(1)

# Check inline event handlers
if re.search(r'\\son[a-z]+\\s*=', content, re.IGNORECASE):
    print("FORBIDDEN_EVENT_HANDLER")
    sys.exit(1)

id_matches = re.findall(r'\\bid=["\\']([^"\\']+)["\\']', content)
for i in id_matches:
    if i in all_ids:
        dup_ids.add(i)
    all_ids.add(i)

if dup_ids:
    print(f"DUPLICATE_IDS: {','.join(dup_ids)}")
    sys.exit(1)

# Check url(#id) references exist
url_refs = re.findall(r'url\\(#([^)]+)\\)', content)
for ref in url_refs:
    if ref not in all_ids:
        print(f"DANGLING_REF: {ref}")
        sys.exit(1)

print("OK")
`;

const tempPyXmlPath = path.join(rootDir, 'scripts', '_temp_xml_check.py');
fs.writeFileSync(tempPyXmlPath, pythonXmlScript, 'utf8');

for (const svgFile of svgFiles) {
  const rel = path.relative(rootDir, svgFile);
  try {
    const res = execSync(`python "${tempPyXmlPath}" "${svgFile}"`, { encoding: 'utf8' }).trim();
    assert(res === 'OK', `XML & ID reference audit passed: ${rel}`);
  } catch (err) {
    assert(false, `XML audit failed on ${rel}: ${err.stdout || err.message}`);
  }
}

if (fs.existsSync(tempPyXmlPath)) {
  fs.unlinkSync(tempPyXmlPath);
}

// -----------------------------------------------------------------------------
// 4. GitHub Actions Workflow YAML & SHA Pinning Hardening
// -----------------------------------------------------------------------------
console.log('\n--- 4. GitHub Actions Workflow YAML & SHA Pinning Audit ---');
const workflowsDir = path.join(rootDir, '.github', 'workflows');
const workflowFiles = scanDir(workflowsDir, '.yml');
assert(workflowFiles.length >= 2, `Found ${workflowFiles.length} workflow files`);

const pythonYamlScript = `
import yaml, sys, re

filepath = sys.argv[1]
try:
    with open(filepath, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)
except Exception as e:
    print(f"YAML_PARSE_ERROR: {e}")
    sys.exit(1)

# Check workflow_dispatch (handling both 'on' string and YAML 1.1 boolean True key)
on_clause = data.get('on') if 'on' in data else data.get(True, {})
if isinstance(on_clause, list):
    has_dispatch = 'workflow_dispatch' in on_clause
elif isinstance(on_clause, dict):
    has_dispatch = 'workflow_dispatch' in on_clause
else:
    has_dispatch = False

if not has_dispatch:
    print("MISSING_WORKFLOW_DISPATCH")
    sys.exit(1)

# Check jobs and permissions
jobs = data.get('jobs', {})
if not jobs:
    print("NO_JOBS_FOUND")
    sys.exit(1)

with open(filepath, 'r', encoding='utf-8') as f:
    raw = f.read()

# Check all uses: actions are pinned to 40-character commit SHAs
uses_matches = re.findall(r'uses:\\s*([^\\s#]+)', raw)
unpinned = []
for action in uses_matches:
    if '@' in action:
        act_name, ref = action.split('@', 1)
        if not re.match(r'^[0-9a-f]{40}$', ref):
            unpinned.append(action)
    else:
        unpinned.append(action)

if unpinned:
    print(f"UNPINNED_ACTIONS: {','.join(unpinned)}")
    sys.exit(1)

print("OK")
`;

const tempPyYamlPath = path.join(rootDir, 'scripts', '_temp_yaml_check.py');
fs.writeFileSync(tempPyYamlPath, pythonYamlScript, 'utf8');

for (const wf of workflowFiles) {
  const rel = path.relative(rootDir, wf);
  try {
    const res = execSync(`python "${tempPyYamlPath}" "${wf}"`, { encoding: 'utf8' }).trim();
    assert(res === 'OK', `Workflow YAML & 40-char SHA pin audit passed: ${rel}`);
  } catch (err) {
    assert(false, `Workflow YAML audit failed on ${rel}: ${err.stdout || err.message}`);
  }
}

if (fs.existsSync(tempPyYamlPath)) {
  fs.unlinkSync(tempPyYamlPath);
}

// -----------------------------------------------------------------------------
// 5. Secret Scanning & Credential Exposure Detection
// -----------------------------------------------------------------------------
console.log('\n--- 5. Secret & Credential Scanning Across Repository ---');
const secretPatterns = [
  { name: 'Private Key Block', regex: /-----BEGIN (?:RSA|EC|DSA|OPENSSH)? PRIVATE KEY-----/ },
  { name: 'GitHub PAT (ghp_)', regex: /\bghp_[a-zA-Z0-9]{36}\b/ },
  { name: 'AWS Access Key ID', regex: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: 'Slack Bot Token', regex: /\bxoxb-[0-9]{11}-[0-9]{11}-[a-zA-Z0-9]{24}\b/ },
];

const filesToScan = [
  readmePath,
  ...svgFiles,
  ...workflowFiles,
  ...scanDir(path.join(rootDir, 'docs'), '.md'),
];

let leakCount = 0;
for (const f of filesToScan) {
  const rel = path.relative(rootDir, f);
  const content = fs.readFileSync(f, 'utf8');
  for (const p of secretPatterns) {
    if (p.regex.test(content)) {
      leakCount++;
      console.error(`  [LEAK] Detected ${p.name} in ${rel}!`);
    }
  }
}
assert(leakCount === 0, `Scanned ${filesToScan.length} files: Zero exposed secret keys or tokens found`);

// -----------------------------------------------------------------------------
// 6. Real Mermaid Diagram Compilation Verification
// -----------------------------------------------------------------------------
console.log('\n--- 6. Real Mermaid CLI Compilation Check ---');
const mmdFiles = scanDir(path.join(rootDir, 'assets', 'diagrams', 'source'), '.mmd');
assert(mmdFiles.length >= 4, `Found ${mmdFiles.length} Mermaid diagram source files`);

// Configure headless Chrome launcher for mermaid-cli
const pptrConfigPath = path.join(rootDir, 'scripts', '_temp_pptr_config.json');
fs.writeFileSync(
  pptrConfigPath,
  JSON.stringify({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--headless'],
  }),
  'utf8'
);

for (const mmd of mmdFiles) {
  const rel = path.relative(rootDir, mmd);
  const tempSvg = path.join(rootDir, 'scripts', `_test_${path.basename(mmd)}.svg`);
  try {
    execSync(`npx @mermaid-js/mermaid-cli -p "${pptrConfigPath}" -i "${mmd}" -o "${tempSvg}"`, {
      encoding: 'utf8',
      stdio: 'pipe',
    });
    assert(fs.existsSync(tempSvg), `Compiled real Mermaid chart: ${rel}`);
    if (fs.existsSync(tempSvg)) fs.unlinkSync(tempSvg);
  } catch (err) {
    assert(false, `Mermaid compilation failed for ${rel}: ${err.stderr || err.message}`);
  }
}

if (fs.existsSync(pptrConfigPath)) {
  fs.unlinkSync(pptrConfigPath);
}

// -----------------------------------------------------------------------------
// Summary & Verdict
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(`TOTAL AUDIT CHECKS: ${totalChecks} | PASSED: ${passedChecks} | FAILED: ${failedChecks}`);
console.log('================================================================');

if (failedChecks > 0) {
  console.error('\n❌ HARDENED VALIDATION SUITE DETECTED FAILURES.\n');
  process.exit(1);
} else {
  console.log('\n🎉 ALL HARDENED VALIDATION & SECURITY CHECKS PASSED PERFECTLY!\n');
  process.exit(0);
}
