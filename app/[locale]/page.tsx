import Image from "next/image";
import { Section } from "@/src/components/shared/Section";
import { Code } from "@/src/components/shared/Code";
import { Spacing } from "@/src/components/shared/Spacing";
import { LatestPosts } from "./fonts/_components/posts.latest";
import { Spotlight } from "@/src/components/ui/spotlight";
import { getI18n } from "@/locales/server";
import Link from "next/link";
import { CategoriesPosts } from "@/app/[locale]/fonts/_components/posts.categories";
export default async function Home() {
  const t = await getI18n();
  return (
    <Section className="">
      {/* <Spotlight className="top-5 -left-10 md:left-60 md:-top-20" fill="" /> */}
      <Spacing size="md" />
      <div className="flex justify-center">
        <div className="max-w-2xl grid gap-2 ">
          <h2 className="font-semibold text-muted-foreground dark:text-primary-foreground/70  text-3xl leading-10 max-sm:text-2xl ">
            {t("welcomeInMyBlog", {
              career: (
                <Code className="font-sans text-primary dark:text-primary-foreground">
                  {t("career")}
                </Code>
              ),
            })}
          </h2>
          <div className="flex gap-2 underline text-sm">
            <Link href="/posts">{t("seeMyPosts")}</Link>
            <Link href="#">Github</Link>
          </div>
        </div>
      </div>
      <Spacing size="lg" />
      <div className="flex max-md:flex-col gap-8 ">
        <LatestPosts className="flex-[3]" />
        <CategoriesPosts className="flex-1" />
      </div>

      <Spacing size="md" />
    </Section>
  );
}
