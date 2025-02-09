import Ask from './ui/Ask'
import { useRoom } from '../hooks/useRoom';


const MostUpvoted = () => {
  const { asks } = useRoom();
  let sortedAsks = Object.values(asks).sort((a,b)=>{
    return b.upvotes - a.upvotes
  });
  sortedAsks = sortedAsks.filter(ask => ask.answered === false);
  sortedAsks = sortedAsks.slice(0,5);
  return (
    <>
        <h1 className='sticky top-1 text-xl m-3 pb-2.5'>Most Upvoted</h1>
        <div className='pl-2 h-[calc(100%-4rem)]  overflow-y-scroll  scrollbar-thin-custom scrollbar-thin-custom::-webkit-scrollbar-thumb '>
        {Object.values(sortedAsks).map(ask => (
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
export default MostUpvoted