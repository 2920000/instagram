import { async } from '@firebase/util'
import {createSlice} from '@reduxjs/toolkit'
import {collection,updateDoc,doc, onSnapshot} from 'firebase/firestore'
import { ref,getDownloadURL,uploadBytesResumable } from 'firebase/storage'
import { db } from '../config'
import { storage } from '../config'

const postSlice=createSlice({
    name:'posts',
    initialState:{
        isShow:false,
        type:'',
        linkPreview:null,
        posts:[],
        linkUpToFirebase:null,
        myPosts:[],
        users:[],
        checkLike:false,
        loading:false
    },
    reducers:{
         SHOW_OR_OFF_BOX_POST:(state,action)=>{
              state.isShow=action.payload
         },
         CHECK_TYPE_POST:(state,action)=>{
               state.type=action.payload
         },
         LINK_POSTS_PREVIEW:(state,action)=>{

             state.linkPreview=action.payload
         },
         LINK_UPLOAD_FIREBASE:(state,action)=>{
              state.linkUpToFirebase=action.payload
         }
         ,
         GET_MY_POSTS:(state,action)=>{
              state.myPosts=action.payload
         },
         ALL_POSTS_USERS:(state,action)=>{
            state.posts=action.payload  
         },
         ALL_USERS:(state,action)=>{
             state.users=action.payload
         },
         CHECK_LIKE:(state,action)=>{
               state.checkLike=action.payload
         },
         ADD_POST_REQUEST:(state,action)=>{
            state.loading=action.payload
         },
         ADD_POST_SUCCESS:(state,action)=>{
            state.loading=action.payload

         } 
           

    }
})

export default postSlice
export const {SHOW_OR_OFF_BOX_POST,CHECK_TYPE_POST,ALL_USERS,GET_MY_POSTS,LINK_POSTS_PREVIEW,LINK_GET_FROM_STORAGE,ALL_POST_USER_RECENT_LOGGED,LINK_UPLOAD_FIREBASE,ALL_POSTS_USERS,CHECK_LIKE,ADD_POST_REQUEST,ADD_POST_SUCCESS} =postSlice.actions

export const addPost=(postData)=>async(dispatch)=>{
        
     dispatch(ADD_POST_REQUEST(true))
       const storageRef=ref(storage,'postImg'+postData.postCurrent.link.name)
       const uploadTask=uploadBytesResumable(storageRef,postData.postCurrent.link)
       uploadTask.on(
         'state_changed',
         (snapshot)=>{
         },
         (err)=>{
           console.log(err)
         },
         ()=>{
           getDownloadURL(uploadTask.snapshot.ref)
           .then(downloadURL=>{   
               updateDoc(doc(db,'users',postData.docId),{
                 posts:[{...postData.postCurrent,link:downloadURL},...postData.postsPrevious]
               })
               dispatch(ADD_POST_SUCCESS(false))
           })
         }
       
       )
}

// l???y t???t c??? b??i post
export const getAllPosts=()=>async(dispatch)=>{
     // const q= query(collection(db,'users'),orderBy())
onSnapshot(collection(db,'users'),usersDocs=>{
   const allPosts= usersDocs.docs.map(users=>users.data().posts)
   let posts=[]
   for(let i=0;i<allPosts.length;i++){
        posts=[...posts,...allPosts[i]]
   }
   dispatch(ALL_POSTS_USERS(posts))
})
}

// l???y post c???a ng?????i d??ng ??ang ????ng nh???p
export const getYourPosts=(myId)=>async(dispatch)=>{
     onSnapshot(collection(db,'users'),usersDocs=>{
        const allUsers= usersDocs.docs.map(users=>users.data())
       const myAccount=allUsers.filter(user=>user.userId===myId)
    
        dispatch(GET_MY_POSTS(myAccount[0].posts))
     })
     }
     
// l???y t???t c???  th??ng tin users     
export const getUsers=()=>async(dispatch)=>{
          onSnapshot(collection(db,'users'),usersDocs=>{
             const users= usersDocs.docs.map(users=>({...users.data(),docId:users.id}))
             dispatch(ALL_USERS(users))
          })
          }
// c???p nh???t th??? tim b??i vi???t 

export const updateLovePost=(postIdClicked,userIdCurrent,allPosts,allUsers)=>async(dispatch)=>{
 
     
//  console.log(postIdClicked)
//  console.log(userIdCurrent)
//  console.log(allPosts)
//  console.log(allUsers)


// l???y ra object post ???????c click 
  const postClickedObject= allPosts.find(post=>post.postId===postIdClicked)

  // l???y ra user c???a b??i post ???????c click
  const filterUserHavePostsClicked=allUsers.find(user=>user.docId===postClickedObject.docId)
   
  // l???y ra b??i vi???t ko ???????c click c???a user 
   const  postNoClickArray= filterUserHavePostsClicked.posts.filter(post=>post.postId!==postIdClicked)

// ki???m tra xem b??i vi???t user click xem   user ???? click ch??a
  const checkLove=postClickedObject.love.every(userId=>userId!==userIdCurrent)
   if(checkLove){
     updateDoc(doc(db,'users',postClickedObject.docId),{
          posts:[{...postClickedObject,love:[...postClickedObject.love,userIdCurrent]},...postNoClickArray]
     })
     dispatch(CHECK_LIKE(true))
   }
   else{
       const filter=postClickedObject.love.filter(userId=>userId!==userIdCurrent)
     updateDoc(doc(db,'users',postClickedObject.docId),{
          posts:[{...postClickedObject,love:[...filter]},...postNoClickArray]
     })
     dispatch(CHECK_LIKE(false))

   }

      
        
     
    
}