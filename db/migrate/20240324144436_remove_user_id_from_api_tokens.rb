class RemoveUserIdFromApiTokens < ActiveRecord::Migration[7.1]
  def change
    remove_column :api_tokens, :user_id, :integer
  end
end
