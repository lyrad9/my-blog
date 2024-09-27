import Image from "next/image";
import { Section } from "@/components/Section";
import { Code } from "@/components/Code";
import { Spacing } from "@/components/Spacing";
import { LatestPosts } from "@/components/LatestPosts";
import { Spotlight } from "@/components/ui/spotlight";
import { getI18n } from "@/locales/server";
export default async function Home() {
  const t = await getI18n();
  return (
    <Section className="p-0">
      <Spotlight className="top-5 -left-10 md:left-60 md:-top-20" fill="" />
      <Section className="max-w-2xl">
        <div className="grid gap-2 ">
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

            <span className="text-base text-primary-foreground">😂</span>
          </h2>
        </div>
      </Section>
      <Spacing size="md" />
      <LatestPosts />
    </Section>
  );
}
