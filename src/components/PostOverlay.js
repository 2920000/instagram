import React,{useEffect,useState} from 'react';
import {ImFilePicture} from 'react-icons/im'
import {CgClose} from 'react-icons/cg'
import {BiArrowBack} from 'react-icons/bi'
import {useDispatch,useSelector} from 'react-redux'
import { SHOW_OR_OFF_BOX_POST,CHECK_TYPE_POST ,LINK_POSTS_PREVIEW,addPost,LINK_UPLOAD_FIREBASE} from '../features/postSlice';
import {v4 as uuidv4 } from 'uuid'
function PostOverlay() {
  const dispatch=useDispatch()
  const [message,setMessage]=useState('')
  const isShow=useSelector(state=>state.posts.isShow)
  const type=useSelector(state=>state.posts.type)
  const linkPreview=useSelector(state=>state.posts.linkPreview)
  const userLogged=useSelector(state=>state.user)
  const docIdCurrentLogged=useSelector(state=>state.allUsers.userCurrentLoggedDociD)
  const postsUserCurrentLogged=useSelector(state=>state.allUsers.postsUserCurrentLogged)
  const linkUpToFirebase=useSelector(state=>state.posts.linkUpToFirebase)


  // const filterArrayPostUserCurrentLogged=users.filter(user=>user.userId===userLogged.userId)
  //handle close by overLay
  // useEffect(()=>{
  // const postBox=  document.querySelector('#postBox')
  // const eventMoseDown=  document.addEventListener('mousedown',event=>{    
  //      if(postBox!==null){
  //       if(!postBox.contains(event.target)){
  //         dispatch(SHOW_OR_OFF_BOX_POST(false))
  //       }
  //      }
  //  })
  //  return ()=>{
  //  document.removeEventListener('mousedown',eventMoseDown,true)
  //  }
  // })

  //dispatch off postBox
  const handleOffBoxPost=()=>{
    dispatch(SHOW_OR_OFF_BOX_POST(false))
    dispatch(LINK_POSTS_PREVIEW())
    document.body.style.overflow='auto'
  }
  const handleUpPost=(e)=>{
  
  const urlPreview=URL.createObjectURL(e.target.files[0])
  dispatch(CHECK_TYPE_POST(e.target.files[0].type.slice(0,5)))

  dispatch(LINK_POSTS_PREVIEW(urlPreview))
  dispatch(LINK_UPLOAD_FIREBASE(e.target.files[0]))
    
  }
  //Cai uid de them id
  const POSTS= {
    postsPrevious:[...postsUserCurrentLogged],
    postCurrent:{
      postId:uuidv4(),
      userName:userLogged.userName,
      message:message,
      avatar:userLogged.avatar,
      link:linkUpToFirebase,
      type:type, 
      love:[],
      comments:[],
      docId:docIdCurrentLogged,
      
    },
    docId:docIdCurrentLogged
  }
  const handlePost=()=>{
    dispatch(addPost(POSTS))
    dispatch(SHOW_OR_OFF_BOX_POST(false))
    dispatch(LINK_POSTS_PREVIEW())
    document.body.style.overflow='auto'
  }
  const handleDeletePost=()=>{
  dispatch(LINK_POSTS_PREVIEW())
  }

  return <div>
    {isShow&&<div className='absolute  top-0 bottom-0 right-0  left-0 bg-[rgba(37,37,37,1)] mix-blend-multiply h-screen'>
             <div className='absolute right-4 top-4' onClick={handleOffBoxPost} ><CgClose className='text-4xl cursor-pointer  text-whiteColor' /></div>
             <div id='postBox'  className='w-[500px] overflow-hidden  rounded-xl z-30 m-auto absolute top-2/4 translate-y-[-50%] left-2/4 translate-x-[-50%] bg-whiteColor h-[540px]'>
              
             {linkPreview? 
             <div>
                <div className=''>
                  <div className='flex justify-between items-center py-2 px-3'>
                      <span onClick={handleDeletePost} className='text-2xl cursor-pointer'><BiArrowBack/></span>     
                      <span onClick={handlePost}  className='font-medium text-blueColor cursor-pointer'>Post</span>
                  </div>

                  <div className='px-2 mt-5'>
                      <div className='flex items-center gap-x-2  '> 
                       <img className='w-8 h-8  rounded-full' src={userLogged.avatar} alt='' />
                        <span className='font-medium text-sm'>{userLogged.userName}</span>
                      </div>
                    <div><textarea autoFocus onChange={(e)=>{setMessage(e.target.value)}}  className='border-0 w-full pt-2 outline-none' placeholder='Viết chú thích' /></div>
                  </div>
                  
                </div> 

           <div className='flex items-center   h-full'>
                 {type==='image' &&<img className=' object-contain  max-w-full mt-5 '  src={linkPreview} alt=''/> }
                 {type==='video'&& <video width="500"  controls className='mt-5'>
                 <source src={linkPreview} type="video/mp4"/>

               </video>}
                </div>
             </div>
             
              :<><div className='text-center py-2 border-b border-borderColor font-medium'>Tạo bài viết mới</div>
               <div className='flex items-center h-full  justify-center flex-col space-y-5'>
                  <ImFilePicture className='text-7xl'/>
                  <span className='text-xl font-light'>Kéo ảnh và video vào đây</span>
                  <input className=' hidden' onChange={(e)=>{handleUpPost(e)}} id='file-upload' type='file' />
                  <label  className='cursor-pointer py-2 px-2 text-sm rounded leading-none text-whiteColor font-medium bg-[#0095f6]' htmlFor='file-upload'>Chọn từ máy tính</label>
               </div></>}

             </div>
       </div>}
       <div></div>
  </div>
}

export default PostOverlay;
