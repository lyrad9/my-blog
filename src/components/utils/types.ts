export type PageProps<T = never> = {
    params:T,
    searchParams:{ [key: string]: string}
  }

  export interface PostItemProps {
    slug: string;
    title: string;
    description?: string;
    date: string;
    categories: string[];
  }