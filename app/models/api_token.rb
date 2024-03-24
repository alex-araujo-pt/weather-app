class ApiToken < ApplicationRecord
  validates :token, presence: true, uniqueness: true
  
  before_validation :generate_unique_token

  private

  def generate_unique_token
    self.token = SecureRandom.hex(10)
  end
end
