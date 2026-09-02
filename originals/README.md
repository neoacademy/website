# Original source images

Full-resolution, unedited photos, kept here for creating future variants
(different crops, sizes, or quality settings). Nothing in this folder is
referenced by the site — `assets/` holds the resized/compressed WebP
versions actually served on the pages.

To generate a new variant, resize/compress from the file here into
`assets/<same path>/<name>.webp`, e.g.:

```bash
cwebp -q 90 -resize 2560 0 originals/home/hero/hero-desktop.jpg -o assets/home/hero/hero-desktop.webp
```
