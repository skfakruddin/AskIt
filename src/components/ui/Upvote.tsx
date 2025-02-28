import upvoteOutline from '../../assets/upvote.svg'
import upvoteFilled from '../../assets/upvoted.svg'
import { upvoteQuestion } from '../../handlers/socketHandlers'
import { useRoom } from '../../hooks/useRoom'

type UpvoteProps = {
  upvoted: boolean
  upvoteCount: string
  askId: number
}


const Upvote = ({ upvoted, upvoteCount, askId }: UpvoteProps) => {
  if (parseInt(upvoteCount) >= 100) {
    upvoteCount = '99+'
  }else if (parseInt(upvoteCount) === 0) {
    upvoteCount = '+'
  }
  const { socketRef,joinCode,role } = useRoom()

  const handleUpvote =()=>{
    if(role === 'speaker') return
    upvoteQuestion(socketRef as WebSocket,joinCode,askId,upvoted);
  }
  
  return (
    <>
      {!upvoted ? (
        <div onClick={handleUpvote} className={`${role === 'speaker' ? '' : 'cursor-pointer'}`}>
          <p
            className={`text-xs inline text-[#6f00ff] font-bold relative text-right right-[-20%] top-[16%] `}
          >
            {upvoteCount}
          </p>
          <img className='w-5 sm:w-4 inline' src={upvoteFilled} alt='' />
        </div>
      ) : (
        <div onClick={handleUpvote} className={`${role === 'speaker' ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          <p
            className={`text-xs inline text-[#05df72] font-bold relative text-right right-[-20%] top-[16%] `}
          >
            {upvoteCount}
          </p>
          <img className='w-5 sm:w-4 inline' src={upvoteOutline} alt='' />
        </div>
      )}
    </>
  )
}
export default Upvote
