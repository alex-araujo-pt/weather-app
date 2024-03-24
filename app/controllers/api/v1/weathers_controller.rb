module Api::V1
  class WeathersController < ApplicationController
    def index
      return render json: { error: 'Location is required' }, status: :bad_request if params[:location].blank?
      
      location = params[:location]&.downcase
      cache_weather = Weather.find_by(location:)

      current_weather = if cache_weather&.updated_at&. > 30.minutes.ago
                          cache_weather.weather_data
                        else
                          fetch_and_update_weather_data(cache_weather, location)
                        end
                        
      return render json: current_weather if current_weather["error"].blank?

      render json: current_weather, status: :bad_request if current_weather["error"].present?
    end

    private

    def fetch_and_update_weather_data(cache_weather, location)
      current_weather = WeatherService.new(location).fetch_current_weather()
      return { error: current_weather["error"]["info"]} if current_weather["error"].present?

      if cache_weather.present?
        cache_weather.update(weather_data: current_weather)
      else
        Weather.create(location: location, weather_data: current_weather)
      end
      current_weather
    end
  end
end
