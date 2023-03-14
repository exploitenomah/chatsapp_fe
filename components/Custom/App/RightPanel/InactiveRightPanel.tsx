import AppIntro from '../AppIntro'

export default function InactiveRightPanel() {
  return (
    <>
      <div className='bg-primary-light h-full flex justify-center items-center border-b-4 border-b-accent-dark'>
        <div>
          <AppIntro />
        </div>
      </div>
    </>
  )
}
