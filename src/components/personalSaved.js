import React from 'react';
import {BsBookmark} from 'react-icons/bs'
function Save() {
  return <div className='flex flex-col space-y-10 py-5  '>
    <div className='flex justify-between'>
      <p className='text-xs text-gray font-light'>Chỉ mình bạn có thể xem mục mình đã lưu</p>
      <p className='text-[#0095f6] font-medium text-sm' >+ Bộ sưu tập mới</p>
    </div>
  <div className='flex flex-col space-y-5 items-center'>
      <div className='text-2xl rounded-full border-2 border-black p-4'><BsBookmark/></div>
      <span className='text-3xl font-light'>Lưu</span>
      <p className='max-w-[360px] text-center text-sm'>Lưu ảnh và video mà bạn muốn xem lại. Sẽ không có ai được thông báo và chỉ mình bạn có thể xem nội dung mình đã lưu.</p>

  </div>
      <div>
    

      </div>
  </div>;
}

export default Save;
