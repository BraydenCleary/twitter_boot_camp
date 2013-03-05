class Tweet < ActiveRecord::Base
  belongs_to :twitter_user

  validates :content, :presence => true, :uniqueness => { :case_sensitive => false }
end
