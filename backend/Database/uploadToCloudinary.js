import { v2 as cloudinary } from 'cloudinary';

// immediately invoked function (IIFE)
(async function() {

    cloudinary.config({ 
        cloud_name: 'dsqym1wwy', 
        api_key: '689688854567892', 
        api_secret: 'C14bsiHox1heqPmwXlYpEC2WiPg'
    });

    const uploadResult = await cloudinary.uploader
       .upload(
           'https://images.unsplash.com/photo-1684868884835-0ed11636b488?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', {
               public_id: 'dress',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);

})()