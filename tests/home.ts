import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('h1#essa')).toBe('wassup my nig');
});

// test('index page gas expected p', async ({ page }) => {
// 	await page.goto('/');
// 	expect(await page.textContent(''))
// })
