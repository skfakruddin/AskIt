import { useRoom } from '../hooks/useRoom'
import { ask } from '../types/AskTypes'
import Ask from './ui/Ask'
import Button from './ui/Button'
import ModalInput from './ui/ModalInput'
import { FieldValues, useForm } from 'react-hook-form'
import { askQuestion } from '../handlers/socketHandlers'
import toast from 'react-hot-toast'
type AsksProps = {
  asks: Record<string, ask>
}
function Asks ({ asks }: AsksProps) {
  const { register, handleSubmit, reset } = useForm()
  const { role, joinCode, socketRef } = useRoom()

  async function onAsk (data: FieldValues) {
    const question = data.ask;
    if(question && question.split('').length >3){
      await askQuestion(socketRef as WebSocket, joinCode, question)
    }else{
      toast.error('Too small')
    }
    reset()
  }
  return (
    <div className='bg-dcardbg h-[calc(100vh-16rem)] sm:h-[calc(100vh-11rem)] rounded-lg '>
      <h1 className='text-2xl m-3 pb-2'>Asks</h1>
      <div className='pl-2 pb-[41px] h-[calc(100%-4rem)]  overflow-y-scroll  scrollbar-thin-custom scrollbar-thin-custom::-webkit-scrollbar-thumb '>
        {Object.values(asks).map(ask => (
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
      {role === 'attendee' && (
        <form
          className={`flex relative top-[-6.1%]`}
          onSubmit={handleSubmit(data => onAsk(data))}
        >
          <ModalInput
            type='ask'
            placeholder='Ask a question'
            id='ask'
            label=''
            register={register}
            key={1}
            inputClassName='focus:outline-none w-full mb-0 py-2 rounded-l-md rounded-r-none px-2'
          />
          <Button
            text='Ask'
            variant='primary'
            className={`p-0 bg-purple-500 border-0 rounded-l-none`}
          ></Button>
        </form>
      )}
    </div>
  )
}

export default Asks
