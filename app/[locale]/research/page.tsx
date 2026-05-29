import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { InsetPadding } from '@/components/inset-padding';
import { Markdown } from '@/components/markdown';
import { loadResearchMarkdown } from '@/lib/markdown';

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

	const virtualDynamics = await loadResearchMarkdown('virtual-dynamics', locale);

	return (
		<InsetPadding>
			<Heading level={2}>{t('title')}</Heading>
			<Card>
				<CardHeader>{t('virtual_dynamics')}</CardHeader>
				<CardContent>
					<Markdown>{virtualDynamics}</Markdown>
				</CardContent>
			</Card>
		</InsetPadding>
	);
}
