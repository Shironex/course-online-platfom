import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
const UserInput = z.object({
  email: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  username: z.string(),
  password: z.string(),
});

export const userRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
      const users = await ctx.clerk.clients.getClientList();
      if (users.length > 0) return users;
      else
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Error no users found:`,
      });
    
    }),
  create: publicProcedure.input(UserInput).mutation(async ({ ctx, input }) => {
    try {
      await ctx.clerk.users
        .createUser({
          emailAddress: [input.email],
          password: input.password,
          username: input.username,
          firstName: input.firstname,
          lastName: input.lastname,
        })
        .then((result) => console.log(result));
      return { user: input.username };
    } catch (Error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Error when creating user:`,
      });
    }
  }),
  // update: protectedProcedure.query(async ({ctx}) => {
  //   const newuser = await ctx.clerk.users.updateUser(ctx.auth.userId, {
  //     profileImageID
  //   })
  // })
});
