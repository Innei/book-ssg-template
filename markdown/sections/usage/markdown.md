# Markdown 语法

Markdown 语法在 GFM 中进行了其他扩展。

## Alert

此语法是 GFM 的新增的。

```md
> [!NOTE]
> Highlights information that users should take into account, even when skimming.

> [!IMPORTANT]
> Crucial information necessary for users to succeed.

> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.
```

> [!NOTE]
> Highlights information that users should take into account, even when skimming.

> [!IMPORTANT]
> Crucial information necessary for users to succeed.

> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.

## Notice

```md
::: warning
_here be dragons_
:::

::: banner {error}
_here be dragons_
:::

::: banner {note}
_here be dragons_
:::
```

::: warning
_here be dragons_
:::

::: banner {error}
_here be dragons_
:::

::: banner {note}
_here be dragons_
:::

## Rich Link

对于单独成行的链接，会有做出不用的渲染。

```
https://github.com/Innei/Shiro
```

https://github.com/Innei/Shiro

```
https://twitter.com/zhizijun/status/1649822091234148352?s=20
```

https://twitter.com/zhizijun/status/1649822091234148352?s=20

```
https://www.youtube.com/watch?v=N93cTbtLCIM
```

https://www.youtube.com/watch?v=N93cTbtLCIM

```
https://gist.github.com/Innei/94b3e8f078d29e1820813a24a3d8b04e
```

https://gist.github.com/Innei/94b3e8f078d29e1820813a24a3d8b04e

```
https://github.com/vuejs/vitepress/commit/71eb11f72e60706a546b756dc3fd72d06e2ae4e2
```

https://github.com/vuejs/vitepress/commit/71eb11f72e60706a546b756dc3fd72d06e2ae4e2

```
https://codesandbox.io/s/framer-motion-layoutroot-prop-forked-p39g96
```

https://codesandbox.io/s/framer-motion-layoutroot-prop-forked-p39g96

```
https://github.com/Innei/Shiro/blob/108d4c3e927e1c9c9304e41a0631f91958477d9f/src/providers/root/modal-stack-provider.tsx
```

https://github.com/Innei/Shiro/blob/108d4c3e927e1c9c9304e41a0631f91958477d9f/src/providers/root/modal-stack-provider.tsx

```
https://github.com/Innei/Shiro/pull/129
```

https://github.com/Innei/Shiro/pull/129

```
https://github.com/Innei/Shiro/commit/6957e011439eb2d3cbf42bfb67ed81b07d4bcc2a
```

https://github.com/Innei/Shiro/commit/6957e011439eb2d3cbf42bfb67ed81b07d4bcc2a

```
https://trpc.io/docs/client/react/useInfiniteQuery
```

https://trpc.io/docs/client/react/useInfiniteQuery

```
[TRPC](https://trpc.io/docs/client/react/useInfiniteQuery)
```

[TRPC](https://trpc.io/docs/client/react/useInfiniteQuery)

## Inline Link Parser

对于内联链接，会根据内置解析增加 Favicon。

```
Inline [Innei](https://github.com/Innei)
```

Inline [Innei](https://github.com/Innei)

```
Inline [pseudoyu](https://twitter.com/pseudo_yu)
```

Inline [pseudoyu](https://twitter.com/pseudo_yu)

```
Inline <https://github.com/Innei>
```

Inline <https://github.com/Innei>

```
Inline https://github.com/Innei
```

Inline https://github.com/Innei

## Mention

使用一些 Mention？

```
[Innei]{GH@Innei}
```

[Innei 太菜了]{GH@Innei}

## Spoiler

和删除线有所不同。

```md
Hi, this is ||Spoiler||
```

Hi, this is ||Spoiler||

## KateX

```
$ c = \pm\sqrt{a^2 + b^2} $
```

$ c = \pm\sqrt{a^2 + b^2} $

```
$c = \pm\sqrt{a^2 + b^2}$
```

$c = \pm\sqrt{a^2 + b^2}$

$P(x) = a_nx^n+a_{n-1}x^{n-1} + \dots + a_1x + a_0$

```
$P(x) = a_nx^n+a_{n-1}x^{n-1} + \dots + a_1x + a_0$
```

```
$$

P\left(U,T\right)=100\left.\left(0.6\min\left(1,\frac{U-0.70}{0.90-0.70}\right)+0.4\min\left(1,\frac{T-4000}{14000-4000}\right)\right)\right.

$$
```

$$

P\left(U,T\right)=100\left.\left(0.6\min\left(1,\frac{U-0.70}{0.90-0.70}\right)+0.4\min\left(1,\frac{T-4000}{14000-4000}\right)\right)\right.


$$
