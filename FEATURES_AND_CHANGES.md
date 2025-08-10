# Features and Changes Since Forking from Original HakuNeko

This document summarizes the key features, optimizations, and changes made to this codebase since it was pulled from the original HakuNeko repository.

## Major New Features

- **Download All Button**: Added a button to allow users to queue all visible/filtered chapters for download at once, streamlining bulk downloads.
- **Improved Download Manager**: Enhanced the download queue system for better performance and reliability, including:
  - More robust job queueing and status tracking (queued, downloading, completed, failed).
  - Improved error handling and retry logic for failed downloads.
  - Support for sequential and concurrent media downloads, configurable via settings.
- **Bookmark Import Results**: Added a detailed results page for bookmark imports, showing which bookmarks were added, already existed, or were unsupported.

## Optimizations & Refactoring

- **Performance Improvements**: Refactored download logic to reduce redundant network requests and improve progress tracking.
- **UI/UX Enhancements**:
  - Updated styles for the download manager and bookmark manager for better clarity and usability.
  - Improved feedback for download errors and re-download options.
- **Codebase Structure**: Standardized and cleaned up the project structure for easier maintenance and navigation.

## Other Notable Changes

- **Build & Packaging Scripts**: Updated and added scripts for building and packaging the app for multiple platforms.
- **Test Structure**: Added and organized test files under `src/__tests__/` for better test coverage.
- **Project Initialization**: Migrated all files and assets to a new Git-tracked repository, with improved configuration and deployment scripts.

---
_Last updated: August 10, 2025_
