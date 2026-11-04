<script lang="ts">
	import { enhance } from '$app/forms';
	import { untrack } from 'svelte';

	import type { ActionData } from './$types.js';

	let { form }: { form: ActionData } = $props();

	const submitted = untrack(() => (form && 'values' in form ? form.values : undefined));

	let editing = $state(false);
	let name = $state(submitted?.name ?? '');
	let email = $state(submitted?.email ?? '');
	let goal = $state(submitted?.goal ?? '');
	let roadblocks = $state(submitted?.roadblocks ?? '');

	const showCalendar = $derived(Boolean(form && 'success' in form && form.success) && !editing);
	const formError = $derived(form && 'error' in form ? form.error : '');

	const calendarUrl = $derived.by(() => {
		if (!form || !('success' in form) || !form.success) return '';

		const url = new URL('https://onxx.as.me/consultcall');
		url.searchParams.set('firstName', form.firstName);
		url.searchParams.set('lastName', form.lastName);
		url.searchParams.set('email', form.email);
		return url.toString();
	});

	const mailtoHref = $derived.by(() => {
		const url = new URL('mailto:adam.pierre@onxx.io');
		url.searchParams.set('subject', 'ONXX consult question');
		url.searchParams.set(
			'body',
			[`Name: ${name}`, `Email: ${email}`, `Goal: ${goal}`, `Roadblocks / injuries: ${roadblocks}`].join(
				'\n'
			)
		);
		return url.toString();
	});
</script>

<svelte:head>
	<title>Contact | ONXX</title>
	<meta
		name="description"
		content="Book a 15-minute consult with ONXX. Share your goal and what is in the way, then pick a time."
	/>
</svelte:head>

<main class="contact-page">
	<div class="page-wrap">
		<p class="section-kicker">Contact</p>
		<h1>Book a 15-minute consult.</h1>
		<p class="lede">Share your name, what you want, and what is in the way. Then pick a time.</p>

		{#if showCalendar}
			<section class="intake-card" aria-label="Choose a consult time">
				<div class="calendar-toolbar">
					<p>Your details are saved. Pick a time for the call.</p>
					<button type="button" class="button-secondary" onclick={() => (editing = true)}>
						Back to edit
					</button>
				</div>
				<iframe class="calendar-frame" title="Book a 15 minute consult" src={calendarUrl}></iframe>
			</section>
		{:else}
			<form
				class="intake-card"
				method="POST"
				use:enhance={() => {
					return async ({ result, update }) => {
						await update({ reset: false });
						if (result.type === 'success') editing = false;
					};
				}}
			>
				{#if formError}
					<p class="form-error" role="alert">{formError}</p>
				{/if}

				<label>
					Name
					<input name="name" type="text" autocomplete="name" required bind:value={name} />
				</label>

				<label>
					Email
					<input name="email" type="email" autocomplete="email" required bind:value={email} />
				</label>

				<label>
					Goal
					<select name="goal" required bind:value={goal}>
						<option value="">Select one</option>
						<option value="Strength and conditioning">Strength and conditioning</option>
						<option value="Nutrition">Nutrition</option>
						<option value="Both">Both</option>
						<option value="Not sure yet">Not sure yet</option>
					</select>
				</label>

				<label>
					Roadblocks / injuries
					<textarea
						name="roadblocks"
						rows="5"
						required
						bind:value={roadblocks}
						placeholder="Injuries, schedule limits, or anything else in the way. Write None if you are clear."
					></textarea>
				</label>

				<button class="button-primary" type="submit">Continue to calendar</button>

				<p class="fallback">
					Prefer email?
					<a href={mailtoHref}>adam.pierre@onxx.io</a>
				</p>
			</form>
		{/if}
	</div>
</main>

<style>
	.contact-page {
		padding: clamp(3rem, 8vw, 5.5rem) 0 clamp(4rem, 9vw, 6rem);
	}

	.page-wrap {
		width: min(100% - 2rem, 40rem);
		margin-inline: auto;
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

	h1 {
		margin: 0;
		font-family: var(--font-h1-h2, 'Saira Stencil', system-ui, sans-serif);
		font-size: clamp(2.4rem, 6vw, 4.25rem);
		font-weight: 400;
		letter-spacing: -0.06em;
		line-height: 0.9;
		text-transform: uppercase;
		text-wrap: balance;
	}

	.lede {
		margin: 1.25rem 0 0;
		color: var(--color-onxx-muted);
		font-size: 1.075rem;
		line-height: 1.7;
	}

	.intake-card {
		display: grid;
		gap: 1.1rem;
		margin-top: 2rem;
		padding: clamp(1.4rem, 4vw, 2rem);
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: var(--color-onxx-alt);
		color: var(--color-onxx-text);
	}

	.intake-card::before {
		width: 4rem;
		height: 3px;
		content: '';
		background: var(--color-onxx-red);
	}

	label {
		display: grid;
		gap: 0.45rem;
		color: var(--color-onxx-text);
		font-family: var(--font-heading, 'Allerta Stencil', system-ui, sans-serif);
		font-size: 0.78rem;
		font-weight: 400;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	input,
	select,
	textarea {
		width: 100%;
		padding: 0.85rem 0.9rem;
		border: 1px solid rgba(255, 255, 255, 0.18);
		border-radius: 0.35rem;
		background-color: var(--color-onxx-bg);
		color: var(--color-onxx-text);
		font-family: var(--font-sans, 'Montserrat', system-ui, sans-serif);
		font-size: 1rem;
		font-weight: 500;
		letter-spacing: 0;
		line-height: 1.5;
		text-transform: none;
	}

	textarea {
		resize: vertical;
		min-height: 8rem;
	}

	select {
		appearance: none;
		background-image: linear-gradient(45deg, transparent 50%, var(--color-onxx-text) 50%),
			linear-gradient(135deg, var(--color-onxx-text) 50%, transparent 50%);
		background-position:
			calc(100% - 1.1rem) 50%,
			calc(100% - 0.75rem) 50%;
		background-size:
			0.35rem 0.35rem,
			0.35rem 0.35rem;
		background-repeat: no-repeat;
	}

	option {
		color: #0f0f0f;
		background: #ffffff;
	}

	input:focus,
	select:focus,
	textarea:focus {
		outline: 2px solid var(--color-onxx-velocity);
		outline-offset: 2px;
		border-color: var(--color-onxx-velocity);
	}

	.form-error {
		margin: 0;
		color: var(--color-onxx-red);
		font-size: 0.95rem;
		line-height: 1.5;
	}

	.button-primary,
	.button-secondary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 3.25rem;
		padding: 0.95rem 1.35rem;
		border-radius: 0.35rem;
		font-family: var(--font-sans, 'Montserrat', system-ui, sans-serif);
		font-size: 0.95rem;
		font-weight: 900;
		letter-spacing: 0.08em;
		text-decoration: none;
		text-transform: uppercase;
		cursor: pointer;
		transition:
			transform 0.2s ease,
			border-color 0.2s ease,
			background-color 0.2s ease;
	}

	.button-primary {
		border: 1px solid #b91c1c;
		background: #b91c1c;
		color: #ffffff;
	}

	.button-secondary {
		border: 1px solid rgba(255, 255, 255, 0.18);
		background: rgba(255, 255, 255, 0.035);
		color: var(--color-onxx-text);
	}

	.button-primary:hover,
	.button-primary:focus-visible,
	.button-secondary:hover,
	.button-secondary:focus-visible {
		transform: translateY(-2px);
	}

	.button-primary:focus-visible,
	.button-secondary:focus-visible {
		outline: 2px solid var(--color-onxx-velocity);
		outline-offset: 3px;
	}

	.button-secondary:hover,
	.button-secondary:focus-visible {
		border-color: rgba(230, 57, 70, 0.72);
		background: rgba(230, 57, 70, 0.12);
	}

	.fallback {
		margin: 0;
		color: var(--color-onxx-muted);
		font-size: 0.95rem;
		line-height: 1.5;
	}

	.fallback a {
		color: var(--color-onxx-text);
	}

	.fallback a:hover,
	.fallback a:focus-visible {
		color: var(--color-onxx-red);
	}

	.calendar-toolbar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.calendar-toolbar p {
		margin: 0;
		color: var(--color-onxx-text);
		line-height: 1.5;
	}

	.calendar-frame {
		width: 100%;
		height: 800px;
		border: 0;
		background: #ffffff;
	}

	@media (max-width: 540px) {
		.button-primary,
		.button-secondary {
			width: 100%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.button-primary,
		.button-secondary {
			transition: none;
		}

		.button-primary:hover,
		.button-primary:focus-visible,
		.button-secondary:hover,
		.button-secondary:focus-visible {
			transform: none;
		}
	}
</style>
