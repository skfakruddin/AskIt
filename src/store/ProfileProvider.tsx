import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export type Ask = {
    question:string;
    timestamp:string;
    replies:any[];
    _id:string;
}

export type Room = {
    joinCode: string;
    title: string;
}

export type ArchiveRooms = {
    count: number;
    rooms: Room[]
}

export type Archive = {
    createdRooms: ArchiveRooms;
    joinedRooms: ArchiveRooms;
}

export type ProfileContextType = {
    archive: Archive;
    fetchRoom: (joinCode:string)=>Promise<any>;
    isInRoom: boolean;
    setIsInRoom: React.Dispatch<React.SetStateAction<boolean>>;
    sendReply: (askId:string, reply:string)=>void;
    currentRoom: Ask[] | null;
    setCurrentRoom: React.Dispatch<React.SetStateAction<Ask[] | null>>;
}

export const ProfileContext = createContext<ProfileContextType>({
    archive: {
        createdRooms: {
            count: 0,
            rooms: []
        },
        joinedRooms: {
            count: 0,
            rooms: []
        }
    },
    fetchRoom: async (joinCode:string)=>{},
    isInRoom: false,
    setIsInRoom: ()=>{},
    sendReply: ()=>{},
    currentRoom: null,
    setCurrentRoom: ()=>{}
});

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const [archive, setArchive] = useState<Archive>({
        createdRooms: { count: 0, rooms: [] },
        joinedRooms: { count: 0, rooms: [] },
    });
    const [isInRoom, setIsInRoom] = useState<boolean>(false);
    const [currentRoom, setCurrentRoom] = useState<Ask[] | null>(null);
    const dummyArchive = {
        createdRooms: {
            count: 2,
            rooms: [
                {
                    joinCode: "1234",
                    title: "Room 1"
                },
                {
                    joinCode: "5678",
                    title: "Room 2"
                },
                {
                    joinCode: "91011",
                    title: "Room 5"
                },
                {
                    joinCode: "121314",
                    title: "Room 6"
                },
                {
                    joinCode: "151617",
                    title: "Room 7"
                },
                {
                    joinCode: "181920",
                    title: "Room 16"
                },
                {
                    joinCode: "212223",
                    title: "Room 17"
                },
                {
                    joinCode: "242526",
                    title: "Room 18"
                },
                {
                    joinCode: "272829",
                    title: "Room 19"
                },
                {
                    joinCode: "303132",
                    title: "Room 20"
                },
                {
                    joinCode: "333435",
                    title: "Room 21"
                },
                {
                    joinCode: "303132",
                    title: "Room 20"
                },
                {
                    joinCode: "333435",
                    title: "Room 21"
                },
                {
                    joinCode: "303132",
                    title: "Room 20"
                },
                {
                    joinCode: "333435",
                    title: "Room 21"
                },
                {
                    joinCode: "303132",
                    title: "Room 20"
                },
                {
                    joinCode: "333435",
                    title: "Room 21"
                },
                {
                    joinCode: "303132",
                    title: "Room 20"
                },
                {
                    joinCode: "333435",
                    title: "Room 21"
                },
                {
                    joinCode: "303132",
                    title: "Room 20"
                },
                {
                    joinCode: "333435",
                    title: "Room 21"
                },
                {
                    joinCode: "303132",
                    title: "Room 20"
                },
                {
                    joinCode: "333435",
                    title: "Room 21"
                },
                {
                    joinCode: "303132",
                    title: "Room 20"
                },
                {
                    joinCode: "333435",
                    title: "Room 21"
                },
                {
                    joinCode: "303132",
                    title: "Room 20"
                },
                {
                    joinCode: "333435",
                    title: "Room 21"
                },
                {
                    joinCode: "303132",
                    title: "Room 20"
                },
                {
                    joinCode: "333435",
                    title: "Room 21"
                },
                {
                    joinCode: "303132",
                    title: "Room 20"
                },
                {
                    joinCode: "333435",
                    title: "Room 21"
                },
                {
                    joinCode: "303132",
                    title: "Room 20"
                },
                {
                    joinCode: "333435",
                    title: "Room 21"
                },
                {
                    joinCode: "303132",
                    title: "Room 20"
                },
                {
                    joinCode: "333435",
                    title: "Room 21"
                },
                {
                    joinCode: "363738",
                    title: "Room 22"
                }
            ]
        },
        joinedRooms: {
            count: 2,
            rooms: [
                {
                    joinCode: "abcd",
                    title: "Room 3"
                },
                {
                    joinCode: "efgh",
                    title: "Room 4"
                },
                {
                    joinCode: "ijkl",
                    title: "Room 8"
                },
                {
                    joinCode: "mnop",
                    title: "Room 9"
                },
                {
                    joinCode: "qrst",
                    title: "Room 10"
                },
                {
                    joinCode: "uvwx",
                    title: "Room 11"
                },
                {
                    joinCode: "yzab",
                    title: "Room 12"
                },
                {
                    joinCode: "uvwx",
                    title: "Room 11"
                },
                {
                    joinCode: "yzab",
                    title: "Room 12"
                },
                {
                    joinCode: "uvwx",
                    title: "Room 11"
                },
                {
                    joinCode: "yzab",
                    title: "Room 12"
                },
                {
                    joinCode: "uvwx",
                    title: "Room 11"
                },
                {
                    joinCode: "yzab",
                    title: "Room 12"
                },
                {
                    joinCode: "uvwx",
                    title: "Room 11"
                },
                {
                    joinCode: "yzab",
                    title: "Room 12"
                },
                {
                    joinCode: "uvwx",
                    title: "Room 11"
                },
                {
                    joinCode: "yzab",
                    title: "Room 12"
                },
                {
                    joinCode: "uvwx",
                    title: "Room 11"
                },
                {
                    joinCode: "yzab",
                    title: "Room 12"
                },
                {
                    joinCode: "uvwx",
                    title: "Room 11"
                },
                {
                    joinCode: "yzab",
                    title: "Room 12"
                },
                {
                    joinCode: "uvwx",
                    title: "Room 11"
                },
                {
                    joinCode: "yzab",
                    title: "Room 12"
                },
                {
                    joinCode: "uvwx",
                    title: "Room 11"
                },
                {
                    joinCode: "yzab",
                    title: "Room 12"
                },
                {
                    joinCode: "uvwx",
                    title: "Room 11"
                },
                {
                    joinCode: "yzab",
                    title: "Room 12"
                },
                {
                    joinCode: "uvwx",
                    title: "Room 11"
                },
                {
                    joinCode: "yzab",
                    title: "Room 12"
                },
                {
                    joinCode: "cdef",
                    title: "Room 13"
                },
                {
                    joinCode: "ghij",
                    title: "Room 14"
                },
                {
                    joinCode: "klmn",
                    title: "Room 15"
                }
            ]
        }
    }
    async function fetchData() {
        const res = await fetch(`${import.meta.env.VITE_BE_URL}/user/archive`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        const data = await res.json()
        console.log(data);
        if (data.error) {
            setArchive({
                createdRooms: {
                    count: 0,
                    rooms: []
                },
                joinedRooms: {
                    count: 0,
                    rooms: []
                }
            });
        } else {
            setArchive(data.archive);
            // setArchive(dummyArchive);
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    async function fetchRoom(joinCode:string){
        const res = await fetch(`${import.meta.env.VITE_BE_URL}/user/room/?joincode=${joinCode}`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const data = await res.json();
        console.log(data);
        if(data.error){
            // navigate('/profile');
            setIsInRoom(false);
            toast("Room not found",{
                icon: '🚫'
            });
        }else{
            setIsInRoom(true);
            return data;
        }
    }

    async function sendReply(askId:string, reply:string){
        try {
            const res = await fetch(`${import.meta.env.VITE_BE_URL}/user/reply`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    askId,
                    reply
                }) 
            })
            const data = await res.json();
            console.log(data);
            if(data.error){
                toast.error(data.messge);
            }else{
                setCurrentRoom((prev)=>{
                    if(prev){
                        const newRoom = prev.map((ask)=>{
                            if(ask._id === askId){
                                ask.replies.push(data.reply);
                            }
                            return ask;
                        })
                        return newRoom;
                    }else{
                        return prev;
                    }
                })
                toast.success(data.message);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }
    

    return (
        <ProfileContext.Provider value={{ archive, fetchRoom, isInRoom, setIsInRoom, sendReply, currentRoom, setCurrentRoom }}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileProvider;