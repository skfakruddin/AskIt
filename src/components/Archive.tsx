import Thread from "./Thread";
import { useProfile } from "../hooks/useProfile";

const Archive = () => {
    const { currentRoom} = useProfile();
    if(!currentRoom){
        return <div className="p-3">Loading...</div>
    }
    return (
        <>
            {
                currentRoom &&
                (
                    currentRoom.map((ask, index) => {
                        return (
                            <div key={index}>
                                <div className="flex flex-col justify-between">
                                    <Thread
                                        ask={ask}
                                    />
                                </div>
                            </div>
                        )
                    })
                )
            }


        </>
    )
}
export default Archive