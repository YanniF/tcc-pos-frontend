export function numbersToLetters(num) {
	const mod = num % 26;
	let pow = (num / 26) | 0;
	const out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');

	return pow ? numbersToLetters(pow) + out : out;
}

// https://stackoverflow.com/questions/11089399/count-with-a-b-c-d-instead-of-0-1-2-3-with-javascript
