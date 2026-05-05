export const config = {
  discord: {
      token: process.env.DISCORD_TOKEN || '',
          clientId: process.env.DISCORD_CLIENT_ID || '',
              guildId: process.env.GUILD_ID || '',
                  prefix: process.env.BOT_PREFIX || 'x!',
                    },
                      mongodb: {
                          uri: process.env.MONGODB_URI || '',
                            },
                              twitter: {
                                  bearerToken: process.env.TWITTER_BEARER_TOKEN || '',
                                      apiKey: process.env.TWITTER_API_KEY || '',
                                          apiSecret: process.env.TWITTER_API_SECRET || '',
                                              accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
                                                  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET || '',
                                                    },
                                                      bot: {
                                                          nodeEnv: process.env.NODE_ENV || 'development',
                                                              port: parseInt(process.env.PORT || '3000'),
                                                                  logLevel: process.env.LOG_LEVEL || 'info',
                                                                      pollIntervalMs: parseInt(process.env.POLL_INTERVAL_MS || '60000'),
                                                                          maxFeedsPerGuild: parseInt(process.env.MAX_FEEDS_PER_GUILD || '10'),
                                                                              maxFeedsFree: parseInt(process.env.MAX_FEEDS_FREE || '3'),
                                                                                  maxFeedsPremium: parseInt(process.env.MAX_FEEDS_PREMIUM || '25'),
                                                                                    },
                                                                                      links: {
                                                                                          supportServer: process.env.SUPPORT_SERVER_URL || 'https://discord.gg/xswift',
                                                                                              inviteUrl: process.env.INVITE_URL || '',
                                                                                                  dashboardUrl: process.env.DASHBOARD_URL || 'https://xswift.up.railway.app',
                                                                                                    },
                                                                                                    };
