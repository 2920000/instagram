import React,{useEffect} from 'react';
import {Link, useParams} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { db } from '../config';
import UserInforUI from '../components/UserInforUI';
import {Outlet,useLocation} from 'react-router-dom'
import {AiOutlineTable} from 'react-icons/ai'
import {FiBookmark} from 'react-icons/fi' 
import {MdOutlinePersonPin} from 'react-icons/md'
import { getAllPosts } from '../features/postSlice';
function UserInfor() {
    const dispatch=useDispatch()
    let {routeId} =useParams()
    const loadingStatus=useSelector(state=>state.allUsers.loading)
    const allUsers=useSelector(state=>state.posts.users)
    const userId=useSelector(state=>state.user.userId)
   const filterUserId=allUsers.filter(user=>user.userId===routeId)

   useEffect(()=>{
    dispatch(getAllPosts())
    },[])
let  url =useLocation()

  return <div className='bg-bg-lightWhite z-10 mt-[40px]'>
          
        <div>
        {loadingStatus?
        <div className='flex items-center justify-center h-screen'>Loading....</div>
        :filterUserId.map(user=><UserInforUI key={user.userId} user={user} />)}
         
        </div>
            
              <div div className='max-w-5xl m-auto px-10'>
               <div className='flex justify-center space-x-16 border-t border-borderColor list-none '>
                 <Link to={`/user/${routeId}/`}><li className={`py-5 flex gap-x-1 ${`/user/${routeId}/`===url.pathname?'border-t border-black':'text-[#8e8e8e]'}  items-center text-xs font-medium`}><AiOutlineTable/> BÀI VIẾT</li></Link>
                {routeId===userId? <Link to={`/user/${routeId}/saved`}><li  className={`py-5  ${`/user/${routeId}/saved`===url.pathname?'border-t border-black':'text-[#8e8e8e]'} flex gap-x-1 items-center text-xs font-medium`}><FiBookmark/> ĐÃ LƯU</li></Link>:''}
                 <Link to={`/user/${routeId}/tagged`}><li  className={`py-5  ${`/user/${routeId}/tagged`===url.pathname?'border-t border-black':'text-[#8e8e8e]'} flex gap-x-1 items-center text-xs font-medium`}><MdOutlinePersonPin/> ĐƯỢC GẮN THẺ</li></Link>

               </div>
                <Outlet/>  
              </div>
              <div className='flex flex-col space-y-5 items-center py-16'>
                  <div className='flex space-x-5 text-[#8e8e8e] text-xs'>
                    <span>Meta</span>
                    <span>Giới thiệu</span>
                    <span>Blog</span>
                    <span>Việc làm</span>
                    <span>Trợ giúp</span>
                    <span>Api</span>
                    <span>Quyền riêng tư</span>
                    <span>Tài khoản liên quan nhất</span>
                    <span>Hashtag</span>
                    <span>Vị Trí</span>
                    <span>Instagram Lite</span>
                  

                  </div>

                  <div className='flex space-x-5 text-[#8e8e8e] text-xs'>
                     <span>Tiếng Việt</span>
                      <span>@ 2022 Instagram from Meta</span>
                  </div>
              </div>
              
            
      
      
  </div>;
}

export default UserInfor;
