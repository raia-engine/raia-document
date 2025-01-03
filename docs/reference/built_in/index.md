# LuaJITライブラリ

LuaJITはLua5.1と互換性があり、必要に応じてLua5.2、5.3から機能を追加しています。また、FFIやJIT関係の関数など、LuaJIT独自の機能を追加しています。

LuaJIT独自の拡張がある関数には、互換性の欄に(*)の表記を追加しています。

## 基本ライブラリ

### 変数/定数/テーブル

|名前|説明|互換性|
|---|---|---|
|[`_G`](global/_g.md)|グローバル環境|Lua5.1|
|[`_VERSION`](global/_version.md)|現在のLuaのバージョン|Lua5.1|

### 関数/メソッド

|名前|説明|互換性|
|---|---|---|
|[`assert`](std/assert.md)|条件が偽の場合、エラーを発生させる|*Lua5.3*|
|[`collectgarbage`](std/collectgarbage.md)|ガベージコレクタを制御する|Lua5.1|
|[`dofile`](std/dofile.md)|指定されたファイルをLuaスクリプトとして実行する|Lua5.1|
|[`error`](std/error.md)|実行中の関数を停止し、エラーメッセージを返す|Lua5.1|
|[`getfenv`](std/getfenv.md)|関数やスレッドの環境テーブルを取得する|Lua5.1|
|[`getmetatable`](std/getmetatable.md)|オブジェクトのメタテーブルを返す|Lua5.1|
|[`ipairs`](std/ipairs.md)|配列テーブルを順番にイテレートするためのイテレータ関数|Lua5.1|
|[`load`](std/load.md)|文字列や関数からLuaコードを読み込み、チャンクを返す|*Lua5.2*(*)|
|[`loadfile`](std/loadfile.md)|ファイルからLuaコードを読み込み、チャンクを返す|*Lua5.2*(*)|
|[`loadstring`](std/loadstring.md)|文字列からLuaコードを読み込み、チャンクを返す|Lua5.1(*)|
|[`next`](std/next.md)|テーブルの次のキーと値を返し、テーブルをトラバース可能にする|Lua5.1|
|[`pairs`](std/pairs.md)|テーブル全体をトラバースするためのイテレータ関数|Lua5.1|
|[`pcall`](std/pcall.md)|保護されたモードで関数を呼び出す（エラーが発生しても処理を継続させる）|Lua5.1|
|[`print`](std/print.md)|標準出力に値を出力する|Lua5.1|
|[`rawequal`](std/rawequal.md)|2つの値が等しいかをチェックする（メタメソッドは呼び出されない）|Lua5.1|
|[`rawget`](std/rawget.md)|テーブルから直接値を取得する（メタメソッドは呼び出されない）|Lua5.1|
|[`rawset`](std/rawset.md)|テーブルに直接値を設定する（メタメソッドは呼び出されない）|Lua5.1|
|[`select`](std/select.md)|可変長引数の中から特定の引数を返す|Lua5.1|
|[`setfenv`](std/setfenv.md)|関数に新しい環境テーブルを設定する|Lua5.1|
|[`setmetatable`](std/setmetatable.md)|テーブルにメタテーブルを設定する|Lua5.1|
|[`tonumber`](std/tonumber.md)|値を数値に変換する|Lua5.1|
|[`tostring`](std/tostring.md)|値を文字列に変換する|Lua5.1|
|[`type`](std/type.md)|引数のデータ型を文字列で返す|Lua5.1|
|[`unpack`](std/unpack.md)|テーブルの要素を複数の引数として展開する|Lua5.1|
|[`xpcall`](std/xpcall.md)|保護されたモードで関数を呼び出す（エラーハンドラを指定する）|Lua5.1(*)|

## コルーチン操作 (`coroutine.*`)

|名前|説明|互換性|
|---|---|---|
|[`coroutine.create`](coroutine/create.md)|新しいコルーチンを作成する|Lua5.1|
|[`coroutine.resume`](coroutine/resume.md)|コルーチンを再開する|Lua5.1|
|[`coroutine.running`](coroutine/running.md)|実行中のコルーチンを返す|Lua5.1|
|[`coroutine.status`](coroutine/status.md)|コルーチンの状態を返す|Lua5.1|
|[`coroutine.wrap`](coroutine/wrap.md)|コルーチンを関数としてラップする|Lua5.1|
|[`coroutine.yield`](coroutine/yield.md)|コルーチンを一時停止し、再開できるようにする|Lua5.1|
|[`coroutine.isyieldable`](coroutine/isyieldable.md)|現在の関数が中断可能かどうかを判定する|*Lua5.3*|

## モジュール (`package.*`)

### 変数/定数/テーブル

|名前|説明|互換性|
|---|---|---|
|[`package.cpath`](package/cpath.md)|Cライブラリの検索パスを定義する|Lua5.1|
|[`package.loaded`](package/loaded.md)|すでにロードされたモジュールを保持するテーブル|Lua5.1|
|[`package.loaders`](package/loaders.md)|モジュールのロード関数のリスト（非推奨、Lua5.2以降では`searchers`）|Lua5.1|
|[`package.path`](package/path.md)|Luaスクリプトの検索パスを定義する|Lua5.1|
|[`package.preload`](package/preload.md)|モジュールを手動で登録するためのテーブル|Lua5.1|

### 関数/メソッド

|名前|説明|互換性|
|---|---|---|
|[`module`](package/module.md)|モジュールを定義する（非推奨）。|Lua5.1|
|[`require`](package/require.md)|モジュールをロードして返す|Lua5.1|
|[`package.loadlib`](package/loadlib.md)|Cライブラリをロードする|*Lua5.2*|
|[`package.seeall`](package/seeall.md)|モジュールがグローバルな変数にアクセスできるようにする（非推奨）|Lua5.1|
|[`package.searchpath`](package/searchpath.md)|指定されたモジュール名をパスで検索する|*Lua5.2*|

## 文字列操作 (`string.*`)

|名前|説明|互換性|
|---|---|---|
|[`string.byte`](string/byte.md)|指定された位置の文字のバイト値を返す|Lua5.1|
|[`string.char`](string/char.md)|バイト値の列を文字列に変換する|Lua5.1|
|[`string.dump`](string/dump.md)|関数のバイトコードを返す|Lua5.1(*)|
|[`string.find`](string/find.md)|文字列内でパターン検索を行う|Lua5.1|
|[`string.format`](string/format.md)|フォーマットに従って文字列を生成する|Lua5.2|
|[`string.gmatch`](string/gmatch.md)|パターンに一致する部分を順次返すイテレータを生成する|Lua5.1|
|[`string.gsub`](string/gsub.md)|文字列内でパターンに一致する部分を置換する|Lua5.1|
|[`string.len`](string/len.md)|文字列の長さを返す|Lua5.1|
|[`string.lower`](string/lower.md)|文字列をすべて小文字に変換する|Lua5.1|
|[`string.match`](string/match.md)|文字列内でパターンに一致する部分を返す|Lua5.1|
|[`string.rep`](string/rep.md)|文字列を指定回数繰り返し、任意で区切り文字を追加する|*Lua5.2*|
|[`string.reverse`](string/reverse.md)|文字列を逆順にする|Lua5.1|
|[`string.sub`](string/sub.md)|文字列の部分文字列を返す|Lua5.1|
|[`string.upper`](string/upper.md)|文字列をすべて大文字に変換する|Lua5.1|

## テーブル操作 (`table.*`)

|名前|説明|互換性|
|---|---|---|
|[`table.concat`](table/concat.md)|テーブルの要素を連結し、文字列を返す|Lua5.1|
|[`table.insert`](table/insert.md)|テーブルに要素を挿入する|Lua5.1|
|[`table.maxn`](table/maxn.md)|テーブル内の数値キーの最大値を返す（非推奨）|Lua5.1|
|[`table.remove`](table/remove.md)|テーブルから要素を削除する|Lua5.1|
|[`table.sort`](table/sort.md)|テーブルの要素をソートする|Lua5.1|
|[`table.new`](table/new.md)|指定されたサイズで新しいテーブルを作成する|*LuaJIT*|
|[`table.clear`](table/clear.md)|テーブル内のすべての要素を削除する|*LuaJIT*|
|[`table.move`](table/move.md)|テーブルの一部の要素を他の位置に移動する|*Lua5.3*|

## 数学関数 (`math.*`)

### 変数/定数/テーブル

|名前|説明|互換性|
|---|---|---|
|[`math.huge`](math/huge.md)|無限大を表す定数|Lua5.1|
|[`math.pi`](math/pi.md)|π（円周率）を表す定数|Lua5.1|

### 関数/メソッド

|名前|説明|互換性|
|---|---|---|
|[`math.abs`](math/abs.md)|絶対値を返す|Lua5.1|
|[`math.acos`](math/acos.md)|アークコサインを返す|Lua5.1|
|[`math.asin`](math/asin.md)|アークサインを返す|Lua5.1|
|[`math.atan`](math/atan.md)|アークタンジェントを返す|Lua5.1|
|[`math.atan2`](math/atan2.md)|2つの引数の逆正接を返す|Lua5.1|
|[`math.ceil`](math/ceil.md)|指定された数値以上の最小の整数を返す|Lua5.1|
|[`math.cos`](math/cos.md)|コサインを返す|Lua5.1|
|[`math.cosh`](math/cosh.md)|ハイパーボリックコサインを返す|Lua5.1|
|[`math.deg`](math/deg.md)|ラジアンを度に変換する|Lua5.1|
|[`math.exp`](math/exp.md)|指定された数のe乗を返す|Lua5.1|
|[`math.floor`](math/floor.md)|指定された数値以下の最大の整数を返す|Lua5.1|
|[`math.fmod`](math/fmod.md)|商の小数部を返す（余りを返す）|Lua5.1|
|[`math.frexp`](math/frexp.md)|浮動小数点数を仮数部と指数部に分解する|Lua5.1|
|[`math.ldexp`](math/ldexp.md)|仮数部と指数部から浮動小数点数を構成する|Lua5.1|
|[`math.log`](math/log.md)|自然対数を返す|*Lua5.2*|
|[`math.log10`](math/log10.md)|常用対数を返す|Lua5.1|
|[`math.max`](math/max.md)|引数の中で最大の数を返す|Lua5.1|
|[`math.min`](math/min.md)|引数の中で最小の数を返す|Lua5.1|
|[`math.modf`](math/modf.md)|整数部分と小数部分を分けて返す|Lua5.1|
|[`math.pow`](math/pow.md)|べき乗を計算する（`^`演算子と同じ）|Lua5.1|
|[`math.rad`](math/rad.md)|度をラジアンに変換する|Lua5.1|
|[`math.random`](math/random.md)|ランダムな数値を返す|Lua5.1|
|[`math.randomseed`](math/randomseed.md)|乱数生成器の種を設定する|Lua5.1|
|[`math.sin`](math/sin.md)|サインを返す|Lua5.1|
|[`math.sinh`](math/sinh.md)|ハイパーボリックサインを返す|Lua5.1|
|[`math.sqrt`](math/sqrt.md)|平方根を返す|Lua5.1|
|[`math.tan`](math/tan.md)|タンジェントを返す|Lua5.1|
|[`math.tanh`](math/tanh.md)|双曲線正接を返す|Lua5.1|

## 入出力機能 (`io.*` | `file:*`)

|名前|説明|互換性|
|---|---|---|
|[`io.close`](io/close.md)|現在の出力ファイルを閉じる|Lua5.1|
|[`io.flush`](io/flush.md)|書き込みバッファをフラッシュする|Lua5.1|
|[`io.input`](io/input.md)|入力ファイルを設定または返す|Lua5.1|
|[`io.lines`](io/lines.md)|ファイルの各行を返すイテレータを作成する|Lua5.1|
|[`io.open`](io/open.md)|ファイルを指定モードで開く|Lua5.1|
|[`io.output`](io/output.md)|出力ファイルを設定または返す|Lua5.1|
|[`io.popen`](io/popen.md)|サブプロセスを開き、その標準入出力にアクセスする|Lua5.1|
|[`io.read`](io/read.md)|入力から指定された形式でデータを読み取る|*Lua5.3*|
|[`io.tmpfile`](io/tmpfile.md)|一時ファイルを作成し開く|Lua5.1|
|[`io.type`](io/type.md)|引数がファイルハンドルかどうかを判定する|Lua5.1|
|[`io.write`](io/write.md)|出力にデータを書き込む|Lua5.1|
|[`file:close`](io/file_close.md)|ファイルを閉じる|Lua5.1|
|[`file:flush`](io/file_flush.md)|書き込みバッファをフラッシュする|Lua5.1|
|[`file:lines`](io/file_lines.md)|ファイルの各行を返すイテレータを作成する|Lua5.1|
|[`file:read`](io/file_read.md)|ファイルから指定された形式でデータを読み取る|*Lua5.3*|
|[`file:seek`](io/file_seek.md)|ファイルの読み書き位置を設定または取得する|Lua5.1|
|[`file:setvbuf`](io/file_setvbuf.md)|バッファリングモードを設定する|Lua5.1|
|[`file:write`](io/file_write.md)|ファイルにデータを書き込む|Lua5.1|

## OSの機能 (`os.*`)

|名前|説明|互換性|
|---|---|---|
|[`os.clock`](os/clock.md)|プログラムの実行時間を返す|Lua5.1|
|[`os.date`](os/date.md)|現在の日時をフォーマットして返す|Lua5.1|
|[`os.difftime`](os/difftime.md)|2つの時刻の差を秒で返す|Lua5.1|
|[`os.execute`](os/execute.md)|システムコマンドを実行する|Lua5.1|
|[`os.exit`](os/exit.md)|プログラムを終了する|*Lua5.2*|
|[`os.getenv`](os/getenv.md)|環境変数の値を取得する|Lua5.1|
|[`os.remove`](os/remove.md)|ファイルを削除する|Lua5.1|
|[`os.rename`](os/rename.md)|ファイルの名前を変更する|Lua5.1|
|[`os.setlocale`](os/setlocale.md)|ロケール情報を設定する|Lua5.1|
|[`os.time`](os/time.md)|現在の時刻をタイムスタンプとして返す|Lua5.1|
|[`os.tmpname`](os/tmpname.md)|一時ファイル名を返す|Lua5.1|

## デバッグ機能 (`debug.*`)

|名前|説明|互換性|
|---|---|---|
|[`debug.debug`](debug/debug.md)|簡易デバッガを開始する|Lua5.1|
|[`debug.getfenv`](debug/getfenv.md)|指定した関数やスレッドの環境テーブルを取得する|Lua5.1|
|[`debug.gethook`](debug/gethook.md)|現在設定されているフック関数を返す|Lua5.1|
|[`debug.getinfo`](debug/getinfo.md)|関数やスレッドに関する情報を返す|Lua5.1|
|[`debug.getlocal`](debug/getlocal.md)|指定されたスタックレベルにある関数のローカル変数を取得する|Lua5.1|
|[`debug.getmetatable`](debug/getmetatable.md)|オブジェクトのメタテーブルを取得する|Lua5.1|
|[`debug.getregistry`](debug/getregistry.md)|Luaのレジストリテーブルを取得する|Lua5.1|
|[`debug.getupvalue`](debug/getupvalue.md)|指定した関数のアップバリューを取得する|Lua5.1|
|[`debug.setfenv`](debug/setfenv.md)|関数やスレッドに環境テーブルを設定する|Lua5.1|
|[`debug.sethook`](debug/sethook.md)|指定したフック関数を設定する|Lua5.1|
|[`debug.setlocal`](debug/setlocal.md)|指定した関数のローカル変数の値を設定する|Lua5.1|
|[`debug.setmetatable`](debug/setmetatable.md)|オブジェクトにメタテーブルを設定する|Lua5.1|
|[`debug.setupvalue`](debug/setupvalue.md)|指定した関数のアップバリューに値を設定する|Lua5.1|
|[`debug.traceback`](debug/traceback.md)|スタックトレースを返す|Lua5.1|
|[`debug.upvalueid`](debug/upvalueid.md)|指定した関数のアップバリューに固有のIDを返す|*Lua5.2*|
|[`debug.upvaluejoin`](debug/upvaluejoin.md)|2つの関数のアップバリューを結合する|*Lua5.2*|

## ビット単位の操作 (`bit.*`)

|名前|説明|互換性|
|---|---|---|
|[`bit.tobit`](bit/tobit.md)|数値を32ビット整数に変換する|LuaJIT|
|[`bit.tohex`](bit/tohex.md)|数値を16進数の文字列に変換する|LuaJIT|
|[`bit.bnot`](bit/bnot.md)|数値のビット単位のNOT演算を行う|LuaJIT|
|[`bit.band`](bit/band.md)|数値同士のビット単位のAND演算を行う|LuaJIT|
|[`bit.bor`](bit/bor.md)|数値同士のビット単位のOR演算を行う|LuaJIT|
|[`bit.bxor`](bit/bxor.md)|数値同士のビット単位のXOR演算を行う|LuaJIT|
|[`bit.lshift`](bit/lshift.md)|数値を左にビットシフトする|LuaJIT|
|[`bit.rshift`](bit/rshift.md)|数値を右にビットシフトする（符号なし）|LuaJIT|
|[`bit.arshift`](bit/arshift.md)|数値を右にビットシフトする（符号あり）|LuaJIT|
|[`bit.rol`](bit/rol.md)|数値を左にローテートシフトする|LuaJIT|
|[`bit.ror`](bit/ror.md)|数値を右にローテートシフトする|LuaJIT|
|[`bit.bswap`](bit/bswap.md)|32ビット整数のバイト順序を逆転させる（エンディアン変換）|LuaJIT|

## FFIライブラリ (`ffi.*`)

### 変数/定数/テーブル

|名前|説明|互換性|
|---|---|---|
|[`ffi.os`](ffi/os.md)|現在のターゲットOSの名前を示す文字列|LuaJIT|
|[`ffi.arch`](ffi/arch.md)|現在のターゲットアーキテクチャの名前を示す文字列|LuaJIT|

### 関数/メソッド

|名前|説明|互換性|
|---|---|---|
|[`ffi.cdef`](ffi/cdef.md)|C言語の宣言をLuaJITに定義する|LuaJIT|
|[`ffi.C`](ffi/c.md)|C標準ライブラリへのアクセスを提供する|LuaJIT|
|[`ffi.load`](ffi/load.md)|共有ライブラリをロードし、関数や変数にアクセスする|LuaJIT|
|[`ffi.new`](ffi/new.md)|指定された型の新しいCデータを作成する|LuaJIT|
|[`ctype`](ffi/ctype.md)|`ffi.new`や`ffi.cast`などで使用されるC型を定義する|LuaJIT|
|[`ffi.typeof`](ffi/typeof.md)|型を定義し、キャッシュする|LuaJIT|
|[`ffi.cast`](ffi/cast.md)|型にCデータをキャストする|LuaJIT|
|[`ffi.metatype`](ffi/metatype.md)|Cデータ型にメタテーブルを設定する|LuaJIT|
|[`ffi.gc`](ffi/gc.md)|ガベージコレクションでメモリを解放するための関数を登録する|LuaJIT|
|[`ffi.sizeof`](ffi/sizeof.md)|型やオブジェクトのサイズ（バイト数）を返す|LuaJIT|
|[`ffi.alignof`](ffi/alignof.md)|型のアラインメントを返す|LuaJIT|
|[`ffi.offsetof`](ffi/offsetof.md)|C構造体のフィールドのオフセットを返す|LuaJIT|
|[`ffi.errno`](ffi/errno.md)|Cライブラリの`errno`の値を取得または設定する|LuaJIT|
|[`ffi.string`](ffi/string.md)|Cの文字列（`char*`）をLuaの文字列に変換する|LuaJIT|
|[`ffi.copy`](ffi/copy.md)|メモリ間でデータをコピーする|LuaJIT|
|[`ffi.fill`](ffi/fill.md)|メモリを指定された値で埋める|LuaJIT|
|[`ffi.abi`](ffi/abi.md)|実行環境に関するABI情報を取得する|LuaJIT|
|[`cb:free`](ffi/cb_free.md)|コールバック関数を解放する|LuaJIT|
|[`cb:set`](ffi/cb_set.md)|コールバック関数を設定する|LuaJIT|

## 文字列バッファ (`buffer.*`)

|名前|説明|互換性|
|---|---|---|
|[`buffer.new`](string_buffer/new.md)|新しいバッファオブジェクトを作成する|LuaJIT|
|[`buf:reset`](string_buffer/buf_reset.md)|バッファをリセットして、再利用可能にする|LuaJIT|
|[`buf:free`](string_buffer/buf_free.md)|バッファスペースを解放し、オブジェクトを再利用可能にする|LuaJIT|
|[`buf:put`](string_buffer/buf_put.md)|データをバッファに追加する|LuaJIT|
|[`buf:putf`](string_buffer/buf_putf.md)|フォーマットしたデータをバッファに追加する|LuaJIT|
|[`buf:putcdata`](string_buffer/buf_putcdata.md)|FFI cdataをバッファに追加する|LuaJIT|
|[`buf:set`](string_buffer/buf_set.md)|指定したデータでバッファをリセットする|LuaJIT|
|[`buf:reserve`](string_buffer/buf_reserve.md)|指定したサイズの書き込みスペースを予約する|LuaJIT|
|[`buf:skip`](string_buffer/buf_skip.md)|指定したバイト数をスキップしてバッファデータを消費する|LuaJIT|
|[`buf:get`](string_buffer/buf_get.md)|バッファからデータを取得して消費する|LuaJIT|
|[`buf:tostring`](string_buffer/buf_tostring.md)|バッファデータを消費せずに文字列として取得する|LuaJIT|
|[`buf:ref`](string_buffer/buf_ref.md)|バッファデータを指すポインタと長さを取得する|LuaJIT|
|[`buffer.encode`](string_buffer/encode.md)|Luaオブジェクトをシリアライズする|LuaJIT|
|[`buffer.decode`](string_buffer/decode.md)|シリアライズされた文字列をデシリアライズする|LuaJIT|

## JITライブラリ (`jit.*`)

### 変数/定数/テーブル

|名前|説明|互換性|
|---|---|---|
|[`jit.version`](jit/version.md)|LuaJITのバージョンを示す文字列|LuaJIT|
|[`jit.version_num`](jit/version_num.md)|LuaJITのバージョン番号を整数で表したもの|LuaJIT|
|[`jit.os`](jit/os.md)|現在のターゲットOSの名前を示す文字列|LuaJIT|
|[`jit.arch`](jit/arch.md)|現在のターゲットアーキテクチャの名前を示す文字列|LuaJIT|

### 関数/メソッド

|名前|説明|互換性|
|---|---|---|
|[`jit.on`](jit/on.md)|JITコンパイラを有効にする|LuaJIT|
|[`jit.off`](jit/off.md)|JITコンパイラを無効にする|LuaJIT|
|[`jit.flush`](jit/flush.md)|JITコンパイル済みコードをクリアし、再コンパイルさせる|LuaJIT|
|[`jit.status`](jit/status.md)|JITコンパイラの現在のステータスを返す|LuaJIT|
|[`jit.opt.*`](jit/opt.md)|JITの最適化オプションを設定または取得するための関数群|LuaJIT|
|[`jit.util.*`](jit/util.md)|JITコンパイラの内部情報やデバッグツールにアクセスするための関数群|LuaJIT|