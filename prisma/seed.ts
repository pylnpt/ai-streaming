import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const aiFilters = [
    { label: 'Identity Attack', value: 'identity_attack' },
    { label: 'Insult', value: 'insult' },
    { label: 'Obscene content', value: 'obscene' },
    { label: 'Severe Toxicity', value: 'severe_toxicity' },
    { label: 'Sexual Explicit', value: 'sexual_explicit' },
    { label: 'Threat', value: 'threat' },
    { label: 'Toxicity', value: 'toxicity' },
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
    { name: "95%", value: 0.95,description: "The most strict choice. More 'false negative' cases may occur." },             
    { name: "90%", value: 0.9, description: "Optimal. False negatives / positives may still occur." },             
    { name: "80%", value: 0.8, description: "The most lenient choice. More 'false positive' cases may occur." }             
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
