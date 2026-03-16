import path from 'path';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import { parse } from 'yaml';
import type { Express } from 'express';

/**
 * Loads OpenAPI spec from project root and configures Swagger UI.
 * Serves docs at /api-docs and spec at /api-docs/spec.json
 */
export function setupSwagger(app: Express): void {
  const specPath = path.join(__dirname, '../../openapi.yaml');
  const specContent = fs.readFileSync(specPath, 'utf8');
  const spec = parse(specContent) as swaggerUi.JsonObject;

  // Update servers for local development
  if (process.env.NODE_ENV !== 'production') {
    spec.servers = [{ url: 'http://localhost:3000/v1', description: 'Local development' }];
  }

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'To-Do App API Docs',
  }));

  app.get('/api-docs/spec.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(spec);
  });
}
