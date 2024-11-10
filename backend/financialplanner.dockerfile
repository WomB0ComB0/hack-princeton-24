FROM golang:1.22.3 AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o /hackprinceton

FROM alpine:latest
WORKDIR /root/
COPY --from=builder /hackprinceton .
COPY .env .

EXPOSE 8080

CMD ["./hackprinceton"]