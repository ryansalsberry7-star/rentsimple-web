import { kv } from "@vercel/kv";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function VerifyPage({ params }: PageProps) {
  const { id } = await params;

  const data = await kv.get(`report:${id}`);

  if (!data || typeof data !== "object") {
    return (
      <div style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
        <h1>Verification Page</h1>
        <p>Report not found.</p>
      </div>
    );
  }

  const report = data as {
    id: string;
    pack: any;
    timestamp: number;
    hash: string;
    verified?: boolean;
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1>Verification Page</h1>

      <div style={{ marginTop: 20 }}>
        <p><strong>ID:</strong> {report.id}</p>
        <p><strong>Verified:</strong> {report.verified ? "Yes" : "No"}</p>
        <p><strong>Timestamp:</strong> {new Date(report.timestamp).toLocaleString()}</p>

        <div style={{ marginTop: 20 }}>
          <strong>Data:</strong>
          <pre
            style={{
              background: "#f4f4f4",
              padding: 12,
              borderRadius: 8,
              overflowX: "auto",
            }}
          >
            {JSON.stringify(report.pack, null, 2)}
          </pre>
        </div>

        <div style={{ marginTop: 20 }}>
          <strong>Hash:</strong>
          <pre
            style={{
              background: "#f4f4f4",
              padding: 12,
              borderRadius: 8,
              overflowX: "auto",
            }}
          >
            {report.hash}
          </pre>
        </div>
      </div>
    </div>
  );
}