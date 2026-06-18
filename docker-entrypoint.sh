#!/bin/sh
set -e

# Process all environment variables ending with _FILE
for var in $(env | grep '_FILE=' | cut -d= -f1); do

    # Get the original variable name (strip _FILE suffix)
    target_var="${var%_FILE}"
    
    # Get the file path from the _FILE variable
    file_path=$(eval echo \$$var)
    
    if [ -f "$file_path" ]; then
        # Read the secret from the file and export as target_var
        export "$target_var"="$(cat "$file_path")"
        echo "Loaded secret for $target_var from $file_path"
        # Unset the _FILE variable to avoid leaking paths
        unset "$var"
    else
        echo "Warning: $var points to $file_path but file not found" >&2
    fi
done

# Also directly read any files in /run/secrets/ (optional, for compatibility)
# This ensures even without _FILE vars, secrets from Docker are loaded as env vars.
for secret_file in /run/secrets/*; do
    if [ -f "$secret_file" ]; then
        secret_name=$(basename "$secret_file")
        # Only set if not already set (prevents overriding)
        if [ -z "$(eval echo \$$secret_name)" ]; then
            export "$secret_name"="$(cat "$secret_file")"
            echo "Loaded secret $secret_name from $secret_file"
        fi
    fi
done

# Execute the original command (your Node.js app)
exec "$@"