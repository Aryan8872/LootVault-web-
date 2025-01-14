import { createContext } from "react";
import { SidebarContextType } from "./SideBar";

export const SidebarContext = createContext<SidebarContextType>({ expanded: true });
