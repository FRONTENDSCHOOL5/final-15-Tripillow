const validateImageFileFormat = (filename) => {
  const isValid = /\.(jpg|gif|png|jpeg|bmp|tif|heic|HEIC|avif)$/i.test(filename);
  return isValid;
};

export { validateImageFileFormat };
