import config from '../../monetization.config.json';

/** Public IDs. An empty block ID keeps ads off: no script, no block, no CSP opening. */
export const ADS_CLIENT = config.adsense.client;
export const ADS_SLOT_HOME: string = config.adsense.slots.home;
export const ADS_ON = Boolean(ADS_SLOT_HOME);

type AdsWindow = Window & {
	adsbygoogle?: object[];
	googlefc?: { callbackQueue?: unknown[]; showRevocationMessage?: () => void };
};

export function requestAd(): void {
	const w = window as AdsWindow;
	(w.adsbygoogle ??= []).push({});
}

/** Reopens Google's consent message. */
export function reopenConsent(): void {
	const { googlefc } = window as AdsWindow;
	googlefc?.callbackQueue?.push(googlefc.showRevocationMessage);
}
