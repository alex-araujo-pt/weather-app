source "https://rubygems.org"

ruby "3.2.3"

# Rails defaults gems
gem "rails", "~> 7.1.3", ">= 7.1.3.2"
gem "sprockets-rails"
gem "puma", ">= 5.0"
gem "importmap-rails"
gem "turbo-rails"
gem "stimulus-rails"
gem "jbuilder"
gem "tzinfo-data", platforms: %i[ windows jruby ]
gem "bootsnap", require: false

gem 'pg'
gem 'rack-cors', require: 'rack/cors'

group :development, :test do
  gem "debug", platforms: %i[ mri windows ]
end

group :development do
  gem "web-console"
  gem "pry-byebug", "~> 3.10"
  gem "dotenv-rails", "~> 2.8"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
end
