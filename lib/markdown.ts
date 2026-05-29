import 'server-only';
import fs from 'node:fs/promises';
import path from 'node:path';
import { routing } from '@/i18n/routing';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

/**
 * 研究紹介ページ用のMarkdown本文を読み込む．
 * `content/research/<slug>/<locale>.md` を探し，無ければ `defaultLocale` にフォールバックする．
 * （片方の言語だけ未翻訳でもページが壊れないようにするため．）
 * Server Component から呼ばれ，`output: "export"` のためビルド時に評価される．
 */
export async function loadResearchMarkdown(slug: string, locale: string): Promise<string> {
	const candidates = [locale, routing.defaultLocale];
	for (const l of candidates) {
		const filePath = path.join(CONTENT_ROOT, 'research', slug, `${l}.md`);
		try {
			return await fs.readFile(filePath, 'utf-8');
		} catch {
			// 見つからなければ次の候補へ
		}
	}
	throw new Error(`Markdown not found for research/${slug} (tried: ${candidates.join(', ')})`);
}
