import type { ParamMatcher } from '@sveltejs/kit';

/** A language prefix (/en/privacy/). Spanish lives at the root (/privacy/). */
export const match: ParamMatcher = (param) => param === 'en';
