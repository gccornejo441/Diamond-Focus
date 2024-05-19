import { ReactElement } from "react";
import styles from "./CircularProgressBar.module.css";

interface CircularProgressBarProps {
  progress: number;
  label?: string;
  width?: number;
}

export function CircularProgressBar({
  progress,
  label = "Progress Bar",
  width = 300,
}: CircularProgressBarProps): ReactElement {
  const strokeWidth = 6;
  const radius = 100 / 2 - strokeWidth * 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={styles.container}>
      <svg
        aria-label={label}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={progress}
        height={width}
        role="progressbar"
        width={width}
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={styles.backgroundCircle}
          cx="50"
          cy="50"
          r={radius + strokeWidth}
        />
        <circle
          className={styles.circle}
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className={styles.filledCircle}
          cx="50"
          cy="50"
          data-testid="progress-bar-bar"
          r={radius}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeWidth={strokeWidth}
        />
      </svg>
      <div className={styles.text} data-testid="progress-bar-text">
        {progress}
      </div>
    </div>
  );
}
