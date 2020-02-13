#!/bin/bash

pandoc \
    --from markdown+smart \
    --to=revealjs \
    --standalone \
    --no-highlight \
    --slide-level=2 \
    --template=templates/template.html \
    --variable revealjs-version="3.9.2" \
    --variable stylesheet-version="1.0.8" \
    $1/slides.md > $1/index.html
