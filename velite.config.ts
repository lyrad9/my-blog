import { defineConfig, s,defineCollection } from 'velite'

const computedDields = <T extends {slug:string}>(data:T) =>({
    ...data,
    slugAsParams:data.slug.split("/").slice(1).join("/")
})
export const posts = defineCollection({
  name: 'Post', // collection type name
  pattern: 'blog/**/*.mdx', // content files glob pattern
  schema: s
    .object({
      title: s.string().max(99), // Zod primitive type
     // slug: s.slug('posts'), // validate format, unique in posts collection
       slug: s.path(), // auto generate slug from file path
      date: s.isodate(), // input Date-like string, output ISO Date string.
      //cover: s.image(), // input image relative path, output image object with blurImage.
     // video: s.file().optional(), // input file relative path, output file public path.
     // metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
    //  excerpt: s.excerpt(), // excerpt of markdown content
    //  content: s.markdown(), // transform markdown to html
    description:s.string().max(99).optional(),
    published:s.boolean().default(true),
    body:s.mdx()
}).transform(computedDields)
})
export default defineConfig  ({
 
  root:"content",
  
  output:{
    data:".velite",
    assets:"public/static",
    base:"/static/",
    name:"[name]-[hash:6].[ext]",
    clean:true,
  },
  collections: {posts},
  mdx:{
    rehypePlugins:[],
    remarkPlugins:[]
  }
})