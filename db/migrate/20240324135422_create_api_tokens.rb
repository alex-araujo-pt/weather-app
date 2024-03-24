class CreateApiTokens < ActiveRecord::Migration[7.1]
  def change
    create_table :api_tokens do |t|
      t.string :token, null: false
      t.integer :user_id

      t.timestamps
    end
    add_index :api_tokens, :token, unique: true
  end
end
