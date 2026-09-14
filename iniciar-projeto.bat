@echo off
title Servidor de Desenvolvimento Universal
color 0A

:: Garante que o terminal sempre navegue para a pasta onde o arquivo .bat esta localizado
cd /d "%~dp0"

echo ======================================================
echo   INICIADOR UNIVERSAL DE PROJETOS WEB
echo   Pasta atual: %CD%
echo ======================================================
echo.

:: 1. Verifica se existe package.json na pasta
if not exist "package.json" (
    echo [ERRO] Nenhum arquivo package.json foi encontrado nesta pasta!
    echo Copie este arquivo .bat para dentro da pasta raiz do seu projeto web.
    echo.
    pause
    exit /b
)

:: 2. Se nao existir a pasta node_modules, instala as dependencias automaticamente
if not exist "node_modules\" (
    echo [!] Pasta node_modules nao encontrada. Instalando dependencias automaticamente...
    call npm install
    echo.
)

echo [>] Iniciando o servidor de desenvolvimento Next.js...
echo.

:: 3. Roda o comando npm run dev
call npm run dev

:: Se npm run dev falhar ou nao existir, tenta npm start
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [!] 'npm run dev' nao encontrado, tentando 'npm start'...
    call npm start
)

pause
