# 環境構築

## Vfoxを入れる

<https://github.com/version-fox/vfox?tab=readme-ov-file> に従って、

```sh
vfox
```

とできるまでやる。

## Node.jsを入れる

```sh
vfox add nodejs
vfox install nodejs@24
vfox use -p nodejs@24
```

確認。

```sh
node -v
npm -v
```

これでこのプロジェクトを作ったが，もう必要ないはず。

```sh
npx create-next-app@latest
```

## アップデート

```sh
npm update
npx shadcn@latest add @intentui/all
```

## その他

```sh
npm install -g serve npm-check-updates
```
