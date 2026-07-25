type WaveDividerProps = {
  /** Color the wave fills toward — should match the adjacent section bg. */
  fill?: string;
  /** Rotate 180° for a bottom-edge transition out of a tinted section. */
  flip?: boolean;
  className?: string;
};

export function WaveDivider({
  fill = "var(--lp-bg-alt)",
  flip = false,
  className = "",
}: WaveDividerProps) {
  return (
    <div aria-hidden className={`${flip ? "rotate-180" : ""} ${className}`}>
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="block h-10 w-full sm:h-14"
      >
        <path
          d="M0,34 C180,58 360,10 540,22 C720,34 900,60 1080,48 C1260,36 1350,20 1440,30 L1440,64 L0,64 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
