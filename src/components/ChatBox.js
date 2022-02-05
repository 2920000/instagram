import React, { useEffect ,useState} from 'react';
import {useParams} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {addMessage} from '../features/chatSlice'
function ChatBox() {
  
    const {boxId}=useParams()
    const [input,setInput]=useState()
   
    const dispatch=useDispatch()
  
    const chatBoxes=useSelector(state=>state.chat.chatBox)
    
    const filterChatBoxById=chatBoxes.find(box=>box.boxId===boxId)
    const chatBoxId=filterChatBoxById.boxId
    const x=useSelector(state=>state)
    console.log(x)
    if(filterChatBoxById){

     
      const handleSubmit=(e)=>{
        e.preventDefault()
       dispatch(addMessage({
         avatar:filterChatBoxById.avatar,
         message:input
       },chatBoxId))
      }
      return <div className='  w-full flex flex-col'>
   
      <div className='px-10 py-5 flex items-center gap-x-3 border-b border-borderColor '>
        <div><img className='w-5 h-5 rounded-full' src={filterChatBoxById.avatar} alt='' /></div>
           <span className='font-medium '>{filterChatBoxById.userName}</span>
      </div>

      <div className='flex grow overflow-y-auto'>
              {filterChatBoxById.messages.map(message=><div>
                  {message}
              </div>)}
             
      </div>
      <div className='flex items-center justify-center'>
               
                 <form className='w-[90%] my-5'>
                    <input   autoFocus value={input} onChange={(e)=>{setInput(e.target.value)}}  className='w-full h-[20px] border px-5 py-5 border-borderColor outline-none rounded-3xl ' placeholder='Nhắn tin' />
                    <button onClick={handleSubmit} ></button>
                 </form>
            
      </div>
 </div>

    }
    else{
      return ''
    }
    
 
}

export default ChatBox;
