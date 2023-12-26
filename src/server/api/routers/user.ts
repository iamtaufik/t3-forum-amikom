import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import bcrypt from "bcrypt";
import imagekit from "@/libs/imagekit";
import { TRPCError } from "@trpc/server";

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
        imageBase64: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let image = null;

      if (input.imageBase64) {
        const { url } = await imagekit.upload({
          file: input.imageBase64,
          fileName: Date.now().toString(),
          folder: "/forum-amikom/posts",
        });
        image = url;
      }

      const isExistUser = await ctx.db.user.findUnique({
        where: { id: Number(ctx.session.user.id) },
      });

      if (!isExistUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const profile = await ctx.db.profiles.upsert({
        where: { student_id: isExistUser.id },
        create: {
          student_id: isExistUser.id,
          nim: input.nim,
        },
        update: {
          nim: input.nim,
        },
      });

      const user = await ctx.db.user.update({
        where: { id: isExistUser.id },
        data: {
          name: input.name,
          image: image ?? isExistUser.image,
          profile: {
            connect: {
              id: profile.id,
            },
          },
        },
      });

      return user;
    }),
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.id },
        include: {
          profile: true,
          posts: true,
          comments: true,
        },
      });

      return user;
    }),
});
