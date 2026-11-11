const path = require('path');
const fs = require('fs');

const ROOT_DIR = path.resolve(__dirname, '..');
const BRANDS_FILE = path.join(ROOT_DIR, 'data', 'brands.json');
const brands = JSON.parse(fs.readFileSync(BRANDS_FILE, 'utf8'));

console.log('--- Generating Five Mega Topics (/recommend/, /free-nodes/, /faq/, /alerts/, /trial/) ---');

// 1. Topic 1: Recommend
require('./topics/recommend.js').generate(ROOT_DIR, brands);

// 2. Topic 2: Free Nodes
require('./topics/freenodes.js').generate(ROOT_DIR, brands);

// 3. Topic 3: FAQ
require('./topics/faq.js').generate(ROOT_DIR, brands);

// 4. Topic 4: Alerts
require('./topics/alerts.js').generate(ROOT_DIR, brands);

// 5. Topic 5: Trial
require('./topics/trial.js').generate(ROOT_DIR, brands);

console.log('--- All Five Mega Topics Generated Successfully with 10,000+ words pillar pages! ---');
