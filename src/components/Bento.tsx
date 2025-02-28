import { useRoom } from '../hooks/useRoom'
import Asks from './Asks'
import MostUpvoted from './MostUpvoted'
import Answered from './Answered'

function Bento () {
  const { asks } = useRoom()

  return (
    <div className='flex flex-col h-[calc(100vh-16rem)] sm:h-[calc(100vh-11rem)]'>
      <div className='grid grid-cols-1 flex-grow md:grid-cols-4 gap-4'>
        <div className='col-span-2 flex flex-col'>
          <Asks asks={asks} />
        </div>
        <div className='hidden md:grid col-span-2 grid-rows-2 '>
          <div className='bg-dcardbg rounded-lg  sm:h-[calc((100vh-11.6rem)/2)] grid-rows-1 mb-3'>
            <MostUpvoted />
          </div>
          <div className='bg-dcardbg rounded-lg grid-rows-1  sm:h-[calc((100vh-11.6rem)/2)]'>
            <Answered />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bento