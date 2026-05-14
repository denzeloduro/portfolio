"use client";

export default function AmbientBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Top-right warm orange */}
      <div
        className="absolute -top-[200px] -right-[200px] w-[700px] h-[700px] rounded-full animate-blob-1"
        style={{
          background:
            "radial-gradient(circle, rgba(212,135,77,0.12) 0%, rgba(196,97,42,0.06) 50%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      {/* Bottom-left navy/blue */}
      <div
        className="absolute -bottom-[300px] -left-[200px] w-[800px] h-[800px] rounded-full animate-blob-2"
        style={{
          background:
            "radial-gradient(circle, rgba(26,39,64,0.2) 0%, rgba(60,100,180,0.08) 50%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      {/* Center-left burnt orange */}
      <div
        className="absolute top-[40%] -left-[100px] w-[500px] h-[500px] rounded-full animate-blob-3"
        style={{
          background:
            "radial-gradient(circle, rgba(196,97,42,0.1) 0%, rgba(212,135,77,0.04) 50%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
    </div>
  );
}
