import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.APP_ENV !== 'local',
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
