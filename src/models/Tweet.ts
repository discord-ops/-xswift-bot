import { Schema, model, Document, Types } from 'mongoose';

export interface ITweet extends Document {
  tweetId: string;
  feedId: Types.ObjectId;
  guildId: string;
  channelId: string;
  discordMessageId?: string;
  twitterUserId: string;
  twitterUsername: string;
  text: string;
  authorName: string;
  authorAvatar?: string;
  isRetweet: boolean;
  isReply: boolean;
  isQuote: boolean;
  hasMedia: boolean;
  mediaUrls: string[];
  likeCount: number;
  retweetCount: number;
  replyCount: number;
  tweetedAt: Date;
  postedToDiscordAt?: Date;
  discordReactions: {
    likes: number;
    retweets: number;
    bookmarks: number;
  };
  createdAt: Date;
}

const TweetSchema = new Schema<ITweet>(
  {
    tweetId: { type: String, required: true, unique: true, index: true },
    feedId: { type: Schema.Types.ObjectId, ref: 'Feed', required: true },
    guildId: { type: String, required: true, index: true },
    channelId: { type: String, required: true },
    discordMessageId: { type: String, index: true },
    twitterUserId: { type: String, required: true },
    twitterUsername: { type: String, required: true },
    text: { type: String, required: true },
    authorName: { type: String, required: true },
    authorAvatar: { type: String },
    isRetweet: { type: Boolean, default: false },
    isReply: { type: Boolean, default: false },
    isQuote: { type: Boolean, default: false },
    hasMedia: { type: Boolean, default: false },
    mediaUrls: [{ type: String }],
    likeCount: { type: Number, default: 0 },
    retweetCount: { type: Number, default: 0 },
    replyCount: { type: Number, default: 0 },
    tweetedAt: { type: Date, required: true },
    postedToDiscordAt: { type: Date },
    discordReactions: {
      likes: { type: Number, default: 0 },
      retweets: { type: Number, default: 0 },
      bookmarks: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

TweetSchema.index({ guildId: 1, tweetedAt: -1 });
TweetSchema.index({ discordMessageId: 1 }, { sparse: true });

export const Tweet = model<ITweet>('Tweet', TweetSchema);
