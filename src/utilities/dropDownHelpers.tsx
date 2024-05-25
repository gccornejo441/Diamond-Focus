import { ReactNode } from "react";
import EditListButton from "@assets/editListIcon.svg?react";
import DeleteListButton from "@assets/deleteIcon.svg?react";
import SettingsButton from "@assets/settingsIcon.svg?react";
import AddListButton from "@assets/addListIcon.svg?react";

const icons = {
  "Rename list": <EditListButton />,
  "Delete list": <DeleteListButton />,
  "Add list": <AddListButton />,
  Settings: <SettingsButton />,
};

interface NameObject {
  name: string;
}

export interface IconNamesProps {
  names: NameObject[];
}

/**
 * Generates an array of React nodes representing icons based on the provided names.
 *
 * @param {IconNamesProps} names - An object containing an array of name objects.
 * @return {ReactNode[]} An array of React nodes representing the icons.
 */
const IconRepository = ({ names }: IconNamesProps): ReactNode[] => {
  return names.map((obj) => {
    switch (obj.name) {
      case "Rename list":
        return icons["Rename list"];
      case "Delete list":
        return icons["Delete list"];
      case "Add list":
        return icons["Add list"];
      case "Settings":
        return icons["Settings"];
      default:
        return null;
    }
  });
};

export default IconRepository;
