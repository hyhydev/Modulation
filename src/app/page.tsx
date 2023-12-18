import { api } from "~/trpc/server";

export default async function Home() {
  const episodes = await api.episode.get.query();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {episodes.map((e) => (
        <div key={e.id}>{e.name}</div>
      ))}
    </main>
  );
}
