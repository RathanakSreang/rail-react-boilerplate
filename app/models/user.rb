class User < ApplicationRecord
  enum plan: [:free, :standard, :organization]
  has_many :user_refresh_tokens, dependent: :destroy

  validates :name, presence: true, length: { maximum: 80 }
  validates :email, presence: true, 'valid_email_2/email': true, length: { maximum: 255 }
  validates_uniqueness_of :email
  validates :password, length: {minimum: 8, maximum: 120}, on: :update, allow_blank: true
  has_secure_password

  before_update :send_change_password_notification

  def generate_auth(uuid = '')
    token = JWT.encode({
      user_id: self.id,
      plan: self.plan,
      uuid: uuid,
      exp: exp = (Time.now + 1.days).to_i
    }, 'rathanakAwesome')
    user_refresh_token = self.user_refresh_tokens.create
    {
      refresh_token: user_refresh_token.refresh_token,
      token: token
    }
  end

  def send_change_password_notification
    if self.password_digest_changed?
      UserMailer.password_change(self).deliver_later
    end
  end

  def send_reset_password_instructions
    self.reset_password_token = loop do
      random_token = SecureRandom.urlsafe_base64(30, false)
      break random_token unless User.exists?(reset_password_token: random_token)
    end
    self.reset_password_sent_at = Time.now + 7.days
    self.save
    UserMailer.reset_password_instructions(self, self.reset_password_token).deliver_later
  end

  def self.with_reset_password_token(token)
    user = User.where("reset_password_sent_at > ?", Time.now)
               .where(reset_password_token: token).first
    user
  end
end
