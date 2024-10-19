"use client";
import { Heart } from "lucide-react";
import { getLikesCount } from "../_actions/getLikesCount.action";
import { incrementLikes } from "../_actions/Likes.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/src/components/ui/button";
export const IncrementLikesCountBtn = ({ slug }: { slug: string }) => {
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
  // if (!query.data?.likes) return null;
  // // <span className="text-muted-foreground">Chargement...</span>;

  return (
    <Button
      variant={"outline"}
      onClick={() => mutation.mutate()}
      className="px-8 flex gap-2 items-center text-muted-foreground"
    >
      <span>
        {Intl.NumberFormat("fr-FR", { notation: "compact" }).format(
          query.data?.likes ?? 0
        )}{" "}
      </span>

      <Heart size={16} />
    </Button>
  );
};
