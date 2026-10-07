(() => {
	const appDownload = document.querySelector('.app-download');
	const reducedMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

	if (!appDownload || reducedMotionPreference.matches || !('IntersectionObserver' in window)) return;

	appDownload.classList.add('is-animating');

	const appDownloadObserver = new IntersectionObserver((entries, observer) => {
		const appDownloadEntry = entries.find((entry) => entry.isIntersecting);
		if (!appDownloadEntry) return;

		appDownload.classList.add('is-visible');
		observer.unobserve(appDownload);
	}, {
		threshold: 0.2,
		rootMargin: '0px 0px -40px 0px'
	});

	appDownloadObserver.observe(appDownload);

	appDownload.addEventListener('click', (event) => {
		const storeButton = event.target.closest('.app-download__store');
		if (!storeButton) return;

		storeButton.classList.remove('is-rippling');
		void storeButton.offsetWidth;
		storeButton.classList.add('is-rippling');
	});
})();
