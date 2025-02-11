type CreateRoomHandlerType = {
    roomTitle: string,
    roomDescription: string
}
export const createRoom = async({roomTitle, roomDescription}:CreateRoomHandlerType)=>{

    // const BE_URL = "https://4cfw3zvk-5000.inc1.devtunnels.ms"
    // const BE_URL = "https://askitengine.vercel.app"
    // const BE_URL = "https://askitengine.centralindia.cloudapp.azure.com"
    const BE_URL = import.meta.env.VITE_BE_URL;

    const response = await fetch(`${BE_URL}/room/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({roomTitle, roomDescription})
    });
    const data = await response.json();
    if(data.error){
        return {
            error: true,
            message: data.message
        }
    }else{
        return {
            error: false,
            joinCode: data.joinCode,
            room: data.room
        }
    }
}

export const joinRoom = async(joinCode:string)=>{
    // const BE_URL = "https://4cfw3zvk-5000.inc1.devtunnels.ms"
    // const BE_URL = "https://askitengine.vercel.app"
    // const BE_URL = "https://askitengine.centralindia.cloudapp.azure.com"
    const BE_URL = import.meta.env.VITE_BE_URL;

    const res = await  fetch(`${BE_URL}/room/join/${joinCode}`, {
        method:"PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({joinCode})
    });
    const data = await res.json();
    if(data.error){
        return {
            error: true,
            message: data.message
        }
    }
    return {
        error: false,
        room: data.room
    }
}

