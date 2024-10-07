"use server";
import bcrypt from 'bcrypt';
import { NextRequest } from "next/server";
import { redis } from "@/src/lib/redis";
import { cookies } from "next/headers";
import { headers } from 'next/headers';
// Fonction pour hasher l'adresse IP avec bcrypt
const hashIP = async (ipAddress: string) => {
  const saltRounds = 10; // Nombre de tours pour le salt
  return await bcrypt.hash(ipAddress, saltRounds);
};

// Récupérer l'adresse IP de la requête
const getClientIP = (req: NextRequest) => {
  // On récupère l'adresse IP à partir de l'en-tête 'x-forwarded-for' ou 'x-real-ip' (pour certains reverse proxies)
  const forwarded = req.headers.get('x-forwarded-for') ;
  const realIP = req.headers.get('x-real-ip');

  // Utiliser 'x-forwarded-for' si disponible, sinon 'x-real-ip', sinon undefined
  const ip = forwarded ? forwarded.split(',')[0] : realIP  ;

  return ip || '';  // Retourne une chaîne vide si aucune IP n'est trouvée
};


export const incrementViews = async (
  slug: string,
  // req: NextRequest
): Promise<{ views: number }> => {
const headersList = headers()
const ip = headersList.get("request-ip")
const KEY = `postview:${slug}`;
console.log(ip)
 // if(ip){
    const buf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(ip ?? undefined)
    );
    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
 
    // deduplicate the ip for each slug
    const isNew = await redis.set(["deduplicate", hash, slug].join(":"), true, {
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
  
}
//  // Obtenir et hasher l'adresse IP de l'utilisateur
//  const clientIP = getClientIP(req);
//  if (!clientIP) {
//    throw new Error('Unable to retrieve client IP');
//  }

//   // Vérifier si l'IP a déjà été utilisée pour ce post
//   const IP_KEY = `postview:${slug}:${clientIP}`;
//   const ipAlreadyViewed = await redis.get(IP_KEY);

//   if ( ipAlreadyViewed) {
//     // Si le cookie existe ou l'IP a déjà été utilisée, retourner le nombre de vues actuel
//     return {
//       views: Number(await redis.get(KEY)),
//     };
//   }

//   const newViewCount = await redis.incr(KEY);
//   cookieList.set(`postview:${slug}`, new Date().toISOString(), {
//     path: "/",
//     maxAge: 60 * 60 * 12,
//     httpOnly: true,
//   });

//   // Définir une entrée Redis pour limiter les vues par IP pendant 12 heures
//   await redis.set(IP_KEY, true,{
//     ex:60 * 60 * 12
//   } ); // Expiration dans 12 heures

//   return { views: Number(newViewCount) };
;
