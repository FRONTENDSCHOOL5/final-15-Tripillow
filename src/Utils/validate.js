const validateImageFile = (filename) => {
	const isValid =  /\.(jpg|gif|png|jpeg|bmp|tif|heic|HEIC)$/i.test(filename);
	return isValid;
}

export {validateImageFile};