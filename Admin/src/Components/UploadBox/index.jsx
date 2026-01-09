import React from 'react'
import { useState } from 'react';
import { FaRegImage } from 'react-icons/fa';
import { uploadImage, uploadImages } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';

const UploadBox = (props) => {

  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);


  let selectedImages = [];

  const formData = new FormData();

  const onChangeFile = async (e, apiEndPoint) => {
    try {
      setPreviews([]);
      const files = e.target.files;
      setUploading(true);

      for (var i = 0; i < files.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/png" ||
            files[i].type === "image/webp")

        ) {
          const file = files[i];
          selectedImages.push(file);
          formData.append(props?.name, file);

        } else {
          context.alertBox("error", "please select a valid JPG , PNG or webp image file.");
          setUploading(false);
          return false;
        }
      }

      uploadImages(apiEndPoint, formData).then((res) => {
        setUploading(false);
        props.setPreviewsFun(res?.data?.images);
        

      })

    } catch (error) {
      console.log("Error while uploading the image: ", error);
    }
  }


  return (
    <div className='uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>
      {
        uploading === true ? 
          <><CircularProgress />
          <h4 className='text-[14px] pointer-events-none text-center'>Uploading...</h4>
        </> 
          :
          <>
            <FaRegImage className='text-[40px] opacity-35 pointer-events-none' />
            <h4 className='text-[14px] pointer-events-none'>Image Upload</h4>

            <input
              type='file'
              accept='image/*'
              multiple={props.multiple !== undefined ? props.multiple : false}
              className='absolute top-0 left-0 w-full h-full z-50 opacity-0 cursor-pointer'
              onChange={(e) =>
                onChangeFile(e, props?.url)
              }
              name="images"
            />
          </>
      }


    </div>
  )
}

export default UploadBox;   