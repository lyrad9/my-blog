"use client";

import useSWR from "swr";

// Fonction de fetch pour appeler l'API et obtenir les vues
const fetcher = (url: string) => fetch(url).then(res => res.json());

export const ViewCount = ({ slug }: { slug: string }) => {
  // Utilisation de SWR pour faire la requête à l'API route
  const { data, error } = useSWR(`/api/views/${slug}`, fetcher);

  if (error) return <span className="text-muted-foreground">Erreur</span>;
  if (!data) return <span className="text-muted-foreground">Chargement...</span>;

  return (
    <span className="text-muted-foreground">{data.views} vues</span>
  );
};



// "use client";

// import useSWR from "swr";
// import { incrementViews } from "./views.action";

// export const ViewCount = ({ slug }: { slug: string }) => {
//   const viewCount = useSWR(`/viewcount/${slug}`, async () => {
//     return incrementViews(slug);
//   });

//   if (!viewCount.data) {
//     return null;
//   }

//   return (
   
//       <span className="text-muted-foreground">{viewCount.data.views} vues</span>
  
//   );
// };