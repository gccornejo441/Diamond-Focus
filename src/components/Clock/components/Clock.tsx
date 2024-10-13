import { useEffect, useState } from "react";
import styles from "@components/Clock/styles/Clock.module.css";

interface ITimeUtility {
  format: (date: Date) => string;
  formatHours: (hours: number) => string;
  formatSegment: (segment: number) => string;
}

const T: ITimeUtility = {
  format: (date: Date): string => {
    const hours: string = T.formatHours(date.getHours()),
      minutes: number = date.getMinutes(),
      seconds: number = date.getSeconds();

    return `${hours}:${T.formatSegment(minutes)}<span class="${styles.seconds}">${T.formatSegment(seconds)}</span>`;
  },
  formatHours: (hours: number): string => {
    return hours % 12 === 0 ? "12" : (hours % 12).toString();
  },
  formatSegment: (segment: number): string => {
    return segment < 10 ? `0${segment}` : segment.toString();
  },
};

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.clockContainer}>
      <div
        className={styles.clockFormat}
        dangerouslySetInnerHTML={{ __html: T.format(time) }}
      />
    </div>
  );
};

export default Clock;
