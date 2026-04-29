import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const aiFilters = [
    { label: 'Hate Speech & Identity Attacks', value: 'identity_attack' },
    { label: 'Insults & Name-Calling', value: 'insult' },
    { label: 'Obscenities & Profanity', value: 'obscene' },
    { label: 'Extremely Toxic Content', value: 'severe_toxicity' },
    { label: 'Sexual Content', value: 'sexual_explicit' },
    { label: 'Threats & Violence', value: 'threat' },
    { label: 'General Toxicity', value: 'toxicity' },
  ];

  for (const filter of aiFilters) {
    await prisma.aIFilter.upsert({
      where: { value: filter.value },
      update: {},
      create: {
        label: filter.label,
        value: filter.value,
      },
    });
  }


  const aiThresholds = [
    { name: "Very Lenient (95%)", value: 0.95, description: "Only blocks extremely obvious toxic content - fewer messages filtered" },
    { name: "Balanced (90%)", value: 0.9, description: "Recommended - good balance between protection and false positives" },
    { name: "Moderate (85%)", value: 0.85, description: "Moderate filtering - catches most toxic content with minimal false positives" },
    { name: "Strict (80%)", value: 0.8, description: "Blocks more aggressively - some harmless messages may be filtered" },
    { name: "Very Strict (70%)", value: 0.7, description: "Maximum filtering - blocks anything remotely questionable" }
  ];

  for (const threshold of aiThresholds) {
    await prisma.aIThreshold.upsert({
      where: { value: threshold.value },
      update: { description: threshold.description, },
      create: {
        label: threshold.name,
        value: threshold.value,
        description: threshold.description
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
