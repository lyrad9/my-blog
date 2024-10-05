export type PageProps<T = never> = {
    params:T,
    searchParams:{ [key: string]: string}
  }