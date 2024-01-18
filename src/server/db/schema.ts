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
    mixUrl: varchar("mix_url", { length: 256 }),
    releasedAt: date("released_at"),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (episode) => ({
    nameIndex: index("name_idx").on(episode.name),
  }),
);

export const episodesRelations = relations(episodes, ({ many }) => ({
  albums: many(albums),
}));

export const albums = mysqlTable(
  "album",
  {
    id: varchar("id", { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),
    name: varchar("name", { length: 256 }),
    artistId: varchar("artist_id", { length: 128 }),
    genreId: varchar("genre_id", { length: 128 }),
    episodeId: varchar("episode_id", { length: 128 }),
    episodeType: varchar("episode_type", { length: 256 }),
    releasedAt: date("released_at"),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
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
    updatedAt: timestamp("updated_at").onUpdateNow(),
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
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (genre) => ({
    nameIndex: index("name_idx").on(genre.name),
  }),
);
