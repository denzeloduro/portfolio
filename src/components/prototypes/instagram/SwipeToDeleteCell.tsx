"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate, PanInfo } from "framer-motion";

interface SwipeToDeleteCellProps {
  children: React.ReactNode;
  username: string;
  onDelete: () => void;
  onRequestDialog: (username: string, onConfirm: () => void, onCancel: () => void) => void;
}

const ROUND_BUTTON_FULL = 44;
const ROUND_BUTTON_ICON = 16;
const ROUND_BUTTON_MIN = 4;
const GAP = 12;

const springElasticSnap = { type: "spring" as const, duration: 0.5, bounce: 0.3 };
const springElasticDismiss = { type: "spring" as const, duration: 0.4, bounce: 0.15 };

export default function SwipeToDeleteCell({ children, username, onDelete, onRequestDialog }: SwipeToDeleteCellProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [baseOffset, setBaseOffset] = useState(0);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const getContainerWidth = () => containerRef.current?.offsetWidth ?? 340;

  const rawEmerging = useTransform(x, (val) => Math.max(0, Math.abs(val) - GAP));
  const growProgress = useTransform(rawEmerging, (val) => Math.min(val / ROUND_BUTTON_FULL, 1.0));
  const buttonSize = useTransform(growProgress, (p) => ROUND_BUTTON_MIN + (ROUND_BUTTON_FULL - ROUND_BUTTON_MIN) * p);
  const buttonWidth = useTransform(() => {
    const raw = rawEmerging.get();
    if (deleteConfirmed) return Math.max(buttonSize.get(), raw);
    return raw > ROUND_BUTTON_FULL ? raw : buttonSize.get();
  });
  const iconScale = useTransform(growProgress, [0, 1], [0, 1]);
  const buttonOpacity = useTransform(growProgress, [0, 0.1, 1], [0, 0.5, 1]);

  const executeDelete = useCallback(() => {
    setDeleteConfirmed(true);
    const width = getContainerWidth();
    animate(x, -(width + 60), springElasticDismiss);
    setTimeout(() => onDelete(), 300);
  }, [x, onDelete]);

  const cancelSwipe = useCallback(() => {
    setBaseOffset(0);
    animate(x, 0, springElasticSnap);
  }, [x]);

  const requestConfirmation = useCallback(() => {
    onRequestDialog(username, executeDelete, cancelSwipe);
  }, [username, executeDelete, cancelSwipe, onRequestDialog]);

  const handleDragEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (deleteConfirmed) return;

    const revealPoint = -(ROUND_BUTTON_FULL + GAP);
    const deletionPoint = getContainerWidth() * 0.75;

    if (Math.abs(info.offset.x + baseOffset) > deletionPoint || info.velocity.x < -800) {
      requestConfirmation();
    } else if (x.get() < revealPoint / 2) {
      animate(x, revealPoint, springElasticSnap);
      setBaseOffset(revealPoint);
    } else {
      animate(x, 0, springElasticSnap);
      setBaseOffset(0);
    }
  }, [x, baseOffset, deleteConfirmed, requestConfirmation]);

  const handleButtonClick = useCallback(() => {
    requestConfirmation();
  }, [requestConfirmation]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onPointerDown={(e) => e.stopPropagation()}
    >
      {/* Emerging round button behind the cell */}
      <div className="absolute right-0 top-0 bottom-0 flex items-center justify-end">
        <motion.button
          className="flex items-center justify-center bg-[#FF3B30] overflow-hidden"
          style={{
            width: buttonWidth,
            height: buttonSize,
            borderRadius: useTransform(buttonSize, (s) => s / 2),
            opacity: buttonOpacity,
          }}
          onClick={handleButtonClick}
        >
          <motion.div style={{ scale: iconScale }}>
            <svg width={ROUND_BUTTON_ICON} height={ROUND_BUTTON_ICON} viewBox="0 0 16 18" fill="none">
              <path d="M1 3.5h14M5.5 7v6m5-6v6M2 3.5l.857 10.286A1.714 1.714 0 004.57 15.5h6.858a1.714 1.714 0 001.714-1.714L14 3.5M5 3.5V2a1 1 0 011-1h4a1 1 0 011 1v1.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.button>
      </div>

      {/* Draggable cell content */}
      <motion.div
        className="relative z-10 touch-pan-y"
        style={{ x }}
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: -(getContainerWidth()), right: 0 }}
        dragElastic={0.05}
        onDragEnd={handleDragEnd}
        onTapStart={() => {
          if (x.get() < 0 && !deleteConfirmed) {
            animate(x, 0, springElasticSnap);
            setBaseOffset(0);
          }
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
