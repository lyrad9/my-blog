import {Post} from "#site/content"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// export function formatDate(input:string | number):string {
//   const date = new Date(input)
//   return date.toLocaleDateString("en-fr",{

//   })
// }
export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'fr-FR',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};
export const  sortPosts = (posts:Array<Post>) =>{
  return posts.sort((a,b)=> {
if(a.date > b.date) return  -1
if(a.date < b.date) return 1
return 0
  })
}