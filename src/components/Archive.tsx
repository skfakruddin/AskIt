import Thread from "./Thread";
import { useProfile } from "../hooks/useProfile";

const Archive = () => {
    const { currentRoom} = useProfile();
    if(!currentRoom){
        return <div>Loading...</div>
    }
    return (
        <>
            {
                currentRoom &&
                (
                    currentRoom.map((ask, index) => {
                        return (
                            <div key={index} className="mb-4">
                                <div className="flex flex-col justify-between">
                                    {/* <div className="text-lg">{ask.question}</div> */}
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