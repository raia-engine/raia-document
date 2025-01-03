# 基本演算子

代入、算術、比較などの操作を実行します。

演算子は、値を確認、変更、または結合するために使用する特殊な記号やフレーズです。例えば、加算演算子（`+`）は2つの数値を加算します（例：`let i = 1 + 2`）。論理AND演算子（`&&`）は2つのブール値を組み合わせます（例：`if enteredDoorCode && passedRetinaScan`）。

Swiftは、Cのような言語で既におなじみの演算子をサポートし、一般的なコーディングエラーを排除するためにいくつかの機能を改善しています。例えば、代入演算子（`=`）は値を返しません。これは、等値演算子（`==`）を意図している場合に代入演算子を誤って使用することを防ぐためです。また、算術演算子（`+`、`-`、`*`、`/`、`%`など）は値のオーバーフローを検出して禁止します。これにより、数値が格納型の許容値範囲を超えて大きくなったり小さくなったりする際に予期しない結果を回避します。値のオーバーフロー動作を有効にするには、Swiftのオーバーフロー演算子を使用します（詳細は[オーバーフロー演算子](Overflow Operators)を参照してください）。

Swiftはまた、Cにはない範囲演算子（例：`a..<b`および`a...b`）を提供します。これにより、値の範囲を表現する際の簡潔な記述が可能になります。

この章ではSwiftの一般的な演算子について説明します。高度な演算子については[高度な演算子](Advanced Operators)を参照してください。また、独自のカスタム演算子を定義し、カスタム型の標準演算子を実装する方法についても説明します。

## 用語

演算子には以下の種類があります：

- **単項演算子**：1つの対象に対して動作します（例：`-a`）。単項接頭辞演算子は対象の直前に現れます（例：`!b`）。単項接尾辞演算子は対象の直後に現れます（例：`c!`）。
- **二項演算子**：2つの対象に対して動作します（例：`2 + 3`）。二項演算子は中置で、2つの対象の間に現れます。
- **三項演算子**：3つの対象に対して動作します。Cと同様に、Swiftには三項条件演算子（`a ? b : c`）のみがあります。

演算子が影響を与える値は「オペランド」と呼ばれます。例えば、式`1 + 2`では、`+`記号が中置演算子であり、その2つのオペランドは`1`と`2`です。

## 代入演算子

代入演算子（`a = b`）は、`a`の値を`b`の値で初期化または更新します：

```swift
let b = 10
var a = 5
a = b
// aは現在10と等しい
```

代入の右側が複数の値を持つタプルの場合、その要素を一度に複数の定数や変数に分解することができます：

```swift
let (x, y) = (1, 2)
// xは1と等しく、yは2と等しい
```

CやObjective-Cの代入演算子とは異なり、Swiftの代入演算子自体は値を返しません。以下のような文は無効です：

```swift
if x = y {
    // これは無効です。x = yは値を返さないからです。
}
```

この機能により、代入演算子（`=`）が意図せずに等値演算子（`==`）の代わりに使用されることを防ぎます。`if x = y`を無効にすることで、Swiftはこの種のエラーをコード内で回避するのに役立ちます。

## 算術演算子

Swiftはすべての数値型で次の4つの標準的な算術演算子をサポートしています：

- 加算（`+`）
- 減算（`-`）
- 乗算（`*`）
- 除算（`/`）

```swift
1 + 2       // 結果は3
5 - 3       // 結果は2
2 * 3       // 結果は6
10.0 / 2.5  // 結果は4.0
```

CやObjective-Cの算術演算子とは異なり、Swiftの算術演算子はデフォルトでは値のオーバーフローを許可しません。値のオーバーフロー動作を有効にするには、Swiftのオーバーフロー演算子（例：`a &+ b`）を使用します。詳細は[オーバーフロー演算子](Overflow Operators)を参照してください。

加算演算子は文字列の結合にも使用できます：

```swift
"hello, " + "world"  // 結果は"hello, world"
```

### 剰余演算子

剰余演算子（`a % b`）は、`b`が`a`に何回収まるかを計算し、余りの値を返します（これを剰余と呼びます）。

::: info 注意
剰余演算子（`%`）は、他の言語ではモジュロ演算子とも呼ばれます。ただし、Swiftにおける負の数値の動作により、厳密にはモジュロではなく剰余演算とみなされます。
:::

剰余演算子の仕組みを以下に示します。`9 % 4`を計算するには、まず`9`に`4`が何回収まるかを求めます：

`9`には`4`が2回収まり、余りは`1`です。

Swiftでは以下のように記述します：

```swift
9 % 4    // 結果は1
```

`a % b`の答えを決定するには、剰余演算子（`%`）は次の式を計算し、その出力として剰余を返します：

a = (b x 一部の乗数) + 剰余

ここで、「一部の乗数」は`a`に収まる`b`の最大倍数です。

`9`と`4`をこの式に代入すると次のようになります：

9 = (4 x 2) + 1

負の値の剰余を計算する場合も同じ方法が適用されます：

```swift
-9 % 4   // 結果は-1
```

`-9`と`4`を式に代入すると次のようになります：

-9 = (4 x -2) + -1

剰余の値は`-1`となります。

負の`b`の値は無視されます。つまり、`a % b`と`a % -b`は常に同じ答えを返します。

### 単項マイナス演算子

数値の符号を切り替えるには、接頭辞として`-`を使用します。これを単項マイナス演算子と呼びます：

```swift
let three = 3
let minusThree = -three       // minusThreeは-3に等しい
let plusThree = -minusThree   // plusThreeは3に等しい（"マイナスのマイナス三"）
```

単項マイナス演算子（`-`）は、操作対象の値の直前にスペースなしで付けます。

### 単項プラス演算子

単項プラス演算子（`+`）は、操作対象の値をそのまま返します。値に変化はありません：

```swift
let minusSix = -6
let alsoMinusSix = +minusSix  // alsoMinusSixは-6に等しい
```

単項プラス演算子は実際には何も行いませんが、負の数値に単項マイナス演算子を使用している場合、正の数値にも対称性を提供するために使用できます。

## 複合代入演算子

Cと同様に、Swiftは代入（`=`）と他の操作を組み合わせた複合代入演算子を提供します。一例として加算代入演算子（`+=`）があります：

```swift
var a = 1
a += 2
// aは現在3に等しい
```

式`a += 2`は、`a = a + 2`の短縮形です。実際には、加算と代入を1つの演算子に統合して、両方の操作を同時に実行します。

::: info 注意
複合代入演算子は値を返しません。例えば、`let b = a += 2`と記述することはできません。
:::

Swift標準ライブラリが提供する演算子についての詳細は、[演算子の宣言](Operator Declarations)を参照してください。

## 比較演算子

Swiftは以下の比較演算子をサポートしています：

- 等しい（`a == b`）
- 等しくない（`a != b`）
- より大きい（`a > b`）
- より小さい（`a < b`）
- 以上（`a >= b`）
- 以下（`a <= b`）

::: info 注意
Swiftには2つの同一性演算子（`===`および`!==`）もあり、2つのオブジェクト参照が同じオブジェクトインスタンスを参照しているかどうかをテストします。詳細は[同一性演算子](Identity Operators)を参照してください。
:::

これらの比較演算子は、それぞれの条件が`true`か`false`かを示す`Bool`値を返します：

```swift
1 == 1   // true: 1は1と等しい
2 != 1   // true: 2は1と等しくない
2 > 1    // true: 2は1より大きい
1 < 2    // true: 1は2より小さい
1 >= 1   // true: 1は1以上
2 <= 1   // false: 2は1以下ではない
```

比較演算子は、`if`文のような条件文でよく使用されます：

```swift
let name = "world"
if name == "world" {
    print("hello, world")
} else {
    print("I'm sorry \(name), but I don't recognize you")
}
// "hello, world"と出力されます。なぜならnameは"world"と等しいからです。
```

`if`文の詳細については[制御フロー](Control Flow)を参照してください。

### タプルの比較

タプルが同じ型で同じ数の値を持つ場合、それらを比較することができます。タプルは左から右に1つずつ比較され、等しくない値が見つかった時点でその値が比較されます。この比較結果がタプル全体の比較結果を決定します。すべての要素が等しい場合、タプル自体も等しいと見なされます。例：

```swift
(1, "zebra") < (2, "apple")   // true: 1が2より小さいため。"zebra"と"apple"は比較されません。
(3, "apple") < (3, "bird")    // true: 3は3と等しく、"apple"は"bird"より小さいため。
(4, "dog") == (4, "dog")      // true: 4は4と等しく、"dog"も"dog"と等しいため。
```

上記の例では、最初の行で左から右への比較が示されています。`1`が`2`より小さいため、`(1, "zebra")`は`(2, "apple")`より小さいと見なされます。他の値については比較されません。ただし、タプルの最初の要素が等しい場合は、2番目の要素が比較されます。これは2行目と3行目で発生します。

タプルを比較できるのは、それぞれの値に演算子を適用できる場合のみです。例えば、以下のコードのように、`(String, Int)`型のタプルは比較できますが、`(String, Bool)`型のタプルは比較できません。なぜなら、`<`演算子は`Bool`値に適用できないからです。

```swift
("blue", -1) < ("purple", 1)        // OK、結果はtrue
("blue", false) < ("purple", true)  // エラー: <はブール値を比較できません
```

::: info 注意
Swift標準ライブラリには7つ未満の要素を持つタプルの比較演算子が含まれています。7つ以上の要素を持つタプルを比較するには、比較演算子を自分で実装する必要があります。
:::

## 三項条件演算子

三項条件演算子は3つの部分からなる特殊な演算子で、`question ? answer1 : answer2`の形式を取ります。これは、`question`が`true`か`false`かに基づいて2つの式のいずれかを評価するショートカットです。`question`が`true`の場合、`answer1`が評価され、その値が返されます。それ以外の場合、`answer2`が評価され、その値が返されます。

三項条件演算子は次のコードの短縮形です：

```swift
if question {
    answer1
} else {
    answer2
}
```

以下は、行の高さを計算する例です。行にヘッダーがある場合はコンテンツの高さに50ポイントを加え、ヘッダーがない場合は20ポイントを加えます。

```swift
let contentHeight = 40
let hasHeader = true
let rowHeight = contentHeight + (hasHeader ? 50 : 20)
// rowHeightは90に等しい
```

上記の例は次のコードの短縮形です：

```swift
let contentHeight = 40
let hasHeader = true
let rowHeight: Int
if hasHeader {
    rowHeight = contentHeight + 50
} else {
    rowHeight = contentHeight + 20
}
// rowHeightは90に等しい
```

最初の例では、三項条件演算子を使用することで、行の高さを単一行のコードで設定でき、2番目の例よりも簡潔です。

三項条件演算子は、2つの式のどちらを考慮するかを決定する効率的なショートカットを提供します。ただし、使いすぎるとコードが読みづらくなる可能性があるため、慎重に使用してください。特に、複数の三項条件演算子を1つの複合文に組み合わせることは避けてください。

## Nil-Coalescing Operator（`nil`合体演算子）

`nil`合体演算子（`a ?? b`）は、オプショナル`a`に値が含まれている場合はその値をアンラップし、`a`が`nil`の場合はデフォルト値`b`を返します。式`a`は常にオプショナル型である必要があります。式`b`は、`a`が格納する型と一致している必要があります。

`nil`合体演算子は次のコードの短縮形です：

```swift
a != nil ? a! : b
```

上記のコードでは、三項条件演算子と強制アンラップ（`a!`）を使用して、`a`が`nil`でない場合にラップされた値にアクセスし、`nil`の場合は`b`を返します。`nil`合体演算子を使用すると、この条件チェックとアンラップを簡潔で読みやすい形にまとめることができます。

::: info 注意
`a`が非`nil`の場合、`b`の値は評価されません。これは「短絡評価」として知られています。
:::

以下は、ユーザー定義の色名が指定されている場合にはそれを使用し、指定されていない場合にはデフォルトの色名を使用する例です：

```swift
let defaultColorName = "red"
var userDefinedColorName: String?   // デフォルトではnil

var colorNameToUse = userDefinedColorName ?? defaultColorName
// userDefinedColorNameがnilのため、colorNameToUseはデフォルトの"red"に設定されます
```

`userDefinedColorName`変数はオプショナルの`String`として定義され、デフォルト値は`nil`です。オプショナル型であるため、`nil`合体演算子を使用して値を考慮できます。上記の例では、`colorNameToUse`という`String`変数の初期値を決定するためにこの演算子を使用しています。`userDefinedColorName`が`nil`であるため、`userDefinedColorName ?? defaultColorName`式は`defaultColorName`の値、すなわち`"red"`を返します。

`userDefinedColorName`に非`nil`の値を代入して再度チェックすると、デフォルトではなく`userDefinedColorName`に格納された値が使用されます：

```swift
userDefinedColorName = "green"
colorNameToUse = userDefinedColorName ?? defaultColorName
// userDefinedColorNameが非nilのため、colorNameToUseは"green"に設定されます
```

## Range Operators（範囲演算子）

Swiftには値の範囲を表現するためのいくつかの範囲演算子があります。

### 閉区間演算子

閉区間演算子（`a...b`）は、`a`から`b`までの範囲を定義します。この範囲には、`a`と`b`の両方が含まれます。`a`は`b`以下でなければなりません。

閉区間演算子は、`for-in`ループのようにすべての値を使用したい場合に便利です：

```swift
for index in 1...5 {
    print("\(index) times 5 is \(index * 5)")
}
// 1 times 5 is 5
// 2 times 5 is 10
// 3 times 5 is 15
// 4 times 5 is 20
// 5 times 5 is 25
```

`for-in`ループの詳細は[制御フロー](Control Flow)を参照してください。

### 半開区間演算子

半開区間演算子（`a..<b`）は、`a`から`b`までの範囲を定義しますが、`b`は含まれません。この範囲は最初の値を含みますが、最後の値は含みません。閉区間演算子と同様に、`a`は`b`以下でなければなりません。`a`が`b`と等しい場合、範囲は空になります。

半開区間は、配列のようなゼロベースのリストを扱う場合に特に便利です。この場合、リストの長さに達するが、それを超えないようにカウントする必要があります：

```swift
let names = ["Anna", "Alex", "Brian", "Jack"]
let count = names.count
for i in 0..<count {
    print("Person \(i + 1) is called \(names[i])")
}
// Person 1 is called Anna
// Person 2 is called Alex
// Person 3 is called Brian
// Person 4 is called Jack
```

配列には4つの項目がありますが、`0..<count`は3までしかカウントしません（配列内の最後の項目のインデックス）。配列についての詳細は[配列](Arrays)を参照してください。

### 片側範囲

閉区間演算子には、一方向に可能な限り続く範囲のための代替形式があります。たとえば、配列のインデックス2から末尾までのすべての要素を含む範囲です。この場合、範囲演算子の片側の値を省略できます。このような範囲は片側範囲と呼ばれます。例：

```swift
for name in names[2...] {
    print(name)
}
// Brian
// Jack

for name in names[...2] {
    print(name)
}
// Anna
// Alex
// Brian
```

半開区間演算子にも片側形式があり、最終値だけを記述します。この場合も、両側に値を含む場合と同様に、最終値は範囲に含まれません：

```swift
for name in names[..<2] {
    print(name)
}
// Anna
// Alex
```

片側範囲は、サブスクリプトだけでなく他のコンテキストでも使用できます。開始値を省略した片側範囲を反復処理することはできません。なぜなら、どこから反復処理を開始すべきかわからないからです。ただし、最終値を省略した片側範囲を反復処理することは可能です。しかし、範囲が無限に続くため、ループの明示的な終了条件を追加する必要があります。また、以下のコードのように、片側範囲が特定の値を含むかどうかを確認することもできます：

```swift
let range = ...5
range.contains(7)   // false
range.contains(4)   // true
range.contains(-1)  // true
```

## 論理演算子

論理演算子は、`true`や`false`といったブール値を修正したり組み合わせたりします。SwiftはC系言語で一般的な以下の3つの標準的な論理演算子をサポートしています：

- 論理NOT（`!a`）
- 論理AND（`a && b`）
- 論理OR（`a || b`）

### 論理NOT演算子

論理NOT演算子（`!a`）は、ブール値を反転させます。`true`は`false`になり、`false`は`true`になります。

論理NOT演算子は接頭辞演算子であり、操作対象の値の直前にスペースなしで記述します。これは「`not a`」と読めます。次の例を参照してください：

```swift
let allowedEntry = false
if !allowedEntry {
    print("ACCESS DENIED")
}
// "ACCESS DENIED"と出力されます
```

`if !allowedEntry`というフレーズは「`allowedEntry`が許可されていない場合」と読めます。次の行は、`allowedEntry`が`false`の場合にのみ実行されます。

この例のように、ブール定数や変数名を慎重に選ぶことで、二重否定や混乱を避け、コードを読みやすく簡潔に保つことができます。

### 論理AND演算子

論理AND演算子（`a && b`）は、両方の値が`true`である場合にのみ全体の式が`true`になります。

いずれかの値が`false`の場合、全体の式も`false`になります。さらに、最初の値が`false`の場合、2番目の値は評価されません。これは「短絡評価（short-circuit evaluation）」として知られています。

以下の例では、2つの`Bool`値を考慮し、両方が`true`の場合にのみアクセスを許可します：

```swift
let enteredDoorCode = true
let passedRetinaScan = false
if enteredDoorCode && passedRetinaScan {
    print("Welcome!")
} else {
    print("ACCESS DENIED")
}
// "ACCESS DENIED"と出力されます
```

### 論理OR演算子

論理OR演算子（`a || b`）は、2つのパイプ文字で構成される中置演算子です。2つの値のうち少なくとも1つが`true`であれば、全体の式が`true`になります。

論理AND演算子と同様に、論理OR演算子も短絡評価を使用します。論理OR式の左側が`true`の場合、右側は評価されません。なぜなら、全体の結果に影響を与えないからです。

以下の例では、最初の`Bool`値（`hasDoorKey`）が`false`ですが、2番目の値（`knowsOverridePassword`）が`true`です。そのため、全体の式も`true`と評価され、アクセスが許可されます：

```swift
let hasDoorKey = false
let knowsOverridePassword = true
if hasDoorKey || knowsOverridePassword {
    print("Welcome!")
} else {
    print("ACCESS DENIED")
}
// "Welcome!"と出力されます
```

### 複数の論理演算子の組み合わせ

複数の論理演算子を組み合わせて、長い複合式を作成することができます：

```swift
if enteredDoorCode && passedRetinaScan || hasDoorKey || knowsOverridePassword {
    print("Welcome!")
} else {
    print("ACCESS DENIED")
}
// "Welcome!"と出力されます
```

この例では、`&&`や`||`演算子を複数回使用して、複数の小さな式を連結しています。この例は次のように読めます：

「正しいドアコードを入力して網膜スキャンに合格した場合、または有効なドアキーを持っている場合、または緊急時のオーバーライドパスワードを知っている場合にアクセスを許可する。」

この例では、`enteredDoorCode`と`passedRetinaScan`、`hasDoorKey`の最初の2つの部分式が`false`です。しかし、緊急時のオーバーライドパスワードが知られているため、全体の複合式は`true`と評価されます。

::: info 注意
Swiftの論理演算子（`&&`および`||`）は左結合性を持ちます。つまり、複合式が評価される際には、最も左側の部分式が最初に評価されます。
:::

### 明示的な括弧

複雑な式の意図をより明確にするため、必ずしも必要ではない場合でも括弧を含めることが有用です。以下のドアアクセスの例では、複合式の最初の部分に括弧を追加することで、その意図を明確にしています：

```swift
if (enteredDoorCode && passedRetinaScan) || hasDoorKey || knowsOverridePassword {
    print("Welcome!")
} else {
    print("ACCESS DENIED")
}
// "Welcome!"と出力されます
```

括弧を使用することで、最初の2つの値が全体のロジックの中で別の可能性として考慮されていることが明確になります。複合式の出力は変わりませんが、意図が読者にとってより明確になります。簡潔さよりも可読性が常に優先されるべきです。意図を明確にするために括弧を使用してください。