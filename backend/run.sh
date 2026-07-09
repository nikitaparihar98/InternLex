#!/bin/bash

# Activate virtual environment
source .venv/bin/activate

# Start the FastAPI server
echo "Starting FastAPI backend on http://127.0.0.1:8000..."
uvicorn app.main:app --reload
