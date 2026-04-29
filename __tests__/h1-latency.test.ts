// __tests__/h1-latency.test.ts
// H1 Hypothesis: TensorFlow.js client-side model achieves <500ms avg latency
// and >40% detection rate on 100 messages (50 toxic, 50 safe)

import * as toxicity from '@tensorflow-models/toxicity';
import fs from 'fs';

jest.setTimeout(300000);

const THRESHOLD = 0.75;
const LABELS = [
  'identity_attack',
  'insult',
  'obscene',
  'severe_toxicity',
  'sexual_explicit',
  'threat',
  'toxicity',
];

// 50 toxic messages
const toxicMessages = [
  "You're a worthless piece of trash.",
  "Go kill yourself.",
  "No one would care if you disappeared.",
  "You deserve to suffer.",
  "You're an ugly freak.",
  "You're a cancer to society.",
  "Why don't you just die already?",
  "You are human garbage.",
  "You're nothing but filth.",
  "The world would be better without you.",
  "You're pathetic and disgusting.",
  "You're the worst person alive.",
  "You're completely useless.",
  "Nobody will ever love you.",
  "You're not even worth the air you breathe.",
  "You're a miserable excuse for a human.",
  "You're a total waste of space.",
  "You're so dumb it's painful.",
  "You're a stain on this earth.",
  "You're worse than trash.",
  "You should be ashamed of existing.",
  "Your life is a joke.",
  "You're a disgrace to humanity.",
  "You're hideous and stupid.",
  "You are unwanted.",
  "You're toxic to everyone.",
  "You're the worst mistake ever made.",
  "You're a total embarrassment.",
  "You're a lost cause.",
  "You spread misery wherever you go.",
  "You're a parasite.",
  "You're completely broken.",
  "You're unwanted trash.",
  "You're scum.",
  "You're a horrible human being.",
  "You're a burden to this planet.",
  "You're absolutely revolting.",
  "You're the embodiment of failure.",
  "You're complete filth.",
  "You're hated by everyone.",
  "You're an emotional vampire.",
  "You're a freak show.",
  "You're garbage with legs.",
  "You're poison.",
  "You're a failed experiment.",
  "You're defective.",
  "You're an insult to existence.",
  "You're sickening.",
  "You're disgusting and vile.",
  "You're the worst of the worst.",
];

// 50 safe messages
const safeMessages = [
  "Great stream today!",
  "That was an amazing play!",
  "I love this community.",
  "GG well played everyone.",
  "This game is so much fun to watch.",
  "You're really good at this.",
  "Thanks for streaming, this made my day.",
  "hell yeah that was insane",
  "damnit I missed the stream start",
  "That clutch was unreal!",
  "Keep it up, you're doing great.",
  "First time watching, already love it.",
  "The chat is so wholesome here.",
  "Can't believe you pulled that off!",
  "This is peak content.",
  "How long have you been playing?",
  "What settings do you use?",
  "I'll destroy you in this match lol",
  "Let's go! Come on!",
  "This game is trash but you make it fun.",
  "Pog that was so fast.",
  "Classic move, well done.",
  "No way that just happened.",
  "This stream always cheers me up.",
  "You're one of my favourite streamers.",
  "Clip that!",
  "The gameplay today was next level.",
  "Finally caught a stream live!",
  "I've been watching for 2 years now.",
  "Anyone else just discover this channel?",
  "That comeback was epic.",
  "Legitimately impressed.",
  "Thanks for the tips on that level.",
  "Just subbed, totally worth it.",
  "The editing on these clips is fire.",
  "New PB incoming?",
  "rekt him lmao",
  "kick ass run so far",
  "You've improved so much since last year.",
  "This is the best stream I've watched all week.",
  "Friendly reminder to stay hydrated chat.",
  "Who else is watching from Europe?",
  "The music choice today is perfect.",
  "That strategy was clever.",
  "Solid game, looking forward to the next one.",
  "The community here is the best.",
  "Another banger session.",
  "When's the next stream?",
  "Can we get an F in chat for that attempt.",
  "Absolutely loved this, see you next time.",
];

interface LatencyResult {
  message: string;
  isToxic: boolean;
  groundTruth: boolean;
  latencyMs: number;
}

describe('H1: Client-side TensorFlow.js Latency & Detection Rate', () => {
  let model: toxicity.ToxicityClassifier;
  const results: LatencyResult[] = [];

  beforeAll(async () => {
    console.log('Loading TensorFlow.js toxicity model...');
    const loadStart = performance.now();
    model = await toxicity.load(THRESHOLD, LABELS);
    const loadEnd = performance.now();
    console.log(`Model loaded in ${(loadEnd - loadStart).toFixed(2)}ms`);
  });

  describe('Toxic messages (ground truth: toxic)', () => {
    it.each(toxicMessages)('classifies "%s"', async (msg) => {
      const start = performance.now();
      const predictions = await model.classify([msg]);
      const end = performance.now();

      const isToxic = predictions.some((p) => p.results[0].match === true);
      results.push({
        message: msg,
        isToxic,
        groundTruth: true,
        latencyMs: end - start,
      });

      expect(end - start).toBeLessThan(500);
    });
  });

  describe('Safe messages (ground truth: safe)', () => {
    it.each(safeMessages)('classifies "%s"', async (msg) => {
      const start = performance.now();
      const predictions = await model.classify([msg]);
      const end = performance.now();

      const isToxic = predictions.some((p) => p.results[0].match === true);
      results.push({
        message: msg,
        isToxic,
        groundTruth: false,
        latencyMs: end - start,
      });

      expect(end - start).toBeLessThan(500);
    });
  });

  afterAll(() => {
    const latencies = results.map((r) => r.latencyMs).sort((a, b) => a - b);
    const avg = latencies.reduce((a, b) => a + b, 0) / latencies.length;
    const min = latencies[0];
    const max = latencies[latencies.length - 1];
    const stdDev = Math.sqrt(
      latencies.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / latencies.length
    );
    const p95 = latencies[Math.floor(latencies.length * 0.95)];

    // Detection rate: how many toxic messages were correctly identified
    const toxicResults = results.filter((r) => r.groundTruth === true);
    const detected = toxicResults.filter((r) => r.isToxic).length;
    const detectionRate = (detected / toxicResults.length) * 100;

    // Confusion matrix
    const tp = results.filter((r) => r.groundTruth && r.isToxic).length;
    const fp = results.filter((r) => !r.groundTruth && r.isToxic).length;
    const tn = results.filter((r) => !r.groundTruth && !r.isToxic).length;
    const fn = results.filter((r) => r.groundTruth && !r.isToxic).length;
    const precision = tp / (tp + fp) || 0;
    const recall = tp / (tp + fn) || 0;
    const f1 = (2 * precision * recall) / (precision + recall) || 0;

    const report = `
============================
H1 LATENCY & DETECTION REPORT
============================
Dataset: ${results.length} messages (${toxicMessages.length} toxic, ${safeMessages.length} safe)
Threshold: ${THRESHOLD}

--- LATENCY ---
Average:        ${avg.toFixed(2)} ms
Min:            ${min.toFixed(2)} ms
Max:            ${max.toFixed(2)} ms
Std Dev:        ${stdDev.toFixed(2)} ms
95th pct:       ${p95.toFixed(2)} ms
Target (<500ms): ${avg < 500 ? 'PASS ✓' : 'FAIL ✗'}

--- DETECTION ---
Toxic detected: ${detected}/${toxicMessages.length}
Detection rate: ${detectionRate.toFixed(2)}%
Target (>40%):  ${detectionRate > 40 ? 'PASS ✓' : 'FAIL ✗'}

--- CONFUSION MATRIX ---
TP: ${tp}  FP: ${fp}
FN: ${fn}  TN: ${tn}

Precision: ${(precision * 100).toFixed(2)}%
Recall:    ${(recall * 100).toFixed(2)}%
F1 Score:  ${(f1 * 100).toFixed(2)}%

--- FALSE NEGATIVES (missed toxic) ---
${results
  .filter((r) => r.groundTruth && !r.isToxic)
  .map((r) => `  - "${r.message}"`)
  .join('\n')}

--- FALSE POSITIVES (wrongly blocked safe) ---
${results
  .filter((r) => !r.groundTruth && r.isToxic)
  .map((r) => `  - "${r.message}"`)
  .join('\n')}
============================
`;

    console.log(report);
    fs.writeFileSync('h1-latency-report.txt', report);

    // Assertions
    expect(avg).toBeLessThan(500);
    expect(detectionRate).toBeGreaterThan(40);
  });
});
