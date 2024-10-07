import { Post } from "@/.velite";
export const formatDateToLocal = (
    dateStr: string,
    locale: string = 'fr-FR',
  ) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
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
  export const formateDate = (dateStr:string) =>{
    const date = new Date(dateStr);
  
  const day = date.getDate().toString().padStart(2,'0')
  const month = (date.getMonth() + 1).toString().padStart(2,'0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
  }