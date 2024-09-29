"use client"
import React from "react";
import { Section } from "@/components/Section";
import Image from "next/image";
import profil from "../../../public/IMG-20230131-WA0018.jpg"
import { Spacing } from "@/components/Spacing";
import { getI18n } from "@/locales/server";
import { Code } from "@/components/Code";
import Link from "next/link";
import { Icons } from "@/components/icons";
import notFound from "../../../public/404.gif"
export const dynamic = "force-static";

import { useI18n, useScopedI18n } from "@/locales/client";
const AboutPage =  () => {
  

  const t =  useI18n();
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
            className="w-52 rounded-full h-52 object-cover"
            alt="profil"
            src={profil}
            // src={"/public/static/IMG-20230131-WA0018.jpg"}
          />
        </div>
      </div>
      <Spacing size="md" />
    </Section>
  );
};
export default AboutPage;
