import type { StudyLogPost } from "types/japanese";

export async function fetchStudyLog(
  topicId: string,
  username: string
): Promise<StudyLogPost[]> {
  const res = await fetch(
    `https://community.bunpro.jp/t/${topicId}.json?print=true`
  );

  if (!res.ok) {
    throw new Error(`Discourse API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  const posts: any[] = json.post_stream?.posts || [];

  return posts
    .filter(
      (post) =>
        post.username === username || post.username?.toLowerCase() === username.toLowerCase()
    )
    .map((post) => ({
      post_number: post.post_number,
      cooked: post.cooked,
      created_at: post.created_at,
    }))
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
}
