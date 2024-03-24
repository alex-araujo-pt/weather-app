class ApiToken < ApplicationRecord
  belongs_to :user

  validates :token, presence: true, uniqueness: true

  before_create :generate_unique_token

  private

  def generate_unique_token
    begin
      self.token = SecureRandom.hex(10) # Generates a random token
    end while self.class.exists?(token: token)
  end
end
