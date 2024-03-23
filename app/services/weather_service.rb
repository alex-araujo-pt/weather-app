require 'net/http'
require 'uri'
require 'json'

class WeatherService
  API_BASE_URL = ENV.fetch('WEATHER_API_BASE_URL', nil).freeze
  ACCESS_KEY = ENV.fetch('WEATHER_API_ACCESS_KEY', nil).freeze

  def self.fetch_current_weather(location)
    uri = URI(API_BASE_URL)
    uri.query = URI.encode_www_form(access_key: ACCESS_KEY, query: location)

    response = Net::HTTP.get_response(uri)
    
    return {} unless response.is_a?(Net::HTTPSuccess)
    
    JSON.parse(response.body)
  rescue StandardError => e
    Rails.logger.error "WeatherService encountered an error: #{e.message}"
    {}
  end
end
