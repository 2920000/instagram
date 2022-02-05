import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import {VscDeviceCamera} from 'react-icons/vsc'
import { getYourPosts} from '../features/postSlice';
function Posts() {
  const dispatch=useDispatch()
  let {routeId} =useParams()
  const myId=useSelector(state=>state.user.userId)  
  const myPosts=useSelector(state=>state.posts.myPosts)
  const allUsers=useSelector(state=>state.posts.users)
  const filterUserById=allUsers.find(user=>user.userId===routeId)
// const users=useSelector(state=>state.posts.users)
// const filterUserById1=users.find(user=>user.userId===routeId)

//   console.log(filterUserById1)


useEffect(()=>{
  dispatch(getYourPosts(myId))
},[])
  return <>{filterUserById?<>{routeId===myId?<div className='flex '>
  {myPosts.length>0?<div className='grid grid-cols-3 gap-x-7  gap-y-7'>
   {myPosts.map(post=>
   <div key={post.postId} className='max-w-[300px] min-h-[300px] '>
   {post.type==='image'?<img className='h-full w-full object-cover cursor-pointer'  src={post.link} alt='' />:''}
   {post.type==='video'?<video className='h-full bg-greyColor top-0' controls>
     <source src={post.link} type='video/mp4' />
   </video>:''}
   </div>
  
   
   )}
  </div>:
  <><div className='text-2xl font-light' ><img className='max-w-[380px]' src='https://www.instagram.com/static/images/mediaUpsell.jpg/6efc710a1d5a.jpg' alt='' /></div>
  <div className='flex flex-col justify-center gap-y-2 items-center grow bg-whiteColor '>
    <p className='font-medium text-lg'>Bắt đầu ghi và chia sẻ khoảnh khắc của bạn</p>
    <p>Tải ứng dùng để chia sẻ ảnh học video đầu tiên của bạn</p>
    <div className='flex mt-4 space-x-2 '>
        <div> <img className='w-32' src='https://www.instagram.com/static/images/appstore-install-badges/badge_ios_vietnamese-vi.png/3025bd262cee.png' alt='' /></div>
        <div> <img className='w-32' src='https://www.instagram.com/static/images/appstore-install-badges/badge_android_vietnamese-vi.png/c36c88b5a8dc.png' alt=''/></div>
       
    </div>
  </div></>}

</div>:
<div>{filterUserById.posts.length>0?<div className='grid grid-cols-3 gap-x-7  gap-y-7'>
 {filterUserById.posts.map(post=>
  <div key={post.postId} className=' '>
   
   {post.type==='image'?<img className='w-[300px] h-[300px] object-cover  cursor-pointer'  src={post.link} alt='' />:''}
   {post.type==='video'?<video className='h-[300px] w-full cursor-pointer bg-greyColor top-0' controls>
     <source src={post.link} type='video/mp4' />
   </video>:''}
   </div>
 )}

</div>:<div className='flex flex-col items-center space-y-10 py-20'><div><VscDeviceCamera className='text-3xl '/></div> <span className='text-3xl font-light'>Chưa có bài viết</span>  </div>}</div>}</>:''}</>
}

export default Posts;
