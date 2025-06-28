import mongoose from 'mongoose';

const tweetsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  screen_name: { type: String, required: true },
  profile_image: { type: String, required: true },
  tweet_id: { type: String, required: true, unique: true },
  tweet_text: { type: String },
  tweet_media: { type: String },
  tweet_threadscount: { type: Number },
  tweet_data: { type: String, required: true },
  is_hidden: { type: Number, default: 1 },
  post_at: { type: Date , default: Date.now },
  created_at: { type: Date, default: Date.now }
},{
    autoIndex: true
});

tweetsSchema.index({ screen_name: 1 });
tweetsSchema.index({ name: 1 });
tweetsSchema.index({ tweet_text: 1 });
tweetsSchema.index({ tweet_media: 1 });
tweetsSchema.index({ created_at: -1 });
tweetsSchema.index({ post_at: -1 });
tweetsSchema.index({ is_hidden: 1 });

// mongoose.models.Tweet 用于检查该模型是否已经在Mongoose中注册过
// 如果已注册则直接使用已有模型,避免重复注册导致的报错
// 第一个参数'Tweet'是Mongoose中的模型名称(用于代码中引用)
// 第三个参数'txd_tweets'指定MongoDB中实际的集合名称
export default mongoose.models.Tweets || mongoose.model('Tweets', tweetsSchema, 'txd_tweets');