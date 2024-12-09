"use client";
import React, { useEffect, useState } from "react";
import { useI18n } from "@/locales/client";

export default function TableOfContents({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useI18n()
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -80% 0px",
      }
    );

    // Observer tous les titres h2 et h3
    document.querySelectorAll("h2[id], h3[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.href.split("#")[1];
    const element = document.getElementById(targetId);
console.log("targetId",targetId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });

      setActiveSection(targetId);
      window.history.pushState({}, "", `#${targetId}`);
    }
  };

  const addClickHandlerAndActiveClass = (
    children: React.ReactNode
  ): React.ReactNode => {
    return React.Children.map(children, (child) => {
     
    
      if (React.isValidElement(child)) {
        console.log(child)
        if (child.type === "a") {
          const href = child.props.href;
          const sectionId = href?.split("#")[1];
          const isActive = sectionId === activeSection
          //console.log("isActive",isActive)
          return React.cloneElement(child as React.ReactElement<any>, {
            
            onClick: handleClick,
            className: `text-base px-0 block py-1 hover:text-primary no-underline transition-colors ${
              isActive ? "active-section-blog underline font-medium" : "section-blog"
            }`,
          });

        }
        if (child.props.children) {
          return React.cloneElement(child, {
            children: addClickHandlerAndActiveClass(child.props.children),
          } as React.HTMLAttributes<HTMLElement>);
        }
      }
      return child;
    });
  };

  return (
    <div className="-z-50 border-l-2 border-muted-foreground hidden xl:block xl:fixed xl:right-[8%] xl:top-36 xl:w-[290px] xl:bottom-[100px] xl:max-h-[calc(100vh-350px)]">
      <div className="pl-8 overflow-y-auto h-full scrollbar-none scrollbar-w-1 scrollbar-track-gray-100">
        <h3 className="underline title-table-content text-lg font-semibold  sticky top-0 bg-background pb-2">
          
          {t("titleOfTableContent")}
        </h3>
        <nav id="nav-content" className="pr-4 space-y-1 list-none [&_ul]:list-none [&_li]:list-none [&_li]:no-underline [&_ul]:list-none:px-0">
          {addClickHandlerAndActiveClass(children)}
        </nav>
      </div>
    </div>
  );
}
