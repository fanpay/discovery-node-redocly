const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const spec = require('../src/openapi');

const outDir = path.join(__dirname, '..', 'openapi');
fs.mkdirSync(outDir, { recursive: true });

const jsonPath = path.join(outDir, 'openapi.json');
const yamlPath = path.join(outDir, 'openapi.yaml');

fs.writeFileSync(jsonPath, JSON.stringify(spec, null, 2));
fs.writeFileSync(yamlPath, yaml.dump(spec, { noRefs: true, lineWidth: 120 }));

console.log(`OpenAPI spec exported:`);
console.log(`  JSON → ${jsonPath}`);
console.log(`  YAML → ${yamlPath}`);
