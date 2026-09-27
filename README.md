# ZeeFrames — Before / After block

A drop-in section for zeeframes.com: one phone, two states — "Сегодня" and
"Через 10 дней". Live demo: https://semenovmak111-create.github.io/zeeframes-before-after/

## How it works

- The switch (same look as the sticky anchor tabs of the service pages) flips the
  whole block: the frame turns from graphite to the site's lime band, the phone
  screen changes from a maps listing to the clinic's own site, the six bento cells
  light up one by one and the counter runs 0/6 → 6/6.
- Pins 01–06 on the phone match the numbers of the cells. Hover or focus a cell and
  its spot on the screen is outlined.
- The first time the block scrolls into view it plays "today → in ten days" once,
  unless the visitor has already clicked the switch. With reduced motion everything
  switches instantly.

## Embed

1. Copy the `<section class="zba" id="before-after" data-zba>…</section>` block from `index.html`.
2. Add `before-after.css` to the page `<head>` and `before-after.js` before `</body>`.

The block uses the fonts the site already loads (Inter Tight, Inter) and the tokens
from `colors.css` (`--color-primary`, `--color-black-300`, `--color-rich-black`) with
fallbacks. All classes are prefixed `zba-`. Dark section — place it between two cream ones.
