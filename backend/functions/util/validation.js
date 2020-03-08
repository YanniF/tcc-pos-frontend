const isEmpty = (string) => {
	return string.trim() === '';
};

const isEmail = (email) => {
	const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return email.match(regEx);
};

exports.validateSignupData = (data) => {
	let errors = {};

	// validating data
	if (isEmpty(data.email)) errors.email = 'Campo não pode ser vazio';
	else if (!isEmail(data.email)) errors.email = 'Por favor, insira um e-mail válido';

	if (isEmpty(data.password)) errors.password = 'Campo não pode ser vazio';

	if (isEmpty(data.name)) errors.name = 'Campo não pode ser vazio';

	if (data.userType === 'supervisor' && isEmpty(data.code)) errors.code = 'Campo não pode ser vazio';

	return {
		errors,
		valid: Object.keys(errors).length === 0,
	};
};

exports.validateLoginData = (data) => {
	let errors = {};

	if (isEmpty(data.email)) errors.email = 'Campo não pode ser vazio';
	else if (!isEmail(data.email)) errors.email = 'Por favor, insira um e-mail válido';

	if (isEmpty(data.password)) errors.password = 'Campo não pode ser vazio';

	return {
		errors,
		valid: Object.keys(errors).length === 0,
	};
};
