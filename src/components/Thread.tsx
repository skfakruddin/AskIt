import { useRef, useState } from 'react'
import { generateRandomEmoji } from '../handlers/socketHandlers'
import { Ask } from '../store/ProfileProvider'
import toast from 'react-hot-toast'
import { useProfile } from '../hooks/useProfile'

function Thread ({ ask }: { ask: Ask }) {
  const [isReplyClicked, setIsReplyClicked] = useState<boolean>(false)
  const replyRef = useRef<HTMLTextAreaElement>(null)
  const { sendReply } = useProfile()

  const onReply = async () => {
    if (!replyRef.current) {
      return
    }
    if (!replyRef.current.value) {
      toast.error('Reply cannot be empty')
      return
    }
    await sendReply(ask._id, replyRef.current.value)
    setIsReplyClicked(!isReplyClicked)
  }

  return (
    <div className='flex flex-col gap-x-1 w-full'>
      <div className='sticky top-0 p-2 backdrop-blur-md rounded-t-lg z-0'>
        <div className='text-lg font-semibold flex'>
          <p>{generateRandomEmoji()}</p>
          <p className='pl-2'>{ask.question}</p>
        </div>
      </div>
      <div className='pl-10.5'>
        {ask.replies.map((reply, index) => (
          <div
            key={index}
            className='border-l-2 pl-2 mt-3 break-words w-full pr-4 text-justify'
          >
            <p className='whitespace-pre-wrap break-words mb-2'>{reply.reply}</p>
          </div>
        ))}
        {isReplyClicked && (
          <div className='border-l-2 pl-2 mt-2 flex'>
            {/* <input
              type='text'
              placeholder='Reply'
              className='w-full border-none bg-transparent focus:outline-none'
              onKeyDown={e => e.key === 'Enter' && onReply()}
              autoFocus={true}
              
            /> */}
            <textarea 
              name="" 
              id=""
              placeholder='Reply'
              ref={replyRef}
              className='w-full border-none bg-transparent focus:outline-none'
              onKeyDown={e =>{
                if(e.key === 'Enter' && !e.shiftKey){
                  e.preventDefault()
                  onReply()
                }
              }}
              autoFocus={true}
            >
            </textarea>
          </div>
        )}
        <button
          onClick={() => setIsReplyClicked(!isReplyClicked)}
          className='cursor-pointer text-sm font-semibold text-[#c2c0c0] text-left w-12'
        >
          reply
        </button>
      </div>
    </div>
  )
}

export default Thread
