require 'rails_helper'

RSpec.describe Weather, type: :model do
  let(:valid_attributes) { { location: 'New York', weather_data: '{ "temp": 72 }' } }

  it 'is valid with a location and weather_data' do
    weather = Weather.new(valid_attributes)
    expect(weather).to be_valid
  end

  it 'is not valid without a location' do
    weather = Weather.new(valid_attributes.merge(location: nil))
    expect(weather).not_to be_valid
    expect(weather.errors[:location]).to include("can't be blank")
  end

  it 'is not valid with a duplicate location' do
    Weather.create(valid_attributes)
    weather = Weather.new(valid_attributes)
    expect(weather).not_to be_valid
    expect(weather.errors[:location]).to include('has already been taken')
  end

  it 'is not valid without weather_data' do
    weather = Weather.new(valid_attributes.merge(weather_data: nil))
    expect(weather).not_to be_valid
    expect(weather.errors[:weather_data]).to include("can't be blank")
  end
end
