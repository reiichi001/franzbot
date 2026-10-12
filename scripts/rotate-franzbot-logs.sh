#!/usr/bin/env bash
# Rotate Franzbot's pm2 logs at restart time.
#
# The pm2 daemon holds the log files open, so they cannot simply be renamed —
# the daemon's open file descriptor follows the rename and it would keep
# writing into the moved file. Instead each live log is copied to a
# timestamped file and the live file is truncated in place, which is safe
# against the open handle and leaves a fresh log for the restarted process.
# Run this BEFORE `pm2 restart` (see the "restart" npm script and the
# deploy/restart GitHub workflows).

set -euo pipefail

LOG_DIR="${PM2_HOME:-$HOME/.pm2}/logs"
APP="Franzbot Reborn"
STAMP="$(date +%Y%m%d-%H%M%S)"
# How many rotated logs to keep per stream, including the newest.
KEEP="${FRANZBOT_LOG_KEEP:-5}"

for stream in out error; do
	live="$LOG_DIR/$APP-$stream.log"
	# Nothing to rotate if the log does not exist yet or is empty.
	if [ ! -s "$live" ]; then
		continue
	fi

	# Copy + truncate (NOT rename, for the open-handle reason above).
	cp -p "$live" "$LOG_DIR/$APP-$stream.$STAMP.log"
	: > "$live"

	# Prune all but the newest KEEP rotated files. Timestamped names make a
	# plain glob sort chronologically, so the oldest are at the front.
	shopt -s nullglob
	rotated=("$LOG_DIR/$APP-$stream."*.log)
	shopt -u nullglob
	for ((i = 0; i < ${#rotated[@]} - KEEP; i++)); do
		rm -f -- "${rotated[$i]}"
	done
done
