"use server";

import { createClient } from "@/utils/supabase/server";
import { Beat } from "@/app/types/beat";

export async function getBeats(): Promise<Beat[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("beats").select("*");

  if (error) {
    throw new Error(`Failed to fetch beats: ${error.message}`);
  }

  return formUrls(data);
}

function formUrls(beats: Beat[]): Beat[] {
  return beats.map((beat) => {
    return {
      ...beat,
      id: beat.id.toString(),
      picture_url: `https://${process.env.BLOB_STORAGE}.public.blob.vercel-storage.com/img/${beat.picture_url}`,
      mp3_url: `https://${process.env.BLOB_STORAGE}.public.blob.vercel-storage.com/beat/${beat.mp3_url}`,
    };
  });
}