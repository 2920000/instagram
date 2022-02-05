import React,{useEffect} from 'react';
import {useParams,Outlet, Link,useLocation} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {BsChevronDown} from 'react-icons/bs'
import { addUserToChatBox } from '../features/chatSlice';
import chatSlice from '../features/chatSlice';
function Inbox() {
    const {chatBox}=useParams()
    const url=useLocation().pathname
    const dispatch=useDispatch()

   const allUsers=useSelector(state=>state.posts.users)
   const filterChatBoxOfUserCurrentLogged=allUsers.find(user=>user.userId===chatBox)

   if(filterChatBoxOfUserCurrentLogged){
    dispatch(chatSlice.actions.CHATBOX_OF_USERCURRENTLOGGED(filterChatBoxOfUserCurrentLogged.chatBox))
   const usersInChatBox=filterChatBoxOfUserCurrentLogged.chatBox
    return <div className='mt-12'>
    <div className='max-w-[940px] m-auto h-[620px] rounded flex border border-borderColor  '>
        <div className='flex w-[350px] flex-col'>
              <div className='flex justify-center border-b border-borderColor '>
                 <div className='py-5  font-medium flex items-center gap-x-2  '>{filterChatBoxOfUserCurrentLogged.userName} <BsChevronDown className='cursor-pointer text-xl'/></div>
             </div>
            
             <div className='flex  flex-col overflow-y-auto h-full'>
                <div className='font-medium pl-5 pt-2 pb-1'>Tin nhắn</div>
                {usersInChatBox.map(chat=><div key={chat.boxId}>
                <div>
                    <Link to={`/inbox/${filterChatBoxOfUserCurrentLogged.userId}/${chat.boxId}`}><div className={`${url===`/inbox/${chatBox}/${chat.boxId}`?'bg-greyLightColor':''}  flex items-center gap-x-3 px-5 py-1.5`}>
                        <img className='w-14 h-14 rounded-full' src={chat.avatar} alt='' />
                        <span className='font-light'>{chat.userName}</span> 
                    </div></Link>
                </div>
                </div>)}
          </div>
        </div>
        <div className='flex grow h-full border-l border-borderColor '>
              <Outlet/>
        </div>
    </div>
</div>;
   }
   else
   {
       return ''
   }
 
}

export default Inbox;
