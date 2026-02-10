import { revalidateTag } from "next/cache";

/**
 * Revalidates an array of cache tags.
 */
export function revalidateTags(tags: string[]) {
  for (const tag of tags) {
    revalidateTag(tag, "max");
  }
}
