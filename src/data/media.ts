// Short clips of each product, in plain language: what it does for you, not how.
// One catalogue for the home page gallery and each project page.
//
// Papyra's clips are copied from papyra.app (recorded by its scripts/clips.mjs,
// light and dark). Luthor's are its feature GIFs from luthor.fyi, re-encoded
// to H.264 MP4 at 1280px (20 MB of GIF → a few hundred KB) with a WebP poster.

export interface Clip {
  /** Path without extension under public/. */
  src: string;
  /** Recorded in both themes. */
  themed?: boolean;
  width: number;
  height: number;
  title: string;
  text: string;
  /** For screen readers: what happens on screen. */
  label: string;
}

const PAPYRA = { width: 1680, height: 1050 } as const;
const LUTHOR = { width: 1280, height: 720 } as const;

export const MEDIA: Record<string, Clip[]> = {
  papyra: [
    {
      src: "/media/papyra/drop",
      themed: true,
      ...PAPYRA,
      title: "Bring your notes.",
      text: "Drag a file onto your desk and it becomes a note — headings, checklists and all.",
      label:
        "A Markdown file is dragged onto the Papyra desk, becomes a note card, and opens fully formatted"
    },
    {
      src: "/media/papyra/write",
      themed: true,
      ...PAPYRA,
      title: "It saves itself.",
      text: "No save button, ever. Every version is kept, so you can always go back.",
      label:
        "Typing a new note in Papyra: a heading, a link to another note and a list, then “Saved”"
    },
    {
      src: "/media/papyra/search",
      themed: true,
      ...PAPYRA,
      title: "Find anything.",
      text: "Every word of every note and to-do, in a keystroke — matches highlighted.",
      label:
        "Searching Papyra for a word: matching notes appear with the word highlighted"
    },
    {
      src: "/media/papyra/vault",
      themed: true,
      ...PAPYRA,
      title: "Lock what’s private.",
      text: "Locked notes are encrypted and open only with your PIN — or your fingerprint.",
      label:
        "A locked note stays blurred until the PIN is typed, then its contents appear"
    },
    {
      src: "/media/papyra/theme",
      ...PAPYRA,
      title: "Easy on the eyes.",
      text: "Warm paper by day, soft graphite by night.",
      label: "Papyra switching between its light and dark themes"
    }
  ],
  luthor: [
    {
      src: "/media/luthor/slash",
      ...LUTHOR,
      title: "Type / for anything.",
      text: "Headings, lists, tables and more — one keystroke away.",
      label:
        "Typing a slash in the Luthor editor opens a menu of blocks; a heading is inserted"
    },
    {
      src: "/media/luthor/typography",
      ...LUTHOR,
      title: "Words that look right.",
      text: "Pick the font, size and spacing that suit your product.",
      label: "Changing font family, size and line height in the Luthor editor toolbar"
    },
    {
      src: "/media/luthor/color",
      ...LUTHOR,
      title: "Colour and highlight.",
      text: "Mark what matters, without messy formatting underneath.",
      label: "Applying text colour and highlight to a sentence in the Luthor editor"
    },
    {
      src: "/media/luthor/lists",
      ...LUTHOR,
      title: "Lists that behave.",
      text: "Bullets, numbers and checklists in one smooth flow.",
      label: "Creating bulleted, numbered and checklist items in the Luthor editor"
    },
    {
      src: "/media/luthor/embeds",
      ...LUTHOR,
      title: "Pictures, video, any link.",
      text: "Drop media in, then resize, align and caption it.",
      label: "Embedding a video and a web page in the Luthor editor, then resizing them"
    },
    {
      src: "/media/luthor/themes",
      ...LUTHOR,
      title: "Light and dark.",
      text: "At home in either, without fragile hacks.",
      label: "The Luthor editor switching between light and dark themes"
    }
  ]
};
