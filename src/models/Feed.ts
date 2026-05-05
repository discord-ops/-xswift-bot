 Date;
}

const FilterSchema = new Schema<IFilter>({
  keywords: [{ type: String }],
  excludeKeywords: [{ type: String }],
  onlyWithMedia: { type: Boolean, default: false },
  onlyOriginal: { type: Boolean, default: false },
  onlyRetweets: { type: Boolean, default: false },
  onlyReplies: { type: Boolean, default: false },
  minLikes: { type: Number, default: 0 },
  minRetweets: { type: Number, default: 0 },
  language: { type: String },
}, { _id: false });

const FeedSchema = new Schema<IFeed>(
  {
    guildId: { type: String, required: true, index: true },
    channelId: { type: String, required: true },
    webhookId: { type: String, required: true },
    webhookToken: { type: String, required: true },
    twitterUserId: { type: String, required: true, index: true },
    twitterUsername: { type: String, required: true },
    displayName: { type: String, required: true },
    profileImageUrl: { type: String },
    pingRole: { type: String },
    filter: { type: FilterSchema, default: () => ({}) },
    reactionsEnabled: { type: Boolean, default: true },
    lastTweetId: { type: String },
    lastCheckedAt: { type: Date },
    isActive: { type: Boolean, default: true, index: true },
    errorCount: { type: Number, default: 0 },
    lastError: { type: String },
    customMessage: { type: String },
    embedColor: { type: String, default: '#1DA1F2' },
    showStats: { type: Boolean, default: true },
  },
  { timestamps: true }
);

FeedSchema.index({ guildId: 1, twitterUsername: 1, channelId: 1 }, { unique: true });
FeedSchema.index({ isActive: 1, lastCheckedAt: 1 });

export const Feed = model<IFeed>('Feed', FeedSchema);
