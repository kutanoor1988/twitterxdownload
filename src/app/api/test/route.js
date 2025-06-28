import dbConnect from '@/lib/db';
import Tweets from '@/lib/models/tweets';

export async function GET(request) {
    await dbConnect();
    const tweets = await Tweets.find()
        .sort({ create_at: 1 })
        .limit(500);
    
    const tweetIds = tweets.map(tweet => tweet._id);
    
    await Tweets.updateMany(
        { _id: { $in: tweetIds } },
        { $set: { is_hidden: 0 } }
    );

    return Response.json({ message: 'success' });
}