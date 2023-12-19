import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const commentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        body: z.string(),
        postId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.comments.create({
        data: {
          body: input.body,
          post: { connect: { id: input.postId } },
          student: { connect: { email: ctx.session.user.email! } },
        },
      });
    }),

  getAll: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.comments.findMany({
        where: {
          post: {
            id: input.postId,
          },
        },
        orderBy: { createdAt: "asc" },
        include: { student: true },
      });
    }),
  getAllByUser: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.comments.findMany({
      where: {
        student: {
          email: ctx.session.user.email!,
        },
      },
      orderBy: { createdAt: "asc" },
      include: { student: true },
    });
  }),
});
