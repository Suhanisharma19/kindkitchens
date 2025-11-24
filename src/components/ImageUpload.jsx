import React from 'react';
import styled from 'styled-components';

const UploadContainer = styled.div`
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s;
  background-color: #fafafa;

  &:hover {
    border-color: #4caf50;
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  color: #ccc;
  margin-bottom: 1rem;
`;

const UploadText = styled.p`
  color: #666;
  margin: 0;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  margin-top: 1rem;
`;

const ImageUpload = ({ onImageChange, imagePreview }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      onImageChange(files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  return (
    <>
      <UploadContainer 
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input').click()}
      >
        <UploadIcon>📁</UploadIcon>
        <UploadText>Drag & drop an image here, or click to select</UploadText>
        <UploadText>(PNG, JPG, JPEG)</UploadText>
        <HiddenInput
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileInput}
        />
      </UploadContainer>
      {imagePreview && <ImagePreview src={imagePreview} alt="Preview" />}
    </>
  );
};

export default ImageUpload;