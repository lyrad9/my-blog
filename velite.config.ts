import { defineConfig, s, defineCollection } from "velite";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { rehypePlugin } from "./src/components/utils/mdx-plugin";
import { getUrl } from "./app/[locale]/posts/[...slug]/getUrl";
import rehypeShiki from "@shikijs/rehype";

const getVersions = (lang: string, slug: string, translation?: string) => {
  const refineSlug = slug
    .split("/")
    .slice(1)
    .join("/")
    .replace(/^\d+-(en|fr)\./, "");
  const versions: Record<"fr" | "en", string > = {} as Record<"fr" | "en",string>

  if (lang === "fr") {
    versions["fr"] = `${getUrl()}/fr/posts/${refineSlug}`;
    if (translation) versions["en"] = `${getUrl()}/en/posts/${translation}`;
  } else {
    versions["en"] = `${getUrl()}/en/posts/${refineSlug}`;

    if (translation) versions["fr"] = `${getUrl()}/fr/posts/${translation}`;
  }
  return versions;
};

const computedDields = <
  T extends {
    lang: string;
    translation?: string;
    slug: string;
    versions?: {
      fr?: string;
      en?: string;
    };
  },
>(
  data: T
) => ({
  ...data,
  versions: getVersions(data.lang, data.slug, data.translation),
  slug: data.slug
    .split("/")
    .slice(1)
    .join("/")
    .replace(/^\d+-(en|fr)\./, ""),

});
export const posts = defineCollection({
  name: "Post", // collection type name
  pattern: "posts/**/*.mdx", // content files glob pattern
  schema: s
    .object({
      title: s.string().max(99), // Zod primitive type
      slug: s.path(), // auto generate slug from file path
      date: s.isodate(), // input Date-like string, output ISO Date string.

      meta: s.object({
        keywords: s.array(s.string()),
      }),
      categories: s.array(s.string()),
      versions: s
        .object({
          fr: s.string().optional(),
          en: s.string().optional(),
        })
        .optional(),
      description: s.string(),
      published: s.boolean().default(true),
      lang: s.string(),
      translation: s.string().optional(),
      favourite:s.boolean().optional(),    
      body: s.mdx(),
    })
    .transform(computedDields),
});
export default defineConfig({
  root: "content",

  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  markdown: {
    rehypePlugins: [[rehypeShiki as any, { theme: 'nord' }]]
  },
  mdx: {
  
    // rehypePlugin,
    // rehypePlugins:rehypePlugin,
    rehypePlugins: [rehypeSlug, [rehypePrettyCode,
      
  //      { themes:{
  //     light:'github-light',
  //     dark:"github-dark",
  //   }
  // }
]],
    remarkPlugins: [],
  },
});
