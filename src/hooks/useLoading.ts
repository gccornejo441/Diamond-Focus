import { useState } from "react";

const useLoading = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const progressInterval = setInterval(() => {
    setProgress((prevProgress) => {
      if (prevProgress >= 100) {
        clearInterval(progressInterval);
        setIsLoading(false);
        return 100;
      }
      return prevProgress + 10;
    });
  }, 100);

  return { isLoading, progress };
};

export default useLoading;
