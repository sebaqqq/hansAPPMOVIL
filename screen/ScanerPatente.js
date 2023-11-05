import React, { useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import TesseractOcr from 'react-native-tesseract-ocr';

//depenciaS A INSTALAR
//npm install react-native-camera react-native-image-picker react-native-tesseract-ocr

function EscanerPatente() {
  const [imageUri, setImageUri] = useState(null);
  const [licensePlate, setLicensePlate] = useState('');

  const chooseImage = () => {
    ImagePicker.showImagePicker({}, (response) => {
      if (response.didCancel) {
        console.log('Cancelled');
      } else if (response.error) {
        console.error(response.error);
      } else {
        setImageUri(response.uri);
        performOcr(response.path);
      }
    });
  };

  const performOcr = async (imagePath) => {
    try {
      const result = await TesseractOcr.startOcr(imagePath, 'LANG_ENGLISH');
      setLicensePlate(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View>
      <Button title="Choose Image" onPress={chooseImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      {licensePlate && <Text>License Plate: {licensePlate}</Text>}
    </View>
  );
}

export default EscanerPatente;

