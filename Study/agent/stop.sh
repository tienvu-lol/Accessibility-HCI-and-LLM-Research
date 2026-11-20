#!/usr/bin/env bash
cd "$(dirname "$0")" && docker compose --profile arc --profile arc-a7 down
