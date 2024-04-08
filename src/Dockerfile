FROM debian:12.5-slim


# Stage 1: Building the Vite application
FROM node:lts as vue
WORKDIR /client
COPY ./wi-childcare-client .
RUN npm install
RUN npm run build

# Stage 2: Building the Rust application
FROM rust:1.77 as rust
WORKDIR /api
COPY --from=vue /client/dist ./wi_childcare_api/dist
COPY ./wi_childcare_api .
RUN cargo build --release

# Stage 3: Final stage, copying the Rust binary and Vite dist folder
FROM debian:12.5-slim
RUN apt-get update && apt install -y openssl
WORKDIR /app
COPY --from=rust /api/target/release/wi_childcare_api .

ENV ROCKET_ADDRESS=0.0.0.0
# Expose any ports your application might use
EXPOSE 8000

# Set the startup command to run your binary
CMD ["./wi_childcare_api"]