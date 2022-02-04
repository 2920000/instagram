import React, { useState,useRef } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import { actionFollow } from '../features/followSlice';
import {VscDeviceCamera} from 'react-icons/vsc'
function MainRight() {
  const dispatch=useDispatch()
  const [userId,setUserId]=useState()
  const [clearTimeOut,setClearTimeOut]=useState()
   
    const userData=useSelector(state=>state.user)
    const allUsers=useSelector(state=>state.allUsers.allUsers)
    const  allUsersExceptYou=allUsers.filter(user=>user.userId!==userData.userId)  
     const limitUserShow=allUsersExceptYou.slice(0,5)
     //
     const users=useSelector(state=>state.posts.users)
     const userCurrentLoggedInfor=users.find(user=>user.userId===userData.userId) 
   
     const allUsersContainDocId=useSelector(state=>state.posts.users)
    //  console.log(userCurrentLoggedInfor)
    const handleOnMouseEnter=(id)=>{
    const x =  setTimeout(()=>{
      setUserId(id)
     },1000)
     setClearTimeOut(x)
    }

   const handleOnMouseLeave=(e)=>{
    
    setUserId()
    clearTimeout(clearTimeOut)
     
   }
  const handleUnscribe=()=>{
    clearTimeout(clearTimeOut)
  }
  const docIdUserCurrentLogged=useSelector(state=>state.allUsers.userCurrentLoggedDociD)
   const handleFollow=(userIdClickedToFollow,docId,followersOfUserClicked,userCurrentLoggedInfor,userNameClickedToFollow,userAvatarClickedToFollow,userFollowersClicked,allUsersContainDocId)=>{
      dispatch(actionFollow(userIdClickedToFollow,docId,followersOfUserClicked,userCurrentLoggedInfor,userNameClickedToFollow,userAvatarClickedToFollow,userFollowersClicked,allUsersContainDocId))
   }

 
  return <div className='py-5   fixed max-w-[293px] w-full'>
      <div className='flex space-x-3  items-center'>
            <Link to={`/user/${userData.userId}/`}><div><img onClick={handleUnscribe} className='w-[55px] h-[55px] cursor-pointer rounded-full' src= {userData.avatar} alt=''/></div></Link>
           <Link to={`/user/${userData.userId}/`}><div onClick={handleUnscribe} className='cursor-pointer font-medium text-sm'>{userData.userName}</div></Link>
      </div>

      <div className='py-5'>
        <div className='flex justify-between items-center'>
            <span className='text-greyColor cursor-pointer font-medium text-sm'>Gợi ý cho bạn</span>
            <Link to='/people'><span className='text-xs cursor-pointer font-medium'>Xem tất cả</span></Link>
        </div>

        <div className='mt-5'> 
             {limitUserShow.map((user,index)=>(
                <div key={user.userId}   className='flex relative mb-4 justify-between items-center'>
                       <div className='flex items-center space-x-2'  >  
                        <div onMouseEnter={()=>{handleOnMouseEnter(user.userId)}} onMouseLeave={(e)=>{handleOnMouseLeave(e)}} className='relative'> <Link to={`/user/${user.userId}/`}><img   className='w-8 h-8 rounded-full object-cover ' src={user.avatar} alt='' /> </Link>
                        
                        {userId===user.userId?<div id='box1'   className={` absolute  z-30 ${index>2?'bottom-7':'top-7'}  w-[400px] rounded-xl shadow-md bg-whiteColor `}>
                          <div className='flex space-x-3 px-4 py-5 items-center'><img className='w-12 h-12 rounded-full object-cover cursor-pointer'  src={user.avatar} alt='' /> <span className='text-sm font-medium cursor-pointer' >{user.userName}</span></div>
                           <div className='flex justify-around  p-4 border-y border-borderColor' >
                               <div className='flex flex-col items-center'>
                                   <span className='font-medium'>{user.posts.length}</span>
                                   <span className='text-greyColor text-sm'>bài viết</span>
                               </div>
                               <div className='flex flex-col items-center'>
                                   <span className='font-medium'>{user.followers.length}</span>
                                   <span className='text-greyColor text-sm'>người theo dõi</span>
                               </div>
                               <div className='flex flex-col items-center'>
                                   <span className='text-greyColor text-sm'>Đang theo dõi </span>
                                    <span className='font-medium'>{user.following.length}</span>
                                    <span className='text-greyColor text-sm'>người dùng</span>
                               </div>
                           </div>
                           {user.posts.length>0?<div className='grid grid-cols-3 mx-[2px] '>{user.posts.map((post,index)=>{
                             if(index<=2){
                            return  <div key={post.postId}>
                           {post.type==='image'? <img className='h-32 cursor-pointer  object-cover w-full' src={post.link} alt='' />:<video className='h-full bg-greyColor' controls><source src={post.link} type='video/mp4' /></video>}
                              
                           </div>
                             }
                             else{
                               return  ''
                             }
                           })}</div>:
                            <div className='flex flex-col items-center pt-5 pb-2 '>
                                 <span><VscDeviceCamera className='text-3xl'/></span>
                                 <span className='font-medium text-sm'>Chưa có bài viết nào</span>
                                 <span></span>
                           </div>}
                           
                           <div className='flex items-center justify-center py-3.5 border-t border-borderColor'>{user.followers
                           ?<div>
                               {user.followers.some(user=>user.userId===userCurrentLoggedInfor.userId)
                               ?<div className='flex items-center gap-x-2'>
                                    <span className='py-1 px-14 text-sm font-medium rounded border cursor-pointer border-borderColor'>Nhắn tin</span>
                                    <span onClick={()=>{handleFollow(user.userId,docIdUserCurrentLogged,user.followers,userCurrentLoggedInfor,user.userName,user.avatar,user.followers,allUsersContainDocId)}}  className='py-1 px-14 text-sm font-medium rounded border cursor-pointer border-borderColor'>Đang theo dõi</span>
                               </div>
                               :<span onClick={()=>{handleFollow(user.userId,docIdUserCurrentLogged,user.followers,userCurrentLoggedInfor,user.userName,user.avatar,user.followers,allUsersContainDocId)}} className='rounded-md py-1.5 px-40 bg-[#0095f6] text-sm font-medium cursor-pointer text-whiteColor'>Theo dõi</span>}

                           </div>
                           :''}</div>
                         </div>:''}
                         
                        </div>

                        
                         <Link to={`/user/${user.userId}`}><div  className='text-sm font-medium cursor-pointer'>{user.userName}</div></Link>
                       </div> 
                       <span onClick={()=>{handleFollow(user.userId,docIdUserCurrentLogged,user.followers,userCurrentLoggedInfor,user.userName,user.avatar,user.followers,allUsersContainDocId)}} className='cursor-pointer' >{userCurrentLoggedInfor===undefined?<></>:<>{userCurrentLoggedInfor.following.some(userCurrent=>userCurrent.userId===user.userId)?<span className='text-xs font-medium'>Đã theo dõi</span>:<p className='text-[#0095f6] font-medium text-xs cursor-pointer' >Theo dõi</p>}</>}</span>

                </div>
             ))}
        </div>
      </div>
    
       <div>
       <div className='text-[0.70rem] text-greyColor'>Giới thiệu &middot; Trợ giúp &middot; Báo chí &middot; API&middot; Việc làm &middot;</div>
      <div className='text-[0.70rem] text-greyColor' >Quyền riêng tư &middot; Điều khoản &middot; Vị trí &middot; </div>
      <div className='text-[0.70rem] text-greyColor'>Tài khoản liên quan nhất &middot; Hashtag &middot; Ngôn ngữ </div>
       </div>
       <div className='text-[0.70rem] text-greyColor mt-5'>@ 2022 INSTAGRAM FROM META</div>
  </div>
}

export default MainRight;
