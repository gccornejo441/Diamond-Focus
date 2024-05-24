import { useMemo, useState } from "react";

const useMemoDrop = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSidebarListOpen, setSidebarListOpen] = useState(false);

  // Memoize state handlers
  const stateHandlers = useMemo(
    () => ({
      "Settings List": () => setModalOpen(true),
      "Add List": () => setSidebarListOpen(true),
    }),
    [],
  );

  // Memoize names array
  const names = useMemo(
    () => [{ name: "Settings List" }, { name: "Add List" }],
    [],
  );

  return {
    stateHandlers,
    names,
    isModalOpen,
    isSidebarListOpen,
  };
};

export default useMemoDrop;
