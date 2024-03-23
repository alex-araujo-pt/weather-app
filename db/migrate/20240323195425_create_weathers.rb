class CreateWeathers < ActiveRecord::Migration[7.1]
  def change
    create_table :weathers do |t|
      t.string :location, null: false
      
      t.timestamps
    end
    add_index :weathers, :location, unique: true
  end
end
