const validateImageFile = (filename) => {
	const isValid =  /\.(jpg|gif|png|jpeg|bmp|tif|heic)$/i.test(filename);
	return isValid;
}

export {validateImageFile};