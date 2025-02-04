import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useCommon } from "./CommonProvider";

type UserData = {
    id: string;
    name: string;
    email: string;
    photo: string;
    accessToken?: string;
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
    const { BE_URL } = useCommon();

    async function fetchUser() {
        try {
            const res = await fetch(`${BE_URL}/auth/user`, { credentials: "include" });
            if (!res.ok) throw new Error("Failed to fetch user");
            const data = await res.json();
            setUser({
                id: data.user.id,
                name: data.user.displayName,
                email: data.user.emails[0].value,
                photo: data.user.photos[0].value,
                accessToken: data.user.accessToken,
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

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};


// import { useContext, createContext, useState, useEffect } from 'react'
// import { useNavigate } from 'react-router'
// import { useCommon } from './CommonProvider'
// type UserData = {
//   id: string
//   name: string
//   email: string
//   photo: string
//   token?: string
//   accessToken?: string
// }

// type JoinRoomData = {
//   joinCode: string
// }

// type CreateRoomAction = {
//   roomTitle: string
//   roomDescription: string
// }

// type loginAction = {
//   action?: 'joinRoom' | 'createRoom'
//   data?: JoinRoomData | CreateRoomAction
// }

// const AuthContext = createContext<{
//   user: UserData | null
//   setUser: React.Dispatch<React.SetStateAction<any>>
//   login: () => void
//   token: string
//   setToken: React.Dispatch<React.SetStateAction<string>>
//   logout: () => void
// }>({
//   user: null,
//   setUser: () => {},
//   login: () => {},
//   token: '',
//   setToken: () => {},
//   logout: () => {}
// })

// const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<UserData | null>(null)
//   const [token, setToken] = useState(localStorage.getItem('token') || '')
//   const navigate = useNavigate()
//   const { BE_URL } = useCommon()

//   async function fetchUser () {
//     const res = await fetch(BE_URL + '/auth/user', {
//       credentials: 'include'
//     })
//     const data = await res.json()
//     if (res.status === 200) {
//       setUser({
//         id: data.user.id,
//         name: data.user.displayName,
//         email: data.user.emails[0].value,
//         photo: data.user.photos[0].value,
//         accessToken: data.user.accessToken
//       })
//       setToken(data.user.token)
//     }
//     console.log('data: ', data)
//   }

//   const login = async () => {
//     window.location.href =
//       BE_URL + '/auth/google'
//     console.log('hello')
//   }

//   async function logout () {
//     try {
//       const res = await fetch(
//         BE_URL + '/auth/logout',
//         {
//           credentials: 'include'
//         }
//       )
//       if (res.status === 200) {
//         console.log('logged out')
//         navigate('/')
//         setUser(null)
//       }
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   useEffect(() => {
//     fetchUser()
//   }, [])

//   return (
//     <AuthContext.Provider
//       value={{ user, setUser, login, token, setToken, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export default AuthProvider

// export const useAuth = () => {
//   return useContext(AuthContext)
// }