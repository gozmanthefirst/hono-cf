import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

expand(config());

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(8000),
  MY_SECRET: z.string(),
});

export type Environment = z.infer<typeof EnvSchema>;

export const parseEnv = (data: any): Environment => {
  const { data: env, error } = EnvSchema.safeParse(data);

  if (error) {
    const rrrMsg = `Invalid env: ${Object.entries(error.flatten().fieldErrors).map(([key, errors]) => `${key}: ${errors.join(", ")}`).join(" | ")}`;
    throw new Error(rrrMsg);
  }

  return env;
}
