class Api::AuthenticationController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :require_logged_in

  def login
    @user = User.find_by_username(params[:username])
    if @user.is_password?(params[:password])
      token = JsonWebToken.encode(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"),
                     user_id: @user.id }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end

  private

  def login_params
    params.permit(:username, :password)
  end
end
