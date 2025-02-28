import { useRef, useState } from "react";
import { generateRandomEmoji } from "../handlers/socketHandlers";
import { Ask } from "../store/ProfileProvider"
import toast from "react-hot-toast";
import { useProfile } from "../hooks/useProfile";
function Thread({ ask }: { ask: Ask }) {
    const [isReplyClicked, setIsReplyClicked] = useState<boolean>(false);
    const replyRef = useRef<HTMLInputElement>(null);
    const {sendReply} = useProfile();
    // console.log('ask: ', ask);
    const replies = [
        "I'm not sure I understand what you're asking.",
        "I'm here for you, let me know if you need anything",
        "I'm glad you're feeling better now"
    ]

    const onReply= async() =>{
        if(!replyRef.current){
            return;
        }
        if(!replyRef.current.value){
            toast.error('Reply cannot be empty')
            return;
        }
        await sendReply(ask._id, replyRef.current.value);
        setIsReplyClicked(!isReplyClicked)
    }

    return (
        <div className="flex gap-2">
            <p>{generateRandomEmoji()}</p>
            <div className={`flex flex-col gap-1`}>
                <h1 className={`text-lg`}>{ask.question}</h1>
                <div className={``}>
                    {ask.replies.map((reply, index) => (
                    // {replies.map((reply, index) => (
                        <div key={index} className={`border-l-2 pl-2 mt-2`}>
                            <p>{reply.reply}</p>
                        </div>
                    ))}
                    {
                        isReplyClicked &&
                        <div className={`border-l-2 pl-2 mt-2 flex `}>
                            <input
                                type="text" 
                                placeholder="Reply"
                                ref={replyRef}
                                className={`w-full border-none bg-transparent focus:outline-none`}
                                onKeyDown={(e) => e.key === 'Enter' && onReply()}
                                autoFocus={true}
                            />
                            
                        </div>
                    }
                </div>
                <button 
                    onClick={() => {
                        setIsReplyClicked(!isReplyClicked)
                    }}
                    className={`cursor-pointer text-sm font-semibold text-[#c2c0c0]  text-left  w-12`}>
                        reply
                </button>
            </div>
        </div>
    )
}

export default Thread