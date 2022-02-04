
import { createSlice } from "@reduxjs/toolkit"
import {updateDoc,doc,collection} from 'firebase/firestore'
import { db } from '../config'

const followSlice=createSlice({
    name:'follow',
    initialState:{
     SHOW_BOX_FOLLOWERS:(   )=>{

     }
    }
    ,reducers:{
     
    }
})
export default followSlice

export const actionFollow=(userIdClickedToFollow,docIdUserCurrentLogged,followersOfUserClicked,userCurrentLoggedInfor,userNameClickedToFollow,userAvatarClickedToFollow,userFollowersClicked,allUsersContainDocId)=>async(dispatch)=>{
//    console.log(userIdClickedToFollow)
//    console.log(docIdUserCurrentLogged)
//    console.log(followersOfUserClicked)
//    console.log(userCurrentLoggedInfor)
// console.log(userNameClickedToFollow)
// console.log(userAvatarClickedToFollow)
// console.log(allUsersContainDocId)

   const filterUserClickedToFollow=allUsersContainDocId.find(user=>user.userId===userIdClickedToFollow)

   const checkFollow=userCurrentLoggedInfor.following.every(userCurrent=>userCurrent.userId!==userIdClickedToFollow)

   if(checkFollow){
    updateDoc(doc(db,'users',docIdUserCurrentLogged),{
        following:[...userCurrentLoggedInfor.following,{
            userId:userIdClickedToFollow,
            userName:userNameClickedToFollow,
            avatar:userAvatarClickedToFollow,
          
        }]
   })
   updateDoc(doc(db,'users',filterUserClickedToFollow.docId),{
       followers:[...userFollowersClicked,{
        userId:userCurrentLoggedInfor.userId,
        userName:userCurrentLoggedInfor.userName,
        avatar:userCurrentLoggedInfor.avatar,
       }]
   })
   }
   else{
       const filter2=filterUserClickedToFollow.followers.filter(user=>user.userId!==userCurrentLoggedInfor.userId)
       const filter=userCurrentLoggedInfor.following.filter(userCurrent=>userCurrent.userId!==userIdClickedToFollow)
    //    console.log(filter2)
    updateDoc(doc(db,'users',docIdUserCurrentLogged),{
        following:[...filter]
   })
   updateDoc(doc(db,'users',filterUserClickedToFollow.docId),{
    followers:[...filter2]
})
   }
}