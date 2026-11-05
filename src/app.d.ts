// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {}
	const __APP_VERSION__: string;
	const __APP_COMMIT__: string;
	const __APP_BUILD_DATE__: string;
}

export {};
