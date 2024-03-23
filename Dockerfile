# syntax = docker/dockerfile:1

# Use an official Node image to install Node.js and npm
ARG RUBY_VERSION=3.2.3
# Stage 1: Node.js and frontend build
FROM node:20.11.1 as node_base

# Install dependencies and build your frontend
WORKDIR /app/frontend
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend/ ./
RUN npm run build

FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim as base
WORKDIR /rails

# Copy Node.js and npm from the Node image
COPY --from=node_base /usr/local/bin /usr/local/bin
COPY --from=node_base /usr/local/lib /usr/local/lib

# Rails app lives here
WORKDIR /rails

# Set production environment
ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development"


# Throw-away build stage to reduce size of final image
FROM base as build

# Install Node.js and other build dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libvips pkg-config libpq-dev \
    autoconf bison libssl-dev libyaml-dev libreadline6-dev zlib1g-dev libncurses5-dev libffi-dev libgdbm6 libgdbm-dev

# Install application gems
COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

# Copy application code
COPY . .

# Build React app
RUN cd frontend && npm install && npm run build && cd ..

# Precompile bootsnap and assets
RUN bundle exec bootsnap precompile app/ lib/ && \
    SECRET_KEY_BASE=1 ./bin/rails assets:precompile

FROM base

# Install Node.js runtime dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libsqlite3-0 libvips libpq5 && \
    # curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Copy built artifacts: gems, application, and frontend build
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /rails /rails

# Run and own only the runtime files as a non-root user for security
RUN useradd rails --create-home --shell /bin/bash && \
    chown -R rails:rails db log storage tmp
USER rails:rails

# Entrypoint prepares the database.
ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD ["./bin/rails", "server"]
