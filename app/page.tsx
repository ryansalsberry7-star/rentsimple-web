export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-black dark:to-zinc-900">
      <main className="flex flex-col items-center justify-center gap-8 py-24 px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            RentSimple Verification
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            A secure verification service for rental reports
          </p>
        </div>
      </main>
    </div>
  );
}
