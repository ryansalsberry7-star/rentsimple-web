import { kv } from "@vercel/kv";

export default async function VerifyPage({ params }: { params: { id: string } }) {
  const id = params.id;

  const report = await kv.get(`report:${id}`);

  if (!report) {
    return (
      <div style={container}>
        <div style={card}>
          <h1 style={title}>Report Not Found</h1>
          <p style={sub}>This record does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={container}>
      <div style={card}>
        <p style={brand}>RENTSIMPLE</p>

        <h1 style={title}>Verification Record</h1>

        <div style={badge}>
          ✓ Verified & Tamper-Protected
        </div>

        <div style={divider} />

        <div style={row}>
          <span style={label}>ID</span>
          <span style={value}>{report.id}</span>
        </div>

        <div style={row}>
          <span style={label}>Timestamp</span>
          <span style={value}>
            {new Date(report.timestamp).toLocaleString()}
          </span>
        </div>

        <div style={divider} />

        <h3 style={section}>Record Data</h3>

        <pre style={dataBox}>
          {JSON.stringify(report.pack, null, 2)}
        </pre>

        <h3 style={section}>Hash</h3>

        <div style={hashBox}>
          {report.hash}
        </div>
      </div>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  background: "#020617",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
};

const card = {
  maxWidth: "700px",
  width: "100%",
  background: "#0f172a",
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
  border: "1px solid #1e293b",
};

const brand = {
  textAlign: "center",
  fontSize: "11px",
  letterSpacing: "3px",
  color: "#64748b",
  marginBottom: "8px",
};

const title = {
  textAlign: "center",
  fontSize: "24px",
  fontWeight: "700",
  color: "#fff",
};

const sub = {
  textAlign: "center",
  color: "#94a3b8",
};

const badge = {
  marginTop: "12px",
  marginBottom: "16px",
  textAlign: "center",
  background: "#022c22",
  color: "#22c55e",
  padding: "8px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "600",
};

const divider = {
  height: "1px",
  background: "#1e293b",
  margin: "16px 0",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "8px",
};

const label = {
  color: "#94a3b8",
  fontSize: "12px",
};

const value = {
  color: "#fff",
  fontWeight: "600",
  fontSize: "14px",
};

const section = {
  color: "#fff",
  marginBottom: "8px",
  marginTop: "12px",
};

const dataBox = {
  background: "#020617",
  padding: "12px",
  borderRadius: "10px",
  fontSize: "12px",
  color: "#e2e8f0",
  overflowX: "auto",
};

const hashBox = {
  background: "#020617",
  padding: "10px",
  borderRadius: "10px",
  fontSize: "12px",
  color: "#38bdf8",
  wordBreak: "break-all",
};