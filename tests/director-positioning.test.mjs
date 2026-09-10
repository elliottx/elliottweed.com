import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';

const pagePath = new URL('../src/pages/index.astro', import.meta.url);
const layoutPath = new URL('../src/layouts/Layout.astro', import.meta.url);
const stylesheetPath = new URL('../src/styles/global.css', import.meta.url);
const timelinePath = new URL('../src/data/timeline.json', import.meta.url);
const builtPagePath = new URL('../dist/index.html', import.meta.url);
const photosPath = new URL('../public/photos/', import.meta.url);
const builtPhotosPath = new URL('../dist/photos/', import.meta.url);

const [page, layout, stylesheet, timelineSource, builtPage] = await Promise.all([
  readFile(pagePath, 'utf8'),
  readFile(layoutPath, 'utf8'),
  readFile(stylesheetPath, 'utf8'),
  readFile(timelinePath, 'utf8'),
  readFile(builtPagePath, 'utf8'),
]);

const timeline = JSON.parse(timelineSource);
const publicSource = `${page}\n${layout}\n${timelineSource}`;

test('presents the Director role and production-oriented thesis in every current identity surface', () => {
  assert.ok(
    page.split('Success Architecture Director at Salesforce').length - 1 >= 2,
    'the hero and LinkedIn identity card should both use the formal Director title',
  );
  assert.match(page, /Elliott Weed — Success Architecture Director \| Enterprise AI/);
  assert.match(page, /I solve enterprise AI problems that do not fit neatly inside one team\./);
  assert.match(page, /Where I\s*<span[^>]*>Lead<\/span>/);
  assert.match(page, /id="impact"/);
  assert.match(layout, /"jobTitle": "Success Architecture Director"/);

  const promotion = timeline.find((event) => event.year === 2026);
  assert.equal(promotion?.title, 'Promoted to Success Architecture Director');
});

test('emits consistent search, social, canonical, and structured metadata', () => {
  const title = 'Elliott Weed — Success Architecture Director | Enterprise AI';
  const description = 'Success Architecture Director at Salesforce with 19+ years in enterprise technology, solving enterprise AI problems across Agentforce, Data 360, and delivery.';

  assert.ok(description.length <= 160, 'the search description should fit a standard result snippet');
  assert.match(page, new RegExp(`title="${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`));
  assert.match(page, new RegExp(`description="${description.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`));
  assert.ok(builtPage.includes(`<title>${title}</title>`));
  assert.ok(builtPage.includes(`<meta name="description" content="${description}">`));
  assert.ok(builtPage.includes(`<meta property="og:title" content="${title}">`));
  assert.ok(builtPage.includes(`<meta property="og:description" content="${description}">`));
  assert.ok(builtPage.includes(`<meta name="twitter:title" content="${title}">`));
  assert.ok(builtPage.includes(`<meta name="twitter:description" content="${description}">`));
  assert.ok(builtPage.includes('<link rel="canonical" href="https://elliottweed.com">'));

  const jsonLdStart = builtPage.indexOf('<script type="application/ld+json">');
  const jsonLdEnd = builtPage.indexOf('</script>', jsonLdStart);
  assert.ok(jsonLdStart >= 0 && jsonLdEnd > jsonLdStart);
  const jsonLd = JSON.parse(
    builtPage.slice(jsonLdStart + '<script type="application/ld+json">'.length, jsonLdEnd),
  );
  assert.equal(jsonLd.jobTitle, 'Success Architecture Director');
  assert.equal(jsonLd.worksFor?.name, 'Salesforce');
});

test('uses specific, supportable scale proof instead of vague importance claims', () => {
  assert.match(page, /data-target="19">19\+<\/div>/);
  assert.match(page, /Years in Enterprise Tech/);
  assert.match(page, /data-target="10">10\+<\/div>/);
  assert.match(page, /Years in Salesforce Ecosystem/);
  assert.match(page, /data-target="40">40\+<\/div>/);
  assert.match(page, /Architects Enabled/);
  assert.doesNotMatch(page, /Companies Shaped/);
  assert.doesNotMatch(publicSource, /17\+ years/i);
  assert.ok(builtPage.includes('>19+</div>'));
  assert.ok(builtPage.includes('>10+</div>'));
  assert.ok(builtPage.includes('>40+</div>'));
});

test('contains the old role only as the historically accurate 2025 milestone', () => {
  assert.doesNotMatch(page, /Senior AI & Data Success Architect/);
  assert.doesNotMatch(layout, /Senior AI & Data Success Architect/);

  const historicalRoles = timeline.filter((event) =>
    `${event.title} ${event.description}`.includes('Senior AI & Data Success Architect'),
  );
  assert.equal(historicalRoles.length, 1);
  assert.equal(historicalRoles[0].year, 2025);
  assert.equal(builtPage.split('Senior AI &amp; Data Success Architect').length - 1, 1);
});

test('keeps public positioning free of confidential customer and internal-project claims', () => {
  const forbiddenTerms = [
    /\bPOET\b/i,
    /\bPODS\b/i,
    /Ticketmaster/i,
    /Elevance/i,
    /Anthem/i,
    /largest Marketing Cloud contract/i,
    /largest (?:Data Cloud )?customer/i,
    /annual order value/i,
    /\bAOV\b/i,
    /contract value/i,
    /\bcompensation\b/i,
    /\bsalary\b/i,
    /\bbase pay\b/i,
    /performance review/i,
    /\bExceptional\b/i,
  ];

  for (const term of forbiddenTerms) {
    assert.doesNotMatch(`${publicSource}\n${builtPage}`, term);
  }
});

test('keeps leadership content in the promised reading order and navigation safe', () => {
  const impactIndex = page.indexOf('id="impact"');
  const expertiseIndex = page.indexOf('id="expertise"');
  const timelineIndex = page.indexOf('id="timeline"');
  assert.ok(impactIndex < expertiseIndex && expertiseIndex < timelineIndex);
  assert.match(page, /href="#hero"[^>]*aria-label="Back to top"/);
  assert.match(page, /matchMedia\('\(prefers-reduced-motion: reduce\)'\)/);
  assert.match(page, /if \(prefersReducedMotion\)/);
  assert.match(stylesheet, /\.sticky-nav:focus-within\s*\{[^}]*transform:\s*translateY\(0\)[^}]*transition-duration:\s*0s/s);
  assert.match(stylesheet, /\.sticky-nav a:focus-visible\s*\{[^}]*outline:/s);
  assert.match(stylesheet, /section\[id\]\s*\{[^}]*scroll-margin-top:/s);
});

test('keeps the public journey professionally focused and protects family privacy', () => {
  const publicIdentity = `${page}\n${timelineSource}\n${builtPage}`;
  for (const privateDetail of [
    /family-2019\.jpeg/i,
    /wedding\.jpg/i,
    /\/photos\/midwest\.webp/i,
  ]) {
    assert.doesNotMatch(publicIdentity, privateDetail);
  }
  assert.equal(timeline.some((event) => ['👶', '💍'].includes(event.icon)), false);
  assert.equal(timeline.some((event) => event.category === 'life' && event.year >= 2025), false);
  assert.match(
    page,
    /<div class="text-white font-medium">Location<\/div>\s*<div[^>]*>Midwest, United States<\/div>/,
  );
});

test('uses AA-safe utility colors for meaningful normal-sized copy', () => {
  assert.doesNotMatch(page, /text-slate-(?:500|600)/);
  assert.doesNotMatch(page, /placeholder-slate-(?:500|600)/);
  assert.equal(page.match(/focus:ring-2 focus:ring-blue-400/g)?.length, 3);
  assert.doesNotMatch(page, /focus:ring-1|focus:ring-blue-500\/50/);
  assert.match(page, /from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700/);
});

test('references only photo assets that ship in source and production output', async () => {
  const references = new Set(
    [...publicSource.matchAll(/\/photos\/[^"'\s)]+/g)].map((match) => match[0]),
  );

  for (const reference of references) {
    await Promise.all([
      readFile(new URL(`../public${reference}`, import.meta.url)),
      readFile(new URL(`../dist${reference}`, import.meta.url)),
    ]);
  }
});

test('keeps the full authority proof compact in the mobile hero', () => {
  assert.match(page, /max-w-5xl mx-auto px-6 text-center relative z-10 py-10 sm:py-24 md:py-32/);
  assert.match(page, /class="hidden md:block mt-20" id="scroll-hint"/);
  assert.match(page, /w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44/);
  assert.match(page, /class="text-base md:text-lg text-slate-400[^>]+id="hero-sub"/);
  assert.equal(page.includes('text-[0.64rem]'), false);
  assert.equal(page.match(/text-xs md:text-sm leading-tight text-slate-400/g)?.length, 3);
});

test('publishes photo assets without embedded EXIF, IPTC, or XMP metadata', async () => {
  const topLevelEntries = await readdir(photosPath, { withFileTypes: true });
  const builtTopLevelEntries = await readdir(builtPhotosPath, { withFileTypes: true });
  assert.equal(
    topLevelEntries.some((entry) => entry.isDirectory() && entry.name === 'originals'),
    false,
    'unlinked high-resolution originals must not be deployed from public/photos',
  );
  assert.equal(
    builtTopLevelEntries.some((entry) => entry.isDirectory() && entry.name === 'originals'),
    false,
    'the production build must not contain unlinked high-resolution originals',
  );

  async function findPhotos(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    const files = await Promise.all(entries.map(async (entry) => {
      const child = new URL(entry.name + (entry.isDirectory() ? '/' : ''), directory);
      if (entry.isDirectory()) return findPhotos(child);
      return [child];
    }));
    return files.flat();
  }

  function assertNoEmbeddedMetadata(bytes, pathname) {
    if (bytes[0] === 0xff && bytes[1] === 0xd8) {
      let offset = 2;
      while (offset + 4 <= bytes.length) {
        if (bytes[offset] !== 0xff) {
          offset += 1;
          continue;
        }
        const marker = bytes[offset + 1];
        offset += 2;
        if (marker === 0xd9 || marker === 0xda) break;
        if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
        const segmentLength = bytes.readUInt16BE(offset);
        if (segmentLength > 2) {
          assert.notEqual(marker, 0xe1, `${pathname} contains a JPEG APP1 EXIF/XMP segment`);
          assert.notEqual(marker, 0xed, `${pathname} contains a JPEG APP13 IPTC/Photoshop segment`);
        }
        offset += segmentLength;
      }
      return;
    }

    if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
      const forbiddenChunks = new Set(['eXIf', 'iTXt', 'tEXt', 'zTXt']);
      let offset = 8;
      while (offset + 12 <= bytes.length) {
        const length = bytes.readUInt32BE(offset);
        const chunkType = bytes.toString('ascii', offset + 4, offset + 8);
        assert.equal(forbiddenChunks.has(chunkType), false, `${pathname} contains PNG ${chunkType} metadata`);
        offset += 12 + length;
      }
      return;
    }

    if (bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP') {
      let offset = 12;
      while (offset + 8 <= bytes.length) {
        const chunkType = bytes.toString('ascii', offset, offset + 4);
        const length = bytes.readUInt32LE(offset + 4);
        assert.notEqual(chunkType, 'EXIF', `${pathname} contains WebP EXIF metadata`);
        assert.notEqual(chunkType, 'XMP ', `${pathname} contains WebP XMP metadata`);
        offset += 8 + length + (length % 2);
      }
      return;
    }

    const isoText = bytes.toString('latin1');
    assert.equal(isoText.includes('Exif'), false, `${pathname} contains ISO BMFF EXIF metadata`);
    assert.equal(isoText.includes('application/rdf+xml'), false, `${pathname} contains ISO BMFF XMP metadata`);
  }

  function assertExtensionMatchesBytes(bytes, pathname) {
    const lowerPath = pathname.toLowerCase();
    if (bytes[0] === 0xff && bytes[1] === 0xd8) {
      assert.match(lowerPath, /\.jpe?g$/);
      return;
    }
    if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
      assert.match(lowerPath, /\.png$/);
      return;
    }
    if (bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP') {
      assert.match(lowerPath, /\.webp$/);
      return;
    }
    const header = bytes.toString('ascii', 0, 32);
    if (/ftyp(?:avif|avis)/.test(header)) {
      assert.match(lowerPath, /\.avif$/);
      return;
    }
    assert.fail(`${pathname} has an unsupported or unrecognized image encoding`);
  }

  for (const directory of [photosPath, builtPhotosPath]) {
    for (const photo of await findPhotos(directory)) {
      const bytes = await readFile(photo);
      assertNoEmbeddedMetadata(bytes, photo.pathname);
      assertExtensionMatchesBytes(bytes, photo.pathname);
    }
  }
});
