# stb

::: info
このページおよび同じカテゴリーにあるすべてのページは[stbのGithubリポジトリ](https://github.com/nothings/stb)のドキュメント等を翻訳したものです。
:::

C/C++ 用のシングルファイルパブリックドメイン (または MIT ライセンス) ライブラリ

注目すべき点:

* image loader: [stb_image.h](stb_image.h)
* image writer: [stb_image_write.h](stb_image_write.h)
* image resizer: [stb_image_resize.h](stb_image_resize.h)
* font text rasterizer: [stb_truetype.h](stb_truetype.h)
* typesafe containers: [stb_ds.h](stb_ds.h)

Most libraries by stb, except: stb_dxt by Fabian "ryg" Giesen, stb_image_resize by Jorge L. "VinoBS" Rodriguez, and stb_sprintf by Jeff Roberts.

<a name="stb_libs"></a>

library    | lastest version | category | LoC | description
--------------------- | ---- | -------- | --- | --------------------------------
**[stb_vorbis.c](stb_vorbis.c)** | 1.22 | audio | 5584 | ogg vorbis ファイルをファイル/メモリから float/16 ビット符号付き出力にデコードする。
**[stb_hexwave.h](stb_hexwave.h)** | 0.5 | audio | 680 | オーディオ波形シンセサイザー
**[stb_image.h](stb_image.h)** | 2.27x | graphics | 7901 | ファイル/メモリからの画像読み込み/復号化。jpg, png, tga, bmp, psd, gif, hdr, pic
**[stb_truetype.h](stb_truetype.h)** | 1.26 | graphics | 5084 | truetypeフォントからの文字の解析、デコード、ラスタライズ
**[stb_image_write.h](stb_image_write.h)** | 1.16 | graphics | 1724 | 画像のディスクへの書き込み。PNG、TGA、BMP
**[stb_image_resize.h](stb_image_resize.h)** | 0.97 | graphics | 2634 | 画像の拡大・縮小を高画質で行うことができます。
**[stb_rect_pack.h](stb_rect_pack.h)** | 1.01 | graphics | 623 | シンプルな2D矩形パッカーで、そこそこの品質
**[stb_perlin.h](stb_perlin.h)** | 0.5 | graphics | 428 | Perlinの修正されたシンプレックスノイズと異なるシードを持つ。
**[stb_ds.h](stb_ds.h)** | 0.67 | utility | 1897 | typesafe dynamic array and hash tables for C, will compile in C++
**[stb_sprintf.h](stb_sprintf.h)** | 1.10 | utility | 1906 | C/C++のための高速sprintf, snprintf
**[stb_textedit.h](stb_textedit.h)** | 1.14 | user&nbsp;interface | 1429 | ゲーム用テキストエディタなど、ゼロから実装する場合の勘所
**[stb_voxel_render.h](stb_voxel_render.h)** | 0.89 | 3D&nbsp;graphics | 3807 | Minecraft風のボクセルレンダリング "エンジン"、さらに多くの機能を搭載
**[stb_dxt.h](stb_dxt.h)** | 1.12 | 3D&nbsp;graphics | 719 | Fabian "ryg" GiesenのリアルタイムDXTコンプレッサー
**[stb_easy_font.h](stb_easy_font.h)** | 1.1 | 3D&nbsp;graphics | 305 | quick-and-dirty easy-to-deploy フレームレート表示用ビットマップフォント
**[stb_tilemap_editor.h](stb_tilemap_editor.h)** | 0.42 | game&nbsp;dev | 4187 | 埋め込み型タイルマップエディタ
**[stb_herringbone_wa...](stb_herringbone_wang_tile.h)** | 0.7 | game&nbsp;dev | 1221 | herringbone Wang tile map generator
**[stb_c_lexer.h](stb_c_lexer.h)** | 0.12 | parsing | 940 | C言語用パーサーの作成を容易にする。
**[stb_divide.h](stb_divide.h)** | 0.94 | math | 433 | より有用な32ビット演算（例："ユークリッド除算"）。
**[stb_connected_comp...](stb_connected_components.h)** | 0.96 | misc | 1049 | グリッド上での到達可能性をインクリメンタルに計算する。
**[stb_leakcheck.h](stb_leakcheck.h)** | 0.6 | misc | 194 | quick-and-dirty malloc/free リークチェック
**[stb_include.h](stb_include.h)** | 0.02 | misc | 295 | 再帰的な #include サポートの実装（特に GLSL 向け

Total libraries: 21
Total lines of C code: 43040


FAQ
---

#### ライセンスは？

これらのライブラリはパブリックドメインです。あなたはそれらを使って何でもすることができます。帰属表示はありがたいのですが、それ以外の法的義務はありません。

パブリックドメインに不満な弁護士がいるならば、MITオープンソースライセンスの下でもライセンスされます。すべてのソースファイルには、あなたが選択できるよう、明示的なデュアルライセンスが含まれています。

#### これらのライブラリはどのように使用するのですか？

シングルヘッダーファイルライブラリの背後にある考え方は、すべてのコードが単一のファイルに含まれているため、配布と展開が容易であることです。デフォルトでは、この中の.hファイルはそれ自身のヘッダーファイルとして機能します。つまり、ファイルに含まれる関数を宣言しますが、実際にはどんなコードもコンパイルされることはありません。

そのため、コードを実際にインスタンス化するC/C++ソースファイル（できれば頻繁に編集しないファイル）を正確に1つ選択する必要があります。このファイルは、関数定義を実際に有効にするための特定のマクロ（これはライブラリごとに文書化されています）を定義する必要があります。例えば、stb_image を使うには、stb_image.h を定期的にインクルードせず、次のような C/C++ ファイルを1つだけ用意します。

    #define STB_IMAGE_IMPLEMENTATION
    #include "stb_image.h"

定義すべき正しいマクロは、各ライブラリの冒頭で指摘されている。

#### <a name="other_libs"></a> 他にシングルファイルのパブリックドメイン/オープンソースライブラリで、依存関係が最小のものはありますか？

[はい。](https://github.com/nothings/single_file_libs)

#### stbのライブラリを新しいライブラリで包んだ場合、新しいライブラリはパブリックドメイン/MITでなければならないのでしょうか？

いいえ。パブリックドメインですので、新しいライブラリが望むライセンスに自由に再ライセンスできます。

#### GCC系コンパイラのSSEサポートはどうなっているのでしょうか？

stb_image は実行時にプロセッサを検出して正しく処理しようとするのではなく、SSE2 を使用するか（-msse2 でコンパイルした場合）、SIMD をまったく使用しないかのどちらかになります。私の理解では、実行時検出のためにGCCで承認されたパスは、複数のソースファイル、各CPU構成用のものを使用することを必要とします。stb_image はヘッダファイルライブラリで、1つのソースファイルのみでコンパイルされるため、SSE対応と非対応のバリエーションをビルドする承認された方法はありません。

私たちはこの問題を回避しようと試みましたが、特定のバージョンのgccが私たちのやっていることを壊してしまうため、何年も前から複数の問題が発生しており、私たちはこの問題をあきらめることにしました。例として、https://github.com/nothings/stb/issues/280 と https://github.com/nothings/stb/issues/410 を参照してください。

#### 既存のオープンソースライブラリとは冗長なものもあるようです。何か良い方法があるのでしょうか？

一般的には、統合しやすい、使いやすい、リリースしやすい（単一のファイル、優れたAPI、帰属の必要がない）という点で、より優れているというだけです。しかし、機能が少なかったり、速度が遅かったり、メモリを多く消費したりすることもあります。すでに同等のライブラリを使っているのであれば、乗り換える理由はないでしょう。

#### stbライブラリの表に直接リンクすることはできますか？

[このURL](https://github.com/nothings/stb#stb_libs)を使って、そのリストに直接リンクすることができます。

#### なぜ「コード行数」を記載するのですか？ひどい指標です。

ライブラリの内部的な複雑さについて、あなたの期待を管理するため、あるいは、あなたが何に手を出しているかを知ってもらうために、いくつかのアイデアを与えるだけです。すべてのライブラリが同じスタイルで書かれているわけではありませんが、似たようなスタイルであることは確かなので、ライブラリ間の比較はやはり意味があるのでしょう。

ただし、この行には、ヘッダーファイルに相当する実装と、ドキュメントの両方が含まれていることに注意してください。

#### なぜシングルファイルヘッダーなのか？

Windowsには、ライブラリが置かれる標準的なディレクトリがありません。そのため、Windowsでのライブラリのデプロイは、Unixベースのオープンソース開発者が一般的に思っているよりもずっと大変なのです。(それはまた、Windowsにおけるライブラリの依存性をより悪くします)。

また、Windowsでは、あるライブラリが異なるバージョンのランタイムライブラリに対してビルドされ、リンクの衝突や混乱を引き起こすという問題がよくあります。ライブラリをヘッダとして配布することで、ライブラリを作成せずにそのままプロジェクトにコンパイルすることができ、この問題を回避することができます。

ライブラリを1つのファイルにすることで、ライブラリを必要とするプロジェクトにドロップするだけで、簡単に利用することができます。(もちろん、必要であれば、適切な共有ライブラリツリーに置くこともできます)。

なぜ2つのファイルではなく、1つはヘッダー、もう1つは実装なのでしょうか？10ファイルと9ファイルの差は大したことではありませんが、2ファイルと1ファイルの差は大きいです。ファイルをzipやtarで圧縮する必要がなく、*2*個のファイルを添付することを覚える必要もない、など。

#### なぜ "stb "なのか？セットトップボックスと関係があるのでしょうか？

いや、単に私の名前、Sean T. Barrettの頭文字をとっただけです。これは自画自賛ではなく、ファイル名とソース関数名を区別するための穏当な方法として選んだのです。

#### stb_image.hに画像の種類を追加するのでしょうか？

stb_imageの利用が拡大するにつれ、コードベースのセキュリティに重点を置くことがより重要になってきました。新しい画像フォーマットを追加すると、安全性を確保するために必要なコードの量が増えるので、新しいフォーマットを追加する価値はもうない。

#### 自分でシングルファイルライブラリを作成する方法について、何かアドバイスはありますか？

はい。 https://github.com/nothings/stb/blob/master/docs/stb_howto.txt

#### なぜパブリックドメインなのか？

私は多くの理由から、GPL、LGPL、BSD、zlibなどよりもこの方式を好んでいます。
その一部をご紹介します。
https://github.com/nothings/stb/blob/master/docs/why_public_domain.md

#### なぜCなのか？

主に、私はC++ではなくCを使っているからです。でも、そのおかげで他の人が他の言語から使うのも簡単になります。

#### なぜC99ではダメなのか？ stdint.h、declare-anywhereなど。

MSVC 6 (1998)は、それ以降のバージョンのMSVCよりも私にとってはヒューマンファクターが優れているので、今でも私のIDEとして使っています。
