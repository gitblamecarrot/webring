FROM oven/bun

ADD . .

RUN bun install

CMD ["bun", "run", "index.ts"]
