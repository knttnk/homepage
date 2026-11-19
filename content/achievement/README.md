# achievement

researchmap からエクスポートした JSONL ファイルを管理するディレクトリ。
このファイルがウェブサイトの publications ページのデータソースであり、researchmap へのインポートにも使う。

## 運用

### 業績を追加する

1. `rm_achievements.jsonl` に行を追加する。`insert.id` は付けない（researchmap が採番する）
2. ウェブサイトをビルドして反映を確認する（`get-publications.ts` が読み込み、バリデーションも行う）
3. このファイルを researchmap にインポートする
4. researchmap で採番された `id` を該当行の `insert.id` に書き戻す

### 業績を編集する

1. `rm_achievements.jsonl` を直接編集する（`insert.id` は変えない）
2. ウェブサイトをビルドして反映を確認する
3. このファイルを researchmap にインポートする

### researchmap からエクスポートし直す場合

researchmap のエクスポートは非標準フィールドを落とす。特に presentations の `starting_page` / `ending_page` は全て消えるため、エクスポートしたファイルでこのファイルを置き換えてはいけない。
エクスポートを使う場合は `id` など必要な値だけを手で移し、エクスポート後に `git diff` で失われたフィールドがないか確認する。

## ファイル形式

researchmap の JSONL エクスポート形式。1 行 1 JSON オブジェクト。

- `insert.type` でエントリの種類が決まる（`published_papers`, `presentations`, `awards` 等）
- `merge` 内のフィールドが実データ
- `ja` / `en` サブオブジェクトでバイリンガル対応

## ウェブサイトへのマッピング

| `insert.type` | publications カテゴリ | 備考 |
|---|---|---|
| `published_papers` | journal_papers | `referee` で査読の有無を記録 |
| `published_papers` (`published_paper_type: doctoral_thesis` / `master_thesis`) | thesis | `publication_name` に大学名を入れる |
| `presentations` (`is_international_presentation: true`) | international_conference | |
| `presentations` (`is_international_presentation: false`) | domestic_conference | |
| `awards` | awards | `see_also` で受賞ページ URL を保持 |
| `works`, `research_projects`, `others` | others | |

## 注意

- `starting_page` / `ending_page` を presentations に入れているが、researchmap の標準フィールドではない（インポートでエラーにはならないが、エクスポートすると消える）
- 発表番号（ThAT11.18 等）も `starting_page` に入れている
- ページ数も発表番号もない発表（ポスターなど）は `starting_page` を空文字 `""` にする（バリデーションで必須扱いのため）
- `research_experience`, `research_interests`, `research_areas`, `education` はウェブサイトでは使わないが、researchmap 用にそのまま保持
