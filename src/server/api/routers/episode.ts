import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  hyhyProtectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { episodes } from "~/server/db/schema";

export const episodeRouter = createTRPCRouter({
  get: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.episodes.findMany({
      orderBy: (episodes, { desc }) => [desc(episodes.releasedAt)],
      with: {
        mix: true,
        albums: true,
      },
    });
  }),
  create: hyhyProtectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(episodes).values({
        name: input.name,
      });
    }),
  update: hyhyProtectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(episodes)
        .set({
          name: input.name,
        })
        .where(eq(episodes.id, input.id));
    }),
});
