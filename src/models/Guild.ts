import { Schema, model, Document } from 'mongoose';

export interface IGuild extends Document {
    guildId: string;
    guildName: string;
    ownerId: string;
    isPremium: boolean;
    premiumUntil?: Date;
    maxFeeds: number;
    prefix: string;
    locale: string;
    adminRoles: string[];
    createdAt: Date;
    updatedAt: Date;
}

const GuildSchema = new Schema<IGuild>(
  {
        guildId: { type: String, required: true, unique: true, index: true },
        guildName: { type: String, required: true },
        ownerId: { type: String, required: true },
        isPremium: { type: Boolean, default: false },
        premiumUntil: { type: Date },
        maxFeeds: { type: Number, default: 3 },
        prefix: { type: String, default: 'x!' },
        locale: { type: String, default: 'en-US' },
        adminRoles: [{ type: String }],
  },
  { timestamps: true }
  );

export const Guild = model<IGuild>('Guild', GuildSchema);
