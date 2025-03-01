import { ask } from '../../types/AskTypes'
import Upvote from './Upvote'
import { useRoom } from '../../hooks/useRoom'
import { answeredQuestion } from '../../handlers/socketHandlers'

function Ask ({ answered, askId, emoji, question, upvoted, upvotes }: ask) {
  const { role, joinCode, socketRef } = useRoom()
  function handleAnswered () {
    if (role === 'attendee') {
      return
    }
    answeredQuestion(socketRef as WebSocket, joinCode, askId)
  }
  return (
    <div className={
      `flex items-start text-lg p-1 justify-between mr-5 mb-3
      ${answered ? 'opacity-80' : ''}`
    }>
      <div className='flex gap-2 w-[80%] sm:w-[84%] break-words '>
        <p>{emoji}</p>
        <p onClick={handleAnswered} 
          className={
            `${role=='speaker'  && 'cursor-pointer' } 
            ${answered ? 'line-through' : ''} break-words`
          }
        >
          {question}
        </p>
      </div>
      <div className={`flex`}>
        <Upvote 
          upvoteCount={String(upvotes)}
          upvoted={upvoted}
          askId={askId}
        />
      </div>
    </div>
  )
}

export default Ask
