"use client";
import { Heart } from "lucide-react";
import { getLikesCount } from "../_actions/getLikesCount.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const LikesCount = ({ slug }: { slug: string }) => {
  const query = useQuery({
    queryFn: async () => await getLikesCount(slug),
    queryKey: ["likes"],
  });

  //   if (!query.data?.likes) return null;
  // <span className="text-muted-foreground">Chargement...</span>;

  return (
    <span className="flex gap-2 items-center text-muted-foreground">
      <span>
        {Intl.NumberFormat("fr-FR", { notation: "compact" }).format(
          query.data?.likes ?? 0
        )}{" "}
      </span>

      <Heart size={16} />
    </span>
  );
};
