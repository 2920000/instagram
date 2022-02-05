import React,{useState,useRef,useEffect,memo} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {AiFillHome,AiOutlineHeart} from 'react-icons/ai'
import {FiSend} from 'react-icons/fi'
import {BiMessageSquareAdd} from 'react-icons/bi'
import {ImCompass2} from 'react-icons/im'
import {HiOutlineSearch,HiOutlineSwitchHorizontal} from 'react-icons/hi'
import {IoPersonCircleSharp,IoCloseCircle} from 'react-icons/io5'
import {MdOutlineBookmarkBorder} from 'react-icons/md'
import {RiSettings3Line} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import PostOverlay from './PostOverlay';
import { SHOW_OR_OFF_BOX_POST } from '../features/postSlice';
import { INITIALIZE_CHATBOX_SUCCESS } from '../features/chatSlice';


function Header() {
   const dispatch=useDispatch()
  const userId=useSelector(state=>state.user.userId)
  const users=useSelector(state=>state.posts.users)

  const [logOut,setLogOut]=useState(false)
  const [borderAvatar,setBorderAvatar]=useState(false)
  const [search,setSearch]=useState(false)
  const [closeSearchIcon,setCloseSearchIcon]=useState(false)
  const [filterUsers,setFilterUsers]=useState([])
  const [input,setInput]=useState('')


  const boxLogOut=useRef()
  const avatarRef=useRef()
  const boxSignOutRef=useRef()

 

    const avatar= useSelector(state=>state.user.avatar)
    const signOut=useSelector(state=>state.user.signOutMethod)

    const handleShowSignOut=(e)=>{
      if(boxLogOut.current!==undefined && boxLogOut.current!== null){
        boxLogOut.current.style.opacity='0'
        boxLogOut.current.style.transform='translateY(0)'
      
       }
       setTimeout(()=>{
        setLogOut(!logOut)
      setBorderAvatar(!borderAvatar)
       },100)
   
    }
 useEffect(()=>{
  
  const handleMouseDown= document.addEventListener('mousedown',(e)=>{
    
      if(boxSignOutRef!==null){
         if(!boxSignOutRef.current.contains(e.target))
      
      {
    
         if(boxLogOut.current!==undefined && boxLogOut.current!== null){
          boxLogOut.current.style.opacity='0'
          boxLogOut.current.style.transform='translateY(0)'
         }
     
         setTimeout(()=>{
          setLogOut(false)
          setBorderAvatar(false)
         },100)
      }
     
      }
    const searchBox= document.getElementById('searchBox')
     if(searchBox!==undefined&&searchBox!==null){
         if(!searchBox.contains(e.target)){
            setSearch(false)
           }
       
     
     }
    
       
   })
   //clean up event
   return ()=>{
  document.removeEventListener('mousedown',handleMouseDown,true)

   }
 })

    const handleSignOut=()=>{
   //   dispatch(CLEAR_USERS())
   // window.location.reload()
        signOut()
    }
    // Off box sign out
    const handleOffBoxSignOut=()=>{
       setLogOut(false)
    }
    //Show box post
    const handleShowPost=()=>{
  dispatch(SHOW_OR_OFF_BOX_POST(true))
 document.body.style.overflow='hidden'
    }
    //Hien thi box chat
    const handleShowBoxSearch=()=>{
      setSearch(true)
      setCloseSearchIcon(true)
     
    }
    // off box chat
    const handleCloseSearch=()=>{
      setSearch(false)
      setCloseSearchIcon(false)
      setInput('')
    }


   
      //handle tìm kiếm
     const usersFiltered= users.filter(user=>user.userName.includes(input))

  // Cần xem lại   
     const handleReStore=()=>{
dispatch(INITIALIZE_CHATBOX_SUCCESS(false))

     }
  return <>
     <div className='h-[60px] border-b border-borderColor fixed  w-full z-20  bg-whiteColor '>
       <div className=' relative  max-w-5xl m-auto h-full   flex items-center px-10  '>
           <div className='min-w-[120px] flex justify-start w-full '>        
              <Link onClick={handleReStore} to='/'>  <img  src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' alt='' /></Link>
           </div>
            <div className='w-[700px] hidden sm:block' >
                 <div className='flex items-center relative px-10 py-1 bg-greyLightColor rounded-md  '>
                    <HiOutlineSearch className='absolute left-3 text-lg text-greyColor '/>
                   <input onClick={handleShowBoxSearch} value={input}  onChange={(e)=>{setInput(e.target.value)}} className=' w-full border-none outline-none h-7 rounded-md bg-greyLightColor font-light ' placeholder='Tìm kiếm'/>
                     {closeSearchIcon&&<IoCloseCircle onClick={handleCloseSearch} className='text-greyColor text-lg absolute right-3'/>}
                 </div>
                 
            </div>
            <div className='w-full justify-end flex '>
               <div className='flex space-x-6 text-2xl items-center pl-5 '>
               <Link to='/'><AiFillHome className='cursor-pointer'/></Link>
               <FiSend className='cursor-no-drop'/>
               <BiMessageSquareAdd onClick={handleShowPost} className='cursor-pointer'/>
               <ImCompass2 className='cursor-no-drop'/>
               <AiOutlineHeart className='text-[28px] cursor-no-drop'/>
                
                 <div ref={boxSignOutRef}  className=''> <div className={borderAvatar?'outline-1  w-6 h-6 z-[-1] absolute outline-black outline outline-offset-2 rounded-full p-[1px]':''}></div> <img onClick={(e)=>{handleShowSignOut(e)}} ref={avatarRef}  className='w-6 h-6 rounded-full cursor-pointer border border-solid border-greyColor    ' src={avatar} alt=''  />
                    
                    {logOut&&<div  ref={boxLogOut} id='boxLogOut' className='box  absolute right-[15px] transition-all duration-100   translate-y-3 opacity-100 w-[230px] rounded h-4xl list-none bg-whiteColor  shadow-[0px_0px_3px_grey] '>
                    <Link to={`/user/${userId}/`}> <li onClick={handleOffBoxSignOut} className='py-2 pl-4 flex items-center gap-x-3 text-sm hover:bg-greyLightColor cursor-pointer'><IoPersonCircleSharp className='text-lg '/>Trang cá nhân</li></Link>
                        <li className='py-2 pl-4 flex items-center gap-x-3 text-sm  hover:bg-greyLightColor cursor-pointer'><MdOutlineBookmarkBorder className='text-lg '/>Đã lưu</li>
                        <li className='py-2 pl-4 flex items-center gap-x-3 text-sm  hover:bg-greyLightColor cursor-pointer'><RiSettings3Line className='text-lg '/>Cài đặt</li>
                        <li className='py-2 pl-4 flex items-center gap-x-3 text-sm  hover:bg-greyLightColor cursor-pointer'><HiOutlineSwitchHorizontal className='text-lg '/>Chuyển tài khoản</li>
                        <li onClick={handleSignOut}   className='py-2 pl-4 border-t-2 border-borderColor text-sm    hover:bg-greyLightColor cursor-pointer'>Đăng xuất</li>
                    
                    </div>}
                 </div>
               </div>
            </div>
           
       </div>
       {search&&<div className='w-[365px] relative flex flex-col mt-[1px] shadow-lg rounded h-[365px] m-auto  bg-whiteColor font-medium text-sm text-greyColor '>
        {input!==''
        ?<div  id='searchBox' className='mt-3'>
         {usersFiltered.map(user=><Link key={user.userId} to={`user/${user.userId}/`}>
            <div  onClick={handleCloseSearch} className='flex cursor-pointer hover:bg-greyLightColor gap-x-3 py-1.5 px-4 items-center'>
            <div><img className='rounded-full w-11' src={user.avatar} alt='' /></div>
            <div className='text-blackColor'>{user.userName}</div>
         </div>
         </Link>)}
        </div>
        :<><div className='p-3 font-medium text-blackColor text-[16px] '>Gần đây</div>
        <div className='flex tamgiac grow items-center  justify-center'>Không có nội dung tìm kiếm ở đây.</div></>}
</div>}
  {/* Overlay */}
     <PostOverlay/>
  </div>;
  
  </>
}

export default memo(Header);
