@echo off
echo Building HakuNeko with custom UI changes...

echo Step 1: Building web part...
node build-web.js
if %ERRORLEVEL% neq 0 goto error

echo Step 2: Applying web customizations...
node post-build-web.js
if %ERRORLEVEL% neq 0 goto error

echo Step 3: Building desktop application with customizations...
node build-app.js
if %ERRORLEVEL% neq 0 goto error

echo Build completed successfully!
goto end

:error
echo Build failed with error code %ERRORLEVEL%
exit /b %ERRORLEVEL%

:end
