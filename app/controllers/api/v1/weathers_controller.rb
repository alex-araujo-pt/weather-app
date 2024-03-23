module Api::V1
  class WeathersController < ApplicationController
    def index
      render json: { result: "ok" }
    end
    
    def show
      location = params[:location] || 'New York'
      @weather = WeatherService.fetch_current_weather(location)
      
      if @weather.empty?
        render json: { error: 'Failed to fetch weather data' }, status: :service_unavailable
      else
        render json: @weather
      end
    end
  end
end
