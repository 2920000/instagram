import React from 'react';
import {useParams} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
function ChatBox() {
    const {boxId}=useParams()
    const dispatch=useDispatch()
    const allUsers=useSelector(state=>state.posts.users)
    const filterChatBoxOfUserClickedToChat=allUsers.find(user=>user.userId===boxId)
    
        
    
  return <div className='flex  flex-col'>
       <div className='font-medium pl-5 pt-2 pb-1'>Tin nhắn</div>
       <div>
           <div className='flex items-center gap-x-3 px-5 py-1.5'><img className='w-14 h-14 rounded-full' src={filterChatBoxOfUserClickedToChat.avatar} alt='' /><span className='font-light'>{filterChatBoxOfUserClickedToChat.userName}</span> </div>
       </div>
  </div>
}

export default ChatBox;
