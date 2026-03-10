#!/usr/bin/env bash
# Pre-deploy validation for Kubernetes deployment.
# Usage: ./scripts/validate.sh [dev|staging|prod]
# Exit: 0 if valid, 1 if invalid

set -e

ENV="${1:-dev}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Find project root (contains deploy/ or package.json)
find_project_root() {
  local dir="$SCRIPT_DIR"
  while [ "$dir" != "/" ]; do
    [ -d "$dir/deploy" ] && echo "$dir" && return
    [ -f "$dir/package.json" ] && echo "$dir" && return
    dir="$(dirname "$dir")"
  done
  echo "$SCRIPT_DIR"
}
PROJECT_ROOT="$(find_project_root)"
DEPLOY_DIR="$PROJECT_ROOT/deploy"
ENV_DIR="$DEPLOY_DIR/env/$ENV"

echo "Validating deployment for environment: $ENV"

# 1. Check deploy structure exists
if [ ! -d "$DEPLOY_DIR" ]; then
  echo "ERROR: deploy/ directory not found at $DEPLOY_DIR"
  exit 1
fi

if [ ! -d "$ENV_DIR" ]; then
  echo "ERROR: Environment config not found: deploy/env/$ENV/"
  exit 1
fi

# 2. Validate manifests with kubectl dry-run (if kubectl available)
if command -v kubectl &> /dev/null; then
  if [ -d "$DEPLOY_DIR/base" ] && [ -f "$DEPLOY_DIR/base/kustomization.yaml" ]; then
    if command -v kustomize &> /dev/null || kubectl kustomize --help &> /dev/null 2>&1; then
      kubectl kustomize "$ENV_DIR" | kubectl apply --dry-run=client -f - > /dev/null 2>&1 || {
        echo "ERROR: Kubernetes manifest validation failed"
        exit 1
      }
      echo "  ✓ Manifests valid"
    fi
  fi
else
  echo "  ⚠ kubectl not found, skipping manifest validation"
fi

# 3. Prod: warn if using 'latest' tag
if [ "$ENV" = "prod" ]; then
  if grep -r "latest" "$ENV_DIR" 2>/dev/null | grep -v "^#" | grep -q .; then
    echo "WARNING: 'latest' image tag detected in prod config. Use explicit version tags."
  fi
fi

echo "Validation passed for $ENV"
exit 0
