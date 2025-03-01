import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
type UserData = 
{
    id: string;
    name: string;
    email: string;
    photo: string;
    accessToken?: string;
    token?:string;
    _id:string;
};

const AuthContext = createContext<{
    user: UserData | null;
    setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
    login: () => void;
    logout: () => void;
    authStatus: boolean | null;
} | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [authStatus, setAuthStatus] = useState<boolean|null>(null);
    const navigate = useNavigate();
    // const BE_URL = "https://4cfw3zvk-5000.inc1.devtunnels.ms"
    // const BE_URL = "https://askitengine.vercel.app"
    // const BE_URL = "https://askitengine.centralindia.cloudapp.azure.com"
    const BE_URL = import.meta.env.VITE_BE_URL;

    async function fetchUser () {
        try {
            const res = await fetch(`${BE_URL}/auth/user`, { credentials: "include" });
            if (!res.ok) throw new Error("Failed to fetch user");
            const data = await res.json();
            setUser({
                _id: data.user._id,
                id: data.user.id,
                name: data.user.displayName,
                email: data.user.emails[0].value,
                photo: data.user.photos[0].value,
                accessToken: data.user.accessToken,
                token:data.user.token
            });
            setAuthStatus(true);
        } catch (err) {
            console.error("Error fetching user:", err);
            setUser(null);
            setAuthStatus(false);
        }
    }

    const login = () => {
        window.location.href = `${BE_URL}/auth/google`;
    };

    async function logout() {
        try {
            const res = await fetch(`${BE_URL}/auth/logout`, { credentials: "include" });
            if (!res.ok) throw new Error("Logout failed");
            setUser(null);
            localStorage.clear();
            navigate("/");
            fetchUser();
        } catch (err) {
            console.error("Error logging out:", err);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, authStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export {AuthContext};