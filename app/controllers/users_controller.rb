class UsersController < ApplicationController
  before_action :authorized, only: [:my_account, :update_profile, :update_pasword]

  def my_account
    render json: {
      user: UserSerializer.new(current_user)
    }
  end

  def update_profile
    user = current_user
    if user.update profile_params
      render json: {
        user: UserSerializer.new(user)
      }
    else
      render json: {errors: user.errors}, status: :unprocessable_entity
    end
  end

  def update_pasword
    user = current_user
    if user && user.authenticate(params[:current_password])
      if user.update password: params[:password]
        render json: {success: true}
      else
        render json: {errors: user.errors}, status: :unprocessable_entity
      end
    else
      render json: {errors: {current_password: "not match"}}, status: :unprocessable_entity
    end
  end

  private

  def profile_params
    params.require(:user).permit(:name)
  end
end
