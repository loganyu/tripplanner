class Api::TripsController < ApplicationController
  def index
    @trips = Trip.where(:user_id => )
  end

  def create
    @trip = Trip.create!(trip_params.merge({:user_id => current_user.id}))

    render :show
  end

  def show
    @trip = Trip.find(params[:id])
  end

  def update
    @trip = Trip.find(params[:id])
    if @trip
      @event.update(trip_params)
      render :show
    else
      render json: { message: 'not found', status: 404 }
    end
  end

  def destroy
    @trip = Trip.find(params[:id])
    @trip.deleted = true
    @trip.save

    render :show
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
