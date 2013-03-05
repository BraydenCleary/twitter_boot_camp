class AddLastApiCallColumnToTwitterUsers < ActiveRecord::Migration
  def change
    add_column :twitter_users, :last_api_call, :datetime
  end
end
