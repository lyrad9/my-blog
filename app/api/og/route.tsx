import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { posts } from "#site/content";
export const runtime = "edge";
import { getUrl } from "@/app/[locale]/posts/[...slug]/getUrl";
// const interBold = fetch(
//   new URL("../../../assets/fonts/Inter-Bold.ttf", import.meta.url)
// ).then((res) => res.arrayBuffer());

export async function GET(req: NextRequest) {
  try {
    // const fontBold = await
    const url = getUrl();

    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");

    if (!title) {
      return new Response("No title provided", { status: 500 });
    }
    const post = posts.find((post) => post.title === title);
    console.log(post);
    const heading =
      title.length > 140 ? `${title.substring(0, 140)}...` : title;

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",

            position: "relative",
            gap: 16,

            color: "white",
            backgroundColor: "#090910",
            opacity: "1",
          }}
        >
          <img
            src={`${url}/og.png`}
            alt="bg"
            tw="absolute flex top-0 left-0 right-0 bottom-0"
          />
          <div tw="flex flex-col justify-center items-center h-full flex-1 px-8 py-16">
            <div
              style={{
                gap: 16,
                // marginTop: "auto",
              }}
              tw="flex flex-col "
            >
              <div
                style={{
                  display: "flex",

                  alignItems: "center",
                  gap: 8,

                  // marginTop: "auto",
                }}
              >
    <div className="size-10 overflow-hidden rouded-full aspect-square">

    </div>
                <img
                  width={100}
                //   height={100}
                  src={`${url}/profil.png`}
                  alt="bg"
                  tw="rounded-full aspect-square object-contain"
                />
                <div
                  style={{
                    gap: 1,
                    display: "flex",
                    flexDirection: "column",
                    fontWeight: "bold",
                  }}
                >
                  <p
                    style={{
                    //   fontFamily: "Space Grotesk",

                      fontWeight: "bolder",
                    }}
                    tw="text-2xl m-0 font-bold"
                  >
                    Author:{" "}<span>{" "}Daryl</span>
                  </p>

                  <p tw="text-2xl font-bold">
                    {new Date(post!.date as string).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p
                style={{
                  fontWeight: 900,
                }}
                tw="font-bold text-6xl m-0 mt-0"
              >
                {post!.title as string}
              </p>
            </div>
          </div>
        </div>
      
      ),
      {
        width: 1200,
        height: 630,
        // fonts: [
        //   {
        //     name: "Inter",
        //     data: fontBold,
        //     style: "normal",
        //     weight: 700,
        //   },
        // ],
      }
    );
  } catch (error) {
    return new Response("Failed to generate image", { status: 500 });
  }
}
