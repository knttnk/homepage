import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { CATEGORIES, EDUCATION_CATEGORIES, getPublications } from './get-publications';
import { PublicationsTable } from './publications-table';
import { InsetPadding } from '@/components/inset-padding';

export async function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function ResearchPage({ params }: { params: Promise<{ locale: string }> }) {
	// locale の設定
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations('PublicationsPage');

	// 論文データの取得
	const publications = await getPublications(locale);

	const renderCategory = (category: (typeof CATEGORIES)[number] | (typeof EDUCATION_CATEGORIES)[number]) => {
		const items = publications[category].map((item, index) => ({ ...item, index: index + 1 }));
		return (
			<Card key={category}>
				<CardHeader>
					<CardTitle>{t(category)}</CardTitle>
				</CardHeader>
				<CardContent>
					<PublicationsTable items={items} label={t(category)} publicationHeader={t('detail')} />
				</CardContent>
			</Card>
		);
	};

	return (
		<InsetPadding>
			<Heading level={2}>{t('title')}</Heading>
			{CATEGORIES.map(renderCategory)}
			<Heading level={2}>{t('education_title')}</Heading>
			{EDUCATION_CATEGORIES.map(renderCategory)}
		</InsetPadding>
	);
}
