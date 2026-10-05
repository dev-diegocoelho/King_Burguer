const siteNavigation = document.querySelector('.site-nav');

if (siteNavigation) {
	const compactAfter = 40;
	let isScheduled = false;

	const updateNavigationSize = () => {
		siteNavigation.classList.toggle('is-compact', window.scrollY > compactAfter);
		isScheduled = false;
	};

	window.addEventListener('scroll', () => {
		if (isScheduled) return;

		isScheduled = true;
		window.requestAnimationFrame(updateNavigationSize);
	}, { passive: true });

	updateNavigationSize();
}
