import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 600
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "linear-gradient(145deg, #0f1117, #202634)",
        color: "white",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          padding: "40px 60px"
        }}
      >
        <p
          style={{
            color: "#f4a7b9",
            fontSize: 22,
            margin: 0,
            textTransform: "uppercase"
          }}
        >
          Lyfie
        </p>
        <p
          style={{
            fontSize: 62,
            fontWeight: 700,
            lineHeight: 1.08,
            margin: 0,
            maxWidth: 860
          }}
        >
          Build and self-host software without paywalls.
        </p>
      </div>
    </div>,
    {
      ...size
    }
  );
}
