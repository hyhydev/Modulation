import { relations, sql } from "drizzle-orm";
import {
  date,
  index,
  int,
  mysqlTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const mysqlTable = mysqlTableCreator((name) => `modulation_${name}`);

export const posts = mysqlTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const episodes = mysqlTable(
  "episode",
  {
    id: serial("id").primaryKey(),
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

export const episodesRelations = relations(episodes, ({ one }) => ({
  mix: one(mixes, {
    fields: [episodes.mixId],
    references: [mixes.id],
  }),
}));

export const mixes = mysqlTable("mix", {
  id: serial("id").primaryKey(),
  spotifyUrl: varchar("spotify_url", { length: 256 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const albums = mysqlTable(
  "album",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    artistId: int("artist_id"),
    genreId: int("artist_id"),
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
}));

export const artists = mysqlTable(
  "artist",
  {
    id: serial("id").primaryKey(),
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
    id: serial("id").primaryKey(),
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

export const relAlbumsEpisodes = mysqlTable("rel_albums_episodes", {
  id: serial("id").primaryKey(),
  albumId: int("album_id"),
  episodeId: int("episode_id"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const relAlbumsEpisodesRelations = relations(
  relAlbumsEpisodes,
  ({ one }) => ({
    artist: one(albums, {
      fields: [relAlbumsEpisodes.albumId],
      references: [albums.id],
    }),
    genre: one(episodes, {
      fields: [relAlbumsEpisodes.episodeId],
      references: [episodes.id],
    }),
  }),
);
