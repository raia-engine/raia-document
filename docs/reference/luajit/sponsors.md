# LuaJIT スポンサーシッププログラム

LuaJITはオープンソースソフトウェアであり、あなたの貢献に依存しています！これは、バグレポート、バグ修正、パッチの形であるかもしれません — Githubのイシュートラッカーを参照してください。もう一つのオプションは、企業スポンサーシップを通じてプロジェクトを財政的にサポートすることです。

ご注意ください：メインのLuaJIT著者（Mike Pall）は関連しないプロジェクトに取り組んでおり、現時点では大きなスポンサーシップを受け入れることができません。しかし、他のコミュニティメンバーはスポンサーシップオファーにオープンかもしれません — LuaJITメーリングリストで関心がある人を尋ねてください。

## 以前のスポンサーシップ一覧

|日付|スポンサーシップ|スポンサー|状態|
|---|---|---|---|
|2009-12|x64 ポート|様々、下記参照|✔ 完了|
|2010-08|PPC/e500 ポート（インタープリタ）|匿名の企業スポンサー|✔ 完了|
|2011-01|ARM ポート|QUALCOMM Inc.|✔ 完了|
|2011-06|バイトコードのロード/セーブ|Gehtsoft USA, LLC|✔ 完了|
|2011-07|PPC ポート|匿名の企業スポンサー|✔ 完了|
|2011-10|MIPS ポート|MIPS Technologies, Inc.|✔ 完了|
|2011-11|FFI コールバック|Neomantra Corp|✔ 完了|
|2012-03|アロケーション/ストアの沈降|匿名の企業スポンサー|✔ 完了|
|2012-05|ARM VFP + ハードフロート|匿名の企業スポンサー|✔ 完了|
|2012-11|LuaJIT 2.0 の完成|Snabb|✔ 完了|
|2013-03|64ビットビット単位演算|匿名の企業スポンサー|✔ 完了 git v2.1|
|2013-04|パフォーマンス|CloudFlare|✔ 完了 git v2.1|
|2013-06|低オーバーヘッドプロファイリング|GIANTS Software GmbH|✔ 完了 git v2.1|
|2014-12|ARM64 インタープリタ|匿名の企業スポンサー|✔ 完了 git v2.1|
|2015-08|MIPS32 ソフトフロート|Cisco Systems, Inc.|✔ 完了 git v2.1|
|2016-05|MIPS64|Cisco Systems, Inc.|✔ 完了 git v2.1|
|2016-07|ARM64 JIT コンパイラ|Cisco & Linaro|✔ 完了 git v2.1|
|2017-07|PPC ソフトフロート|Cisco Systems, Inc.|✔ 完了 git v2.1|
|2019-12|MIPS64 r6 ポート|Wave Computing|✔ 完了 git v2.1|
|2021-03|文字列バッファ|fmad engineering llc|✔ 完了 git v2.1|
|2021-08|テーブルトラバーサル|OpenResty Inc.|✔ 完了 git v2.1|

## Tableトラバーサルのコンパイルのためのスポンサーシップ

OpenResty Inc.は、Luaテーブルのトラバーサル（つまり、`next()`、`pairs()` およびそれに伴う最適化されたバイトコード）のJITコンパイルのスポンサーとなりました。

## 文字列バッファのためのスポンサーシップ

fmad engineering llcは、文字列バッファライブラリの開発のスポンサーとなりました。文字列バッファライブラリは、文字列のようなデータの高性能な操作を可能にします。また、Luaオブジェクトのための高性能シリアライザも含まれています。

## MIPS64 r6ポートのためのスポンサーシップ

Wave Computingは、既存のMIPSポートのMIPS64 r6 ISAバリアントのスポンサーとなりました。この作業はWave ComputingとRT-RKによって行われました。

## PPCソフトフロートサポートのためのスポンサーシップ

Cisco Systems, Inc.は、既存のPPCポートのソフトフロートバリアントの開発のスポンサーとなりました。この作業はRT-RKによって行われました。

## ARM64 JITコンパイラのためのスポンサーシップ

Cisco Systems, Inc.とLinaroは、ARM64ポートのためのJITコンパイラバックエンドの開発のスポンサーとなりました。この作業はRT-RK、Linaro、およびARMによって行われました。

## MIPS64ポートのためのスポンサーシップ

Cisco Systems, Inc.は、MIPS64ポート（ハードフロート+ソフトフロート）の開発のスポンサーとなりました。この作業はRT-RKによって行われました。

## MIPS32デュアルナンバー+ソフトフロートサポート

LuaJITの既存のMIPSポートはハードウェアFPUを必要としますが、多くのMIPS CPUを搭載した組み込みデバイスにはFPUが搭載されていない（または必要とされていない）ことがあります。シングルナンバーモードのみがサポートされているため、カーネルでのFPUエミュレーションは許容できないほど遅くなります。

Cisco Systems, Inc.は、既存のMIPS32ポートのための不足していたデュアルナンバー+ソフトフロート機能の開発のスポンサーとなりました。この作業はRT-RKによって行われました。

これらの変更により、LuaJITのMIPSポートは、小型ルータから高性能なFPU非搭載のMIPS SoCまで、さらに多くのMIPSデバイスで使用できるようになりました。

## 低オーバーヘッドプロファイリング

GIANTS Software GmbHは、2013年6月にLuaJIT 2.1向けの低オーバーヘッドプロファイリング機能の開発をスポンサーしました。GIANTS Softwareは、デスクトップ、モバイル、コンソール用のさまざまなシミュレーションゲームを開発しています。これらのゲームは、スクリプティングやモディングにLuaを広範囲に使用しています。LuaJITへの切り替えは、すべてのプラットフォームでCPU負荷を削減し、必要なフレームレートを維持する上で重要でした。

## パフォーマンスの改善

CloudFlare Inc.は、2013年4月からLuaJIT 2.1のさまざまなパフォーマンス改善をスポンサーしています。CloudFlareは、世界最大級のnginx + LuaJITのデプロイメントを運用しています。この規模では、リクエストの処理時間をわずかに短縮することが大きな影響を与えます。

LuaJIT 2.0と比較して、より多くのビルトインおよびバイトコードがコンパイルおよび最適化されています。文字列操作の多くも改善されています。

## 64ビットビット単位演算のためのスポンサーシップ

名前非公開を希望する企業スポンサーは、2013年3月にLuaJIT 2.1のための64ビットビット単位演算の開発をスポンサーしました。

## 割り当て/ストアシンキングのためのスポンサーシップ

名前非公開を希望する企業スポンサーは、2012年3月にLuaJITのための割り当てシンキングとストアシンキングの最適化開発をスポンサーしました。

一時的な割り当てを避けることは、高水準言語の重要な最適化です。このスポンサーシップの目的は、分析と最適化技術の革新的な組み合わせを研究することです。これらを組み合わせることで、従来の技術よりも効果的で、動的言語により適しています。

## FFIコールバックのためのスポンサーシップ

Neomantra Corpは、2011年11月にLuaJIT x86/x64のためのFFIコールバック機能をスポンサーしました。

## LuaJITのMIPSポートのためのスポンサーシップ

オープンソース開発への取り組みの一環として、MIPS Technologies, Inc.は2011年10月にLuaJIT 2.0のMIPSポートをスポンサーしました。

このポートには、MIPS32 R1アーキテクチャ（O32 ABI、hard-fp、リトルエンディアンまたはビッグエンディアン）に準拠したCPUが必要です。このポートは、MIPS32 34Kおよび74Kコアに最適化されています。

## バイトコードの読み込み/保存のためのスポンサーシップ

Gehtsoft USA, LLCは、2011年6月にLuaJITのバイトコード読み込み/保存機能をスポンサーしました。

LuaJITのバイトコード形式は移植可能で、Luaバイトコードより約40％小さいです。LuaJITのバイトコードローダーは、Luaのバイトコードローダーより10倍速いです。そして、LuaJITのバイトコードはソースコードより30倍から40倍速く読み込まれます。これはコード自体の実行速度とは関係ないことに注意してください — コードがどのようにロードされたかは関係ありません。

## LuaJITのARMポートのためのスポンサーシップ

QUALCOMM Inc.は2011年1月にLuaJIT 2.0のARMポートをスポンサーしました。

ARMポートの初期ターゲットは、低〜中級のARMベースのデバイスでした。このポートには、ARMv5アーキテクチャ（ARM9Eコアまたはそれ以上）に準拠したCPUとソフトウェア浮動小数点（FPUは不要）、およびクラシックなARM命令セットが必要です。

別の匿名を希望する企業スポンサーが、ARMポートのVFPサポート（ハードウェアFPU）とハードフロートEABIサポートをスポンサーしました。LuaJIT 2.0のARMポートは、ソフトフロートターゲット用、ソフトフロートEABI（armel）を使用するVFPターゲット用、またはハードフロートEABI（armhf）を使用するVFPターゲット用にビルドすることができます。

## LuaJITのPPCポートのためのスポンサーシップ

名前を非公開にしたいと望む企業スポンサーが、2011年7月にLuaJITをPowerPC CPUに移植するためのスポンサーシップを提供しました。この移植はFreeScale e300コアに最適化されていますが、標準的なハードウェアFPUを搭載するすべてのPPC CPUで問題なく動作します。

別の名前を非公開にしたいと望む企業スポンサーは、2010年8月にLuaJIT 2.0インタプリタをPowerPC/e500v2（標準PPCとは異なるFPU）に移植するためのスポンサーシップを以前に提供していました。

## LuaJITのx64ポートのためのスポンサーシップ

このスポンサーシップキャンペーンの目標は、LuaJIT 2.0のx64ポートのために20,000ユーロを調達することでした。LuaJITのスポンサーシップを促進するために、Athena Capital Researchは2009年12月に初回の寄付として5,000ユーロを提供しました。

オープンソースコミュニティへのコミットメントの一環として、Athena Capital Researchは最大7,000ユーロのマッチングファンドを提供することを申し出ました。企業スポンサーシップを通じて提供されたすべての資金は1対1でマッチングされました。他の資金は2対1でマッチングされました。

x64のスポンサーシップ目標は2010年1月に達成され、合計20,167ユーロが調達されました！
LuaJITを支援してくれたすべてのスポンサーに感謝します！

|スポンサー名|金額|マッチング|日付|
|---|---|---|---|
|Athena Capital Research LLC|€ 5,000| |2009-12-07|
|(身元非公開) via Athena CR|$ 100|+ $ 200|2009-12-10|
|Snabb|€ 100|+ € 100|2009-12-17|
|Google Inc.|€ 8,000|+ € 6,767|2010-01-20|
|合計 € 20,167|€ 13,167|+ € 7,000| |

::: info 注意
全ての会計はユーロで行われます。外貨は、受領日の実際の為替レートを銀行手数料および税金（該当する場合）を差し引いてユーロに換算されます。
:::