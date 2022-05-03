const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
	const files = [
		'./dist/web-components/main.js',
		'./dist/web-components/polyfills.js',
		'./dist/web-components/runtime.js',
	];
	await concat(files, './dist/web-components/web-components.js');
	await fs.copyFile('./dist/web-components/styles.css', './dist/web-components/web-components.css');
})();
