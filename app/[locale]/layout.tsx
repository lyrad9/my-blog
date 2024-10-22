import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "../../styles/mdx.css";
import { Anek_Telugu } from "next/font/google";
import { cn } from "@/src/lib/utils";
import { ThemeProvider } from "@/Theme/ThemeProvider";
import { SiteHeader } from "@/src/components/shared/SiteHeader";
import { Providers } from "../../src/providers/providers";
import { Footer } from "@/src/components/shared/Footer";
import ReactQueryProvider from "@/src/providers/ReactQueryProvider";
import { getUrl } from "./posts/[...slug]/getUrl";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const AnekTelugu = Anek_Telugu({
  subsets: ["latin"],
  variable: "--font-caption",
});
const url = getUrl()
export const metadata: Metadata = {
  title: "Blog de lyrad | posts",
  description:
    "Hi! I'm Daryl. I have been passionate about web development since I was 17. I like to share my experience as a developer.",
    alternates:{
      languages:{
        fr: `${url}/fr`,
        en: `${url}/en`
      }
    }
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>) {
  return (
    <html lang="en" className="w-full min-h-screen scroll-pt-[3.5rem]">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          AnekTelugu.variable,
          "w-full flex-col min-h-screen bg-background font-sans text-foreground"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          // enableSystem
          disableTransitionOnChange
        >
          <Providers locale={params.locale}>
            <ReactQueryProvider>
              {/* <div className="flex min-h-screen bg-background flex-col"> */}
              <SiteHeader />

              <main className="flex flex-1">{children}</main>

              <Footer />
              {/* </div> */}
            </ReactQueryProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
