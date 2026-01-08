import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Extract all routes from App.tsx
 * Parses the React Router routes and returns an array of path strings
 */
function extractRoutes() {
  const appTsxPath = path.join(__dirname, 'src', 'App.tsx');
  const content = fs.readFileSync(appTsxPath, 'utf-8');
  
  // Find all <Route path="..." /> declarations
  const routeRegex = /<Route\s+path="([^"]+)"/g;
  const routes = [];
  let match;
  
  while ((match = routeRegex.exec(content)) !== null) {
    const routePath = match[1];
    
    // Skip wildcard routes and routes with parameters
    if (!routePath.includes('*') && !routePath.includes(':')) {
      routes.push(routePath);
    }
  }
  
  // Remove duplicates and sort
  const uniqueRoutes = [...new Set(routes)].sort();
  
  console.log(`Found ${uniqueRoutes.length} routes to prerender:`);
  uniqueRoutes.forEach(route => console.log(`  - ${route}`));
  
  return uniqueRoutes;
}

// Export routes for use in prerender script
const routes = extractRoutes();

// Write to a JSON file for the prerender script to use
fs.writeFileSync(
  path.join(__dirname, 'routes.json'),
  JSON.stringify(routes, null, 2),
  'utf-8'
);

console.log('\n✅ Routes extracted and saved to routes.json');

export default routes;
