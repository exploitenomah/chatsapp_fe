import FriendsSuggestionsIcon from '@assets/FriendsSuggestionsIcon'
import LeftArrow from '@assets/LeftArrow'
import Button from '@components/HTML/Button'
import { useState } from 'react'
import ChatItem from '../Chats/ChatItem'
import LeftDrawer from '../LeftDrawer'
import SearchBar from '../SearchBar'

export default function FriendsDrawer() {
  const [show, setShow] = useState(true)

  return (
    <LeftDrawer zIndex={'z-[100]'} show={show}>
      <div className='relative h-full'>
        <header className='h-[108px] flex flex-col justify-end text-contrast-tetiary/80 bg-secondary-default px-6'>
          <div className='h-[59px] flex items-center'>
            <Button className='p-0 w-12' onClick={() => setShow(false)}>
              <LeftArrow />
            </Button>
            <span className='text-lg font-medium'>Friends</span>
          </div>
        </header>
        <div className='py-2 pl-2 pr-3'>
          <SearchBar inputProps={{ placeholder: 'Search friends' }} />
        </div>

        <div className='pr-[4px] h-[82.3%] absolute bottom-0 w-full top-[160px] overflow-auto'>
          <div>
            <Button
              className={`p-0 h-[72px] shadow-none text-contrast-strong/80 rounded-none w-full flex items-center bg-primary-default hover:bg-secondary-default cursor-pointer`}
            >
              <span className='inline-block px-4'>
                <span className='bg-accent-dark rounded-full h-12 w-12 flex justify-center items-center'>
                  <FriendsSuggestionsIcon className='text-contrast-tetiary' />
                </span>
              </span>
              <span className='border-y border-y-contrast-secondary/20 h-full flex items-center grow font-normal'>
                Suggestions
              </span>
            </Button>
          </div>
          <div className='uppercase text-accent-darkest font-normal pt-7 pb-4 pl-8'>
            Friends on ChatsApp
          </div>
          <div>
            <div>
              <ChatItem />
              <ChatItem />
              <ChatItem />
              <ChatItem />
              <ChatItem />
              <ChatItem />
              <ChatItem />
              <ChatItem /> <ChatItem />
              <ChatItem />
              <ChatItem />
              <ChatItem /> <ChatItem />
              <ChatItem />
              <ChatItem />
              <ChatItem /> <ChatItem />
              <ChatItem />
              <ChatItem />
              <ChatItem /> <ChatItem />
              <ChatItem />
              <ChatItem />
              <ChatItem />
              <ChatItem />
              <ChatItem />
              <ChatItem />
              <ChatItem />
              <ChatItem />
              <ChatItem />
            </div>
          </div>
        </div>
      </div>
    </LeftDrawer>
  )
}
