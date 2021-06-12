class UserMailer < ApplicationMailer
  default from: 'no-reply@khmerlang.com'

  def reset_password_instructions(user, token)
    @user = user
    @token = token
    @reset_password_link = "http://localhost:3030/reset-password/#{token}"
    mail(to: @user.email, subject: 'Reset password instruction!')
  end

  def password_change(user, opts={})
    @user = user
    mail(to: user.email, subject: "Password Changed")
  end
end
