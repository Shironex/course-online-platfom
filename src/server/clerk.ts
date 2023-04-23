import { Clerk } from "@clerk/clerk-sdk-node";
import { env } from "~/env.mjs";

export const clerk = Clerk({ secretKey: env.CLERK_SECRET_KEY });

