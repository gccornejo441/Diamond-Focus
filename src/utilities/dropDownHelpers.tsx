import { ReactNode } from "react";
import EditListButton from "@assets/editListIcon.svg?react";
import DeleteListButton from "@assets/deleteIcon.svg?react";
import SettingsButton from "@assets/settingsIcon.svg?react";
import AddListButton from "@assets/addListIcon.svg?react";
import SignInButton from "@assets/signInIcon.svg?react";
import SignOutButton from "@assets/signOutIcon.svg?react";

const icons = {
  "Rename list": <EditListButton />,
  "Delete list": <DeleteListButton />,
  "Add list": <AddListButton />,
  Settings: <SettingsButton />,
  Delete: <DeleteListButton />,
  "Toggle Task Completion": <AddListButton />,
  "Set as Favorite": <AddListButton />,
  "Sign in": <SignInButton />,
  "Sign out": <SignOutButton />,
};

type IconName = keyof typeof icons;

interface NameObject {
  name: IconName;
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
  return names.map((obj: NameObject) => {
    const icon = icons[obj.name];
    return icon ? icon : null;
  });
};

export default IconRepository;
