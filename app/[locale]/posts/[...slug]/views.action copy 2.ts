"use server";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";
import { redis } from "@/src/lib/redis";
import { cookies } from "next/headers";
import { headers } from "next/headers";
// Fonction pour hasher l'adresse IP avec bcrypt
const hashIP = async (ipAddress: string) => {
  const saltRounds = 10; // Nombre de tours pour le salt
  return await bcrypt.hash(ipAddress, saltRounds);
};

// Récupérer l'adresse IP de la requête
const getClientIP = (req: NextRequest) => {
  // On récupère l'adresse IP à partir de l'en-tête 'x-forwarded-for' ou 'x-real-ip' (pour certains reverse proxies)
  const forwarded = req.headers.get("x-forwarded-for");
  const realIP = req.headers.get("x-real-ip");

  // Utiliser 'x-forwarded-for' si disponible, sinon 'x-real-ip', sinon undefined
  const ip = forwarded ? forwarded.split(",")[0] : realIP;

  return ip || ""; // Retourne une chaîne vide si aucune IP n'est trouvée
};

export const incrementViews = async (
  slug: string
  // req: NextRequest
): Promise<{ views: number }> => {
  const headersList = headers();
  const ip = headersList.get("request-ip");
  const KEY = `postview:${slug}`;
  
  console.log(ip);
  // if(ip){
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(ip ?? undefined)
  );
  const hash = Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")

  //deduplicate the ip for each slug
  const isNew = await redis.set(["KEY", hash, slug].join(":"), true, {
    nx: true,
    ex: 24 * 60 * 60,
  });
  if (isNew) {
    const newViewCount= await redis.incr(KEY);
    return { views: Number(newViewCount) }
  } else {
   return {
      views: Number(await redis.get(KEY)),
    }
  }
  
  // }
};
