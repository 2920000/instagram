import React, { useEffect } from 'react';
import Header from './Header';
import {BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import UserInfor from './UserInfor';
import MainPage from './MainPage';
import Posts from './personalPosts';
import Save from './personalSaved';
import Tagged from './personalTagged';
import {useDispatch} from 'react-redux'
import { getUsers } from '../features/postSlice';
import UsersSuggested from './UsersSuggested';
function Page() {
     const dispatch =useDispatch()
     useEffect(()=>{
     dispatch(getUsers())
   
     },[])
 
    
  return <div>

        <Router>
          <Header/>
            <Routes>
            <Route path='/' element={<MainPage/>} />
              <Route path="/user/:routeId/" element={<UserInfor/>} >
                 <Route path='' element={<Posts/>}/>
               {true&&   <Route path='saved' element={<Save/>}/>}
                 <Route path='tagged' element={<Tagged/>}/>
                
              </Route>
              <Route path='/people' element={<UsersSuggested/>} />
            </Routes>
 
        </Router>

     
  </div>;
}


export default Page;
