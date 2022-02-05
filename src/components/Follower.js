import React from 'react';
import {Link, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
function Follower() {
  let {routeId} =useParams()
  const allUsers=useSelector(state=>state.posts.users)
  const filterFollowersByRouteId=allUsers.find(user=>user.userId===routeId)
  const followers=filterFollowersByRouteId.followers
 
  return  <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50'>
  <div className='bg-whiteColor flex flex-col w-[400px] h-[400px] rounded-xl z-50'>
        <div className='py-2.5 flex items-center justify-center font-medium border-b border-borderColor'>Người theo dõi</div>

        <div className='overflow-y-auto flex flex-col grow h-full'>
            {followers.map(userInfor=><div key={userInfor.userId}>
            <Link to={`/user/${userInfor.userId}`}  className='flex px-4 py-2  gap-x-2 items-center'> <div><img className='w-8 h-8 rounded-full  cursor-pointer ' src={userInfor.avatar}  alt='' /></div>
              <span className='cursor-pointer'>{userInfor.userName}</span></Link>
            </div>)}
        </div>
      </div>
</div>;
}

export default Follower;
