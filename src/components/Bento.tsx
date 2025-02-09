import { useRoom } from '../store/RoomProvider';
import Asks from './Asks';

function Bento() {
  const {asks} = useRoom();
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="grid grid-cols-1 flex-grow md:grid-cols-4 gap-4">
        <div className="col-span-2 flex flex-col">
          <Asks asks={asks} />
        </div>
        <div className="hidden col-span-2 md:grid grid-rows-2 gap-4">
          <div className="bg-dcardbg rounded-lg">
            <h1>Most Upvoted Questions</h1>
          </div>
          <div className="bg-dcardbg rounded-lg">
            <h1>Answered Questions</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bento;
