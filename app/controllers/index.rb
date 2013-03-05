get '/' do
  # input username
end

get '/:username' do
  @user = TwitterUser.find_or_create_by_username(params[:username])
  @user.fetch_tweets!
  @tweets = @user.tweets.limit(10)
  erb :index
end
