export type WKUser = {
  level: number;
  username: string;
  started_at: string;
};

export type WKLevelProgression = {
  level: number;
  started_at: string | null;
  passed_at: string | null;
  created_at: string;
};

export type SrsBreakdown = {
  apprentice: number;
  guru: number;
  master: number;
  enlightened: number;
  burned: number;
};

export type ItemCounts = {
  radicals: number;
  kanji: number;
  vocabulary: number;
};

export type WordOfTheDay = {
  characters: string;
  meanings: string[];
  readings: string[];
  level: number;
};

export type WanikaniData = {
  user: WKUser;
  levelProgressions: WKLevelProgression[];
  srsBreakdown: SrsBreakdown;
  totalItems: ItemCounts;
  wordOfTheDay: WordOfTheDay | null;
};

export type BunproJlptProgress = {
  n5: { learned: number; total: number };
  n4: { learned: number; total: number };
  n3: { learned: number; total: number };
  n2: { learned: number; total: number };
  n1: { learned: number; total: number };
};

export type BunproData = {
  jlptProgress: BunproJlptProgress;
  srsBreakdown: SrsBreakdown;
  totalGrammar: number;
};

export type StudyLogPost = {
  post_number: number;
  cooked: string;
  created_at: string;
};

export type JapanesePageProps = {
  wanikani: WanikaniData | null;
  bunpro: BunproData | null;
  studyLog: StudyLogPost[];
  fetchedAt: string;
};
