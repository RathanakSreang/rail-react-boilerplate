class UserRefreshToken < ApplicationRecord
  belongs_to :user

  before_create :generate_token
  before_create :set_expires_at

  default_scope {where("expires_at IS NULL or expires_at > '#{Time.now}'")}

  def generate_token
    self.refresh_token = loop do
      random_token = SecureRandom.urlsafe_base64(30, false)
      break random_token unless UserRefreshToken.exists?(refresh_token: random_token)
    end
  end

  def set_expires_at
    unless self.expires_at
      self.expires_at = Time.now + 60.days
    end
  end
end
