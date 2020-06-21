export function numbersToLetters(num) {
	const mod = num % 26;
	let pow = (num / 26) | 0;
	const out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');

	return pow ? numbersToLetters(pow) + out : out;
}

// https://stackoverflow.com/questions/11089399/count-with-a-b-c-d-instead-of-0-1-2-3-with-javascript

export function truncateLongText(text = '', limit) {
	return text.length > limit ? text.substr(0, limit - 1) + '...' : text;
}

export const calcRatingValue = (ratings) => {
	let counts = {};

	for (let i = 0; i < ratings.length; i++) {
		let num = ratings[i];
		counts[num] = counts[num] ? counts[num] + 1 : 1;
	}

	const newRatings = [ counts[5] || 0, counts[4] || 0, counts[3] || 0, counts[2] || 0, counts[1] || 0 ];

	let weight = 5;
	let v = 0;
	let total = 0;

	for (let i = 0; i < newRatings.length; i++) {
		v += weight * newRatings[i];
		total += newRatings[i];

		weight--;
	}

	return (v / total).toFixed(2);
};
