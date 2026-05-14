"use client";

interface IPhoneFrameProps {
  children: React.ReactNode;
  scale?: number;
}

export default function IPhoneFrame({ children, scale = 1 }: IPhoneFrameProps) {
  const frameWidth = 375;
  const frameHeight = 812;

  return (
    <div
      className="relative select-none"
      style={{
        width: frameWidth * scale,
        height: frameHeight * scale,
      }}
    >
      {/* Outer device shell */}
      <div
        className="absolute inset-0 rounded-[54px] bg-[#1A1A1A]"
        style={{
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.04)",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: frameWidth,
          height: frameHeight,
        }}
      >
        {/* Screen bezel inset */}
        <div className="absolute inset-[4px] rounded-[50px] overflow-hidden bg-white">
          {/* Status bar */}
          <div className="relative z-20 flex items-center justify-between px-[28px] pt-[14px] pb-[6px] bg-white">
            <span className="text-[14px] font-semibold text-black leading-none">9:41</span>
            <div className="flex items-center gap-[5px]">
              {/* Signal bars */}
              <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                <rect x="0" y="7" width="3" height="5" rx="0.5" fill="black" />
                <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.5" fill="black" />
                <rect x="9" y="2" width="3" height="10" rx="0.5" fill="black" />
                <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="black" />
              </svg>
              {/* WiFi */}
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path d="M8 11.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" fill="black" />
                <path d="M4.93 8.07a4.37 4.37 0 016.14 0" stroke="black" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M2.4 5.54a7.87 7.87 0 0111.2 0" stroke="black" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              {/* Battery */}
              <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
                <rect x="0.5" y="0.5" width="22" height="12" rx="2" stroke="black" strokeOpacity="0.35" />
                <rect x="2" y="2" width="19" height="8" rx="1" fill="black" />
                <path d="M24 4.5v4a2 2 0 000-4z" fill="black" fillOpacity="0.4" />
              </svg>
            </div>
          </div>

          {/* Dynamic Island */}
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 z-30 w-[120px] h-[34px] bg-black rounded-full" />

          {/* Screen content */}
          <div className="relative h-full overflow-hidden bg-white">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
