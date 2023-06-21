## 概要

NestJSプロジェクトでDDDを練習するために [praha-inc/praha-challenge-template](https://github.com/praha-inc/praha-challenge-template) プロジェクトからフォークして、ライブラリなどを更新して開発が素早く進められるようにしたプロジェクトです。

## 変更箇所

- Node.jsのバージョンやライブラリを最新に変更
- yarnではなくpnpmを使うように


### ローカルでアプリを起動する準備

#### DBの起動 (Docker)

```bash
cd .docker && docker-compose up -d --build
```

#### Volta のインストール

```bash
# install Volta
curl https://get.volta.sh | bash

# install Node
volta install node@18 # or node@lts
```

#### node_modulesの生成

```bash
npm i -g pnpm
```

```bash
cd backend && pnpm install
```

#### prisma generate の実行

```bash
pnpm model-generate
```

## 開発方法

### 開発サーバーの起動

```bash
pnpm dev
```


## 変更履歴


### backend

- Node.js@12 -> Node.js@18 にバージョンアップ
- yarn から pnpm に変更
- `pnpm up --latest`を実行してライブラリをすべて最新に更新
- `faker` -> `@faker-js/faker` にライブラリを更新