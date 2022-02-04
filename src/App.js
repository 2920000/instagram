import React,{useEffect,useState} from 'react';
import app from '../src/config'
import Login from './components/Login';
import Page from './components/page';
import {useDispatch,useSelector} from 'react-redux'
import {AiOutlineInstagram} from 'react-icons/ai'
import loginSlice from './features/loginSlice';
import { getSignOut,getSignIn } from './features/loginSlice';
import {getAuth,onAuthStateChanged} from 'firebase/auth'
import { getAllUser } from './features/usersSlice';
function App() {

  const dispatch=useDispatch()

const [x,setX]=useState(null)
const [y,setY]=useState(null)

// const [users,setUsers]=useState([])
  const auth=getAuth()

 
  // dispatch du lieu user-dangnhap-dangxuat
  useEffect(()=>{
  onAuthStateChanged(auth,user=>{
      if(user){
         dispatch(loginSlice.actions.user({displayName:user.displayName,uid:user.uid,photoURL:user.photoURL}))
         dispatch(getSignOut()) 
         dispatch(getAllUser(user.uid))
         setX(true)
         setY(false)
      
      }
      else{
        dispatch(getSignIn())
       setY(true) 
       setX(false)


      }

    
     
  })
  },[])

 return (
   <>
   {x===null&&y===null?<div className='h-screen flex items-center justify-center'><AiOutlineInstagram className=' text-greyColor text-6xl' /></div>:''}
     {x&&<Page/>}
     {y&&<Login/>}
   
   </>
 )
}

export default App;
