# ShallWeMove

Record your hiking memories on the Sui blockchain.

## Features
- Upload hiking photos & GPX tracks
- Automatic data extraction from GPX files
- Permanent blockchain records via Sui Network
- Watermarked image generation with hiking data

## Tech Stack
- Frontend: React, TypeScript, Material-UI
- Blockchain: Sui Network
- Storage: AWS S3
- File Processing: GPX Parser

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_AWS_S3_BUCKET=your_s3_bucket
VITE_AWS_REGION=your_aws_region
```

3. Run development server:
```bash
npm run dev
```

## Live Demo
https://shallwemove.walrus.site

## Example NFT
https://suiscan.xyz/testnet/object/[object_id]/fields