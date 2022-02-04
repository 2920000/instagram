import React,{memo} from 'react';
import {useSelector} from 'react-redux'
import MainPosts from './MainPosts';
import Stories from './Stories';
function MainLeft() {
  return <div>
      <div className='flex  bg-whiteColor p-2 rounded border border-borderColor space-x-2'>
         <Stories/>
      </div>

      <div>
          <MainPosts/>
      </div>
  </div>;
}

export default memo(MainLeft);
