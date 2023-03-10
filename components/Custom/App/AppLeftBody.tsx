import SearchBar from '../SearchBar'

export default function AppLeftBody() {
  return (
    <>
      <div className='relative app-left-body'>
        <div className='sticky top-0 w-full z-10'>
          <div className='w-11/12 mx-auto py-2'>
            <SearchBar
              inputProps={{ placeholder: 'Search or start a new chat' }}
            />
          </div>
        </div>
        <div className='absolute bottom-0 w-full top-[52px] overflow-auto'>
          <div></div>
        </div>
      </div>
    </>
  )
}
