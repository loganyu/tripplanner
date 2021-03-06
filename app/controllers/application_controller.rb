class ApplicationController < ActionController::Base
  before_action :require_logged_in
  protect_from_forgery with: :exception, unless: :token_authentication?
  helper_method :current_user, :logged_in?

  private

  def current_user
    if token_authentication?
      header = request.headers['Authorization']
      header = header.split(' ').last if header
      begin
        @decoded = JsonWebToken.decode(header)
        @current_user = User.find(@decoded[:user_id])
      rescue => e
        return nil
      end
    elsif session[:session_token]
      @current_user ||= User.find_by(session_token: session[:session_token])
    else
      return nil
    end
  end

  def logged_in?
    !!current_user
  end

  def login(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
    @current_user = user
  end

  def logout
    current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def require_logged_in
    unless current_user
      render json: { base: ['invalid credentials'] }, status: 401
    end
  end

  def require_manager_level
    unless current_user.is_manager? || current_user.is_admin?
      render json: { base: ['unauthorized'] }, status: 403
    end
  end

  def get_user_and_check_read_permission
    @user = params[:user_id] ? User.find(params[:user_id]) : User.find(params[:id])
    if @user.nil?
      render json: { base: ['unprocessable entity'] }, status: 422
    else
      unless current_user.is_manager? || current_user.is_admin? || 
        current_user.id == @user.id ||
        current_user.role == User::Roles::ADMIN ||
        current_user.role == User::Roles::MANAGER
        render json: { base: ['unauthorized'] }, status: 403
      end
    end
  end

  def get_user_and_check_write_permission
    @user = params[:user_id] ? User.find(params[:user_id]) : User.find(params[:id])
    if @user.nil?
      render json: { base: ['unprocessable entity'] }, status: 422
    elsif @user.role == User::Roles::ADMIN && current_user.role != User::Roles::ADMIN
      render json: { base: ['unauthorized'] }, status: 403
    else
      unless current_user.is_manager? || current_user.is_admin? || 
        current_user.id == @user.id ||
        current_user.role == User::Roles::ADMIN ||
        current_user.role == User::Roles::MANAGER
        render json: { base: ['unauthorized'] }, status: 403
      end
    end
  end

  def token_authentication?
    return !request.headers['Authorization'].blank?
  end

  def not_found
    render json: { error: 'not_found' }
  end
end
