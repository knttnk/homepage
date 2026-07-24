# achievement

researchmap からエクスポートした JSONL ファイルを管理するディレクトリ。
このファイルがウェブサイトの publications ページのデータソースであり、researchmap へのインポートにも使う。

## 運用

1. 業績を追加・編集するときは `rm_achievements.jsonl` を直接編集する
2. ウェブサイトをビルドすると自動的に反映される（`get-publications.ts` が読み込む）
3. researchmap に反映するときは、このファイルをそのままインポートする

## ファイル形式

researchmap の JSONL エクスポート形式。1 行 1 JSON オブジェクト。

- `insert.type` でエントリの種類が決まる（`published_papers`, `presentations`, `awards` 等）
- `merge` 内のフィールドが実データ
- `ja` / `en` サブオブジェクトでバイリンガル対応

## ウェブサイトへのマッピング

| `insert.type` | publications カテゴリ | 備考 |
|---|---|---|
| `published_papers` | journal_papers | `referee` で査読の有無を記録 |
| `presentations` (`is_international_presentation: true`) | international_conference | |
| `presentations` (`is_international_presentation: false`) | domestic_conference | |
| `awards` | awards | `see_also` で受賞ページ URL を保持 |
| `works`, `research_projects`, `others` | others | |

## 注意

- `starting_page` / `ending_page` を presentations に入れているが、researchmap の標準フィールドではない（インポートでエラーにはならなかった）
- 発表番号（ThAT11.18 等）も `starting_page` に入れている
- `research_experience`, `research_interests`, `research_areas`, `education` はウェブサイトでは使わないが、researchmap 用にそのまま保持
