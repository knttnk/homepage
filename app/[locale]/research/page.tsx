import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Heading } from '@/components/ui/heading';
import { InsetPadding } from '@/components/inset-padding';
import { ResearchCard } from '@/components/research-card';

// `output: "export"` のため，対応ロケール分のページを静的生成する．
export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

/**
 * 研究紹介ページ．
 * Card等のレイアウトはJSXで保持し，各セクションの本文は
 * `content/research/<slug>/<locale>.md` から読み込んで描画する．
 */
export default async function ResearchPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;

	// Enable static rendering
	setRequestLocale(locale);

	const t = await getTranslations('ResearchPage');

	return (
		<InsetPadding>
			<Heading level={1}>{t('title')}</Heading>
			<ResearchCard slug="virtual-dynamics" locale={locale} />
		</InsetPadding>
	);
}
