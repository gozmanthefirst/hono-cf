import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { env } from './config/env.js';
const app = new Hono();
app.get('/', (c) => {
    return c.text(env.MY_SECRET);
});
serve({
    fetch: app.fetch,
    port: env.PORT
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
