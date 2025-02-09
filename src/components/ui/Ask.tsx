import { ask } from '../../types/AskTypes'
import fullUpvote from '../../assets/upvote.svg'
import Upvote from './Upvote'

function Ask ({answered,askId,emoji,question,upvoted,upvotes}:ask) {
  return (
    <div className='flex items-start text-lg p-1 justify-between mr-5 mb-3'>
      <div className='flex gap-2 w-[80%] sm:w-[84%]'>
        <p>{emoji}</p>
        <p className=''>{question}</p>
      </div>
      <div className={`flex mt-1`}>
        <Upvote upvoteCount={String(upvotes)} upvoted={upvoted} askId={askId} />
      </div>
    </div>
  )
}

export default Ask
