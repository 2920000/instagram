import {onSnapshot,collection} from  'firebase/firestore'
import { db } from '../config';
import {createSlice} from '@reduxjs/toolkit'
import { async } from '@firebase/util';


 const usersSilce=createSlice({
       name:'user',
       initialState:{
          allUsers:[],
          loading:false,
          data:false,
          userCurrentLoggedDociD:null,
          postsUserCurrentLogged:[]
       },
       reducers:{
            DOCID_USER_CURRENT_LOGGED:(state,action)=>{
                  state.userCurrentLoggedDociD=action.payload
            },
            CLEAR_USERS:(state)=>{
               state.allUsers=[]
            },
            GET_USERS_REQUEST:(state)=>{
                   state.loading=true
                
            },
            GET_USERS_SUCCESS:(state,action)=>{
                state.loading=false
             state.allUsers=action.payload
                state.data=true
            },
            GET_POST_USER_CURRENT_LOGGED:(state,action )=>{
                  const x= action.payload
             if(x!==undefined)state.postsUserCurrentLogged=x[0].posts
            },
            UPDATE_USERS:(state,action)=>{
             state.allUsers=action.payload
            }
            
       }
 })
export const {GET_USERS_REQUEST,GET_USERS_SUCCESS,UPDATE_USERS,DOCID_USER_CURRENT_LOGGED,CLEAR_USERS,GET_POST_USER_CURRENT_LOGGED} = usersSilce.actions
 export default usersSilce
// Can  code lai phan nay
 export const getAllUser=(userIdActive)=> async (dispatch)=>{
      dispatch(GET_USERS_REQUEST())
      onSnapshot(collection(db,'users'),usersDocs=>{
            // dispatch(UPDATE_USERS(usersDocs.docs.map(users=>users.data()).filter(user=>user.userId!==userIdActive)))          
            const docId=usersDocs.docs.filter(doc=>doc.data().userId===userIdActive)[0]
       if(docId!==undefined){dispatch(DOCID_USER_CURRENT_LOGGED(docId.id))}
   
            dispatch(GET_USERS_SUCCESS( usersDocs.docs.map(users=>users.data()).filter(user=>user.userId!==userIdActive)))
            dispatch(GET_POST_USER_CURRENT_LOGGED(usersDocs.docs.map(users=>users.data()).filter(user=>user.userId===userIdActive) ))

       
             })
             
            
 }
 