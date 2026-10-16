"""Chromium launch with documented fallbacks.

Order: (1) env UIREPAIRGYM_CHROMIUM_PATH, (2) Playwright default launch,
(3) glob /opt/pw-browsers/chromium-*/chrome-linux/chrome (default launch fails in
environments where Playwright's expected build revision is absent).
"""
from __future__ import annotations
import glob
import os
from typing import Optional

CHROMIUM_ARGS = ["--no-sandbox", "--disable-dev-shm-usage"]


def find_chromium() -> Optional[str]:
    """Return the explicitly configured executable path, else None."""
    return os.environ.get("UIREPAIRGYM_CHROMIUM_PATH") or None


def _glob_fallback() -> Optional[str]:
    hits = sorted(glob.glob("/opt/pw-browsers/chromium-*/chrome-linux/chrome"))
    return hits[-1] if hits else None


def launch_chromium(playwright):
    """Launch headless Chromium via a sync Playwright instance; raises RuntimeError if impossible."""
    errors = []
    env = find_chromium()
    if env:
        try:
            return playwright.chromium.launch(executable_path=env, headless=True, args=CHROMIUM_ARGS)
        except Exception as e:  # noqa: BLE001
            errors.append(f"UIREPAIRGYM_CHROMIUM_PATH={env}: {str(e).splitlines()[0]}")
    try:
        return playwright.chromium.launch(headless=True, args=CHROMIUM_ARGS)
    except Exception as e:  # noqa: BLE001
        errors.append(f"default launch: {str(e).splitlines()[0]}")
    fb = _glob_fallback()
    if fb:
        try:
            return playwright.chromium.launch(executable_path=fb, headless=True, args=CHROMIUM_ARGS)
        except Exception as e:  # noqa: BLE001
            errors.append(f"{fb}: {str(e).splitlines()[0]}")
    raise RuntimeError("cannot launch Chromium; tried: " + " | ".join(errors))
