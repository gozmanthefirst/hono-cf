import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z, ZodError } from "zod";
expand(config());
const EnvSchema = z.object({
    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),
    PORT: z.coerce.number().default(8000),
    MY_SECRET: z.string(),
});
let env;
try {
    env = EnvSchema.parse(process.env);
}
catch (e) {
    const error = e;
    console.error("Invalid env:", error.flatten().fieldErrors);
    process.exit(1);
}
export { env };
