import { PageProps } from '../types/PageProps'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'

export default function App({}: PageProps) {
  return (
    <div className='w-screen h-screeen bg-primary-default'>
      <div className='flex max-w-[1600px] mx-auto h-screen 2xl:py-[19px]'>
        <div className='basis-[30%] max-w-[30%]'>
          <LeftPanel />
        </div>
        <div className='grow border-l border-l-contrast-secondary/20'>
          <RightPanel />
        </div>
      </div>
    </div>
  )
}
