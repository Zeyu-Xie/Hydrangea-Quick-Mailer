@echo off
cd /d "%~dp0"

if "%1"=="" (
    echo Starting
    node server.js
) else (
    if "%1"=="install" (
        if "%2"=="" (
            echo Installing
            npm install
        ) else (
            echo Wrong Parameter
            exit /b 0
        )
    ) else (
        echo Wrong Parameter
        exit /b 0
    )
)
