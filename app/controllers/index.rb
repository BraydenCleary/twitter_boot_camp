get '/' do
  erb :root
end

post '/:username' do
  @user = TwitterUser.find_or_create_by_username(params[:username])
  @user.fetch_tweets!
  @tweets = @user.tweets.limit(10)
  sleep(3)
  erb :index, :layout => false
end
