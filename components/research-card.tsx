import 'server-only';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Markdown } from '@/components/markdown';
import { loadResearchMarkdown } from '@/lib/markdown';

interface ResearchCardProps {
	slug: string;
	locale: string;
}

/**
 * 先頭の`# タイトル`行と本文を分離する．
 * Markdown原稿の自然な書き方（冒頭にH1を置く）を活かしつつ，
 * カードのヘッダ／本文に分けて描画できるようにするためのヘルパ．
 */
function splitTitleAndBody(markdown: string): { title: string | null; body: string } {
	const match = markdown.match(/^[\s\r\n]*#\s+(.+?)\s*#*\s*\r?\n/);
	if (!match) return { title: null, body: markdown };
	return { title: match[1], body: markdown.slice(match[0].length) };
}

/**
 * 研究紹介のカード．`content/research/<slug>/<locale>.md` を読み込み，
 * 冒頭のH1を`CardHeader`に，本文を`CardContent`内のMarkdownとして描画する．
 */
export async function ResearchCard({ slug, locale }: ResearchCardProps) {
	const md = await loadResearchMarkdown(slug, locale);
	const { title, body } = splitTitleAndBody(md);
	return (
		<Card>
			{title && (
				<CardHeader>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
			)}
			<CardContent>
				<Markdown>{body}</Markdown>
			</CardContent>
		</Card>
	);
}
