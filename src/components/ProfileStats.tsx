import { useProfile } from "../hooks/useProfile"

export type ProfileStatsProps = {
    created: number,
    attended: number,
    asks: number
}

const ProfileStats = ({ created = 0, attended = 0, asks = 0 }: ProfileStatsProps) => {
    const {isInRoom} = useProfile();
    return (
        <div className={`flex items-center w-full mb-5 roomFont`}>
            <div className='flex items-center text-white space-x-4 w-full'>
                <div className='flex items-center justify-start'>
                    <div className='bg-dlightgrey ps-4 py-2 rounded-l-md'>
                        <p className='text-white text-[0.87rem]  sm:text-base'>
                            Created {created}
                            <span className='mx-1 lg:mx-3 opacity-70'>|</span>
                        </p>
                    </div>
                    <div className={`bg-dlightgrey py-2 ${isInRoom ? 'rounded-none' : 'rounded-r-md pe-4'}`}>
                        <p className='text-white text-[0.83rem]  sm:text-base'>
                            Attended  {attended}
                        </p>
                    </div>
                    {
                        isInRoom && (
                            <div className='bg-dlightgrey pe-4 py-2 rounded-r-md'>
                                <p className='text-white text-[0.83rem]  sm:text-base'> <span className='mx-1 lg:mx-3 opacity-70'>|</span> Asks {asks}</p>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    )
}
export default ProfileStats