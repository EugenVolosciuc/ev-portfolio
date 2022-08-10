---
title: 'How to self-host fonts in NextJS'
catchphrase: "No more Google Fonts urls in your app."
date: '2022-01-19'
categories:
  - Development
tags:
  - NextJS
  - Fonts
---

Let’s say you received a custom font from your client for a NextJS project you’re working on. Considering that all of the fonts you used so far were taken from Google Fonts or some other font provider, how do you add this new font? This seemingly easy thing to implement took quite some time to do as it is not documented in the NextJS docs. This article should help you with that.

> I’ll be using Typescript for the examples below, but you can get the same result by removing the types/interfaces and using the `js/jsx` formats instead of `ts/tsx`.

In this article, we will be using the free [Optimus Princeps](https://www.dafont.com/optimusprinceps.font) font from dafont.com, created by Manfred Klein.

Let’s get to it.

---

Our “secret” recipe needs just three ingredients:
- your font file (or files) conveniently placed in `/public/fonts`
- a fonts.css file, placed in `/styles` for structure’s sake
- and a `_document.tsx` file in `/pages`

In the end, it should look a little something like this:
![Current project structure](/assets/images/how-to-self-host-fonts-in-nextjs-1.png "Current project structure")

## “But I don’t have a fonts folder!”
No worries, just create one in `/public` and put your font files in there, no matter the format.

## “What do we put in fonts.css?”
This is where we will define our custom fonts using the `@font-face` [at-rule](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face). For every font file that we have added, we will need to add the respective at-rule. In our example, we have two font files, and the written CSS looks something like this:
![fonts.css file](/assets/images/how-to-self-host-fonts-in-nextjs-2.png "fonts.css file")

`@font-family` specifies a name that will be used as the font face value for font properties. We can write here whatever we want, but it makes sense to name it as it is actually called.

In the `src` parameter, the `url` function is where we write the path to our font, while the format function provides the browser with a hint as to what format a font resource is, so it can select a suitable one. The available types are: `"woff"`, `"woff2"`, `"truetype"`, `"opentype"`, `"embedded-opentype"`, and `"svg"`.

For `font-weight` we can use numerical values like 400, 600, or descriptors like `normal` and `bold`.

The `font-style` CSS property sets whether a font should be styled with a normal, italic, or oblique face from its `font-family`.

For the fonts to load properly, do not forget to import the fonts.css file in _app.tsx:
![Too many times I forgot to import it here…](/assets/images/how-to-self-host-fonts-in-nextjs-3.png "Too many times I forgot to import it here…")

## “Why is it called document, why the underscore?”
Explaining what is the `_document.tsx` file is outside the scope of this article, but you can read all about it right [here](https://nextjs.org/docs/advanced-features/custom-document). In this file, we will import the font files added earlier by using link tags in the NextJS Head component.
<script src="https://gist.github.com/EugenVolosciuc/10fa29021fda5196ef7fc7d3987ab073.js"></script>

In the gist above we imported the Head component from “next/document”, as well as added links for our font files. The only thing you might need to change from the example above in your project is the link type, depending on the format of your font. In our case “font/ttf” will do the trick.

## “Is that it?”

Pretty much, yeah. Now you should be able to add your font to your content, for example like this, et voilà!
![At long last, we have our font](/assets/images/how-to-self-host-fonts-in-nextjs-4.png "At long last, we have our font")

## Bonus: custom font for TailwindCSS
Because almost everyone and their cat is digging TailwindCSS, here is how you can incorporate custom fonts in TailwindCSS classes.
<script src="https://gist.github.com/EugenVolosciuc/e759222dc3f5d00ec29d054f57f1ff48.js"></script>

In your `tailwind.config.js` file extend the default theme by adding a new entry in the `fontFamily` key, where the key is how you want to name the new Tailwind class, and the value is the font family that will be assigned to the class. In the example above, we add multiple font families, in case our font doesn’t load for some reason. You should now be able to use the `font-OptimusPrinceps` class like this:
![Using a Tailwind class to set our custom font.](/assets/images/how-to-self-host-fonts-in-nextjs-4.png "Using a Tailwind class to set our custom font.")

That’s it, folks. This is how you can use custom fonts with NextJS.

### Resources
- [Optimus Princeps font](https://www.dafont.com/optimusprinceps.font)
- [@font-face](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)
- [NextJS custom document](https://nextjs.org/docs/advanced-features/custom-document)