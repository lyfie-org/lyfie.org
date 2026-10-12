import type { APIRoute } from "astro";
import { llmsFull } from "../lib/llms";

// The whole site as one plain-text file, for assistants that read in one pass.
export const GET: APIRoute = async () =>
  new Response(await llmsFull(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
