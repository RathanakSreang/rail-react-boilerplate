class AuthController < ApplicationController
  skip_before_action :authorized

  def register
    user = User.create(user_params)
    if user.valid?
      render json: {
        user: UserSerializer.new(user),
        auth: user.generate_auth(request_uuid)
      }
    else
      render json: {error: "Invalid username or password"}
    end
  end

  def signin
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      token = encode_token({user_id: user.id})
      render json: {
        user: UserSerializer.new(user),
        auth: user.generate_auth(request_uuid)
      }
    else
      render json: {error: "Invalid email or password."}, status: :unprocessable_entity
    end
  end

  def refresh_token
    refresh_token = UserRefreshToken.find_by refresh_token: params[:refresh_token]
    if refresh_token
      user = User.find refresh_token.user_id
      token = encode_token({user_id: user.id})
      render json: {
        auth: user.generate_auth(request_uuid)
      }
    else
      render json: {error: "refresh_token_fail."}, status: :unprocessable_entity
    end
  end

  def forget_password
    user = User.where(email: params[:email]).first
    if user
      user.send_reset_password_instructions
      render json: {success: true}
    else
      render json: {errors: {email: "email_not_found"}}, status: :unprocessable_entity
    end
  end

  def reset_pasword
    user = User.with_reset_password_token(params[:token])
    unless user
      render json: {errors: {token: "token_expried"}}, status: :unprocessable_entity
      return
    end

    if user.update(password: params[:new_password], reset_password_token: nil, reset_password_sent_at: nil)
      render json: {success: true}
    else
      render json: {errors: {new_password: "invalid"}}, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:name, :password, :email)
  end
end
