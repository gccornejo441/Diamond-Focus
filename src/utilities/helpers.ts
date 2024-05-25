import { TaskListProps } from "../components/Sidebar/types/SidebarTypes";
/**
 * Formats the given number of seconds into a string in the format "minutes:seconds".
 *
 * @param {number} seconds - The number of seconds to format.
 * @return {string} The formatted time string.
 */
export const TimePadder = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedSeconds =
    remainingSeconds < 10
      ? `0${remainingSeconds}`
      : remainingSeconds.toString();
  return `${minutes}:${formattedSeconds}`;
};

/**
 * Applies styles to the body element based on the provided background image and theme.
 *
 * @param {string} bgImg - The URL of the background image. If null or empty, the background image is removed.
 * @param {string} theme - The theme to apply to the body element. If null or empty, the theme is removed.
 */
export const ApplyBodyStyles = (bgImg: string, theme: string) => {
  const existingOverlay = document.getElementById("background-overlay");

  if (bgImg) {
    if (!existingOverlay) {
      const overlay = document.createElement("div");
      overlay.id = "background-overlay";
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
      overlay.style.zIndex = "-1";
      document.body.appendChild(overlay);
    }

    document.body.style.backgroundImage = `url('${bgImg}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    document.body.style.backdropFilter = "brightness(1)";

    if (existingOverlay) {
      existingOverlay.style.display = "block";
    }
  } else {
    document.body.style.background = "";
    if (existingOverlay) {
      existingOverlay.style.display = "none";
    }
  }

  if (theme) {
    document.body.setAttribute("data-theme", theme);
  } else {
    document.body.removeAttribute("data-theme");
  }
};

/**
 * Retrieves the initial task lists from localStorage. If no task lists are stored, returns a default task list.
 *
 * @return {TaskListProps[]} The initial task lists.
 */
export const initialTaskLists = (): TaskListProps[] => {
  const storedTaskLists = localStorage.getItem("taskLists");
  if (storedTaskLists) {
    return JSON.parse(storedTaskLists);
  }
  return [
    {
      id: 0,
      title: "New List",
      tasks: [
        {
          id: 10000,
          text: "New Task",
          completed: false,
          favorite: false,
          createdAt: new Date(),
        },
      ],
    },
  ];
};
