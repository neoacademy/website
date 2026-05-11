# Assets

Drop files at the exact paths below — the HTML already points here. Filenames are the contract; replace the file, keep the name, and the page picks it up.

If you add a new image (e.g. a 5th preschool tile), update the matching HTML to point at the new file.

## Image OR video — your choice

Every media slot accepts **either a JPG, an MP4, or both**:

- Upload only the **JPG** → the still image renders
- Upload only the **MP4** → the video autoplays (muted, looping)
- Upload **both** → the video plays; the JPG shows as the loading frame

The HTML uses `<video poster="...jpg"><source src="...mp4"></video>` for every slot. When the MP4 is missing, browsers fall back to the poster image, which looks identical to a static `<img>`. No code changes needed — just drop in whichever file you have.

The MP4 path is always the JPG path with the extension swapped (e.g. `preschool.jpg` ↔ `preschool.mp4`). The reel section is the only exception: its videos and posters have separate filenames (`01-before-the-bell.mp4` and `01-before-the-bell-poster.jpg`).

## Layout

```
assets/
├── brand/
│   └── logo.png                      Site logo (favicon + nav)
├── home/
│   ├── hero/
│   │   ├── hero-1.mp4                Looping hero background video (primary)
│   │   ├── hero-2.mp4                Hero video fallback (browsers that don't play hero-1)
│   │   └── hero-poster.jpg           Still shown before the hero video loads
│   ├── levels/
│   │   ├── preschool.jpg             Level card — Preschool
│   │   ├── primary.jpg               Level card — Primary
│   │   ├── junior-high.jpg           Level card — Junior High
│   │   └── senior-high.jpg           Level card — Senior High
│   └── reel/                         "Life at Neo" video carousel (5 slides)
│       ├── 01-before-the-bell.mp4
│       ├── 01-before-the-bell-poster.jpg
│       ├── 02-recess.mp4
│       ├── 02-recess-poster.jpg
│       ├── 03-jump-rope-fridays.mp4
│       ├── 03-jump-rope-fridays-poster.jpg
│       ├── 04-between-classes.mp4
│       ├── 04-between-classes-poster.jpg
│       ├── 05-going-home.mp4
│       └── 05-going-home-poster.jpg
├── preschool/
│   ├── hero.jpg                      Page hero background
│   ├── feature-reading.jpg           "A gentler start" section
│   ├── feature-tools.jpg             "Modern education. Modern tools." section
│   └── tiles/                        "A peek inside preschool" gallery
│       ├── 01-letter-games.jpg
│       ├── 02-art-and-making.jpg
│       ├── 03-small-groups.jpg
│       └── 04-everyday-wonder.jpg
└── primary/
    ├── hero.jpg                      Page hero background
    ├── feature-cheerful.jpg          "Curiosity then confidence" section
    ├── feature-tools.jpg             "Modern education. Modern tools." section
    └── tiles/                        "A peek inside primary" gallery
        ├── 01-classrooms.jpg
        ├── 02-friends-for-life.jpg
        ├── 03-reading-time.jpg
        └── 04-creative-labs.jpg
```

## Format & sizing tips

- **Hero & detail-hero photos:** ~1920px wide, JPG.
- **Level cards & feature photos:** ~1200–1600px wide, JPG.
- **Tile gallery photos:** ~1200px wide, JPG.
- **Reel posters:** ~1600px wide, JPG. Pick a still that matches the video's first frame.
- **Reel videos:** MP4, 1080p, ~10–20s, muted-friendly (they autoplay muted).
- **Logo:** PNG with transparent background.

## Original placeholder sources

The site previously linked to Pexels stock photos/videos. If you want to download those originals as a starting point, here's the mapping:

| File | Source URL |
|---|---|
| `home/hero/hero-1.mp4` | https://videos.pexels.com/video-files/35701199/15130881_1920_1080_30fps.mp4 |
| `home/hero/hero-2.mp4` | https://videos.pexels.com/video-files/33787984/14341199_1920_1080_30fps.mp4 |
| `home/hero/hero-poster.jpg` | https://images.pexels.com/photos/8087867/pexels-photo-8087867.jpeg |
| `home/levels/preschool.jpg` | https://images.pexels.com/photos/8466901/pexels-photo-8466901.jpeg |
| `home/levels/primary.jpg` | https://images.pexels.com/photos/35753301/pexels-photo-35753301.jpeg |
| `home/levels/junior-high.jpg` | https://images.pexels.com/photos/8500643/pexels-photo-8500643.jpeg |
| `home/levels/senior-high.jpg` | https://images.pexels.com/photos/10646610/pexels-photo-10646610.jpeg |
| `home/reel/01-before-the-bell.mp4` | https://videos.pexels.com/video-files/33787982/14341217_1920_1080_30fps.mp4 |
| `home/reel/01-before-the-bell-poster.jpg` | https://images.pexels.com/photos/8535234/pexels-photo-8535234.jpeg |
| `home/reel/02-recess.mp4` | https://videos.pexels.com/video-files/33787984/14341199_1920_1080_30fps.mp4 |
| `home/reel/02-recess-poster.jpg` | https://images.pexels.com/photos/8466901/pexels-photo-8466901.jpeg |
| `home/reel/03-jump-rope-fridays.mp4` | https://videos.pexels.com/video-files/35701199/15130881_1920_1080_30fps.mp4 |
| `home/reel/03-jump-rope-fridays-poster.jpg` | https://images.pexels.com/photos/8088232/pexels-photo-8088232.jpeg |
| `home/reel/04-between-classes.mp4` | https://videos.pexels.com/video-files/33787981/14341193_1920_1080_30fps.mp4 |
| `home/reel/04-between-classes-poster.jpg` | https://images.pexels.com/photos/8465500/pexels-photo-8465500.jpeg |
| `home/reel/05-going-home.mp4` | https://videos.pexels.com/video-files/33787983/14341227_1920_1080_30fps.mp4 |
| `home/reel/05-going-home-poster.jpg` | https://images.pexels.com/photos/8613083/pexels-photo-8613083.jpeg |
| `preschool/hero.jpg` | https://images.pexels.com/photos/8535234/pexels-photo-8535234.jpeg |
| `preschool/feature-reading.jpg` | https://images.pexels.com/photos/8466901/pexels-photo-8466901.jpeg |
| `preschool/feature-tools.jpg` | https://images.pexels.com/photos/8422126/pexels-photo-8422126.jpeg |
| `preschool/tiles/01-letter-games.jpg` | https://images.pexels.com/photos/8087867/pexels-photo-8087867.jpeg |
| `preschool/tiles/02-art-and-making.jpg` | https://images.pexels.com/photos/8613059/pexels-photo-8613059.jpeg |
| `preschool/tiles/03-small-groups.jpg` | https://images.pexels.com/photos/8535198/pexels-photo-8535198.jpeg |
| `preschool/tiles/04-everyday-wonder.jpg` | https://images.pexels.com/photos/8423008/pexels-photo-8423008.jpeg |
| `primary/hero.jpg` | https://images.pexels.com/photos/8465500/pexels-photo-8465500.jpeg |
| `primary/feature-cheerful.jpg` | https://images.pexels.com/photos/8088232/pexels-photo-8088232.jpeg |
| `primary/feature-tools.jpg` | https://images.pexels.com/photos/35753301/pexels-photo-35753301.jpeg |
| `primary/tiles/01-classrooms.jpg` | https://images.pexels.com/photos/8500643/pexels-photo-8500643.jpeg |
| `primary/tiles/02-friends-for-life.jpg` | https://images.pexels.com/photos/10646610/pexels-photo-10646610.jpeg |
| `primary/tiles/03-reading-time.jpg` | https://images.pexels.com/photos/8613083/pexels-photo-8613083.jpeg |
| `primary/tiles/04-creative-labs.jpg` | https://images.pexels.com/photos/8540376/pexels-photo-8540376.jpeg |
