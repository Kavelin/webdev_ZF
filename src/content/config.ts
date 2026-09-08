import { defineCollection, z } from 'astro:content';

/**
 * Podcast Collection Schema
 * Represents individual podcast episodes
 */
const podcastsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    episodeNumber: z.number(),
    season: z.number(),
    guestName: z.string().optional(),
    guestRole: z.string().optional(),
    guestImage: z.string().optional(),
    audioUrl: z.string(),
    duration: z.number(), // duration in seconds
    category: z.enum(['VOICE_ACTOR', 'PUBLISHER', 'CONVENTION', 'GENERAL']),
    spotifyUrl: z.string().optional(),
    applePodcastsUrl: z.string().optional(),
    youtubeUrl: z.string().optional(),
  }),
});

/**
 * Posts & Interviews Collection Schema
 * Represents blog posts, interviews, and coverage pieces
 */
const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    content: z.string(),
    pubDate: z.coerce.date(),
    author: z.string(),
    category: z.enum(['VA_INTERVIEW', 'PRESS_RELEASE', 'CONVENTION_RECAP', 'REVIEW', 'ANNOUNCEMENT']),
    coverImage: z.string().optional(),
    featured: z.boolean().default(false),
    readingTime: z.number(), // reading time in minutes
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  podcasts: podcastsCollection,
  posts: postsCollection,
};
