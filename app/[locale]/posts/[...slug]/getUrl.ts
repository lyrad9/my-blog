export const getUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://darylblog.vercel.app";
  }

  return "http://localhost:3000";
};
