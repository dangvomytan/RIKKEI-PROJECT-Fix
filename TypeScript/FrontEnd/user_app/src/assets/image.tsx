export const image = {
     get NotFound()
     {
          return new URL("./images/eror404.jpg",import.meta.url).href;
     },
     get BackgroundAuth()
     {
          return new URL("./images/mavic3seri.png",import.meta.url).href;
     }
}