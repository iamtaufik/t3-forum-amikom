import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import bcrypt from "bcrypt";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.create({
        data: {
          ...input,
          password: await bcrypt.hash(input.password, 10),
        },
      });

      return user;
    }),
  update: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        nim: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const profile = await ctx.db.profiles.upsert({
        where: { student_id: Number(ctx.session.user.id) },
        create: {
          student_id: Number(ctx.session.user.id),
          nim: input.nim,
        },
        update: {
          nim: input.nim,
        },
      });

      const user = await ctx.db.user.update({
        where: { id: Number(ctx.session.user.id) },
        data: {
          name: input.name,
          profile: {
            connect: {
              id: profile.id,
            },
          },
        },
      });

      return user;
    }),
});
