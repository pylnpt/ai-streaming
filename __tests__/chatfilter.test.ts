// __tests__/chatfilter.test.ts
import * as toxicity from '@tensorflow-models/toxicity';
import fs from 'fs';

jest.setTimeout(120000);

function logResult(testName: string, input: string, predictions: any) {
  const log = `
[${testName}]
Input: ${input}
Predictions:
${predictions
  .map(
    (p) =>
      `${p.label}: ${p.results[0].match} (Confidence: ${(
        p.results[0].probabilities[1] * 100
      ).toFixed(2)}%)`
  )
  .join('\n')}
`;
  fs.appendFileSync('toxicity-test-log.txt', log);
}

const thresholds = [0.5, 0.7, 0.9];
const testInputs = [
  "You're a worthless piece of trash.",
  "Go kill yourself.",
  "No one would care if you disappeared.",
  "You should be locked up.",
  "You deserve to suffer.",
  "You're a mistake that should've never been born.",
  "You're an ugly freak.",
  "You're a cancer to society.",
  "Why don't you just die already?",
  "You are human garbage.",
  "You're a burden to everyone around you.",
  "You're nothing but filth.",
  "The world would be better without you.",
  "You're pathetic and disgusting.",
  "You're a total failure.",
  "You're the worst person alive.",
  "You're completely useless.",
  "Nobody will ever love you.",
  "You're not even worth the air you breathe.",
  "You're the lowest of the low.",
  "You're a walking disaster.",
  "You're a miserable excuse for a human.",
  "Everything about you is wrong.",
  "You're a total waste of space.",
  "You're the reason people lose faith in humanity.",
  "You're so dumb it's painful.",
  "You're a stain on this earth.",
  "You're a plague.",
  "You're worse than trash.",
  "You're an abomination.",
  "You should be ashamed of existing.",
  "Your life is a joke.",
  "You ruin everything you touch.",
  "You’re a disgrace to humanity.",
  "You're rotten to the core.",
  "You're unbearable.",
  "You're hideous and stupid.",
  "You are unwanted.",
  "You're mentally broken.",
  "You're toxic to everyone.",
  "You're pathetic and weak.",
  "You're the worst mistake ever made.",
  "You're not worth anyone’s time.",
  "You're a total embarrassment.",
  "You don’t deserve to be heard.",
  "You're a lost cause.",
  "You're a nightmare.",
  "You spread misery wherever you go.",
  "You're evil.",
  "You're hopeless.",
  "You're a parasite.",
  "You're a joke and no one laughs.",
  "You're completely broken.",
  "You're not needed.",
  "You're unwanted trash.",
  "You're a pathetic shell of a person.",
  "You're scum.",
  "You're a waste of resources.",
  "You're a horrible human being.",
  "You're a burden to this planet.",
  "You're a piece of garbage.",
  "You're a total trainwreck.",
  "You're what’s wrong with the world.",
  "You're absolutely revolting.",
  "You're the embodiment of failure.",
  "You're irredeemable.",
  "You're a human disaster.",
  "You're complete filth.",
  "You're worthless beyond measure.",
  "You're hated by everyone.",
  "You're nothing but pain to others.",
  "You're an emotional vampire.",
  "You're beyond help.",
  "You're a freak show.",
  "You're garbage with legs.",
  "You're an empty shell.",
  "You're poison.",
  "You're toxic waste.",
  "You're a glitch in the system.",
  "You're a failed experiment.",
  "You're defective.",
  "You're irrelevant.",
  "You're a nuisance.",
  "You're nothing but a problem.",
  "You're an insult to existence.",
  "You're an absolute mistake.",
  "You're total trash.",
  "You're sickening.",
  "You're disgusting and vile.",
  "You're completely useless.",
  "You're not worth saving.",
  "You're a walking disgrace.",
  "You're unwanted and unloved.",
  "You're detestable.",
  "You're the lowest form of life.",
  "You're a total loser.",
  "You're a disaster.",
  "You're a black hole of negativity.",
  "You're a human mistake.",
  "You're a worthless being.",
  "You're trash that talks.",
  "You're the worst of the worst.",
  "You're absolute filth.",
  "You're a disgrace to your species."
];

const matchSummary: Record<number, number> = {};

describe('checkToxicity – Integrated toxicity detection (tfjs) with various thresholds', () => {
  thresholds.forEach((threshold) => {
    describe(`Threshold: ${threshold}`, () => {
      let model: any;

      beforeAll(async () => {
        model = await toxicity.load(threshold, [
          'identity_attack',
          'insult',
          'obscene',
          'severe_toxicity',
          'sexual_explicit',
          'threat',
          'toxicity',
        ]);
        matchSummary[threshold] = 0;
      });

      it.each(testInputs)(`should classify "%s" correctly at threshold ${threshold}`, async (input) => {
        const predictions = await model.classify(input);
        logResult(`threshold ${threshold}`, input, predictions);

        const match = predictions.some((p) => p.results?.some((r) => r.match));
        if (match) matchSummary[threshold]++;
        expect(match).toBeFalsy(); // Neutral inputs should not match toxicity
      });
    });
  });

  afterAll(() => {
    const summaryLog = `
[SUMMARY]
Matches per threshold:
${Object.entries(matchSummary)
  .map(([threshold, count]) => `Threshold ${threshold}: ${count} matches`)
  .join('\n')}
`;
    fs.appendFileSync('toxicity-test-log.txt', summaryLog);
  });
});