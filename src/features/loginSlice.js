import {createSlice} from '@reduxjs/toolkit'
import {signOut,getAuth,signInWithPopup,FacebookAuthProvider} from 'firebase/auth'
import {onSnapshot,collection,addDoc} from 'firebase/firestore'
import { db } from '../config'
const auth=getAuth()
const provider= new FacebookAuthProvider()
const loginSlice=createSlice({
    name:'login',
    initialState:{
        userId:null,
        userName:null,
        avatar:null,
        signOutMethod:null,
        signInMethod:null,

    },
    reducers:{
       user:(state,action)=>{
            state.userId=action.payload.uid  
            state.userName=action.payload.displayName
            state.avatar=action.payload.photoURL
           

       },
       SIGN_OUT:(state,action)=>{
            state.signOutMethod=action.payload
       },
       SIGN_IN:(state,action)=>{
            state.signInMethod=action.payload
       }

    }


})
export  const {SIGN_OUT,SIGN_IN} = loginSlice.actions
export  default loginSlice

export const getSignOut=()=> async (dispatch)=>{
    const handleSignOut=()=>{
         signOut(auth)
    }
   dispatch(SIGN_OUT(handleSignOut))
}


export const getSignIn=()=> async (dispatch)=>{
    const handleSignIn=()=>{
        signInWithPopup(auth,provider)
        .then(result=>{
            onSnapshot(collection(db,'users'),usersDocs=>{
                console.log(result.user)
                    const users=usersDocs.docs.map(users=>users.data())
                         const checkUserExist=users.every(userFireBase=>userFireBase.email!==result.user.email)
                         if(checkUserExist){
                          addDoc(collection(db,'users'),{
                            userId:result.user.uid,
                            userName:result.user.displayName,
                            avatar:result.user.photoURL,
                            email:result.user.email,
                            posts:[],
                            comments:[],
                            followers:[],
                            following:[],
                          })
                         }
                        
                     })
        })
    }
   dispatch(SIGN_IN(handleSignIn))
}