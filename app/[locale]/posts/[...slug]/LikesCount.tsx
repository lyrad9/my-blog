"use client";
import { Heart } from "lucide-react";
import { incrementViews } from "./views.action";
import useSWR from "swr";
import { getLikesCount } from "./getLikesCount.action";
import { incrementLikes } from "./Likes.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// Fonction de fetch pour appeler l'API et obtenir les vues
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const LikesCount = ({ slug }: { slug: string }) => {
  // Utilisation de SWR pour faire la requête à l'API route
  // const { data} = useSWR(`/api/views/${slug}`, fetcher);
  //   const viewCount = useSWR(`/viewcount/${slug}`, async () => {
  //          return incrementViews(slug);
  //        });
  const query = useQuery({
    queryFn: async () => await getLikesCount(slug),
    queryKey: ["likes"],
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => await incrementLikes(slug),
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["likes"] });
    },
  });
  if (!query.data?.views) return null;
  // <span className="text-muted-foreground">Chargement...</span>;

  return (
    <span onClick={() => mutation.mutate()} className="text-muted-foreground">
      <span>
        {Intl.NumberFormat("fr-FR", { notation: "compact" }).format(
          query.data?.views
        )}{" "}
      </span>

      <Heart size={16} />
    </span>
  );
};
