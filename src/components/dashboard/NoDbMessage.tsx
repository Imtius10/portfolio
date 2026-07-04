export default function NoDbMessage({ page }: { page: string }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">
        <span className="text-emerald-400">{page}</span>
      </h1>
      <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700/50 max-w-2xl">
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🗄️</div>
          <h2 className="text-xl font-semibold text-white mb-2">Database Not Connected</h2>
          <p className="text-slate-400 mb-4">
            Connect to PostgreSQL to manage {page.toLowerCase()} from the dashboard.
          </p>
          <div className="bg-slate-900/50 rounded-lg p-4 text-left">
            <p className="text-sm text-slate-500 mb-2">Steps:</p>
            <ol className="text-sm text-slate-400 space-y-1 list-decimal list-inside">
              <li>Set up a PostgreSQL database</li>
              <li>Update <code className="text-emerald-400">.env</code> with your DATABASE_URL</li>
              <li>Run <code className="text-emerald-400">npx prisma db push</code></li>
              <li>Run <code className="text-emerald-400">npx prisma db seed</code></li>
              <li>Restart the dev server</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
