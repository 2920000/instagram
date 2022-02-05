import React,{useEffect, useState} from 'react';
import Follower from './Follower'
import FollowerOverlay from './FollowerOverlay'
import Following from './Following'
import FollowingOverlay from './FollowingOverlay'
import {v4 as uuid} from 'uuid'
import {IoIosSettings} from 'react-icons/io'
import {BsChevronDown,BsThreeDots} from 'react-icons/bs'
import {FaUserCheck} from 'react-icons/fa'
import {IoChevronDown} from 'react-icons/io5'
import {useSelector,useDispatch} from 'react-redux'
import { actionFollow } from '../features/followSlice';
import { addUserToChatBox } from '../features/chatSlice';
import {useNavigate} from 'react-router-dom'
function UserInforUI({user}) {
    const [followers,setFollowers]=useState(false)
    const [following,setFollowing]=useState(false)
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    //ID cua user dang đăng nhập
    const userId=useSelector(state=>state.user.userId)
    //tat ca user chua docId
    const allUsersContainDocId=useSelector(state=>state.posts.users)
    // thông tin user đang đăng nhập chứa docId
    const userCurrentLoggedInfor=allUsersContainDocId.find(user=>user.userId===userId)
    // docId  user đang đăng nập
    const docIdUserCurrentLogged=userCurrentLoggedInfor.docId
    //ID cua user dang đăng nhập
    const userIdCurrentLogged=useSelector(state=>state.user.userId)
    // followers của người được click để xem thông tin
    const followersOfUserClickedToWatchProfile=user.followers
    // following của người được click để xem thông tin
    const followingOfUserClickedToWatchProfile=user.following

  const  checkUserCurrentLogged=followersOfUserClickedToWatchProfile.some(user=>user.userId===userIdCurrentLogged)
   

    const handleFollow=()=>{
        dispatch(actionFollow(user.userId,docIdUserCurrentLogged,user.followers,userCurrentLoggedInfor,user.userName,user.avatar,user.followers,allUsersContainDocId))
    }
    // handle hiện người follower
    const handleShowFollowers=()=>{
        setFollowers(true)
        document.body.style.overflow='hidden'
    }
    const handleShowFollowing=()=>{
       setFollowing(true)
       document.body.style.overflow='hidden'
    }
  useEffect(()=>{
   const event=document.addEventListener('mousedown',(event)=>{
       const followerOverlay= document.getElementById('followerOverlay')      
       const followingOverlay=document.getElementById('followingOverlay')  
           if(followerOverlay!==null){
            if(followerOverlay.contains(event.target)){
            }
            else{
               setFollowers(false)
               document.body.style.overflow='auto'
            }
           }
           if(followingOverlay!==null){
            if(followingOverlay.contains(event.target)){
            }
            else{
               setFollowing(false)
               document.body.style.overflow='auto'
            }
           }
           
    }) 
    return ()=>{
       document.removeEventListener('mousedown',event,true)
        
    }
  })

 
 
  const handleChat=(userCurrentLoggedInfor,userClickedToChat,boxId,)=>{
   dispatch(addUserToChatBox(userCurrentLoggedInfor,userClickedToChat,boxId))
  
  }


  const dataUserNew=useSelector(state=>state.chat.dataUserNew)
  const isDone=useSelector(state=>state.chat.load)

console.log(dataUserNew)
if(isDone===true && dataUserNew.chatBox.find(chatBox=>chatBox.userId===user.userId)!==undefined)
{navigate(`/inbox/${userCurrentLoggedInfor.userId}/${dataUserNew.chatBox.find(chatBox=>chatBox.userId===user.userId).boxId}`)}

  
  return <div className='max-w-5xl m-auto px-10'>
  
             <div className='flex px-20 py-6 gap-x-24 items-center '>
                    <div>
                        <img className='w-36 h-36 rounded-full object-cover' src={user.avatar} alt=''/>
                    </div>
                    
                    <div className='flex flex-col space-y-4'>
                            <div className='flex items-center space-x-4'>
                            <div className='text-2xl font-light'>{user.userName}</div> 
                            {userId===user.userId
                            ?<> <div className='border border-solid rounded py-[6px] leading-none px-2 font-medium text-sm cursor-pointer  border-greyColor'>Chỉnh sửa trang cá nhân</div>
                            <div><IoIosSettings className='text-2xl cursor-pointer'/></div></>

                            :<div>
                            {checkUserCurrentLogged
                            ?<div className='flex h-[30px] gap-x-2'>
                                <div onClick={()=>{handleChat(userCurrentLoggedInfor,user,uuid())}} className='h-full px-2 rounded border cursor-pointer border-borderColor font-medium text-sm flex items-center'>Nhắn tin</div>
                                <div onClick={()=>{handleFollow()}} className='h-full px-7 text-greyColor  cursor-pointer rounded border border-borderColor flex items-center'><FaUserCheck/></div>
                                <div className='h-full px-2 rounded border cursor-pointer border-borderColor flex items-center'><IoChevronDown/></div>

                            </div>
                            :<div className='flex gap-x-2 h-[30px] items-center '>
                            <div onClick={()=>{handleFollow()}} className=' h-full  flex items-center  px-6 text-whiteColor font-medium text-sm rounded bg-[#0095f6] cursor-pointer '>Theo dõi </div>
                            <div className='text-whiteColor px-2.5 h-full flex items-center rounded bg-[#0095f6] cursor-pointer'><BsChevronDown/></div>
                            <span className='px-1 text-xl cursor-pointer ' ><BsThreeDots/></span></div>
                            }
                            
                            </div>}

                            </div>
                            <div className='flex space-x-10'>
                                <div><span className='font-medium'>{user.posts.length}</span> bài viết </div>
                                {followersOfUserClickedToWatchProfile.length>0?<div><span className='font-medium cursor-pointer' onClick={()=>{handleShowFollowers()}}  >{user.followers.length}</span> người theo dõi</div>:<div><span className='font-medium '  >{user.followers.length}</span> người theo dõi</div>}
                               {followingOfUserClickedToWatchProfile.length>0? <div> Đang theo dõi  <span onClick={()=>{handleShowFollowing()}} className='font-medium cursor-pointer'>{user.following.length}</span> người dùng</div>: <div> Đang theo dõi  <span  className='font-medium'>{user.following.length}</span> người dùng</div>}
                            </div>
                            
                    </div>
                 
              </div>

              <div>
              
        
              

              </div>
             {followers&&<div  >
              <FollowerOverlay/>
              <div id='followerOverlay' ><Follower /></div>
              </div>}
            {following&&  <div>
              <FollowingOverlay/>
              <div id='followingOverlay'><Following/></div>
              </div>}
        </div>
}
// function Post(){
//     return(
//         <>
//             Post
//         </>
//     )
// }
export default UserInforUI;
