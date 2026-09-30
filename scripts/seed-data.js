const note = (name) => `https://notes.ashwin.co.in/projects/${name}`;
const gh = (name) => `Ashwin-S-Nambiar/${name}`;

export const projects = [
  {
    slug: 'redline',
    name: 'Redline',
    formerly: ['Quillify'],
    blurb: 'Selected changes across my projects, and when they happened.',
    url: 'https://redline.ashwin.co.in',
    repo: gh('Redline'),
    note: note('Redline'),
  },
  {
    slug: 'inspect',
    name: 'Inspect',
    formerly: ['BlogSpace'],
    blurb:
      "Read write-ups on the things I build, with notes that point at screenshots and clips like a browser's inspector.",
    url: 'https://inspect.ashwin.co.in',
    repo: gh('Inspect'),
    note: note('Inspect'),
  },
  {
    slug: 'tenzies',
    name: 'Tenzies',
    blurb:
      'Roll ten dice, hold the ones that match and roll the rest until all ten show the same number, in as few rolls as you can.',
    url: 'https://tenzies.ashwin.co.in',
    repo: gh('Tenzies'),
    note: note('Tenzies'),
  },
  {
    slug: 'movievault',
    name: 'MovieVault',
    blurb:
      'See where to stream any film, series or anime, follow franchises in order, and keep a list of what to watch next.',
    url: 'https://movievault.ashwin.co.in',
    repo: gh('MovieVault'),
    note: note('MovieVault'),
  },
  {
    slug: 'stampbook',
    name: 'Stampbook',
    formerly: ['Travel Journal'],
    blurb:
      'Log your trips as passport stamps with dates, notes and photos, and watch the map fly to every place you have been.',
    url: 'https://stampbook.ashwin.co.in',
    repo: gh('Stampbook'),
    note: note('Stampbook'),
  },
  {
    slug: 'chit',
    name: 'Chit',
    formerly: ['Add To Cart'],
    blurb:
      'A shopping list you share: add things, tick them off in red pen, and watch it update live on every phone.',
    url: 'https://chit.ashwin.co.in',
    repo: gh('Chit'),
    note: note('Chit'),
  },
  {
    slug: 'pasteup',
    name: 'Pasteup',
    formerly: ['Meme Generator'],
    blurb:
      'Pick a meme template or your own image, write the captions, drag them into place, and save, copy or share it.',
    url: 'https://pasteup.ashwin.co.in',
    repo: gh('Pasteup'),
    note: note('Pasteup'),
  },
  {
    slug: 'fandeck',
    name: 'Fandeck',
    formerly: ['Color Scheme Generator'],
    blurb:
      'Five colors from one you pick, with locks, a contrast grid and exports to CSS, Tailwind and JSON.',
    url: 'https://fandeck.ashwin.co.in',
    repo: gh('Fandeck'),
    note: note('Fandeck'),
  },
  {
    slug: 'quizzme',
    name: 'QuizzMe',
    blurb:
      'Quick trivia rounds on 24 topics, with streaks, results and a replay of what you missed.',
    url: 'https://quizzme.ashwin.co.in',
    repo: gh('QuizzMe'),
    note: note('QuizzMe'),
  },
  {
    slug: 'portfolio',
    name: 'Portfolio',
    blurb:
      'Where all of this is collected, with a page and a write-up for every project.',
    url: 'https://ashwin.co.in',
    repo: gh('portfolio'),
    note: '',
  },
].map((p, order) => ({ formerly: [], ...p, order }));

const A = (text) => ({ kind: 'added', text });
const C = (text) => ({ kind: 'changed', text });
const F = (text) => ({ kind: 'fixed', text });
const R = (text) => ({ kind: 'removed', text });

export const releases = [
  {
    project: 'chit',
    version: '1.0',
    date: '2024-05-06',
    title: 'The first version, as Add To Cart',
    commits: ['25f228a'],
    changes: [
      A(
        'One list that everyone who opened the site shared, with an input, an add button and a cat.',
      ),
    ],
  },
  {
    project: 'movievault',
    version: '1.0',
    date: '2024-08-16',
    title: 'The first version',
    commits: ['d3b8bc4'],
    changes: [A('A watchlist with a search box.')],
  },
  {
    project: 'stampbook',
    version: '1.0',
    date: '2024-09-04',
    title: 'The first version, as Travel Journal',
    commits: ['0b81938'],
    changes: [
      A(
        'Three trips written into the code, as cards with a photo, a date and a Google Maps link.',
      ),
    ],
  },
  {
    project: 'fandeck',
    version: '1.0',
    date: '2024-09-06',
    title: 'The first version, as Color Scheme Generator',
    commits: ['bbed431'],
    changes: [
      A(
        'A color input, a dropdown of eight harmonies and five swatches from The Color API to copy.',
      ),
    ],
  },
  {
    project: 'inspect',
    version: '1.0',
    date: '2024-09-06',
    title: 'The first version',
    commits: ['0203b26'],
    changes: [
      A(
        'A form over five Latin placeholder posts. The API echoed your post back without saving it, so a reload took it away.',
      ),
    ],
  },
  {
    project: 'pasteup',
    version: '1.0',
    date: '2024-09-11',
    title: 'The first version, as Meme Generator',
    commits: ['5e1c68a'],
    changes: [
      A(
        'A random template, a box to add lines of text you could drag around, and a download button.',
      ),
    ],
  },
  {
    project: 'tenzies',
    version: '1.0',
    date: '2024-09-21',
    title: 'The first version',
    commits: ['032ff7b'],
    changes: [
      A('Flat dice in a white card, tap to hold, and confetti on a win.'),
    ],
  },
  {
    project: 'quizzme',
    version: '1.0',
    date: '2024-10-16',
    title: 'The first version',
    commits: ['fb21064'],
    changes: [
      A(
        'A form of dropdowns to set up a round, one round of questions from Open Trivia DB, and a score.',
      ),
    ],
  },
  {
    project: 'portfolio',
    version: '1.0',
    date: '2024-10-28',
    title: 'The first version',
    commits: ['92d5f99'],
    changes: [A('A page for me and the things I had built so far.')],
  },
  {
    project: 'redline',
    version: '1.0',
    date: '2025-02-06',
    title: 'The first version, as Quillify',
    commits: ['3fae2b3'],
    changes: [
      A(
        'A blog with categories, an email box to subscribe and an admin panel to write posts.',
      ),
    ],
  },
  {
    project: 'movievault',
    version: '2.0',
    date: '2026-09-17',
    title: 'Rebuilt around where to watch it tonight',
    commits: ['8c12ae9', 'e741691'],
    changes: [
      A('Where to stream, rent or buy any film, series or anime.'),
      A('Franchises in release order, with a strip of the whole series.'),
      A('Pages for people, with ratings, episodes and studios.'),
      A('Your vault of what to watch next.'),
      R(
        'Motion and the data fetching library. The motion is plain maths and the View Transitions API.',
      ),
    ],
  },
  {
    project: 'quizzme',
    version: '2.0',
    date: '2026-09-25',
    title: 'Rebuilt from the ground up',
    commits: ['f43945d'],
    changes: [
      A(
        'Pick from 24 topics, a difficulty and how many questions, or let Surprise me pick.',
      ),
      A('Streaks, results and a replay of every question you missed.'),
      A('Stats that stay in your browser.'),
      A('Sounds, with a mute that remembers you.'),
      C(
        'The start screen fits on one screen, with stickers you can drag around.',
      ),
      C(
        'Questions wait their turn for Open Trivia DB, so a round no longer fails on a busy moment.',
      ),
    ],
  },
  {
    project: 'quizzme',
    version: '2.0.1',
    date: '2026-09-25',
    title: 'Small fixes after the rebuild',
    commits: ['3a4fdb1'],
    changes: [
      F('Tap sounds played late or not at all on phones.'),
      F('Long questions and topic names overflowed on small screens.'),
      F('Switching themes flashed the wrong colors.'),
    ],
  },
  {
    project: 'fandeck',
    version: '2.0',
    date: '2026-09-26',
    title: 'Color Scheme Generator is now Fandeck',
    commits: ['45cfd29', '8e1aeb5', 'c665712'],
    changes: [
      A(
        'Five paint chips, each with its name and value, a lock and a copy button.',
      ),
      A(
        'A contrast grid of every color as text on every other, with WCAG ratios.',
      ),
      A('Exports to CSS, Tailwind, JSON and PNG.'),
      A('An OKLCH picker with an eyedropper and your recent colors.'),
      A('Undo, a shuffle on Space and palettes you can share by link.'),
      C(
        'Colors are judged on neutral grey, so there is no accent and no dark mode.',
      ),
      C('A new name and a new address, fandeck.ashwin.co.in.'),
    ],
  },
  {
    project: 'pasteup',
    version: '2.0',
    date: '2026-09-26',
    title: 'Meme Generator is now Pasteup',
    commits: ['f95c50d'],
    changes: [
      A(
        "Imgflip's top 100 templates with search, a filter by caption count and random.",
      ),
      A('Your own image, by picking, dropping or pasting it.'),
      A(
        'Captions you drag, resize and nudge with the arrow keys, in three styles.',
      ),
      A('Save, copy or share the finished meme.'),
      A('What you make is kept on this device to reopen and edit.'),
      C('Memes are drawn on a canvas in your browser, so nothing is uploaded.'),
    ],
  },
  {
    project: 'chit',
    version: '2.0',
    date: '2026-09-26',
    title: 'Add To Cart is now Chit',
    commits: ['ea582d6', 'c627648'],
    changes: [
      A(
        'A private link for every list, with a QR code at the foot of the receipt.',
      ),
      A("Tick things off in red pen and see everyone else's changes live."),
      A('Quantities read as you type, like 2 kg onions or a dozen eggs.'),
      A('Items sort themselves into sections.'),
      A("Works offline and catches up when you're back."),
      C('Lists only open from their own link, so nobody can browse them.'),
      R('The one list everyone shared, and the cat.'),
    ],
  },
  {
    project: 'movievault',
    version: '2.0.1',
    date: '2026-09-26',
    title: 'A shorter footer',
    commits: ['c9e9643'],
    changes: [C('The footer credit is just Made by Ashwin.')],
  },
  {
    project: 'stampbook',
    version: '2.0',
    date: '2026-09-27',
    title: 'Travel Journal is now Stampbook',
    commits: ['3d8d289'],
    changes: [
      A('Your own trips, kept on your device, with up to 24 photos each.'),
      A(
        'A passport stamp for every trip, in one of six shapes and three inks.',
      ),
      A('One map for the whole app that flies to each place you open.'),
      A('Search for places as you type, or drop a pin.'),
      A('Back up your book to a file and restore it.'),
      C("India's borders are drawn the way India shows them."),
      R('The three trips written into the code.'),
    ],
  },
  {
    project: 'tenzies',
    version: '2.0',
    date: '2026-09-28',
    title: 'Rebuilt as a dice tray',
    commits: ['42f80d1'],
    changes: [
      A('Real 3D dice that tumble, settle and hop when you win.'),
      A('A timer, with your best time and fewest rolls.'),
      A('Stats for every game you play.'),
      A("A hint line that warns you before a roll you'd lose."),
      A('Keyboard play: Space to roll, 1 to 0 to hold.'),
      A('Your game picks up where you left it.'),
      R('Confetti.'),
    ],
  },
  {
    project: 'quizzme',
    version: '2.1',
    date: '2026-09-28',
    title: 'Tooltips on icon buttons',
    commits: ['5fc469e'],
    changes: [
      A('Tooltips on the sound, stats, theme, leave and share buttons.'),
    ],
  },
  {
    project: 'pasteup',
    version: '2.1',
    date: '2026-09-28',
    title: 'Tooltips on icon buttons',
    commits: ['0766c6b'],
    changes: [A('Tooltips on the sound and random template buttons.')],
  },
  {
    project: 'stampbook',
    version: '2.1',
    date: '2026-09-28',
    title: 'A tooltip on the menu',
    commits: ['4c525dc'],
    changes: [A('A tooltip on the menu button.')],
  },
  {
    project: 'movievault',
    version: '2.1',
    date: '2026-09-28',
    title: 'Tooltips on icon buttons',
    commits: ['f29d7b9'],
    changes: [
      A('Tooltips on save to vault, your vault, settings and filters.'),
      A("Settings says so in its tooltip when TMDB can't be reached."),
    ],
  },
  {
    project: 'movievault',
    version: '2.1.1',
    date: '2026-09-28',
    title: 'Dependencies brought up to date',
    commits: ['ddd1edc'],
    changes: [C('React Router 8, Vite 8.3 and the latest Tabler icons.')],
  },
  {
    project: 'portfolio',
    version: '3.1',
    date: '2026-09-28',
    title: 'New project and lab pages',
    commits: ['75d6822', '607c73e'],
    changes: [
      A('Versions, highlights and closer looks on every project page.'),
      A('A live playground for projects that have one.'),
      C('Project and lab names are lowercase everywhere.'),
    ],
  },
  {
    project: 'inspect',
    version: '2.0',
    date: '2026-09-28',
    title: 'Rebuilt as a riso zine rack',
    commits: ['6c50876', '3a99410'],
    changes: [
      A(
        'A cover for every post, printed in pink and blue from its first letter.',
      ),
      A('Tags, search, sorting and likes.'),
      A('Comments, and yours stay.'),
      A('A writer with a live proof and drafts that save themselves.'),
      A('Import and export posts as Markdown.'),
      A('Keyboard shortcuts for reading and writing.'),
      C(
        'Real posts from DummyJSON in place of Latin placeholders, and yours are still there after a reload.',
      ),
    ],
  },
  {
    project: 'tenzies',
    version: '2.0.1',
    date: '2026-09-28',
    title: 'Numbers stop wobbling',
    commits: ['42a3525'],
    changes: [
      F(
        'The roll count moved sideways as it ticked. Every figure is the same width now.',
      ),
      C(
        'Roll, Roll anyway and Play again swap in place instead of pushing each other around.',
      ),
    ],
  },
  {
    project: 'inspect',
    version: '3.0',
    date: '2026-09-29',
    title: 'BlogSpace is now Inspect',
    commits: ['143872d', '7716643'],
    changes: [
      A('Write-ups on the things I build, one post per project or lab.'),
      A(
        'Notes that point: the part of a screenshot a note is about gets a selection box.',
      ),
      A('Clips with a timeline, and a box that follows what it points at.'),
      A('Before and after sliders and live demos inside posts.'),
      A('An RSS feed, and dark mode that follows your system.'),
      R('The feed of placeholder posts, the writer, likes and comments.'),
    ],
    notes:
      'BlogSpace had no real writing in it. Now it holds the story behind each project.',
  },
  {
    project: 'inspect',
    version: '3.0.1',
    date: '2026-09-30',
    title: 'The footer stays at the bottom',
    commits: ['f8c74b3'],
    changes: [
      F(
        'On short pages like the 404, the footer floated up under the text. It sits at the bottom of the screen now.',
      ),
    ],
  },
  {
    project: 'inspect',
    version: '2.0.1',
    date: '2026-09-28',
    title: 'The shortcuts dialog sits in the middle again',
    commits: ['5ff79f4'],
    changes: [
      F('On wide screens the shortcuts dialog opened in the top left corner.'),
    ],
  },
  {
    project: 'redline',
    version: '2.0',
    date: '2026-09-28',
    title: 'Quillify is now Redline',
    commits: ['95e1e17', '81b81d7'],
    changes: [
      A(
        'A curated changelog for my projects, with a page and a feed for each one.',
      ),
      A(
        'The newest change is circled in red, the way changes are marked on a drawing.',
      ),
      A('Filter by what changed: added, changed, fixed or removed.'),
      R('Blog posts, categories and the email list.'),
    ],
    notes:
      'Quillify was a blog, and so is BlogSpace. Two blogs was one too many, so this one became the place that keeps track of the rest.',
  },
  {
    project: 'tenzies',
    version: '1.1',
    date: '2025-02-13',
    title: 'Dice faces and a roll count',
    commits: ['4c1871a', '1d33fc5'],
    changes: [
      C('Dice show pips instead of numerals.'),
      A('A roll count and a final score after each game.'),
    ],
  },
  {
    project: 'fandeck',
    version: '1.1',
    date: '2025-02-08',
    title: 'Palettes you can share',
    commits: ['2b01e4b'],
    changes: [
      A(
        'A share link that opens the same five-color palette for someone else.',
      ),
    ],
  },
  {
    project: 'stampbook',
    version: '1.1',
    date: '2025-02-25',
    title: 'Tags for trips',
    commits: ['abb4796'],
    changes: [
      A('Tags to group trips.'),
      A('A dark mode switch and a loading state.'),
    ],
  },
  {
    project: 'quizzme',
    version: '1.1',
    date: '2025-05-01',
    title: 'An error you can read',
    commits: ['4836ce7'],
    changes: [
      F(
        'A failed question request now shows an error message instead of leaving you waiting.',
      ),
    ],
  },
  {
    project: 'portfolio',
    version: '2.0',
    date: '2025-12-07',
    title: 'The second portfolio',
    commits: ['b6d3fa5'],
    changes: [
      A(
        'A new site built with Next.js, with projects, experience and the rest of my work in one place.',
      ),
      A('An admin panel to edit the portfolio content.'),
    ],
    notes:
      'The first portfolio stays on the v1 branch. This version lives on v2.',
  },
  {
    project: 'portfolio',
    version: '3.0',
    date: '2026-08-26',
    title: 'A third way through the work',
    commits: ['fa92d1f'],
    changes: [
      A(
        'A new portfolio with a moving project carousel and a page for each project.',
      ),
      A('Project clips that play as you explore.'),
    ],
    notes:
      'This version lives on the v3 branch. The earlier sites remain on v1 and v2.',
  },
];
