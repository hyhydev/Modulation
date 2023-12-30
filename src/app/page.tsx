/* eslint-disable @next/next/no-img-element */
import { type InferSelectModel } from "drizzle-orm";
import { type mixes, type albums } from "~/server/db/schema";
import { api } from "~/trpc/server";

export default async function Home() {
  const episodes = await api.episode.get.query();

  return (
    <div className="flex flex-col">
      <header className="container mx-auto w-full">
        <div className="flex flex-col items-center py-12">
          <a
            className="text-5xl font-bold uppercase text-gray-800 hover:text-gray-700"
            href="#"
          >
            Modulation
          </a>
          <p className="text-lg text-gray-600">Lorem Ipsum Dolor Sit Amet</p>
        </div>
      </header>

      <div className="container mx-auto flex flex-wrap py-6">
        <section className="flex flex-col items-center px-3">
          <section className="flex items-center px-3">
            {episodes[0] && <Article full={true} {...episodes[0]} />}
          </section>
          <section className="grid grid-cols-3 gap-8">
            <div className="overflow-x-hidden px-8 pb-4">
              {episodes.length > 1 &&
                episodes
                  .slice(1)
                  .map((e, idx) => <Article key={idx} full={false} {...e} />)}
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}

type ArticleProps = {
  full: boolean;
  name: string | null;
  number: number | null;
  imageUrl: string | null;
  spotifyUrl: string | null;
  releasedAt: Date | null;
  albums: InferSelectModel<typeof albums>[];
  mix: InferSelectModel<typeof mixes> | null;
};

const Article = ({
  full,
  name,
  number,
  imageUrl,
  releasedAt,
  albums,
}: ArticleProps) => {
  return (
    <article className="my-8 flex flex-row shadow">
      <a href="#" className={`${full ? "w-1/2" : ""} hover:opacity-75`}>
        <img src={imageUrl ?? ""} />
      </a>
      <div className="flex flex-col justify-start bg-white p-6">
        <a href="#" className="pb-4 text-sm font-bold uppercase text-blue-700">
          Podcast
        </a>
        <a href="#" className="pb-4 text-3xl font-bold hover:text-gray-700">
          {`Episode ${number} - ${name}`}
        </a>
        <a href="#" className="pb-3 text-sm">
          {`Published on ${releasedAt?.toLocaleDateString()}`}
        </a>
        <ul className="pb-6">
          {albums.map((a, idx) => (
            <li key={idx}>{a.name}</li>
          ))}
        </ul>
        <a href="#" className="pb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis
          porta dui. Ut eu iaculis massa. Sed ornare ligula lacus, quis iaculis
          dui porta volutpat. In sit amet posuere magna..
        </a>
        <a href="#" className="uppercase text-gray-800 hover:text-black">
          Continue Reading <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </article>
  );
};
