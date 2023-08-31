import URL from './URL';
import ImageUploadAPI from './ImageUploadAPI';

export const uploadFile = async (e, imageSetter, targetObject, targetSetter) => {
  const file = e.target.files[0];
  const res = await ImageUploadAPI(file);
  const imageUrl = URL + '/' + res.filename;

  imageSetter(imageUrl);

  if (targetObject && targetSetter) {
    const updatedObject = {
      ...targetObject,
      user: {
        ...targetObject.user,
        image: imageUrl,
      },
    };
    targetSetter(updatedObject);
  }
};
