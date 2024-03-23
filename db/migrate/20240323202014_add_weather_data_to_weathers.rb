class AddWeatherDataToWeathers < ActiveRecord::Migration[7.1]
  def change
    add_column :weathers, :weather_data, :jsonb, null: false
  end
end
