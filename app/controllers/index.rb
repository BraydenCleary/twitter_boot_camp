get '/' do
  erb :root
end

post '/users/:username' do
  @user = TwitterUser.find_or_create_by_username(params[:username])
  @user.fetch_tweets!
  @tweets = @user.tweets.limit(10).map { |tweet| tweet.content }
  sleep(3)
  erb :index, :layout => false
end

post '/keywords/:keyword' do
  @tweets = Twitter.search(params['keyword'], :count => 10, :result_type => "recent").results.map do |status|
    "#{status.from_user}: #{status.text}"
  end
  erb :index, :layout => false
end
