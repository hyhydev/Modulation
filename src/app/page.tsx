import { type InferSelectModel } from "drizzle-orm";
import Image from "next/image";
import { type albums } from "~/server/db/schema";
import { api } from "~/trpc/server";

export default async function Home() {
  const episodes = await api.episode.get.query();

  return (
    <div className="flex flex-col">
      {/* <header className="container mx-auto w-full">
        <div className="flex flex-col items-center py-12">
          <a
            className="text-5xl font-bold uppercase text-gray-800 hover:text-gray-700"
            href="#"
          >
            Modulation
          </a>
          <p className="text-lg text-gray-600">Lorem Ipsum Dolor Sit Amet</p>
        </div>
      </header> */}

      <div className="container mx-auto flex flex-wrap py-6">
        <section className="flex items-center px-3">
          {episodes?.[0] && <MainArticle {...episodes[0]} />}
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {episodes &&
            episodes.length > 1 &&
            episodes.slice(1).map((e, idx) => <Article key={idx} {...e} />)}
        </section>
      </div>
    </div>
  );
}

type ArticleProps = {
  name: string | null;
  number: number | null;
  imageUrl: string | null;
  spotifyUrl: string | null;
  // mixUrl: string | null;
  releasedAt: Date | null;
  albums: InferSelectModel<typeof albums>[];
};

const MainArticle = ({
  name,
  number,
  imageUrl,
  releasedAt,
  albums,
}: ArticleProps) => {
  return (
    <article className="my-8 flex flex-col shadow lg:flex-row">
      <a href="#" className="w-full hover:opacity-75 lg:w-1/4">
        <Image
          src={imageUrl ?? ""}
          width={1000}
          height={1000}
          alt={`Episode ${number} cover image`}
          priority
        />
      </a>
      <div className="flex flex-col justify-start bg-white p-6">
        <a
          href="#"
          className="pb-4 text-sm font-bold uppercase text-blue-700 hover:text-blue-500"
        >
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
        <a
          href="#"
          className="pb-4 text-sm font-bold uppercase text-blue-700 hover:text-blue-500"
        >
          Continue Reading <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </article>
  );
};

const Article = ({
  name,
  number,
  imageUrl,
  releasedAt,
  albums,
}: ArticleProps) => {
  return (
    <article className="my-8 flex flex-col shadow">
      <a href="#" className="block w-full hover:opacity-75 lg:hidden">
        <Image
          src={imageUrl ?? ""}
          width={1000}
          height={1000}
          alt={`Episode ${number} cover image`}
        />
      </a>
      <div className="flex flex-col justify-start bg-white p-6">
        <a
          href="#"
          className="pb-4 text-sm font-bold uppercase text-blue-700 hover:text-blue-500"
        >
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
        <a
          href="#"
          className="pb-4 text-sm font-bold uppercase text-blue-700 hover:text-blue-500"
        >
          Continue Reading <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </article>
  );
};
