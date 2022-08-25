export function validateEmailAndPassword(email = '', password = '') {
	const emailReg = /\S+@\S+\.\S+/;

	if (!emailReg.test(email)) {
		return 'Invalid email!';
	}

	if (password.length < 6) {
		return 'Password must be at least 6 characters long!';
	}
}

function validateUsername(username: string) {
	const whitespaceReg = /\S/g;

	if (username.length < 3) {
		return 'Username must be at least 3 characters long!';
	} else if (whitespaceReg.test(username)) {
		return 'Username cannot contain any whitespaces!'
	}
}

export function validateSignUpForm(email = '', username = '', password = '') {
	return (
		validateEmailAndPassword(username, password) && validateUsername(email)
	);
}
