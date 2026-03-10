#!/usr/bin/env bash
# Deploy application to Kubernetes.
# Usage: ./deploy/scripts/deploy.sh [dev|staging|prod]
# Requires: validation to pass first (run validate.sh)

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

# Run validation first
"$SCRIPT_DIR/validate.sh" "$ENV" || {
  echo "Deployment aborted: validation failed"
  exit 1
}

# Prod: require explicit confirmation
if [ "$ENV" = "prod" ]; then
  if [ "${DEPLOY_CONFIRM:-}" != "yes" ]; then
    echo "Production deployment requires DEPLOY_CONFIRM=yes"
    echo "Example: DEPLOY_CONFIRM=yes ./deploy/scripts/deploy.sh prod"
    exit 1
  fi
fi

echo "Deploying to $ENV..."

if [ ! -d "$ENV_DIR" ]; then
  echo "ERROR: deploy/env/$ENV/ not found"
  exit 1
fi

if command -v kubectl &> /dev/null; then
  kubectl kustomize "$ENV_DIR" | kubectl apply -f -
  echo "Deployment complete. Verify with: kubectl get pods -n app-$ENV"
else
  echo "ERROR: kubectl not found"
  exit 1
fi
