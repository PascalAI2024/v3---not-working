import { Lead } from '../types';

const firstNames = ['Michael', 'Sarah', 'David', 'Emma', 'James', 'Lisa', 'John', 'Emily'];
const lastNames = ['Thompson', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller'];
const cities = ['Los Angeles', 'New York', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'];
const states = ['CA', 'NY', 'IL', 'TX', 'AZ', 'PA'];
const companies = ['Tech Corp', 'Global Solutions', 'Innovate Inc', 'Digital Systems', 'Smart Tech'];
const industries = ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail'];

const notes = [
  'Interested in enterprise plan',
  'Requested follow-up next quarter',
  'Currently using competitor product',
  'Expanding operations',
  'Looking for AI solutions',
  'Need better analytics'
];

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generatePhoneNumber(): string {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const prefix = Math.floor(Math.random() * 900) + 100;
  const lineNumber = Math.floor(Math.random() * 9000) + 1000;
  return `(${areaCode}) ${prefix}-${lineNumber}`;
}

function generateAlternatePhones(): string[] {
  const count = Math.random() > 0.7 ? 1 : 0;
  return Array(count).fill(null).map(generatePhoneNumber);
}

export function generateMockLead(): Lead {
  const firstName = randomElement(firstNames);
  const lastName = randomElement(lastNames);
  const city = randomElement(cities);
  const state = randomElement(states);
  const company = randomElement(companies);
  const industry = randomElement(industries);

  return {
    id: Math.random().toString(36).substr(2, 9),
    name: `${firstName} ${lastName}`,
    phone: generatePhoneNumber(),
    alternatePhones: generateAlternatePhones(),
    location: `${city}, ${state}`,
    lastContact: 'Never contacted',
    notes: randomElement(notes),
    attempts: 0,
    script: 'default_script',
    customFields: {
      company,
      industry,
      employees: randomElement(['1-50', '51-200', '201-500', '500+']),
      website: `www.${company.toLowerCase().replace(' ', '')}.com`,
      lastInteraction: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
    },
    campaign: 'Q1 Sales Outreach',
    priority: Math.floor(Math.random() * 5) + 1,
    sentiment: {
      score: Math.random(),
      keywords: ['interested', 'pricing', 'features'],
      topics: ['product', 'pricing', 'support'],
      nextBestAction: 'Discuss enterprise features'
    }
  };
}