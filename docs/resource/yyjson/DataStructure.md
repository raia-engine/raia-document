# データ構造

yyjsonには、immutableとmutableという2種類のデータ構造があります。

- イミュータブルなデータ構造は、JSONドキュメントを読むときに返されます。これらは変更することができません。
- Mutableデータ構造は、JSONドキュメントを構築するときに作成されます。それらは変更することができます。
- yyjsonは、この2種類のデータ構造を変換するための関数も提供しています。

この文書で説明されているデータ構造はプライベートなものであり、アクセスするにはパブリックAPIを使用する必要があることに注意してください。


## 不変の値
各JSONの値は、不変の `yyjson_val` 構造体に格納される：
```c
struct yyjson_val {
    uint64_t tag;
    union {
        uint64_t    u64;
        int64_t     i64;
        double      f64;
        const char *str;
        void       *ptr;
        size_t      ofs;
    } uni;
}
```

タグの下位8ビットには値の種類が格納される<br/>。
タグの上位56ビットは値のサイズ（文字列の長さ、オブジェクトのサイズ、配列のサイズ）を格納する。

現代の64ビットプロセッサは、一般的にRAMアドレスのサポートが64ビット未満に制限されている([Wikipedia](https://en.wikipedia.org/wiki/RAM_limit))。例えば、Intel64、AMD64、ARMv8では、物理アドレスが52ビット（4PB）制限されています。したがって、64ビットの`タグ`にタイプとサイズを格納するのが安全である。

## イミュータブル・ドキュメント
JSONドキュメントは、すべての文字列を**連続した**メモリー領域に格納します。<br/>
各文字列は、インプレースでアンエスケープされ、ヌルターミネーターで終了します。
例えば、以下のようになります：



JSONドキュメントでは、すべての値を別の**連続した**メモリ領域に格納します。
`object`と`array`はそれぞれのメモリ使用量を保存するので、コンテナの子値を簡単にウォークスルーできる。<br/>
例えば、以下のような感じです：



## ミュータブル値
ミュータブルなJSON値は、それぞれ `yyjson_mut_val` 構造体に格納されます：
```c
struct yyjson_mut_val {
    uint64_t tag;
    union {
        uint64_t    u64;
        int64_t     i64;
        double      f64;
        const char *str;
        void       *ptr;
        size_t      ofs;
    } uni;
    yyjson_mut_val *next;
}
```

tag`とuni`フィールドは不変の値と同じであり、`next`フィールドはリンクリストを構築するために使用されます。


## ミュータブルドキュメント
ミュータブルJSONドキュメントは、複数の `yyjson_mut_val` から構成されます。

オブジェクト`や配列`の子要素は循環リンクされ、親要素は循環リンクリストの **末尾** を保持する。これにより、yyjson は `append`, `prepend`, `remove_first` を O(1) 時間で行うことができる。

例えば