// import React from "react";
// import { Button } from "@mui/material";

// const ImageUpload = ({ selectedImage, onChange, onSave, defaultImage }) => {
//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     onChange(file);
//   };

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleImageChange} />
//       {selectedImage ? (
//         <img src={URL.createObjectURL(selectedImage)} alt="Uploaded" />
//       ) : (
//         <img src={defaultImage} alt="Current Profile" />
//       )}
//       {selectedImage && onSave && (
//         <Button variant="contained" onClick={onSave}>
//           Save
//         </Button>
//       )}
//     </div>
//   );
// };

// export default ImageUpload;
