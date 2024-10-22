
import React from "react";
import { Section } from "@/src/components/shared/Section";
import Image from "next/image";
import me from "../../../public/me.jpg";
import { Spacing } from "@/src/components/shared/Spacing";
import { Code } from "@/src/components/shared/Code";
import Link from "next/link";
import { Icons } from "@/src/components/svg/icons";
import { getUrl } from "../posts/[...slug]/getUrl";
import { getI18n } from "@/locales/server";
import type { Metadata } from "next";
// export const dynamic = "force-static";
const url = getUrl();

export async function generateMetadata() {
  return {
    title: "Blog de lyrad | About me",
    description:
    "Hi! I'm Daryl. I have been passionate about web development since I was 17. I like to share my experience as a developer.",
    alternates: {
      languages: {
        fr: `${url}/fr/about`,
        en: `${url}/en/about`,
      },
    },
  };
}

// import { useI18n, useScopedI18n } from "@/locales/client";
const AboutPage = async() => {
  const t = await getI18n();
  return (
    <Section className="">
      <Spacing size="md" />
      <div>
        <h1 className=" font-bold max-sm:text-3xl text-4xl">About</h1>
      </div>
      <Spacing size="sm" />
      <div className="flex max-md:flex-col items-start max-md:gap-4">
        <div className="flex-[3] pr-12">
          <div>{t("greetingAbout")}</div>
          <Spacing size="sm" />

          <div>
            {t("careerDaily", {
              nextjs: (
                <Link href="https://nextjs.org/">
                  <Code className="inline-flex items-center gap-1">
                    <Icons.NextjsIcon size={16} className="inline" />
                    Next js
                  </Code>
                </Link>
              ),
              react: (
                <Link href="https://fr.react.dev/">
                  <Code className="inline-flex items-center gap-1">
                    <Icons.ReactIcon size={16} className="inline" />
                    react js
                  </Code>
                </Link>
              ),
              tailwind: (
                <Link href="#">
                  <Code className="inline-flex items-center gap-1">
                    <Icons.TailwindIcon size={16} className="inline" />
                    tailwindCss
                  </Code>
                </Link>
              ),
              emoji: <span>😂</span>,
            })}
          </div>
        </div>
        <div className="flex-2  max-md:m-auto ml-auto  max-md:w-56">
          <Image
            className="w-52 rounded-full h-52 object-cover object-top"
            alt="profil"
            src={me}
          />
        </div>
      </div>
      <Spacing size="md" />
    </Section>
  );
};
export default AboutPage;
