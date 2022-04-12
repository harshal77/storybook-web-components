module.exports = {
	root: true,
	overrides: [
		{
			files: ['*.ts'],
			parserOptions: {
				project: ['tsconfig.*?.json', 'e2e/tsconfig.json'],
				createDefaultProgram: true,
			},
			extends: ['plugin:@angular-eslint/recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'],
			rules: {
				'max-len': ['error', { code: 180 }],
				'no-inferrable-types': 0,
				'no-console': ['error', { allow: ['warn', 'error'] }],
				'no-debugger': 'error',
				'no-empty': 'error',
				eqeqeq: 'error',
				'consistent-return': 'error',
				'no-multi-spaces': 'error',
				'no-empty-function': 'off',
				'@typescript-eslint/no-empty-function': ['error'],
				'brace-style': 'off',
				'@typescript-eslint/brace-style': ['error'],
				quotes: 'off',
				'@typescript-eslint/quotes': [
					'error',
					'single',
					{
						avoidEscape: true,
						allowTemplateLiterals: true,
					},
				],
				'@typescript-eslint/naming-convention': [
					'error',
					{
						selector: 'default',
						format: ['camelCase'],
					},
					{
						selector: 'variable',
						format: ['camelCase', 'UPPER_CASE'],
					},
					{
						selector: 'parameter',
						format: ['camelCase'],
						leadingUnderscore: 'forbid',
					},

					{
						selector: 'memberLike',
						modifiers: ['private'],
						format: ['camelCase'],
						leadingUnderscore: 'allow',
					},

					{
						selector: 'typeLike',
						format: ['PascalCase'],
					},
					{
						selector: 'variable',
						modifiers: ['const', 'global', 'exported'],
						format: ['UPPER_CASE'],
					},
					{
						selector: 'enumMember',
						format: ['UPPER_CASE'],
					},
				],
			},
		},
		{
			files: ['*.component.html'],
			extends: ['plugin:@angular-eslint/template/recommended'],
			rules: {
				'max-len': ['error', { code: 180 }],
			},
		},
		{
			files: ['*.component.ts'],
			extends: ['plugin:@angular-eslint/template/process-inline-templates'],
		},
	],
	plugins: ['html'],
};
