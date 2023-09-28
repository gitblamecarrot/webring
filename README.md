```
             _           _                          ___ 
            | |         (_)                   _    / __)
 _ _ _  ____| | _   ____ _ ____   ____  _ _ _| |_ | |__ 
| | | |/ _  ) || \ / ___) |  _ \ / _  || | | |  _)|  __)
| | | ( (/ /| |_) ) |   | | | | ( ( | || | | | |__| |   
 \____|\____)____/|_|   |_|_| |_|\_|| (_)____|\___)_|   
                                (_____|                
```

Let's webring like it's the year 2000 and make it even easier to disover other cool
Nounish websites. For you youngsters: webrings are collections of websites that agree
to link to one another in a circle; someone lands on a site and clicks "Next", then
on to the next one, which also has the "Next" button. This makes discovering new things
even easier and fun!

Join the webring by adding links like the following to your Nounish website:

! `<your domain>` is the part without the https://, webring.wtf will force everything to https

```html
<i>Explore the Nouns webring!</i>
<div style="grid grid-col">
<a href="https://webring.wtf/nouns/prev/<your domain>" rel="noreferrer">Previous</a>
<a href="https://webring.wtf/nouns/random/<your domain>" rel="noreferrer">Random</a>
<a href="https://webring.wtf/nouns/next/<your domain>" rel="noreferrer">Next</a>
</div>
```

Then add your domain(s) to the ring list here via pull request or messaging devcarrot:

1. [Nouns ring](https://github.com/gitblamecarrot/webring/blob/main/rings/nouns.txt)


Details:

webring.wtf will not retain traffic logs but may record total query counts in the
future to judge usage.

webring.wtf is implemented as a centralized service because loading remote JavaScript
onto websites in Web3 is a bad idea! Instead, we just can just link here and the robots
will shuttle viewers on to the next one.

Have questions? Reach out to @devcarrot on Warpcast.

## Getting On The Webring

Edit the [Nouns ring](https://github.com/gitblamecarrot/webring/blob/main/rings/nouns.txt) to 
include your site, and open a pull request.

## Contributing

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.3. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.


## Why?

Joel made nouns.biz as an index of sites since people were looking for frontends. I
wanted a little thing to try Bun on. Why not make a webring?
