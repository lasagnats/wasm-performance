#!/usr/bin/env bash

emcc --bind -O3 julia.cc -o julia.js \
-s WASM=1 -s NO_EXIT_RUNTIME=1 -s ALLOW_MEMORY_GROWTH -s "EXPORTED_RUNTIME_METHODS=['addOnPostRun']" \
|| exit 1