class AddTweetFrequencyToTwitterUsers < ActiveRecord::Migration
  def change
    add_column :twitter_users, :tweet_frequency, :integer
  end
end
