class Api::TripsController < ApplicationController
  before_action :require_logged_in, :get_user_and_check_user_permission

  def index
    @trips = Trip.where(:user_id => params[:user_id])

    render :index
  end

  def create
    @trip = Trip.new(trip_params.merge({:user_id => params[:user_id]}))
    if @trip.save
      render :show
    else
      render json: @trip.errors.full_messages, status: 422
    end
  end

  def show
    @trip = Trip.find(params[:id])
  end

  def update
    @trip = Trip.find(params[:id])
    if @trip
      if @trip.update(trip_params)
        render :show
      else
        render json: @trip.errors.full_messages, status: 422
      end
    else
      render json: { message: 'not found', status: 404 }
    end
  end

  def destroy
    @trip = Trip.find(params[:id])
    @trip.destroy

    head :no_content
  end

  private

  def trip_params
    params.require(:trip).permit(
      :destination,
      :comment,
      :start_date,
      :end_date,
    )
  end
end
