import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "linear-gradient(140deg, #111418, #212733)",
        color: "white",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%"
      }}
    >
      <div
        style={{
          border: "2px solid rgba(244,167,185,0.5)",
          borderRadius: 28,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          padding: "56px 64px"
        }}
      >
        <p
          style={{
            color: "#f4a7b9",
            fontSize: 26,
            letterSpacing: 4,
            margin: 0,
            textTransform: "uppercase"
          }}
        >
          Lyfie
        </p>
        <p
          style={{
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.05,
            margin: 0,
            maxWidth: 860
          }}
        >
          Open-source software that outpaces the horizon.
        </p>
        <p
          style={{
            color: "#a8d18d",
            fontSize: 30,
            margin: 0
          }}
        >
          Docker-first. Self-hosted. Fully free.
        </p>
      </div>
    </div>,
    {
      ...size
    }
  );
}
