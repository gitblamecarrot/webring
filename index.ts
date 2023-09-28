import { readdirSync } from "fs";

type RingMap = {[key: string]: string[]}

const ringsDir = 'rings'

const ringFiles: RingMap = await readdirSync(ringsDir).filter(
    fileName => fileName.match(/^.*\.txt$/)
).map(fileName => fileName.replace(/\.txt/, '')).reduce(
    async (rings: RingMap, ringName) => {
        rings[ringName] = (await Bun.file(`${ringsDir}/${ringName}.txt`).text()).split('\n')
        return rings
    }, {} as RingMap
)

const server = Bun.serve({
    port: 3000,
    fetch(request) {
        const [ring, action, ...sourceParts] = request.url.replace(/https?:\/\/[^\/]+\//, '').replaceAll('..', '').split('/')
        const source = sourceParts.join('/')

        if(action === 'random') {
            const randomIndex = Math.ceil((Math.random() * ringFiles[ring].length - 1))
            const randomSelection = ringFiles[ring][randomIndex]
            const location = `https://${randomSelection}`
            return new Response(`Going to ${location}`, {
                status: 302,
                headers: {
                    location
                }
            })
        }

        if (action !== undefined) {
            const itemIndex = ringFiles[ring].indexOf(source)
            let nextIndex = 0
            if (action === 'next') {
                nextIndex = itemIndex === ringFiles[ring].length - 1 ? 0 : itemIndex + 1
            } else if (action === 'prev') {
                nextIndex = itemIndex === 0 ? ringFiles[ring].length - 1 : itemIndex - 1
            }
            const location = `https://${ringFiles[ring][nextIndex]}`
            return new Response(`Going to ${location}`, {
                status: 302,
                headers: {
                    location
                }
            })

        }




        return new Response(`             _           _                          ___ 
            | |         (_)                   _    / __)
 _ _ _  ____| | _   ____ _ ____   ____  _ _ _| |_ | |__ 
| | | |/ _  ) || \\ / ___) |  _ \\ / _  || | | |  _)|  __)
| | | ( (/ /| |_) ) |   | | | | ( ( | || | | | |__| |   
 \\____|\\____)____/|_|   |_|_| |_|\\_|| (_)____|\\___)_|   
                                (_____|                

Let's webring like it's the year 2000 and make it even easier to disover other cool
Nounish websites. For you youngsters: webrings are collections of websites that agree
to link to one another in a circle; someone lands on a site and clicks "Next", then
on to the next one, which also has the "Next" button. This makes discovering new things
even easier and fun!

Join the webring by adding your website(s) to one of the rings like:

1. Nouns ring: https://github.com/gitblamecarrot/webring/blob/main/rings/nouns.txt

Then just add the links like the following to your site:

<i>Explore the Nouns webring!</i>
<div style="grid grid-col">
<a href="https://webring.wtf/nouns/prev/<your domain>" rel="noreferrer">Previous</a>
<a href="https://webring.wtf/nouns/random/<your domain>" rel="noreferrer">Random</a>
<a href="https://webring.wtf/nouns/next/<your domain>" rel="noreferrer">Next</a>
</div>


Details:

webring.wtf will not retain traffic logs but may record total query counts in the
future to judge usage.

webring.wtf is implemented as a centralized service because loading remote JavaScript
onto websites in Web3 is a bad idea! Instead, we just can just link here and the robots
will shuttle viewers on to the next one.

Have questions? Reach out to @devcarrot on Warpcast.
        `)
    },
});

console.log(`Listening on localhost:${server.port}`);