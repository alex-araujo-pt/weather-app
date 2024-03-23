class Weather < ApplicationRecord
  validates :location, uniqueness: true, presence: true
  validates :weather_data, presence: true
end
