import { Hono } from "hono";
import { parseEnv, type Environment } from "./config/env.js";

type AppBindings = {
  Bindings: Environment;
}

const app = new Hono<AppBindings>({
  strict: false,
})

app.use((c, next) => {
  // The empty object is passed here because env could have a value of `undefined`
  // if the code is not running in a Cloudflare environment.
  c.env = parseEnv(Object.assign(c.env || {}, process.env))
  return next()
})

app.get('/', (c) => {
  return c.text(c.env.MY_SECRET)
})

export default app
