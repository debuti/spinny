import { describe, expect, it } from 'vitest';
import { pagePath, pathLocale } from './paths';

describe('paths', () => {
	it('English at the root, Spanish at /es/', () => {
		expect(pagePath('en', '')).toBe('/');
		expect(pagePath('en', 'privacy')).toBe('/privacy/');
		expect(pagePath('es', '')).toBe('/es/');
		expect(pagePath('es', 'terms')).toBe('/es/terms/');
	});
	it('the language comes from the path', () => {
		expect(pathLocale('/terms/')).toBe('en');
		expect(pathLocale('/es/terms/')).toBe('es');
	});
});
