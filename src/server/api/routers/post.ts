import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { type Category } from "@prisma/client";
import imagekit from "@/libs/imagekit";
import { TRPCError } from "@trpc/server";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        body: z.string(),
        category: z.string(),
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

      return ctx.db.posts.create({
        data: {
          body: input.body,
          category: input.category as Category,
          image,
          student: { connect: { email: ctx.session.user.email! } },
        },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.posts.findMany({
      orderBy: { createdAt: "desc" },
      include: { student: true },
    });
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.posts.findUnique({
        where: { id: input.id },
        include: { student: true, comments: true },
      });

      if (!post) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      }

      return post;
    }),
  getAllByUser: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.posts.findMany({
      where: { student: { email: ctx.session.user.email! } },
      orderBy: { createdAt: "desc" },
      include: { student: true },
    });
  }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.posts.findUnique({
        where: { id: input.id },
        include: { student: true },
      });

      if (!post) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      }

      if (post.student.email !== ctx.session.user.email) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to delete this post",
        });
      }

      return ctx.db.posts.delete({ where: { id: input.id } });
    }),
});

// getLatest: protectedProcedure.query(({ ctx }) => {
//   return ctx.db.post.findFirst({
//     orderBy: { createdAt: "desc" },
//     where: { createdBy: { id: ctx.session.user.id } },
//   });
// }),

// getSecretMessage: protectedProcedure.query(() => {
//   return "you can now see this secret message!";
// }),
