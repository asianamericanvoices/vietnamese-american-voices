# Video Assets Directory

This directory is for storing video files for the Video Highlights feature on event hub pages.

## File Naming Convention
- Use lowercase with hyphens: `event-name-video-type.mp4`
- Example: `pa-supreme-court-summary.mp4`

## Supported Formats
- MP4 (recommended - best browser compatibility)
- WebM (alternative for smaller file sizes)

## Recommended Specifications
- **Resolution**: 1920x1080 (1080p) or 1280x720 (720p)
- **Bitrate**: 2-5 Mbps for 1080p, 1-2 Mbps for 720p
- **Duration**: 30 seconds to 3 minutes (short-form content)
- **Codec**: H.264 for MP4, VP9 for WebM

## Compression Tips
Use FFmpeg to compress videos:
```bash
ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 23 -c:a aac -b:a 128k output.mp4
```

## Thumbnail Generation
Thumbnails should be:
- 16:9 aspect ratio
- 1280x720 minimum resolution
- JPEG or WebP format
- Named: `video-name-thumb.jpg`

## Usage
Videos in this folder can be referenced in the VideoHighlights component:
```javascript
{
  videoUrl: '/videos/pa-supreme-court-summary.mp4',
  thumbnailUrl: '/videos/pa-supreme-court-thumb.jpg',
  duration: 147, // in seconds
  // ... other metadata
}
```

## Important Notes
- Keep file sizes under 50MB for optimal loading
- Consider using a CDN for production deployment
- Add videos to .gitignore if they're too large for Git