import React from "react";
import { Separator } from "@/src/components/ui/separator";
import { posts } from "#site/content";
import { getCurrentLocale } from "@/locales/server";
import { PostItem } from "@/components/post.item";
import { sortPosts } from "@/src/components/utils/functions";
import { PageProps } from "@/src/components/utils/types";
import { Spacing } from "@/components/Spacing";
import { Section } from "@/components/Section";
import { CategoriesPosts } from "@/src/features/CategoriesPosts";
import { useCurrentLocale } from "@/locales/client";
import { Post } from "#site/content";
const BlogPage = async({
  searchParams,
}: {
  searchParams?: { category?: string };
}) => {
  // const t = await getI18n();
  const locale = getCurrentLocale();
  let displayPosts:Post[] = []
  if (searchParams && searchParams?.category) {
    displayPosts =  posts.filter(
      (post) =>
        post.published &&
        post.lang === locale &&
        post.categories.includes(searchParams?.category as string)
    )
 
  } else {
    displayPosts = posts.filter((post) => post.published && process.env.NODE_ENV === "development" && post.lang === locale)
  
  }
const sortedPosts = sortPosts(displayPosts)

//     if (searchParams?.category) {
//       const postes =  posts.filter(
//         (post) =>
//           post.published &&
//           post.lang === locale &&
//           post.categories.includes(searchParams?.category as string)
//       )
//       setDisplayPosts(postes);
//     } else {
//       const postes = posts.filter((post) => post.published && post.lang === locale)
//       setDisplayPosts(postes);
//     }
   
//   },[searchParams?.category])
//   const [displayPosts, setDisplayPosts] = React.useState<Post[]>([]);
//   console.log(displayPosts.length)
 
//  React.useEffect(()=>{
//   return () =>{
//     setDisplayPosts([])
//   }
//  },[])
//   // const sortedPosts = sortPosts(displayPosts);

  // const displayPosts = sortedPosts;
  console.log(searchParams?.category);
  console.log(displayPosts.length)

  return (
    <Section>
      <Spacing size="md" />
      <div className="flex flex-col gap-8">
        <CategoriesPosts />
        <div>
          <h1 className="inline-block text-2xl tracking-wider font-mono">
            Posts
          </h1>

          <Separator className="mt-4" />
          {/* {sortedPosts.length === 0 ? (
            <div className="w-full mt-8 flex justify-center items-center">
              Aucun post trouvé
            </div>
          ) : ( */}
            <ul className="flex flex-col gap-8">
              {sortedPosts.map((post) => {
                const { slug, date, title, description, categories } = post;
                return (
                  <li className="" key={slug}>
                    <PostItem
                      categories={categories}
                      slug={slug}
                      date={date}
                      title={title}
                      description={description}
                    />
                  </li>
                );
              })}
            </ul>
            
          {/* )} */}
        </div>
      </div>

      <Spacing size="md" />
    </Section>
  );
};

export default BlogPage;
