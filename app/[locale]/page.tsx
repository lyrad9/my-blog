import Image from "next/image";
import { Section } from "@/components/Section";
import { Code } from "@/components/Code";
import { Spacing } from "@/components/Spacing";
import { LatestPosts } from "@/components/LatestPosts";
import { Spotlight } from "@/src/components/ui/spotlight";
import { getI18n } from "@/locales/server";
import Link from "next/link";
import { CategoriesPosts } from "@/src/features/CategoriesPosts";
export default async function Home() {
  const t = await getI18n();
  return (
    <Section className="">
      {/* <Spotlight className="top-5 -left-10 md:left-60 md:-top-20" fill="" /> */}
      <Spacing size="md" />
      <div className="flex justify-center">
        <div className="max-w-2xl grid gap-2 ">
          <h1 className="max-sm:text-start text-center font-bold max-sm:text-3xl text-4xl">
            {" "}
            {t("hello")}
          </h1>
          <h2 className="font-semibold text-muted-foreground dark:text-primary-foreground/70  text-3xl leading-10 max-sm:text-xl ">
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
