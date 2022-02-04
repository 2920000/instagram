import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { actionFollow } from '../features/followSlice'
function UsersSuggested(){

    // sai khi reload lại trang
     
     //tat ca user chua docId
     const allUsersContainDocId=useSelector(state=>state.posts.users)
    const dispatch=useDispatch()
     //ID cua user dang đăng nhập
     const userId=useSelector(state=>state.user.userId)
     // thông tin user đang đăng nhập chứa docId
     const userCurrentLoggedInfor=allUsersContainDocId.find(user=>user.userId===userId)

    const allUsersSuggested=useSelector(state=>state.allUsers.allUsers)
     
     if(userCurrentLoggedInfor){
 // docId  user đang đăng nập
 const docIdUserCurrentLogged=userCurrentLoggedInfor.docId
 
 const handleFollow=(userIdClickedToFollow,docId,followersOfUserClicked,userCurrentLoggedInfor,userNameClickedToFollow,userAvatarClickedToFollow,userFollowersClicked,allUsersContainDocId)=>{
     dispatch(actionFollow(userIdClickedToFollow,docId,followersOfUserClicked,userCurrentLoggedInfor,userNameClickedToFollow,userAvatarClickedToFollow,userFollowersClicked,allUsersContainDocId))
 }
return <div>
   <div className='max-w-[600px] m-auto mt-[100px]'>
       <p className='font-medium mb-2 ml-2 '>Gợi ý</p>

       <div className='w-full rounded-sm bg-whiteColor '>
          {allUsersSuggested.map(user=><div className='flex items-center justify-between px-3 py-2' key={user.userId}>
          <Link to={`/user/${user.userId}/`}>
                 <div className='flex items-center gap-x-2'>
                   <div><img className='w-10 h-10 cursor-pointer rounded-full' src={user.avatar} alt='' /></div>
                    <span className='text-sm cursor-pointer font-medium'>{user.userName}</span>
                 </div>
         </Link>
                 <div>
                 {user.followers.some(user=>user.userId===userCurrentLoggedInfor.userId)
                            ?<div className=''>
                                 <span onClick={()=>{handleFollow(user.userId,docIdUserCurrentLogged,user.followers,userCurrentLoggedInfor,user.userName,user.avatar,user.followers,allUsersContainDocId)}}  className='py-1 px-2.5 text-sm font-medium rounded border cursor-pointer border-borderColor'>Đang theo dõi</span>
                            </div>
                            :<span onClick={()=>{handleFollow(user.userId,docIdUserCurrentLogged,user.followers,userCurrentLoggedInfor,user.userName,user.avatar,user.followers,allUsersContainDocId)}} className='rounded py-1.5 px-3  bg-[#0095f6] text-sm font-medium cursor-pointer text-whiteColor'>Theo dõi</span>}
                 </div>

          </div>)}
       </div>
   </div>
</div>

     }
     else
     {
         return ''
     }
    
}

export default UsersSuggested;
