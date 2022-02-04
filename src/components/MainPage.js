import React ,{useEffect,memo}from 'react';
import MainLeft from './MainLeft';
import MainRight from './MainRight';

function MainPage() {
// const dispatch=useDispatch()
// const dataCheck=useSelector(state=>state.allUsers.data)
// const userActive=useSelector(state=>state.user.userId)
// console.log(useSelector(state=>state))
// useEffect(()=>{
//   if(!dataCheck){
//     dispatch(getAllUser(userActive))
//    }
// },[])
  return <div className='mt-[65px]'>
      
      <div  className='max-w-2xl gap-x-7  m-auto h-10  px-10 grid grid-cols-2 lg:max-w-5xl lg:grid-cols-3   '>

             <div className='col-span-2    '>
                <MainLeft/>
            </div>

            <div className='hidden lg:block  '  >
              <MainRight/>
            </div>
      </div>
      

  </div>
}

export default memo(MainPage);
