const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
	const files = [
		'./dist/telco-web-components/main.js',
		'./dist/telco-web-components/polyfills.js',
		'./dist/telco-web-components/runtime.js',
	];
	await concat(files, './dist/telco-web-components/telco-web-components.js');
	await fs.copyFile('./dist/telco-web-components/styles.css', './dist/telco-web-components/telco-web-components.css');
})();
