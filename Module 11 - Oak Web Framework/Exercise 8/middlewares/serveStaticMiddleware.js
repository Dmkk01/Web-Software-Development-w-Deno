// add and export a function called `serveStatic`
import { send } from "https://deno.land/x/oak@v7.7.0/mod.ts";

const serveStaticFiles = async (context, next) => {
    if (context.request.url.pathname.startsWith("/static")) {
      const path = context.request.url.pathname.substring(7);

      await send(context, path, {
        root: `${Deno.cwd()}/static`,
      });
    } else {
      await next();
    }
  };

  export {serveStaticFiles};