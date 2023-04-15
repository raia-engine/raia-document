import{_ as s,o as a,c as n,N as l}from"./chunks/framework.0e180df0.js";const o="/assets/window_hello.80762495.png",d=JSON.parse('{"title":"HelloWorld","description":"","frontmatter":{},"headers":[],"relativePath":"guide/tutorial/windows/helloworld.md"}'),p={name:"guide/tutorial/windows/helloworld.md"},e=l(`<h1 id="helloworld" tabindex="-1">HelloWorld <a class="header-anchor" href="#helloworld" aria-label="Permalink to &quot;HelloWorld&quot;">​</a></h1><p>最初にHelloWorldを表示するプログラムを作ります。</p><h2 id="コンソールに表示する" tabindex="-1">コンソールに表示する <a class="header-anchor" href="#コンソールに表示する" aria-label="Permalink to &quot;コンソールに表示する&quot;">​</a></h2><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-KxZeu" id="tab-YRo-PzE" checked="checked"><label for="tab-YRo-PzE">ES5</label><input type="radio" name="group-KxZeu" id="tab-8nXhzM2"><label for="tab-8nXhzM2">ES6</label></div><div class="blocks"><div class="language-js active"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> Raia </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">raia</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> core </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> Raia</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Core</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">core</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Hello World</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">Core</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">raia</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> core </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Core</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">core</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Hello World</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div></div></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Hello World</span></span></code></pre></div><h3 id="print" tabindex="-1">print() <a class="header-anchor" href="#print" aria-label="Permalink to &quot;print()&quot;">​</a></h3><p>コンソールに文字列を表示する関数です。引数に渡された文字列を表示します。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">print</span><span style="color:#A6ACCD;">(str)</span></span></code></pre></div><h2 id="ウィンドウに表示する" tabindex="-1">ウィンドウに表示する <a class="header-anchor" href="#ウィンドウに表示する" aria-label="Permalink to &quot;ウィンドウに表示する&quot;">​</a></h2><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-6o0mB" id="tab-9wiFlGS" checked="checked"><label for="tab-9wiFlGS">ES5</label><input type="radio" name="group-6o0mB" id="tab-9m4vuVJ"><label for="tab-9m4vuVJ">ES6</label></div><div class="blocks"><div class="language-js active"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> Raia </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">raia</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> window </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> Raia</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Window</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">title</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">800</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">600</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> font </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> Raia</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Font</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Mplus1-Regular.ttf</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">30</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setCurrentColor</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">255</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">255</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">255</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">drawString</span><span style="color:#A6ACCD;">(font</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Hello World</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">30</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">onUpdate</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">redraw</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">Window</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> Font</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">raia</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> window </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Window</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">title</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">800</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">600</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> font </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Font</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Mplus1-Regular.ttf</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">30</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setCurrentColor</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">255</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">255</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">255</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">drawString</span><span style="color:#A6ACCD;">(font</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Hello World</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">30</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">onUpdate</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#C792EA;">=&gt;</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">redraw</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div></div></div><h3 id="drawstring" tabindex="-1">drawString() <a class="header-anchor" href="#drawstring" aria-label="Permalink to &quot;drawString()&quot;">​</a></h3><p>ウィンドウに文字列を描画する関数です。第一引数にはFontのインスタンスを指定します。第二引数に文字列、第三引数に文字の大きさを指定します。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">drawString</span><span style="color:#A6ACCD;">(font</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> str</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> size)</span></span></code></pre></div><h3 id="スクリーンショット" tabindex="-1">スクリーンショット <a class="header-anchor" href="#スクリーンショット" aria-label="Permalink to &quot;スクリーンショット&quot;">​</a></h3><p><img src="`+o+'" alt=""></p>',15),t=[e];function r(c,D,y,F,C,A){return a(),n("div",null,t)}const u=s(p,[["render",r]]);export{d as __pageData,u as default};
