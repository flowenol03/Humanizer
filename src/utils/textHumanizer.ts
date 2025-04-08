import { sample, shuffle, chance, randomInt } from './helpers';

type Tone = 'formal' | 'casual' | 'persuasive';

// Expanded personal phrases for more variety
const personalPhrases = {
  casual: [
    "you know what I mean?",
    "let's be honest here",
    "just between us",
    "I gotta say",
    "for real",
    "to be real with you",
    "here's the scoop",
    "no kidding",
    "seriously though",
    "let me break it down for you",
  ],
  formal: [
    "in my professional view",
    "based on my observations",
    "considering the facts",
    "after thorough analysis",
    "upon careful review",
    "in light of the evidence",
    "from my standpoint",
    "taking into account",
  ],
  persuasive: [
    "here's the crux of the matter",
    "let me clarify this",
    "I assure you",
    "mark my words on this",
    "you can trust me on this",
    "let's be clear",
    "the bottom line is",
  ],
};

// Enhanced thought pauses for more natural breaks
const thoughtPauses = {
  casual: [
    "...",
    "hmm",
    "uh",
    "um",
    "like",
    "well",
    "err",
    "mhm",
    "right",
    "yeah",
  ],
  formal: [
    "indeed",
    "certainly",
    "notably",
    "interestingly",
    "curiously",
  ],
  persuasive: [
    "listen",
    "consider this",
    "think about it",
    "imagine this",
  ],
};

// More varied sentence starters
const sentenceStarters = {
  casual: [
    "so,",
    "anyway,",
    "but honestly,",
    "right,",
    "okay,",
    "basically,",
    "you see,",
    "let's talk about this,",
  ],
  formal: [
    "moreover,",
    "furthermore,",
    "additionally,",
    "consequently,",
    "therefore,",
  ],
  persuasive: [
    "importantly,",
    "significantly,",
    "crucially,",
    "notably,",
  ],
};

// Enhanced mid-sentence fillers
const midSentenceFillers = {
  casual: [
    "like",
    "you know",
    "sort of",
    "kind of",
    "I mean",
    "basically",
    "pretty much",
  ],
  formal: [
    "essentially",
    "primarily",
    "fundamentally",
  ],
  persuasive: [
    "absolutely",
    "definitely",
    "certainly",
  ],
};

// Enhanced contractions dictionary
const contractions = {
  "will not": "won't",
  "cannot": "can't",
  "could not": "couldn't",
  "should not": "shouldn't",
  "would not": "wouldn't",
  "do not": "don't",
  "does not": "doesn't",
  "did not": "didn't",
  "is not": "isn't",
  "are not": "aren't",
  "have not": "haven't",
  "has not": "hasn't",
  "had not": "hadn't",
  "I am": "I'm",
  "you are": "you're",
  "they are": "they're",
  "we are": "we're",
  "it is": "it's",
  "that is": "that's",
  "what is": "what's",
  "where is": "where's",
  "when is": "when's",
  "why is": "why's",
  "how is": "how's",
  "going to": "gonna",
  "want to": "wanna",
  "got to": "gotta",
  "kind of": "kinda",
  "sort of": "sorta",
  "out of": "outta",
  "trying to": "tryna",
  "give me": "gimme",
  "let me": "lemme",
};

// Enhanced emotional expressions
const emotions = {
  casual: [
    "haha",
    "wow",
    "yikes",
    "oof",
    "no way",
  ],
  formal: [
    "fascinating",
    "remarkable",
    "intriguing",
  ],
  persuasive: [
    "incredible",
    "amazing",
    "fantastic",
  ],
};

const addThoughtPauses = (text: string, tone: Tone): string => {
  const pauses = thoughtPauses[tone];
  if (chance(0.4)) {
    return `${sample(pauses)}... ${text}`;
  }
  return text;
};

const addMidSentenceFillers = (text: string, tone: Tone): string => {
  const fillers = midSentenceFillers[tone];
  const words = text.split(' ');
  
  return words.map((word, index) => {
    if (index > 0 && chance(0.15)) {
      return `${sample(fillers)} ${word}`;
    }
    return word;
  }).join(' ');
};

const addSentenceStarter = (text: string, tone: Tone): string => {
  if (chance(0.45)) {
    return `${sample(sentenceStarters[tone])} ${text.toLowerCase()}`;
  }
  return text;
};

const addPersonalTouch = (text: string, tone: Tone): string => {
  if (chance(0.5)) {
    return `${sample(personalPhrases[tone])} ${text.toLowerCase()}`;
  }
  return text;
};

const addEmotionalExpression = (text: string, tone: Tone): string => {
  if (chance(0.3)) {
    return `${text} ${sample(emotions[tone])}`;
  }
  return text;
};

const addNaturalPauses = (text: string): string => {
  return text.replace(/([.!?])\s+/g, (match) => {
    if (chance(0.3)) return `${match}... `;
    return match;
  });
};

const addEmphasis = (text: string, tone: Tone): string => {
  const emphasisPatterns = {
    casual: [
      [/\b(good|great|nice)\b/gi, 'really $1'],
      [/\b(bad|terrible|awful)\b/gi, 'super $1'],
      [/\b(interesting|cool|awesome)\b/gi, 'totally $1'],
      [/\b(amazing|incredible)\b/gi, 'absolutely $1'],
    ],
    formal: [
      [/\b(significant|important)\b/gi, 'particularly $1'],
      [/\b(effective|efficient)\b/gi, 'highly $1'],
    ],
    persuasive: [
      [/\b(essential|crucial)\b/gi, 'absolutely $1'],
      [/\b(beneficial|helpful)\b/gi, 'extremely $1'],
    ],
  };

  return emphasisPatterns[tone].reduce((result, [pattern, replacement]) => {
    return chance(0.4) ? result.replace(pattern, replacement) : result;
  }, text);
};

const applyContractions = (text: string, tone: Tone): string => {
  let result = text;
  Object.entries(contractions).forEach(([full, contracted]) => {
    const regex = new RegExp(`\\b${full}\\b`, 'gi');
    const contractionRate = {
      casual: 0.95,
      formal: 0.2,
      persuasive: 0.7,
    };
    if (chance(contractionRate[tone])) {
      result = result.replace(regex, contracted);
    }
  });
  return result;
};

const addColloquialisms = (text: string, tone: Tone): string => {
  if (tone !== 'casual') return text;

  const colloquialisms = {
    'very': ['super', 'totally', 'mad'],
    'good': ['dope', 'sick', 'lit'],
    'bad': ['trash', 'whack', 'sus'],
    'amazing': ['insane', 'wild', 'crazy'],
  };

  let result = text;
  Object.entries(colloquialisms).forEach(([formal, casual]) => {
    const regex = new RegExp(`\\b${formal}\\b`, 'gi');
    if (chance(0.4)) {
      result = result.replace(regex, () => sample(casual));
    }
  });

  return result;
};

export const humanizeText = (text: string, tone: Tone = 'casual'): string => {
  if (!text) return '';

  // Split into paragraphs while preserving formatting
  const paragraphs = text.split(/\n+/);

  // Process each paragraph
  const processedParagraphs = paragraphs.map((paragraph) => {
    // Split into sentences while preserving punctuation
    let sentences = paragraph.split(/(?<=[.!?])\s+/);

    // Process each sentence
    sentences = sentences.map((sentence) => {
      // Remove formal/stiff language
      sentence = sentence
        .replace(/\b(utilize|implementation|facilitate|leverage|optimize)\b/gi, 'use')
        .replace(/\b(commence|initiate)\b/gi, 'start')
        .replace(/\b(terminate|conclude)\b/gi, 'end')
        .replace(/\b(purchase|acquire)\b/gi, 'buy')
        .replace(/\b(inquire)\b/gi, 'ask')
        .replace(/\b(obtain)\b/gi, 'get')
        .replace(/\b(require)\b/gi, 'need')
        .replace(/\b(subsequently|consequently)\b/gi, 'then')
        .replace(/\b(nevertheless|however)\b/gi, 'but')
        .replace(/\b(additionally|furthermore)\b/gi, 'also')
        .replace(/\b(regarding|concerning)\b/gi, 'about')
        .replace(/\b(sufficient|adequate)\b/gi, 'enough')
        .replace(/\b(attempt|endeavor)\b/gi, 'try')
        .replace(/\b(numerous|multiple)\b/gi, 'many')
        .replace(/\b(assist|aid)\b/gi, 'help');

      // Add natural language elements
      sentence = addSentenceStarter(sentence, tone);
      sentence = addPersonalTouch(sentence, tone);
      sentence = addThoughtPauses(sentence, tone);
      sentence = addMidSentenceFillers(sentence, tone);
      sentence = addEmphasis(sentence, tone);
      sentence = addEmotionalExpression(sentence, tone);
      sentence = addColloquialisms(sentence, tone);

      return sentence;
    });

    // Join sentences and apply final transformations
    let result = sentences.join(' ');

    // Apply tone-specific transformations
    result = applyContractions(result, tone);
    result = addNaturalPauses(result);

    // Final cleanup while preserving intentional pauses and formatting
    result = result
      .replace(/\s+/g, ' ')
      .replace(/\s+([,.!?])/g, '$1')
      .replace(/,+/g, ',')
      .replace(/\.{4,}/g, '')
      .trim();

    return result;
  });

  // Join paragraphs with new lines
  return processedParagraphs.join('\n\n');
}