// __tests__/h2-ai-vs-rules.test.ts
// H2 Hypothesis: TensorFlow.js AI identifies at least 25% more toxic messages
// than a simple regex-based rule system (10 keywords)

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

// 10-keyword regex ruleset — typical beginner streamer solution
const REGEX_KEYWORDS = [
  'kill yourself',
  'kys',
  'idiot',
  'stupid',
  'fuck you',
  'hate you',
  'die',
  'worthless',
  'loser',
  'trash',
];

// 100 toxic messages (ground truth: all toxic)
const toxicMessages100 = [
  // Direct profanity / explicit
  "You're a worthless piece of trash.",
  "Go kill yourself.",
  "Fuck you and everything you stand for.",
  "You're such an idiot, I can't believe it.",
  "You stupid moron.",
  "I hate you so much.",
  "Just die already.",
  "You're a loser with no future.",
  "You're trash, absolute trash.",
  "You're the dumbest person alive.",
  // Psychological harm (implicit - no keywords)
  "No one would care if you disappeared.",
  "You deserve to suffer.",
  "The world would be better without you.",
  "Nobody will ever love you.",
  "You're not even worth the air you breathe.",
  "You are unwanted.",
  "You spread misery wherever you go.",
  "You're a burden to everyone around you.",
  "You're completely broken.",
  "You're hated by everyone.",
  // Threats
  "I will find where you live.",
  "You'll regret saying that.",
  "Watch your back.",
  "I know where you stream from.",
  "You'll be sorry.",
  "You're going to pay for this.",
  "You should be afraid.",
  "Don't think I won't come for you.",
  "Your time is running out.",
  "You'll never feel safe again.",
  // Identity attacks
  "People like you shouldn't exist.",
  "Your kind is disgusting.",
  "You're an embarrassment to your race.",
  "Your religion is a disease.",
  "You're a disgrace to humanity.",
  "People like you ruin everything.",
  "You're a cancer to society.",
  "You make me sick.",
  "You're an abomination.",
  "You should be ashamed of your existence.",
  // Self-harm encouragement
  "Why don't you just end it?",
  "You'd do everyone a favour by disappearing.",
  "Have you considered not waking up tomorrow?",
  "Nobody would miss you if you were gone.",
  "You should just give up on everything.",
  "Life would be better for everyone without you.",
  "You're beyond saving, just stop trying.",
  "Why are you still here?",
  "You're a waste of a human life.",
  "Just stop existing.",
  // Insults (moderate)
  "You're pathetic and disgusting.",
  "You're the worst person alive.",
  "You're completely useless.",
  "You're a miserable excuse for a human.",
  "You're hideous and stupid.",
  "You're a total embarrassment.",
  "You're absolutely revolting.",
  "You're sickening.",
  "You're disgusting and vile.",
  "You're the worst of the worst.",
  // Streaming-specific
  "I hope your stream gets swatted.",
  "I'll report you until you get banned.",
  "You should be deplatformed permanently.",
  "Your channel deserves to burn.",
  "I'm going to get your stream taken down.",
  "You'll never stream again after I'm done.",
  "I hope your setup gets destroyed.",
  "You're getting mass reported tonight.",
  "Your viewers are going to leave you.",
  "You'll be cancelled by the end of the week.",
  // Mixed / edge cases
  "You're a parasite on this community.",
  "You're poison to everyone around you.",
  "You're a failed experiment of nature.",
  "You're defective as a human being.",
  "You're an insult to existence.",
  "You're the embodiment of failure.",
  "You're hated by your own community.",
  "You're an emotional vampire draining everyone.",
  "You're a freak show nobody asked for.",
  "You're garbage with a streaming setup.",
  // Severe combined
  "You're a worthless, pathetic excuse for a streamer.",
  "Go kill yourself, nobody watches your trash content.",
  "You're so stupid it physically hurts to watch you.",
  "I hate everything about you, just disappear.",
  "You're a loser and everyone in your chat knows it.",
  "Die in a fire, you absolute waste of bandwidth.",
  "You're the dumbest, most useless content creator alive.",
  "Trash streamer, trash person, trash existence.",
  "You're worthless and your community is worthless.",
  "Kill your channel and yourself while you're at it.",
  // Subtle but toxic
  "I hope something terrible happens to you soon.",
  "You clearly have no value as a person.",
  "Your existence is a net negative for everyone.",
  "I genuinely wish you harm.",
  "Everyone who watches you is making a mistake.",
  "You have nothing to offer anyone.",
  "You'll never amount to anything.",
  "Your family must be embarrassed by you.",
  "You're a disappointment to everyone who knows you.",
  "You're irredeemably terrible as both a streamer and person.",
];

function ruleBasedCheck(message: string): boolean {
  const lower = message.toLowerCase();
  return REGEX_KEYWORDS.some(keyword => lower.includes(keyword));
}

function calculateF1(tp: number, fp: number, fn: number): number {
  const precision = tp / (tp + fp) || 0;
  const recall = tp / (tp + fn) || 0;
  return (2 * precision * recall) / (precision + recall) || 0;
}

describe('H2: AI vs Rule-based System', () => {
  let model: toxicity.ToxicityClassifier;
  const aiResults: boolean[] = [];
  const ruleResults: boolean[] = [];

  beforeAll(async () => {
    console.log('Loading model for H2...');
    model = await toxicity.load(THRESHOLD, LABELS);
    console.log('Model loaded.');
  });

  it.each(toxicMessages100)('classifies: "%s"', async (msg) => {
    const predictions = await model.classify([msg]);
    const aiToxic = predictions.some(p => p.results[0].match === true);
    const ruleToxic = ruleBasedCheck(msg);
    aiResults.push(aiToxic);
    ruleResults.push(ruleToxic);
  });

  afterAll(() => {
    const total = toxicMessages100.length;

    // All messages are toxic (ground truth)
    const ruleDetected = ruleResults.filter(Boolean).length;
    const aiDetected = aiResults.filter(Boolean).length;

    const ruleMissed = total - ruleDetected;
    const aiMissed = total - aiDetected;

    const ruleDetectionRate = (ruleDetected / total) * 100;
    const aiDetectionRate = (aiDetected / total) * 100;
    const improvement = ((aiDetected - ruleDetected) / ruleDetected) * 100;

    // F1 scores (all ground truth = toxic, no safe messages here)
    const ruleFP = 0; // no safe messages to false-positive on
    const ruleF1 = calculateF1(ruleDetected, ruleFP, ruleMissed);
    const aiF1 = calculateF1(aiDetected, 0, aiMissed);

    // Missed by rules but caught by AI
    const onlyAICaught = toxicMessages100.filter(
      (_, i) => !ruleResults[i] && aiResults[i]
    );

    // Missed by both
    const bothMissed = toxicMessages100.filter(
      (_, i) => !ruleResults[i] && !aiResults[i]
    );

    const report = `
============================
H2 REPORT: AI vs Rule-based System
============================
Dataset: ${total} toxic messages
Regex keywords (${REGEX_KEYWORDS.length}): ${REGEX_KEYWORDS.join(', ')}
AI threshold: ${THRESHOLD}

--- DETECTION ---
Rule-based detected: ${ruleDetected}/${total} (${ruleDetectionRate.toFixed(2)}%)
AI detected:         ${aiDetected}/${total} (${aiDetectionRate.toFixed(2)}%)
Improvement:         +${improvement.toFixed(2)}%
Target (>=25%):      ${improvement >= 25 ? 'PASS ✓' : 'FAIL ✗'}

--- F1 SCORES ---
Rule-based F1: ${(ruleF1 * 100).toFixed(2)}%
AI F1:         ${(aiF1 * 100).toFixed(2)}%

--- ONLY AI CAUGHT (${onlyAICaught.length} messages) ---
${onlyAICaught.map(m => `  - "${m}"`).join('\n')}

--- MISSED BY BOTH (${bothMissed.length} messages) ---
${bothMissed.map(m => `  - "${m}"`).join('\n')}
============================
`;

    console.log(report);
    fs.writeFileSync('h2-report.txt', report);

    expect(improvement).toBeGreaterThanOrEqual(25);
  });
});
