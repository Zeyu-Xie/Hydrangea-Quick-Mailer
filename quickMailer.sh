cd "$(dirname "$0")"

if [ "$1" = "" ]; then
    echo Starting
    node server.js
else
    if [ "$1" = "install" ]; then
        if [ "$2" = "" ]; then
            echo Installing
            npm install
        else
            echo Wrong Parameter
            exit 1
        fi
    else
        echo Wrong Parameter
        exit 1
    fi
fi
