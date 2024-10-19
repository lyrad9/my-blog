import React from "react";
import Link from "next/link";
import { Section } from "@/src/components/shared/Section";
import { buttonVariants } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { getI18n } from "@/locales/server";

const notFound = async () => {
  const t = await getI18n();
  return (
    <Section className="flex   justify-center items-center">
      <div className="mx-auto max-w-md text-center">
        {/* <TriangleAlertIcon className="mx-auto h-12 w-12 text-primary" /> */}
        <h1 className="mt-4 text-6xl font-bold tracking-tight text-foreground">
          404
        </h1>
        <p className="text-primary font-semibold underline">Post not found</p>
        <p className="mt-4 text-muted-foreground ">{t("noExistPost")}</p>
        <div className="mt-6">
          <Link
            href="/posts"
            className={cn(
              "bg-primary",
              buttonVariants({
                size: "lg",
              })
            )}
            prefetch={false}
          >
            {t("seePost")}
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default notFound;
