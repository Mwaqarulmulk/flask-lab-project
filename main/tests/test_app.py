import sys
import os
import pytest

# Ensure main is discoverable
ROOT = os.path.dirname(os.path.dirname(__file__))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from app import app


def test_home():
    resp = app.test_client().get("/")
    assert resp.status_code == 200


def test_health():
    resp = app.test_client().get("/health")
    assert resp.status_code == 200
    assert b"OK" in resp.data


def test_post_data():
    resp = app.test_client().post("/data", json={"x": 1})
    assert resp.status_code == 200
    assert b"received" in resp.data
