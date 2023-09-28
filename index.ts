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




        return new Response(`Welcome to webring.wtf

Let your site visitors explore other neat Nounish websites!

Join the webring by adding your website(s) domain to one of the rings like:

Nouns ring: https://github.com/gitblamecarrot/webring/blob/main/rings/nouns.txt

Then just add the links like the following to your site:

<i>Explore the Nouns webring!</i>
<div style="grid grid-col">
<a href="https://webring.wtf/nouns/prev/<your domain>" rel="noreferrer">Previous</a>
<a href="https://webring.wtf/nouns/random/<your domain>" rel="noreferrer">Random</a>
<a href="https://webring.wtf/nouns/next/<your domain>" rel="noreferrer">Next</a>
</div>

webring.wtf will not retain traffic logs but may record total query counts in the
future to judge usage.
        `)
    },
});

console.log(`Listening on localhost:${server.port}`);