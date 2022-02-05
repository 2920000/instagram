import { async } from '@firebase/util'
import {createSlice} from '@reduxjs/toolkit'
import { doc,  updateDoc,onSnapshot,collection } from 'firebase/firestore'
import { db } from '../config'


const chatSlice=createSlice({
    name:'chat',
    initialState:{
       chatBox:[],
       load:null,
       dataUserNew:{}
 
    },
    reducers:{
        CHATBOX_OF_USERCURRENTLOGGED:(state,action)=>{
           state.chatBox=action.payload
        },
        INITIALIZE_CHATBOX_SUCCESS:(state,action)=>{
            state.load=action.payload
        },
        NEWDATA_CHATBOX:(state,action)=>{
             state.dataUserNew=action.payload

        }


    }
})
export default chatSlice
export const {CHATBOX_OF_USERCURRENTLOGGED,INITIALIZE_CHATBOX_REQUEST,INITIALIZE_CHATBOX_SUCCESS,NEWDATA_CHATBOX} =chatSlice.actions

export const addUserToChatBox=(userCurrentLoggedInfor,userClickedToChat,boxId)=>async(dispatch)=>{
// console.log(userCurrentLoggedInfor)
// console.log(userClickedToChat)
// console.log(boxId)



const check =userCurrentLoggedInfor.chatBox.every(chatbox=>chatbox.userId!==userClickedToChat.userId)
 if(check){
updateDoc(doc(db,'users',userClickedToChat.docId),{
    chatBox:[
    ...userClickedToChat.chatBox,{
            userName:userCurrentLoggedInfor.userName,
            userId:userCurrentLoggedInfor.userId,
            avatar:userCurrentLoggedInfor.avatar,
            boxId:boxId,
            messages:[]
        }
    ]
})

    updateDoc(doc(db,'users',userCurrentLoggedInfor.docId),{
        chatBox:[
            ...userCurrentLoggedInfor.chatBox,{
                userName:userClickedToChat.userName,
                userId:userClickedToChat.userId,
                avatar:userClickedToChat.avatar,
                boxId:boxId,
                messages:[]
            }
        ]
    })

  
    onSnapshot(collection(db,'users'),usersDocs=>{
        const allUsers= usersDocs.docs.map(users=>users.data())
        const filteruser=allUsers.find(user=>user.userId===userCurrentLoggedInfor.userId)
        console.log(filteruser)
        dispatch(NEWDATA_CHATBOX(filteruser))
        dispatch(INITIALIZE_CHATBOX_SUCCESS(true))
     })
   
   }else{
    onSnapshot(collection(db,'users'),usersDocs=>{
        const allUsers= usersDocs.docs.map(users=>users.data())
        const filteruser=allUsers.find(user=>user.userId===userCurrentLoggedInfor.userId)
        console.log(filteruser)
        dispatch(NEWDATA_CHATBOX(filteruser))
        dispatch(INITIALIZE_CHATBOX_SUCCESS(true))

     })

   }
  
 

}

export const addMessage=(message)=>async(dispatch)=>{

console.log(message)

}