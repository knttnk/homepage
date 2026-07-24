import fs from 'fs/promises';
import path from 'path';

export interface PublicationItem {
	year: number;
	month: number | null;
	day: number | null;
	str: string | null;
	url: string | null;
}

export type Publication = PublicationItem & { id: string; category: string };

export type PublicationsMap = Record<string, Publication[]>;

interface BilingualText {
	ja?: string;
	en?: string;
}

interface BilingualNames {
	ja?: { name: string }[];
	en?: { name: string }[];
}

interface RmEntry {
	insert: { type: string; id: string };
	merge: Record<string, any>;
}

const CATEGORIES = ['journal_papers', 'international_conference', 'domestic_conference', 'awards', 'others'] as const;

function getLocalized(field: BilingualText | undefined, locale: string): string | null {
	if (!field) return null;
	return (locale === 'ja' ? (field.ja ?? field.en) : (field.en ?? field.ja)) ?? null;
}

function isUsingJapanese(field: BilingualText | undefined, locale: string): boolean {
	if (!field) return locale === 'ja';
	if (locale === 'ja') return field.ja != null;
	return field.en == null && field.ja != null;
}

function getNames(field: BilingualNames | undefined, locale: string): string[] {
	if (!field) return [];
	const list = locale === 'ja' ? (field.ja ?? field.en) : (field.en ?? field.ja);
	return list?.map(n => n.name) ?? [];
}

function parseDate(str: string | undefined): { year: number; month: number | null; day: number | null } {
	if (!str || str === '9999') return { year: 0, month: null, day: null };
	const parts = str.split('-').map(Number);
	return { year: parts[0], month: parts[1] ?? null, day: parts[2] ?? null };
}

function getUrl(merge: Record<string, any>): string | null {
	if (merge.identifiers?.doi?.[0]) {
		return `https://doi.org/${merge.identifiers.doi[0]}`;
	}
	const seeAlso = merge.see_also as { '@id': string; label?: string }[] | undefined;
	if (seeAlso?.length) {
		return seeAlso.find(s => s.label === 'doi')?.['@id']
			?? seeAlso.find(s => s.label === 'url')?.['@id']
			?? seeAlso[0]['@id'];
	}
	return null;
}

function mapCategory(entry: RmEntry): string | null {
	switch (entry.insert.type) {
		case 'published_papers': return 'journal_papers';
		case 'presentations': return entry.merge.is_international_presentation ? 'international_conference' : 'domestic_conference';
		case 'awards': return 'awards';
		case 'works':
		case 'research_projects':
		case 'others': return 'others';
		default: return null;
	}
}

function getEntryDate(entry: RmEntry): { year: number; month: number | null; day: number | null } {
	const m = entry.merge;
	switch (entry.insert.type) {
		case 'published_papers':
		case 'presentations': return parseDate(m.publication_date);
		case 'awards': return parseDate(m.award_date);
		default: return parseDate(m.from_date);
	}
}

function formatPublishedPaper(m: Record<string, any>, locale: string): string {
	const ja = isUsingJapanese(m.paper_title, locale);
	const sep = ja ? '，' : ', ';
	const authors = getNames(m.authors, locale).join(sep);
	const title = getLocalized(m.paper_title, locale) ?? '';
	const journal = getLocalized(m.publication_name, locale) ?? '';
	const date = parseDate(m.publication_date);

	const details: string[] = [];
	if (m.volume) details.push(`Vol. ${m.volume}`);
	if (m.number) details.push(`No. ${m.number}`);
	if (m.starting_page) {
		details.push(
			m.ending_page && m.starting_page !== m.ending_page
				? `pp. ${m.starting_page}–${m.ending_page}`
				: m.starting_page
		);
	}

	const dateStr = date.month ? `${date.year}/${String(date.month).padStart(2, '0')}` : `${date.year}`;
	let str = `${authors}${ja ? '：' : ': '}${title}${ja ? '；' : '; '}${journal}`;
	if (details.length) str += `${sep}${details.join(', ')}`;
	str += ` (${dateStr})`;

	if (locale !== 'ja' && m.languages?.includes('jpn')) str += ' (in Japanese)';
	return str;
}

function formatPresentation(m: Record<string, any>, locale: string): string {
	const ja = isUsingJapanese(m.presentation_title, locale);
	const sep = ja ? '，' : ', ';
	const presenters = getNames(m.presenters, locale).join(sep);
	const title = getLocalized(m.presentation_title, locale) ?? '';
	const event = getLocalized(m.event, locale);
	const date = parseDate(m.publication_date);

	let str = `${presenters}${ja ? '：' : ': '}${title}`;
	if (event) str += `${ja ? '；' : '; '}${ja ? '' : 'in '}${event}`;

	if (m.starting_page) {
		str += m.ending_page && m.starting_page !== m.ending_page
			? `, pp. ${m.starting_page}–${m.ending_page}`
			: `, ${m.starting_page}`;
	}

	str += ` (${date.year})`;
	if (locale !== 'ja' && m.languages?.includes('jpn')) str += ' (in Japanese)';
	return str;
}

function formatAward(m: Record<string, any>, locale: string): string {
	const ja = isUsingJapanese(m.award_name, locale);
	const name = getLocalized(m.award_name, locale) ?? '';
	const association = getLocalized(m.association, locale);
	const date = parseDate(m.award_date);

	if (ja) {
		return `${association ? association + ' ' : ''}${name} (${date.year})`;
	}
	let str = name;
	if (association) str += ` from ${association}`;
	str += ` (${date.year})`;
	return str;
}

function formatWorks(m: Record<string, any>, locale: string): string {
	const title = getLocalized(m.work_title, locale) ?? '';
	const desc = getLocalized(m.description, locale);
	return desc ? `${title} — ${desc}` : title;
}

function formatResearchProject(m: Record<string, any>, locale: string): string {
	const ja = isUsingJapanese(m.offer_organization, locale) || isUsingJapanese(m.system_name, locale);
	const org = getLocalized(m.offer_organization, locale) ?? '';
	const system = getLocalized(m.system_name, locale) ?? '';
	const from = parseDate(m.from_date);
	const to = parseDate(m.to_date);

	const fromStr = from.month ? `${from.year}/${from.month}` : `${from.year}`;
	const toStr = to.year === 0 ? '' : (to.month ? `${to.year}/${to.month}` : `${to.year}`);
	const period = `${fromStr}–${toStr}`;

	if (ja) {
		return `${org}${system} に採用(${period})`;
	}
	let str = system;
	if (org) str += ` from ${org}`;
	str += ` (${period})`;
	return str;
}

function formatOtherEntry(m: Record<string, any>, locale: string): string {
	return getLocalized(m.other_title, locale) ?? '';
}

function formatEntry(entry: RmEntry, locale: string): string | null {
	let str: string;
	switch (entry.insert.type) {
		case 'published_papers': str = formatPublishedPaper(entry.merge, locale); break;
		case 'presentations': str = formatPresentation(entry.merge, locale); break;
		case 'awards': str = formatAward(entry.merge, locale); break;
		case 'works': str = formatWorks(entry.merge, locale); break;
		case 'research_projects': str = formatResearchProject(entry.merge, locale); break;
		case 'others': str = formatOtherEntry(entry.merge, locale); break;
		default: return null;
	}
	return str || null;
}

export async function getPublications(locale: string): Promise<PublicationsMap> {
	const dir = path.join(process.cwd(), 'content/achievement');
	let files: string[];
	try {
		files = (await fs.readdir(dir))
			.filter(f => f.startsWith('rm_achievements') && f.endsWith('.jsonl'))
			.sort();
	} catch {
		return Object.fromEntries(CATEGORIES.map(c => [c, []]));
	}

	if (files.length === 0) {
		return Object.fromEntries(CATEGORIES.map(c => [c, []]));
	}

	const content = await fs.readFile(path.join(dir, files[files.length - 1]), 'utf8');
	const entries: RmEntry[] = content.trim().split('\n')
		.filter(l => l.trim())
		.map(l => JSON.parse(l));

	const result: PublicationsMap = Object.fromEntries(
		CATEGORIES.map(c => [c, [] as Publication[]])
	);

	for (const entry of entries) {
		if (entry.merge.display !== 'disclosed') continue;
		const category = mapCategory(entry);
		if (!category) continue;

		const date = getEntryDate(entry);
		result[category].push({
			id: entry.insert.id,
			category,
			year: date.year,
			month: date.month,
			day: date.day,
			str: formatEntry(entry, locale),
			url: getUrl(entry.merge),
		});
	}

	for (const cat of CATEGORIES) {
		result[cat].sort((a, b) => {
			if (a.year !== b.year) return b.year - a.year;
			if (a.month !== b.month) return (b.month ?? 0) - (a.month ?? 0);
			return (b.day ?? 0) - (a.day ?? 0);
		});
	}

	return result;
}
