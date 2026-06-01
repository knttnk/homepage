import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Markdown文字列を描画する．
 * 見出し・段落・リスト等のスタイリングはTailwind Typographyの`prose`に委ねている．
 * 子要素を細かく組むのではなくMarkdown原稿をそのまま流し込む用途を想定しており，
 * 個別のコンポーネントマッピングは行わない．
 */
export function Markdown({ children }: { children: string }) {
	return (
		<div className="prose dark:prose-invert font-serif max-w-none prose-headings:scroll-mt-24 prose-headings:font-sans prose-strong:font-sans">
			<ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
		</div>
	);
}
