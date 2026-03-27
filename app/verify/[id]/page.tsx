import { kv } from "@vercel/kv";

export const dynamic = "force-dynamic";

type ReportRecord = {
  id: string;
  pack: any;
  timestamp: number;
  hash: string;
  verified?: boolean;
};

export default async function VerifyPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const data = await kv.get(`report:${id}`);

  if (!data || typeof data !== "object") {
    return (
      <div style={container}>
        <div style={card}>
          <div style={pill}>RentSimple Verification</div>
          <h1 style={title}>Report Not Found</h1>
          <p style={subtext}>
            This verification record does not exist or is no longer available.
          </p>
        </div>
      </div>
    );
  }

  const report = data as ReportRecord;

  return (
    <div style={container}>
      <div style={card}>
        <div style={pill}>RentSimple Verification</div>
        <h1 style={title}>Inspection Report</h1>
        <p style={subtext}>
          This page confirms the linked report metadata and verification hash.
        </p>

        <div style={statusRow}>
          <div style={statusCard}>
            <div style={miniLabel}>Report ID</div>
            <div style={miniValue}>{report.id}</div>
          </div>

          <div style={statusCard}>
            <div style={miniLabel}>Status</div>
            <div style={verifiedBadge}>
              {report.verified ? "Verified" : "Recorded"}
            </div>
          </div>

          <div style={statusCard}>
            <div style={miniLabel}>Timestamp</div>
            <div style={miniValue}>
              {new Date(report.timestamp).toLocaleString()}
            </div>
          </div>
        </div>

        <div style={sectionTitle}>Report Data</div>
        <pre style={dataBox}>{JSON.stringify(report.pack, null, 2)}</pre>

        <div style={sectionTitle}>Hash</div>
        <pre style={hashBox}>{report.hash}</pre>
      </div>
    </div>
  );
}

const container: React.CSSProperties = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top, #0f172a 0%, #020617 45%, #000000 100%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: "40px 20px",
  fontFamily:
    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  color: "#f8fafc",
};

const card: React.CSSProperties = {
  width: "100%",
  maxWidth: "980px",
  margin: "0 auto",
  background: "rgba(15, 23, 42, 0.88)",
  border: "1px solid rgba(148, 163, 184, 0.18)",
  borderRadius: "24px",
  padding: "28px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
  backdropFilter: "blur(12px)",
};

const pill: React.CSSProperties = {
  display: "inline-block",
  padding: "8px 14px",
  borderRadius: "999px",
  background: "rgba(59,130,246,0.14)",
  border: "1px solid rgba(96,165,250,0.22)",
  color: "#bfdbfe",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const title: React.CSSProperties = {
  margin: "18px 0 8px 0",
  fontSize: "38px",
  lineHeight: 1.05,
  letterSpacing: "-0.03em",
  color: "#ffffff",
};

const subtext: React.CSSProperties = {
  margin: "0 0 24px 0",
  color: "#cbd5e1",
  fontSize: "15px",
  lineHeight: 1.6,
};

const statusRow: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "14px",
  marginBottom: "24px",
};

const statusCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(148, 163, 184, 0.14)",
  borderRadius: "18px",
  padding: "16px",
};

const miniLabel: React.CSSProperties = {
  fontSize: "11px",
  color: "#94a3b8",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  marginBottom: "8px",
  fontWeight: 700,
};

const miniValue: React.CSSProperties = {
  fontSize: "14px",
  color: "#f8fafc",
  fontWeight: 700,
  lineHeight: 1.5,
  wordBreak: "break-word",
};

const verifiedBadge: React.CSSProperties = {
  display: "inline-block",
  padding: "8px 12px",
  borderRadius: "999px",
  background: "rgba(34,197,94,0.14)",
  border: "1px solid rgba(74,222,128,0.3)",
  color: "#86efac",
  fontWeight: 700,
  fontSize: "13px",
};

const sectionTitle: React.CSSProperties = {
  fontSize: "13px",
  color: "#93c5fd",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  fontWeight: 800,
  marginBottom: "12px",
  marginTop: "18px",
};

const dataBox: React.CSSProperties = {
  margin: 0,
  background: "#f8fafc",
  color: "#111827",
  padding: "18px",
  borderRadius: "18px",
  border: "1px solid #cbd5e1",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  overflowX: "auto",
  fontSize: "13px",
  lineHeight: 1.6,
};

const hashBox: React.CSSProperties = {
  margin: 0,
  background: "#f8fafc",
  color: "#111827",
  padding: "18px",
  borderRadius: "18px",
  border: "1px solid #cbd5e1",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  overflowX: "auto",
  fontSize: "13px",
  lineHeight: 1.6,
};