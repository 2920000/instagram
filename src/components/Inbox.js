import React from 'react';
import {useParams,Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {BsChevronDown} from 'react-icons/bs'
function Inbox() {
    const {chatBox}=useParams()
   const allUsers=useSelector(state=>state.posts.users)
   const filterChatBoxOfUserCurrentLogged=allUsers.find(user=>user.userId===chatBox)
   console.log(filterChatBoxOfUserCurrentLogged)
   if(filterChatBoxOfUserCurrentLogged){
    return <div className='mt-12'>
    <div className='max-w-[940px] m-auto h-[620px] rounded flex border border-borderColor  '>
        <div className='flex w-[350px] flex-col'>
              <div className='flex justify-center border-b border-borderColor'>
                 <div className='py-5  font-medium flex items-center gap-x-2  '>{filterChatBoxOfUserCurrentLogged.userName} <BsChevronDown className='cursor-pointer text-xl'/></div>
             </div>
             <Outlet/>
        </div>
        <div className='flex grow h-full border-l border-borderColor '>
          
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
