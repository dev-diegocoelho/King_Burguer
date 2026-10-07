(() => {
	const promoSection = document.querySelector('.double-promo');
	const offer = promoSection?.querySelector('.double-promo__offer');
	const selector = promoSection?.querySelector('.promo-king-double__selector');
	const number = promoSection?.querySelector('.double-promo__number');
	const amount = promoSection?.querySelector('.double-promo__amount');
	const cents = promoSection?.querySelector('.double-promo__cents');
	const reducedMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
	const finalNumber = 2;
	const finalPriceInCents = 2590;
	let animationFrameId;

	if (!promoSection || !offer || !selector || !number || !amount || !cents) return;

	const showFinalValues = () => {
		number.textContent = String(finalNumber);
		amount.textContent = String(Math.floor(finalPriceInCents / 100));
		cents.textContent = `,${String(finalPriceInCents % 100).padStart(2, '0')}`;
	};

	const showPromo = () => {
		offer.classList.remove('is-pending');
		selector.classList.remove('is-pending');
		offer.classList.add('is-visible');
		selector.classList.add('is-visible');
	};

	const animateCounters = () => {
		const duration = 1200;
		let startTime;

		const updateCounters = (timestamp) => {
			if (startTime === undefined) startTime = timestamp;

			const progress = Math.min((timestamp - startTime) / duration, 1);
			const currentNumber = Math.round(finalNumber * progress);
			const currentPriceInCents = Math.round(finalPriceInCents * progress);

			number.textContent = String(currentNumber);
			amount.textContent = String(Math.floor(currentPriceInCents / 100));
			cents.textContent = `,${String(currentPriceInCents % 100).padStart(2, '0')}`;

			if (progress < 1) {
				animationFrameId = window.requestAnimationFrame(updateCounters);
			} else {
				animationFrameId = undefined;
			}
		};

		animationFrameId = window.requestAnimationFrame(updateCounters);
	};

	if (reducedMotionPreference.matches || !('IntersectionObserver' in window)) {
		showFinalValues();
		showPromo();
		return;
	}

	number.textContent = '0';
	amount.textContent = '0';
	cents.textContent = ',00';

	const promoObserver = new IntersectionObserver((entries, observer) => {
		const promoEntry = entries.find((entry) => entry.isIntersecting);
		if (!promoEntry) return;

		observer.unobserve(promoSection);
		showPromo();
		animateCounters();
	}, {
		threshold: 0.2,
		rootMargin: '0px 0px -40px 0px'
	});

	promoObserver.observe(promoSection);

	reducedMotionPreference.addEventListener('change', (event) => {
		if (!event.matches) return;

		promoObserver.disconnect();
		if (animationFrameId !== undefined) window.cancelAnimationFrame(animationFrameId);
		showFinalValues();
		showPromo();
	});
})();
