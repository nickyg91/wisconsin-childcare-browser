# Stage 1: Building the Vue application
FROM node:lts as vue
WORKDIR /client
COPY ./wi-childcare-client .
RUN npm install
RUN npm run build

# Stage 2: Building the Rust application
FROM rust:1.77 as rust
WORKDIR /server
COPY ./wi_childcare_api .
RUN cargo build --release

# Stage 3: Final stage, copying the Rust binary and Vue dist folder
FROM debian:12.5-slim
ENV ROCKET_ADDRESS=0.0.0.0
RUN apt-get update && apt install -y openssl
WORKDIR /app
COPY --from=rust /server/target/release/wi_childcare_api .
COPY --from=vue /client/dist ./dist

# Expose the port for the application
EXPOSE 8000

# Set the startup command to run your binary
CMD ["./wi_childcare_api", "--static-dir", "./dist"]
