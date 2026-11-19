# 環境構築

## Pixiを入れる

<https://pixi.sh/latest/installation/> に従って、

```sh
pixi
```

とできるまでやる。

## Node.jsと依存パッケージを入れる

Node.js（npm同梱）は `pixi.toml` で指定しており、`.pixi/` 以下に入る。

```sh
pixi install
pixi run setup
```

確認。

```sh
pixi run node -v
pixi run npm -v
```

`pixi shell` を実行すると、pixiで入れたNode.jsが使えるシェルが開く。
そのシェルの中では、`pixi run` を付けずに `node` や `npm` をそのまま打てる。
下の「アップデート」と「その他」のコマンドは、このシェルの中で実行する。

これでこのプロジェクトを作ったが，もう必要ないはず。

```sh
npx create-next-app@latest
```

## よく使うタスク

```sh
pixi run dev        # 開発サーバ
pixi run build      # out/ に静的書き出し
pixi run lint
pixi run typecheck
pixi run serve      # out/ を配信
```

## アップデート

```sh
pixi run npm update
pixi run npx shadcn@latest add @intentui/all --overwrite
```

## その他

```sh
pixi run npm install -g serve npm-check-updates
```
