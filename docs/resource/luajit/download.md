# ダウンロード

## 公開gitリポジトリ

LuaJITは、gitリポジトリからのソースコードとしてのみ利用可能です。このリポジトリにアクセスするには、お使いのオペレーティングシステム用のgitコマンドをインストールする必要があります。詳細については、gitバージョン管理システムのドキュメントを参照してください。

読み取り専用の公開gitリポジトリは、次のコマンドでクローン（ダウンロード）できます：

```sh
git clone https://luajit.org/git/luajit.git
```

::: info 注意
これはブラウズ可能なリソースではありません。リポジトリはgitクライアントでのみアクセス可能です。
:::

これにより、luajitの下に新しいディレクトリツリーが作成されます。このディレクトリに移動し、オプションで別のブランチに切り替え、そのブランチのdoc/install.htmlファイルのビルド手順に従ってください。

異なるブランチやローリングリリースポリシーの詳細については、ステータスページを確認してください。

ブラウズ可能なミラーとGitHubミラーもあり、問題追跡システムもホストされています。

## リリースターボールやバイナリはありません

LuaJITはローリングリリースを使用しています。ダウンロード用のリリースターボールはありません。

古いターボールやzipファイルからの古いバージョンを使用しないでください。これらのダウンロードへの古いリンクを削除してください。これらのリンクは近いうちに機能しなくなります。

第三者によって作成された擬似リリースやターボールを使用しないでください。第三者によってダウンロード用に提供されたバイナリも使用しないでください。

事前にビルドされたパッケージは、お使いのオペレーティングシステム（ディストリビューション）の信頼できるパッケージマネージャーを通じてのみインストールされるべきです。ただし、これらは重要な修正を欠いている古いバージョンを持っていることがよくあります。問題を報告する前に、gitリポジトリから利用可能な最新バージョンを常に試してください。

リリースの概念を必要とするディストリビューションのディストリビューションメンテナーは、ブランチの頻繁なスナップショットを取るべきです。個々の変更をどれだけ自立して見えるかにかかわらず、個々の変更をピックアップしたり、バックポートしようとしないでください（しばしばそれらはそうではありません）。