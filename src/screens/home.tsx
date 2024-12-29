import ServerList from "@/components/serverList";

export default function Home() {
  return (
    <div className="overflow-auto flex flex-col items-center">
      <h1 className="text-center text-3xl">Server List</h1>
      <ServerList />
    </div>
  );
}
