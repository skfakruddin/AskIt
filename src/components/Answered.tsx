import Ask from './ui/Ask'
import { useRoom } from '../hooks/useRoom';

const Answered = () => {
  const { asks } = useRoom();
  const answeredAsks = Object.values(asks).filter(ask => ask.answered);
  return (
    <>
        <h1 className='sticky top-1 text-xl m-3 pb-2'>Answered</h1>
        <div className='pl-2 h-[calc(100%-4rem)]  overflow-y-scroll  scrollbar-thin-custom scrollbar-thin-custom::-webkit-scrollbar-thumb '>
        {Object.values(answeredAsks).map(ask => (
          <Ask
            key={ask.askId}
            askId={ask.askId}
            question={ask.question}
            upvotes={ask.upvotes}
            upvoted={ask.upvoted}
            answered={ask.answered}
            emoji={ask.emoji}
          />
        ))}
      </div>
    </>
  )
}
export default Answered