import React from 'react';
import {MdOutlinePersonPin} from 'react-icons/md'
import {useSelector} from 'react-redux'
import { useParams} from 'react-router-dom'

function Tagged() {
  let {routeId} =useParams()
  const userId=useSelector(state=>state.user.userId)

  return <div className='flex flex-col items-center space-y-4 py-12' >
      <div className='rounded-full p-2 border-2 border-solid '><MdOutlinePersonPin className='text-4xl  ' /></div>
      {routeId===userId?<><p className='text-3xl font-light'> Ảnh có mặt bạn</p>
      <p className='text-sm max-w-[350px] text-center'>Khi mọi người gắn thẻ bạn trong ảnh, ảnh sẽ xuất hiện tại đây.</p></>:<p className='text-3xl font-light'> Chưa có ảnh nào</p>}
  </div>
}

export default Tagged;
