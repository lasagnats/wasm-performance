#!/usr/bin/env bash

emcc --bind -Oz julia.cc -o julia.js \
-s WASM=1 -s NO_EXIT_RUNTIME=1 -s "EXPORTED_RUNTIME_METHODS=['addOnPostRun']" \
|| exit 1