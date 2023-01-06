import fg from "fast-glob";
import fs from "fs";
import mergeContent from "./merge-content";
import { load, FAILSAFE_SCHEMA } from "js-yaml";
import path from "path";
import { HmrContext } from "vite";
import { MessageDictionary } from "./types";

const fileExtRegex = /\.lang\.(yml|yaml)$/;

export default function (
  options: Partial<{
    ignoredFolderNames: Array<string>;
    include: Array<string>;
    emitFiles: boolean;
    emitFolder: string;
  }> = {}
): any {
  const virtualModuleId = "virtual:i18n-loader";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  return {
    name: "i18n-loader",
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id: string) {
      if (id === resolvedVirtualModuleId) {
        /**
         * List of files to be processed
         */
        const files = await fg(options.include || ["./src/**/*.lang.yml", "./src/**/*.lang.yaml"], { onlyFiles: true });

        /**
         * Transformed file array
         */
        const transformed: Array<{ path: string; content: MessageDictionary }> = [];

        // Read all files and parse them
        for (const file of files) {
          const contents = fs.readFileSync(path.resolve(file), "utf-8");
          const parsed = load(contents, {
            filename: id,
            schema: FAILSAFE_SCHEMA
          }) as MessageDictionary;

          transformed.push({ path: file, content: parsed });
        }

        const merged = mergeContent(transformed, options.ignoredFolderNames);

        if (options.emitFiles) {
          const outputFolder = options.emitFolder ? `./${options.emitFolder}` : "./locales";

          try {
            if (fs.existsSync(outputFolder)) fs.rmSync(outputFolder, { recursive: true });
            fs.mkdirSync(outputFolder, { recursive: true });

            Object.entries(merged).forEach(([lang, content]) => {
              fs.writeFileSync(`${outputFolder}/${lang}.json`, JSON.stringify(content), "utf8");
            });
          } catch (err) {
            console.error(err);
          }
        }

        return `export const messages = ${JSON.stringify(merged)}`;
      }
    },
    handleHotUpdate(ctx: HmrContext) {
      // Reload the module when a lang file changes
      if (fileExtRegex.test(ctx.file)) {
        ctx.server.reloadModule(ctx.server.moduleGraph.getModuleById(resolvedVirtualModuleId));
      }
    }
  };
}
