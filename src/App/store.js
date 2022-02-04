import {configureStore} from '@reduxjs/toolkit'
import followSlice from '../features/followSlice'
import loginSlice from '../features/loginSlice'
import postSlice from '../features/postSlice'
import usersSilce from '../features/usersSlice'

const store =configureStore({
    reducer:{
      user:loginSlice.reducer,
      allUsers:usersSilce.reducer,
      posts:postSlice.reducer,
      follow:followSlice.reducer
    },
    middleware:getDefaultMiddleware=>(
      getDefaultMiddleware({
        serializableCheck:false
      })
    ),
   
})
export default store