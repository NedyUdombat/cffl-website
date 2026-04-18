import { T } from "./tokens";

export function RosterSkeleton() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 14,
      }}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            border: `1px solid ${T.line}`,
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              aspectRatio: "1 / 1.05",
              background: "linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.4s infinite",
            }}
          />
          <div style={{ padding: 14 }}>
            <div
              style={{
                height: 20,
                background: "#f0f0f0",
                borderRadius: 4,
                marginBottom: 8,
                width: "70%",
              }}
            />
            <div style={{ height: 20, background: "#f0f0f0", borderRadius: 4, width: "40%" }} />
          </div>
        </div>
      ))}
      <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
    </div>
  );
}
