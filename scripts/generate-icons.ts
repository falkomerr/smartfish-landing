import * as fs from "fs";
import * as path from "path";

interface SVGData {
  name: string;
  viewBox: string;
  content: string;
  paths: string[];
}

/**
 * Extract SVG content and metadata from an SVG file
 */
function parseSVG(filePath: string): SVGData | null {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const fileName = path.basename(filePath, ".svg");

    // Extract viewBox (try both quoted and unquoted)
    let viewBox = "0 0 24 24";
    const viewBoxMatch =
      content.match(/viewBox\s*=\s*["']([^"']+)["']/i) ||
      content.match(/viewBox\s*=\s*([^\s>]+)/i);
    if (viewBoxMatch) {
      viewBox = viewBoxMatch[1].trim();
    }

    // Extract all paths and other elements (excluding the outer svg tag)
    const innerContentMatch = content.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
    if (!innerContentMatch) {
      console.warn(`Could not parse SVG content from ${filePath}`);
      return null;
    }

    let innerContent = innerContentMatch[1].trim();

    // Clean up the content - remove extra whitespace but preserve structure
    innerContent = innerContent
      .replace(/\s+/g, " ")
      .replace(/>\s+</g, "><")
      .trim();

    // Extract individual paths for reference
    const pathMatches = innerContent.matchAll(
      /<path[^>]*d=["']([^"']+)["'][^>]*>/gi
    );
    const paths = Array.from(pathMatches, (m) => m[1]);

    return {
      name: fileName,
      viewBox,
      content: innerContent,
      paths,
    };
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return null;
  }
}

/**
 * Convert kebab-case or snake_case to PascalCase
 */
function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

/**
 * Generate React component code for an icon
 */
function generateIconComponent(svgData: SVGData): string {
  const componentName = toPascalCase(svgData.name);
  const viewBox = svgData.viewBox;
  // Use the cleaned inner content
  const innerContent = svgData.content;

  return `import { Icon, type IconProps } from "../Icon";

export interface ${componentName}IconProps extends Omit<IconProps, "children" | "viewBox"> {}

/**
 * ${componentName} icon component
 * Generated from public/svg/${svgData.name}.svg
 */
export function ${componentName}Icon(props: ${componentName}IconProps) {
  return (
    <Icon viewBox="${viewBox}" {...props}>
      ${innerContent}
    </Icon>
  );
}
`;
}

/**
 * Main function to generate all icon components
 */
function generateIcons() {
  const svgDir = path.join(process.cwd(), "public", "svg");
  const outputDir = path.join(process.cwd(), "src", "shared", "ui", "icons");

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Check if svg directory exists
  if (!fs.existsSync(svgDir)) {
    console.warn(`SVG directory not found: ${svgDir}`);
    console.log(
      "Creating empty directory. Add SVG files to public/svg/ to generate icons."
    );
    fs.mkdirSync(svgDir, { recursive: true });
    return;
  }

  // Read all SVG files
  const files = fs.readdirSync(svgDir).filter((file) => file.endsWith(".svg"));

  if (files.length === 0) {
    console.warn(`No SVG files found in ${svgDir}`);
    console.log("Add SVG files to public/svg/ to generate icons.");
    return;
  }

  console.log(`Found ${files.length} SVG file(s)`);

  const iconExports: string[] = [];
  const iconNames: string[] = [];

  // Process each SVG file
  for (const file of files) {
    const filePath = path.join(svgDir, file);
    const svgData = parseSVG(filePath);

    if (!svgData) {
      console.warn(`Skipping ${file} - could not parse`);
      continue;
    }

    const componentName = toPascalCase(svgData.name);
    const componentCode = generateIconComponent(svgData);
    const outputPath = path.join(outputDir, `${componentName}Icon.tsx`);

    // Write component file
    fs.writeFileSync(outputPath, componentCode, "utf-8");
    console.log(`✓ Generated ${componentName}Icon`);

    iconExports.push(
      `export { ${componentName}Icon, type ${componentName}IconProps } from "./${componentName}Icon";`
    );
    iconNames.push(componentName);
  }

  // Generate index file
  const indexContent = `/**
 * Auto-generated icon components
 * Generated from SVG files in public/svg/
 * 
 * To regenerate icons, run: pnpm tsx scripts/generate-icons.ts
 */

${iconExports.join("\n")}

// Export all icon names for reference
export const iconNames = [${iconNames
    .map((n) => `"${n}"`)
    .join(", ")}] as const;
export type IconName = typeof iconNames[number];
`;

  const indexPath = path.join(outputDir, "index.ts");
  fs.writeFileSync(indexPath, indexContent, "utf-8");
  console.log(`✓ Generated index.ts with ${iconNames.length} icon(s)`);
  console.log(`\n✨ Icon generation complete!`);
}

// Run the script
generateIcons();
