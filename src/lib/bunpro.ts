import type { BunproData, BunproJlptProgress, SrsBreakdown } from "types/japanese";

const BASE_URL = "https://bunpro.jp/api/frontend";

async function bunproFetch(endpoint: string, token: string) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Token token=${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Bunpro API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function fetchBunproStats(
  token: string
): Promise<BunproData | null> {
  try {
    const [jlptRaw, srsRaw] = await Promise.all([
      bunproFetch("/jlpt_progress_mixed", token),
      bunproFetch("/srs_level_overview", token),
    ]);

    // Parse JLPT progress — shape may vary, adapt defensively
    const jlptProgress: BunproJlptProgress = {
      n5: { learned: 0, total: 0 },
      n4: { learned: 0, total: 0 },
      n3: { learned: 0, total: 0 },
      n2: { learned: 0, total: 0 },
      n1: { learned: 0, total: 0 },
    };

    let totalGrammar = 0;

    if (jlptRaw && typeof jlptRaw === "object") {
      for (const level of ["n5", "n4", "n3", "n2", "n1"] as const) {
        const data = jlptRaw[level] || jlptRaw[level.toUpperCase()];
        if (data) {
          const learned = Number(data.learned ?? data.known ?? 0);
          const total = Number(data.total ?? data.count ?? 0);
          jlptProgress[level] = { learned, total };
          totalGrammar += learned;
        }
      }
    }

    // Parse SRS breakdown
    const srsBreakdown: SrsBreakdown = {
      apprentice: 0,
      guru: 0,
      master: 0,
      enlightened: 0,
      burned: 0,
    };

    if (srsRaw && typeof srsRaw === "object") {
      // The frontend API may return different key formats
      // Try to map them to our standard breakdown
      const raw = srsRaw.data || srsRaw;
      if (Array.isArray(raw)) {
        // If it's an array of stage counts
        for (const item of raw) {
          const stage = Number(item.srs_level ?? item.stage ?? item.level ?? 0);
          const count = Number(item.count ?? item.total ?? 0);
          if (stage >= 1 && stage <= 4) srsBreakdown.apprentice += count;
          else if (stage >= 5 && stage <= 6) srsBreakdown.guru += count;
          else if (stage === 7) srsBreakdown.master += count;
          else if (stage === 8) srsBreakdown.enlightened += count;
          else if (stage >= 9) srsBreakdown.burned += count;
        }
      } else if (typeof raw === "object") {
        // If it's an object with named keys
        srsBreakdown.apprentice =
          Number(raw.apprentice ?? 0) +
          Number(raw.apprentice_1 ?? 0) +
          Number(raw.apprentice_2 ?? 0) +
          Number(raw.apprentice_3 ?? 0) +
          Number(raw.apprentice_4 ?? 0);
        srsBreakdown.guru =
          Number(raw.guru ?? 0) +
          Number(raw.guru_1 ?? 0) +
          Number(raw.guru_2 ?? 0);
        srsBreakdown.master = Number(raw.master ?? 0);
        srsBreakdown.enlightened = Number(raw.enlightened ?? 0);
        srsBreakdown.burned = Number(raw.burned ?? 0);
      }
    }

    return { jlptProgress, srsBreakdown, totalGrammar };
  } catch (error) {
    console.error("Failed to fetch Bunpro stats:", error);
    return null;
  }
}
