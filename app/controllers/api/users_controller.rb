class Api::UsersController < ApplicationController
  before_action :require_manager_level, only: [:index]
  before_action :get_user_and_check_user_permission, :filter_role_parameter, only: [:show, :update, :destroy]

  def index
    @users = User.all
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    render :show
  end

  def update
    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
    if @user.destroy
      head :no_content
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :role)
  end

  def filter_role_parameter
    if !current_user.is_admin? && !current_user.is_manager? && !params[:user][:role].blank?
      params[:user][:role] = nil
    end
  end
end
