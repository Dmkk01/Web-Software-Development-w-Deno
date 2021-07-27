// add and export a function called `log`

const log = async (context, next) => {
    console.log("Hello!");
    await next();
  };


export { log };