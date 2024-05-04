import React , {lazy} from 'react'
import AppLayout from '../components/layout/AppLayout'

const Head = lazy(()=> import('../utils/Head'))

const Home = () => {
  return (
    <AppLayout>
        <div className='flex items-center w-full h-full mx-3'>
            <div className='flex h-[95%] relative w-full gap-2'>
                <div className='w-[400px] flex flex-col gap-3'>
                    <div>
                        <Head />
                    </div>
                    <div className='h-full w-full bg-white border rounded-xl'>
                        <div className='flex justify-center items-center h-full'>
                            Add friends using the plus sign above
                        </div>
                    </div>
                </div>
                <div className='w-[calc(100%-450px)] h-full relative'>
                    <div className='w-full h-full bg-white rounded-xl flex justify-center items-center'>
                        <div className='text-3xl'>
                            Chit Chat with your Friends
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
  )
}

export default Home;
