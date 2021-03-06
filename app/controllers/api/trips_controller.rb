class Api::TripsController < ApplicationController
  before_action :get_user_and_check_read_permission, only: [:index, :show]
  before_action :get_user_and_check_write_permission, only: [:create, :update, :destroy]

  def index
    @trips = Trip.where(:user_id => params[:user_id])

    render :index
  end

  def create
    if trip_params[:start_date] > trip_params[:end_date]
      render json: { message: 'start_date must be before end_date', status: 422 }
      return
    end
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
    if trip_params[:start_date] > trip_params[:end_date]
      render json: { message: 'start_date must be before end_date', status: 422 }
      return
    end
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

    render json: { message: 'delete successful'}
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
