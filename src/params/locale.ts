import type { ParamMatcher } from '@sveltejs/kit';

/** A language prefix (/es/privacy/). English lives at the root (/privacy/). */
export const match: ParamMatcher = (param) => param === 'es';
