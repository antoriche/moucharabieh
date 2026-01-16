# Configuration Notes

## Video Requirements

- **Format**: MP4 (H.264 codec recommended)
- **Resolution**: 1920x1080 minimum (4K recommended for large screens)
- **Duration**: 30-60 seconds ideal for smooth scrolling experience
- **Optimization**: Compress video to reduce file size while maintaining quality
- **Location**: Place video in `/public/assets/video.mp4`

## Content Customization

### Adding/Removing Sections

Edit the `sections` array in `/src/components/ScrollytellingView.vue`:

```javascript
const sections = [
  {
    title: "Section Title",
    paragraphs: [
      "First paragraph",
      "Second paragraph"
    ]
  }
]
```

Each section creates a full-height viewport section that fades in/out during scroll.

### Adjusting Scroll Length

The total scroll height is controlled by `min-height: 500vh` in `.content-sections`. 
Adjust this value based on:
- Number of sections
- Video duration
- Desired pacing

Formula: `(number of sections + 1) * 100vh`

### Color Scheme

Edit CSS variables in `/src/style.css`:

```css
:root {
  --color-primary: #8B4513;      /* Main brand color */
  --color-secondary: #D2691E;    /* Secondary accent */
  --color-accent: #CD853F;       /* Hover states */
  --color-text-dark: #2C1810;    /* Body text */
  --color-text-light: #F5F5DC;   /* Light text on dark bg */
}
```

### Typography

Change font family in `:root`:

```css
--font-primary: 'Your Font', serif;
```

Remember to import custom fonts in `index.html` if using web fonts.

## Performance Tuning

### Video Optimization

```bash
# Using ffmpeg to compress video
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k output.mp4
```

### Scroll Throttling

Adjust the video update threshold in ScrollytellingView.vue:

```javascript
// Only update if difference > 0.1 seconds
if (Math.abs(video.currentTime - targetTime) > 0.1) {
  video.currentTime = targetTime
}
```

Lower values = smoother but more CPU intensive
Higher values = more performant but less smooth

### Section Visibility

Adjust the visibility threshold:

```javascript
const threshold = window.innerHeight * 0.4  // 40% of viewport height
```

Larger threshold = sections visible for longer
Smaller threshold = sections appear/disappear more quickly

## Deployment Considerations

### Environment Variables

For production, you may want to configure:
- CDN URL for video assets
- Analytics tracking IDs
- Contact form endpoints

### Build Optimization

The production build is optimized by default, but you can further customize in `vite.config.js`:

```javascript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code if needed
        }
      }
    }
  }
})
```

### SEO

Add meta tags in `index.html`:
- Open Graph tags for social sharing
- Twitter Card meta
- Structured data (JSON-LD) for business information

## Browser Testing

Test on:
- Mobile devices (iOS Safari, Chrome Mobile)
- Tablets (iPad Safari, Android Chrome)
- Desktop browsers (Chrome, Firefox, Safari, Edge)

Pay special attention to:
- Video autoplay policies (requires muted attribute)
- Backdrop filter support (fallback included)
- Smooth scrolling behavior
- Touch scrolling performance

## Accessibility Checklist

- [ ] Keyboard navigation works
- [ ] Screen reader announces content properly
- [ ] Sufficient color contrast (WCAG AA minimum)
- [ ] Reduced motion respected
- [ ] Focus indicators visible
- [ ] Alt text for images (if added)
- [ ] Proper heading hierarchy

## Future Enhancements

Consider adding:
- Multiple language support (NL, EN)
- Contact form with backend
- Image gallery with lightbox
- Customer testimonials section
- Interactive configurator
- Google Maps integration for showroom
- Blog/news section
- Instagram feed integration
