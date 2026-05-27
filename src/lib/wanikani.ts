import type {
  WKUser,
  WKLevelProgression,
  SrsBreakdown,
  ItemCounts,
  WordOfTheDay,
  WanikaniData,
} from "types/japanese";

const BASE_URL = "https://api.wanikani.com/v2";

async function wkFetch(endpoint: string, token: string) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Wanikani-Revision": "20170710",
    },
  });

  if (!res.ok) {
    throw new Error(`WaniKani API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

async function wkFetchAllPages(endpoint: string, token: string) {
  const items: any[] = [];
  let url: string | null = `${BASE_URL}${endpoint}`;

  while (url) {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Wanikani-Revision": "20170710",
      },
    });

    if (!res.ok) {
      throw new Error(`WaniKani API error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    items.push(...json.data.map((item: any) => item.data));
    url = json.pages?.next_url || null;
  }

  return items;
}

async function fetchUser(token: string): Promise<WKUser> {
  const json = await wkFetch("/user", token);
  return {
    level: json.data.level,
    username: json.data.username,
    started_at: json.data.started_at,
  };
}

async function fetchLevelProgressions(
  token: string,
): Promise<WKLevelProgression[]> {
  const items = await wkFetchAllPages("/level_progressions", token);
  return items
    .map((item) => ({
      level: item.level,
      started_at: item.started_at,
      passed_at: item.passed_at,
      created_at: item.created_at,
    }))
    .sort((a, b) => a.level - b.level);
}

async function fetchSrsBreakdown(
  token: string,
): Promise<{ srsBreakdown: SrsBreakdown; totalItems: ItemCounts }> {
  const assignments = await wkFetchAllPages("/assignments", token);

  const srsBreakdown: SrsBreakdown = {
    apprentice: 0,
    guru: 0,
    master: 0,
    enlightened: 0,
    burned: 0,
  };

  const totalItems: ItemCounts = {
    radicals: 0,
    kanji: 0,
    vocabulary: 0,
  };

  for (const a of assignments) {
    if (!a.started_at) continue;

    // Count by subject type
    if (a.subject_type === "radical") totalItems.radicals++;
    else if (a.subject_type === "kanji") totalItems.kanji++;
    else totalItems.vocabulary++;

    // Count by SRS stage
    const stage = a.srs_stage as number;
    if (stage >= 1 && stage <= 4) srsBreakdown.apprentice++;
    else if (stage >= 5 && stage <= 6) srsBreakdown.guru++;
    else if (stage === 7) srsBreakdown.master++;
    else if (stage === 8) srsBreakdown.enlightened++;
    else if (stage === 9) srsBreakdown.burned++;
  }

  return { srsBreakdown, totalItems };
}

async function fetchWordOfTheDay(token: string): Promise<WordOfTheDay | null> {
  // Get recently started assignments (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const updatedAfter = thirtyDaysAgo.toISOString();

  const assignments = await wkFetchAllPages(
    `/assignments?subject_types=kanji,vocabulary&updated_after=${updatedAfter}`,
    token,
  );

  const started = assignments.filter((a) => a.started_at);
  if (started.length === 0) return null;

  // Pick a deterministic "random" one based on the current date
  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();
  const picked = started[seed % started.length];

  // Fetch subject details
  const subjectJson = await wkFetch(`/subjects/${picked.subject_id}`, token);
  const subject = subjectJson.data;

  return {
    characters: subject.characters || "?",
    meanings: subject.meanings
      .filter((m: any) => m.primary)
      .map((m: any) => m.meaning),
    readings: (subject.readings || [])
      .filter((r: any) => r.primary)
      .map((r: any) => r.reading),
    level: subject.level,
  };
}

export async function fetchAllWanikaniData(
  token: string,
): Promise<WanikaniData> {
  const [user, levelProgressions, { srsBreakdown, totalItems }, wordOfTheDay] =
    await Promise.all([
      fetchUser(token),
      fetchLevelProgressions(token),
      fetchSrsBreakdown(token),
      fetchWordOfTheDay(token),
    ]);

  return {
    user,
    levelProgressions,
    srsBreakdown,
    totalItems,
    wordOfTheDay,
  };
}
