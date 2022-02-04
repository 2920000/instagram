import React, { useEffect ,useRef, useState} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { getAllPosts } from '../features/postSlice';
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai'
import {BiMessageRounded} from 'react-icons/bi'
import {FiSend,FiBookmark} from 'react-icons/fi'
import {CgSmile} from 'react-icons/cg'
import { updateLovePost } from '../features/postSlice';
import { Link } from 'react-router-dom';
function MainPosts() {
  const dispatch=useDispatch()
  const userIdCurrentLogged= useSelector(state=>state.user.userId)
   const allUsers=useSelector(state=>state.posts.users)
   const allPosts=useSelector(state=>state.posts.posts)

   const isLoad=useSelector(state=>state.posts.loading)
   if(isLoad){
     document.body.style.overflow='hidden'
   }else{
    document.body.style.overflow='auto'

   }
 
  //  console.log(allPosts)
   useEffect(()=>{
    dispatch(getAllPosts())
    //
    
     },[])
   const UserCurrentLogged=allUsers.find(user=>user.userId===userIdCurrentLogged)
  //  console.log()
   if(UserCurrentLogged===undefined){
     return ''
   }
   else{
     // những bài post của user đang đăng nhập  
    const postsOfUserCurrentLogged= allUsers.find(user=>user.userId===userIdCurrentLogged).posts
// Tìm kiếm user đã theo dõi
const followingOfUserCurrentLogged=UserCurrentLogged.following
const filter=allUsers.map(user=>{
  for(let i=0;i<followingOfUserCurrentLogged.length;i++){
    if(followingOfUserCurrentLogged[i].userId===user.userId){
       return user  
    }
  }
  
})
// loại bỏ objectUser thừa
const filterUser=filter.filter(user=>user!==undefined)
// lấy ra mảng chứa cái object posts
const allPostsFollowed=filterUser.map(user=>user.posts)
// nối các posts của user đã theo dõi thành 1 mảng
let posts=[...postsOfUserCurrentLogged]
   for(let i=0;i<allPostsFollowed.length;i++){
        posts=[...posts,...allPostsFollowed[i]]
   }
   //handle update love theo user
 const handleScale=(postIdClicked,userIdCurrent,allPosts,allUsers)=>{
  dispatch(updateLovePost(postIdClicked,userIdCurrent,allPosts,allUsers))
 }
 return <>
 {isLoad&&<div>
      <div className='absolute bg-greyColor z-40  mix-blend-multiply  top-0 right-0 left-0 bottom-0 '>
      </div>
      <div className='absolute top-2/4 left-2/4 z-50   translate-x-[-50%] translate-y-[-50%]'>
      <div className='w-[500px] h-[500px] rounded-xl flex flex-col bg-whiteColor'>
           <div className=' font-medium flex justify-center py-2.5 border-b border-borderColor'>Đang chia sẻ</div>
             <div className='grow flex justify-center items-center '>
                 <div className='w-24  h-24 bg-[rgb(228_86_121)] relative  animate-spin  rounded-full'>
                       <div className='absolute top-[5px] right-[5px] bottom-[5px]  left-[5px] bg-whiteColor rounded-full'></div>
                       <div className='absolute w-12  h-12  bg-whiteColor '></div>
                 </div>
             </div>    
             </div>
      </div>
 </div>}
 {posts.length>0?<div>
  {posts.map(post=><div  key={post.postId} className='my-5 border border-borderColor rounded'>
 <div className='flex p-3 justify-between' >
   <Link to={`user/${userIdCurrentLogged}/`}><div className='flex gap-x-4 items-center  '>
     <img className='w-8 h-8 rounded-full' src={post.avatar} alt=''/>
      <span className='text-sm font-medium'>{post.userName}</span>
   </div></Link>
    <div className=''>...</div>
 </div>
   <div >
   
      {post.type==='image'?<img className=' object-fill w-full' src={post.link} alt='' />: <video   controls className='  object-cover w-full '>
                 <source src={post.link} type="video/mp4"/>
               </video>}
     
   </div>
   <div className='flex justify-between px-4 py-3 '> 
    <div className='flex gap-x-4 '>
      <span className='relative'><AiOutlineHeart  className='text-[28px] cursor-pointer  '/>
      { <div onClick={()=>{handleScale(post.postId,userIdCurrentLogged,allPosts,allUsers)}} className={`text-[28px] opacity-${post.love.some(userId=>userId===userIdCurrentLogged)?'1':'0'}  absolute top-0 transition-transform duration-700  ${post.love.some(userId=>userId===userIdCurrentLogged)?'':'active:scale-[2]'}  cursor-pointer text-[#ed4956]`}><AiFillHeart/></div>}
      </span>
      <span><BiMessageRounded className='text-[28px] cursor-pointer'/></span>
      <span><FiSend className='text-[26px] cursor-pointer'/></span>
     
    </div>
    <div>
       <FiBookmark className='text-[26px] cursor-pointer'/>
    </div>
   </div>
    <div className='px-5 pb-5'>
        <div className='text-sm font-medium '>
            {post.love.length>0?<span>{post.love.length} lượt thích</span>:''}
        </div>
        {post.message?<div className='flex items-center gap-x-2 '>
          <div className='font-medium text-sm'>{post.userName}</div>
          <div>{post.message}</div>
        </div>:''}
        <p className='text-sm text-greyColor' >Xem tất cả bình luận</p>
       
    </div>
    <div className='flex items-center border-t  border-greyLightColor justify-between'>
      <div className='py-3 px-4 cursor-pointer'><CgSmile className='text-3xl'/></div>
      <div className='grow'><input    className='w-full bg-[#fafafa] border-0 text-sm outline-none' placeholder='Thêm bình luận'/></div>
       <span className='p-4 text-sm font-medium cursor-pointer'>Đăng</span>
    </div>
  </div>)}
 </div>:<div className='flex items-center justify-center mt-36 text-sm font-medium'>Hãy theo dõi người dùng có đăng bài viết , để xem bài viết của họ ở đây</div>}</>
   }

  
    

 
 

 
}

export default MainPosts;
