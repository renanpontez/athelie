import { revalidatePath, revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity webhook receiver.
 *
 * Configure in the Sanity dashboard:
 *   URL:     https://<your-domain>/api/revalidate
 *   Trigger: Create, Update, Delete
 *   Filter:  _type in ["page","project","projectCategory","service","founder","pillar","siteSettings","navigation"]
 *   Projection:
 *     {
 *       "_type": _type,
 *       "slug":  slug.current,
 *       "operation": delta::operation()
 *     }
 *   Secret:  paste a long random string here AND into SANITY_REVALIDATE_SECRET on Vercel.
 *
 * We invalidate BOTH tags AND paths. Tag-only is insufficient for SSG pages
 * built before the tag was wired (playbook gotcha #2).
 */
export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type?: string;
      slug?: string;
      operation?: string;
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }
    if (!body?._type) {
      return new Response("Missing body._type", { status: 400 });
    }

    const tags = new Set<string>();
    const paths = new Set<string>();

    tags.add(body._type);
    if (body.slug) tags.add(`${body._type}:${body.slug}`);

    switch (body._type) {
      case "page": {
        const slug = body.slug ?? "";
        paths.add(slug === "home" || slug === "" ? "/" : `/${slug}`);
        break;
      }
      case "project":
        tags.add("projects");
        paths.add("/");
        paths.add("/projetos");
        if (body.slug) paths.add(`/projetos/${body.slug}`);
        break;
      case "projectCategory":
        // Category rename ripples into every project card label + portfolio
        // grouping. Wipe broadly.
        tags.add("projects");
        tags.add("projectCategories");
        paths.add("/");
        paths.add("/projetos");
        break;
      case "service":
        tags.add("services");
        paths.add("/");
        paths.add("/servicos");
        if (body.slug) paths.add(`/servicos/${body.slug}`);
        break;
      case "founder":
        tags.add("founders");
        paths.add("/");
        paths.add("/sobre");
        break;
      case "pillar":
        tags.add("pillars");
        paths.add("/");
        paths.add("/sobre");
        break;
      case "siteSettings":
        // Affects metadata, footer chrome, contact CTA — touches every page.
        tags.add("settings");
        paths.add("/");
        paths.add("/sobre");
        paths.add("/servicos");
        paths.add("/projetos");
        paths.add("/contato");
        break;
      case "navigation":
        tags.add("navigation");
        paths.add("/");
        paths.add("/sobre");
        paths.add("/servicos");
        paths.add("/projetos");
        paths.add("/contato");
        break;
    }

    // Next 16 requires a cacheLife profile; "max" = expire ASAP.
    tags.forEach((t) => revalidateTag(t, "max"));
    paths.forEach((p) => revalidatePath(p));

    return Response.json({
      revalidated: { tags: Array.from(tags), paths: Array.from(paths) },
      now: Date.now(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(`Webhook error: ${message}`, { status: 500 });
  }
}
