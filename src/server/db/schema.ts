import { relations, sql } from "drizzle-orm";
import {
  date,
  index,
  int,
  mysqlTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { createId } from "@paralleldrive/cuid2";

export const mysqlTable = mysqlTableCreator((name) => `modulation_${name}`);

export const episodes = mysqlTable(
  "episode",
  {
    id: varchar("id", { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),
    name: varchar("name", { length: 256 }),
    number: int("number"),
    imageUrl: varchar("image_url", { length: 256 }),
    spotifyUrl: varchar("spotify_url", { length: 256 }),
    mixId: int("mix_id"),
    releasedAt: date("released_at"),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (episode) => ({
    nameIndex: index("name_idx").on(episode.name),
  }),
);

export const episodesRelations = relations(episodes, ({ one, many }) => ({
  mix: one(mixes, {
    fields: [episodes.mixId],
    references: [mixes.id],
  }),
  albums: many(albums),
}));

export const mixes = mysqlTable("mix", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  spotifyUrl: varchar("spotify_url", { length: 256 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const albums = mysqlTable(
  "album",
  {
    id: varchar("id", { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),
    name: varchar("name", { length: 256 }),
    artistId: int("artist_id"),
    genreId: int("genre_id"),
    episodeId: int("episode_id"),
    episodeType: varchar("episode_type", { length: 256 }),
    releasedAt: date("released_at"),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (album) => ({
    nameIndex: index("name_idx").on(album.name),
  }),
);

export const albumsRelations = relations(albums, ({ one }) => ({
  artist: one(artists, {
    fields: [albums.artistId],
    references: [artists.id],
  }),
  genre: one(genres, {
    fields: [albums.genreId],
    references: [genres.id],
  }),
  episode: one(episodes, {
    fields: [albums.episodeId],
    references: [episodes.id],
  }),
}));

export const artists = mysqlTable(
  "artist",
  {
    id: varchar("id", { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (artist) => ({
    nameIndex: index("name_idx").on(artist.name),
  }),
);

export const genres = mysqlTable(
  "genre",
  {
    id: varchar("id", { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (genre) => ({
    nameIndex: index("name_idx").on(genre.name),
  }),
);
