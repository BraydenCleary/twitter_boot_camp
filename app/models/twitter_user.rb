class TwitterUser < ActiveRecord::Base
  has_many :tweets

  before_save { self.username.gsub!(/@/, "") }

  def fetch_tweets!
    refresh_tweets if tweets_stale?(self.tweet_frequency)
    self.tweets
  end

  private

  def tweets_stale?(num_minutes = 15)
    return true unless self.last_api_call
    num_minutes.minutes.ago >= self.last_api_call
  end

  def refresh_tweets
    Twitter.user_timeline(self.username).map do |tweet|
      self.tweets.create(:content => tweet.text, :tweeted_at => tweet.created_at)
    end
    self.update_attributes(:last_api_call => DateTime.now,
                           :tweet_frequency => average_frequency)
  end

  def average_frequency
    ordered_tweets = Tweet.where(:twitter_user_id => self.id).order(:created_at)
    seconds = (ordered_tweets.first.tweeted_at - 
               ordered_tweets.last.tweeted_at) / ordered_tweets.count
    (seconds / 1.minute).to_i
  end
end
