import React,{memo} from 'react';
import {useSelector} from 'react-redux'
function Stories() {
  const userIdCurrentLogged=useSelector(state=>state.user).userId
const userCurrentLogged=useSelector(state=>state.posts.users).find(user=>user.userId===userIdCurrentLogged)

// console.log(usersFollowing)
if(userCurrentLogged===undefined){
 return ''
}
else{
  const cat= userCurrentLogged.following.slice(0,8)
  return <div className='w-full py-3' >
  {cat.length>0?<div className='flex'>{cat.map(user=><div key={user.userId} className='flex flex-col cursor-pointer space-y-1 items-center'>
          <span><img  className='w-14 h-14 rounded-full shadow-inner object-cover outline outline-[#e45478] p-[1.5px] ' src={user.avatar} alt='' /></span>
          <span className='text-xs w-[70px]  text-center text-ellipsis whitespace-nowrap overflow-hidden'>{user.userName}</span>
      
    </div>)}</div>:<p className='text-sm font-medium  text-center '>Bạn chưa theo dõi ai , hãy theo dõi để xem stories ở trên đây</p>}
</div>;
}


}

export default memo(Stories);
