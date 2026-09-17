.PHONY: help dev build clean serve new draft production install

# Default target
help:
	@echo "Available targets:"
	@echo "  make dev         - Start Hugo development server with drafts"
	@echo "  make serve       - Start Hugo development server without drafts"
	@echo "  make build       - Build the site for production"
	@echo "  make production  - Build site for production (alias for build)"
	@echo "  make clean       - Remove generated files"
	@echo "  make draft       - Create a new draft post (requires TITLE and optionally DATE)"
	@echo "  make new         - Create a new post (requires TITLE and optionally DATE)"
	@echo "  make install     - Install/update Hugo dependencies"

# Start development server with drafts
dev:
	hugo server -D

# Start development server without drafts
serve:
	hugo server

# Build the site
build:
	hugo

# Build for production
production: build

# Clean generated files
clean:
	rm -rf public/ resources/_gen/

# Create a new post
# Usage: make new TITLE="My Post Title" [DATE="2026-01-15"]
new:
	@if [ -z "$(TITLE)" ]; then \
		echo "Error: TITLE is required. Usage: make new TITLE=\"Your Post Title\""; \
		exit 1; \
	fi
	@YEAR=$$(date +%Y); \
	MONTH=$$(date +%m); \
	if [ -n "$(DATE)" ]; then \
		YEAR=$$(echo $(DATE) | cut -d'-' -f1); \
		MONTH=$$(echo $(DATE) | cut -d'-' -f2); \
	fi; \
	SLUG=$$(echo "$(TITLE)" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/[^a-z0-9-]//g'); \
	hugo new "posts/$$YEAR/$$MONTH/$$SLUG.md"

# Create a new draft post
# Usage: make draft TITLE="My Draft Title"
draft:
	@$(MAKE) new TITLE="$(TITLE)" DATE="$(DATE)"
	@echo "Note: Post created as draft. Edit the file and set draft: false when ready to publish."

# Install or update Hugo theme submodules
install:
	@if [ -d ".git" ]; then \
		git submodule update --init --recursive; \
		echo "Hugo theme dependencies updated"; \
	else \
		echo "Not a git repository, skipping submodule update"; \
	fi
