<script lang="ts">
	import { resolve } from '$app/paths';

	import type { PageData } from './$types.js';

	/** CMS sources may be any internal path; `resolve` is typed to known routes only. */
	const resolvePath = resolve as unknown as (path: string) => string;

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.page.title}</title>
</svelte:head>

<main class="coaching-page">
	<div class="content-page">
		<h1>{data.page.title}</h1>

	</div>

	<section class="section-block section-programs">
		<div class="page-wrap">
			<div class="section-heading">
				<p class="section-kicker">Programs & Coaching</p>
				<h2>Pick the support that fits your life.</h2>
			</div>
			<div class="program-grid">
				<article class="offer-card">
					<p class="offer-type">Strength & Conditioning</p>
					<h3>In-Person & Online</h3>
					<p class="offer-price">Starting at $425/month</p>
					<p>
						In-Person & Online. Periodic in-person sessions or online sessions to dial in technique,
						plus day-to-day programming and accountability. Programs delivered on the ONXX App.
						Online sessions held on Zoom. In Person available in DC/MD/VA metro.
					</p>
					<a href={resolve('/contact')} class="button-secondary"
						>Inquire About Strength & Conditioning</a
					>
				</article>
				<article class="offer-card">
					<p class="offer-type">Nutrition</p>
					<h3>Nutrition Coaching Add-On</h3>
					<p class="offer-price">+$125/month</p>
					<ul>
						<li>Custom macro targets for fat loss or muscle gain</li>
						<li>Weekly accountability check-ins</li>
						<li>Meal strategies that fit your family's schedule</li>
						<li>Real-time adjustments based on progress</li>
						<li>No rigid meal plans—just clear guidance</li>
					</ul>
					<a href={resolve('/contact')} class="button-secondary">Inquire About Nutrition Coaching</a>
				</article>
			</div>
		</div>
	</section>
</main>

<style>
	.coaching-page {
		padding-bottom: clamp(3rem, 8vw, 5rem);
	}

	.content-page {
		margin: 0 auto;
		max-width: 52rem;
		padding: 2rem 1rem 0;
	}

	h1 {
		font-family: var(--font-h1-h2, 'Saira Stencil', system-ui, sans-serif);
		font-size: 2rem;
		font-weight: 400;
		margin: 0 0 1rem;
	}

	.source {
		font-size: 0.875rem;
		margin: 0 0 1.25rem;
	}

	.markdown :global(*) {
		max-width: 100%;
	}

	.markdown :global(p),
	.markdown :global(ul),
	.markdown :global(ol),
	.markdown :global(blockquote) {
		line-height: 1.7;
		margin: 0 0 1rem;
	}

	.markdown :global(h1),
	.markdown :global(h2) {
		font-family: var(--font-h1-h2, 'Saira Stencil', system-ui, sans-serif);
		font-weight: 400;
		color: var(--color-onxx-text, #ffffff);
	}

	.page-wrap {
		width: min(100% - 2rem, 72rem);
		margin-inline: auto;
	}

	.section-block {
		padding: clamp(4.5rem, 9vw, 7rem) 0;
	}

	.section-programs {
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	.section-kicker {
		margin: 0 0 1rem;
		color: var(--color-onxx-red);
		font-family: var(--font-heading, 'Allerta Stencil', system-ui, sans-serif);
		font-size: 0.78rem;
		font-weight: 400;
		letter-spacing: 0.18em;
		text-transform: uppercase;
	}

	h2 {
		max-width: 13ch;
		margin: 0;
		font-family: var(--font-h1-h2, 'Saira Stencil', system-ui, sans-serif);
		font-size: clamp(2.4rem, 6vw, 5rem);
		font-weight: 400;
		letter-spacing: -0.06em;
		line-height: 0.9;
		text-transform: uppercase;
		text-wrap: balance;
	}

	.section-heading {
		max-width: 54rem;
		margin-bottom: clamp(2rem, 5vw, 3.5rem);
	}

	.section-heading h2 {
		max-width: 15ch;
	}

	.program-grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.offer-card {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(17, 17, 17, 0.82);
		display: flex;
		min-height: 28rem;
		flex-direction: column;
		padding: clamp(1.4rem, 4vw, 2rem);
		color: var(--color-onxx-text);
		line-height: 1.65;
	}

	.offer-card h3 {
		margin: 0 0 0.85rem;
		color: var(--color-onxx-text);
		font-size: 1.3rem;
		line-height: 1.15;
	}

	.offer-card p {
		margin: 0;
	}

	.offer-card::before {
		width: 4rem;
		height: 3px;
		margin-bottom: 1.5rem;
		content: '';
		background: var(--color-onxx-red);
	}

	.offer-type {
		color: var(--color-onxx-red);
		font-family: var(--font-heading, 'Allerta Stencil', system-ui, sans-serif);
		font-size: 0.8rem;
		font-weight: 400;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.offer-price {
		color: var(--color-onxx-text);
		font-family: var(--font-sans, 'Montserrat', system-ui, sans-serif);
		font-size: 1.2rem;
		font-weight: 800;
	}

	.offer-card ul {
		display: grid;
		gap: 0.7rem;
		padding-left: 1.1rem;
		margin: 0;
	}

	.offer-card > p,
	.offer-card > ul {
		margin-bottom: 1.5rem;
	}

	.button-secondary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 3.25rem;
		padding: 0.95rem 1.35rem;
		border-radius: 0.35rem;
		font-size: 0.95rem;
		font-weight: 900;
		letter-spacing: 0.08em;
		text-decoration: none;
		text-transform: uppercase;
		border: 1px solid rgba(255, 255, 255, 0.18);
		background: rgba(255, 255, 255, 0.035);
		color: var(--color-onxx-text);
		transition:
			transform 0.2s ease,
			border-color 0.2s ease,
			background-color 0.2s ease;
		align-self: flex-start;
		margin-top: auto;
		text-align: center;
	}

	.button-secondary:hover,
	.button-secondary:focus-visible {
		transform: translateY(-2px);
		border-color: rgba(230, 57, 70, 0.72);
		background: rgba(230, 57, 70, 0.12);
	}

	.button-secondary:focus-visible {
		outline: 2px solid var(--color-onxx-velocity);
		outline-offset: 3px;
	}

	@media (max-width: 900px) {
		.program-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 540px) {
		.button-secondary {
			width: 100%;
		}

		h2 {
			letter-spacing: -0.055em;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.button-secondary {
			transition: none;
		}

		.button-secondary:hover,
		.button-secondary:focus-visible {
			transform: none;
		}
	}
</style>
