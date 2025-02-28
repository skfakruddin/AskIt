import { useContext } from "react";
import { ProfileContext } from "../store/ProfileProvider";

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) throw new Error("useProfile must be used within ProfileProvider");
    return context;
};