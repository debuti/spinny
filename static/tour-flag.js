// Runs before the first paint, so returning visitors never see the prerendered intro flash.
try {
	if (localStorage.getItem('spinny.tourSeen')) document.documentElement.classList.add('tour-seen');
} catch {
	// Storage blocked: the intro shows again.
}
