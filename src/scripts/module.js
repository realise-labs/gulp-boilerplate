/* Just an example of importing from another module */

'use strict';

export default function hello(name) {
	// eslint-disable-next-line
	console.log('Hello ' + name);
	// Normally this line ^^^ would get flagged by eslint
	// But the comment line before tells eslint to ignore it
}
