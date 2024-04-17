import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "src/services/neph-java-spec.yaml",
  apiFile: "src/services/apiServices",
  apiImport: "apiSlice",
  outputFile: "src/services/generated.ts",
  exportName: "TestJavaApi",
  hooks: true,
  tag: true,
};

export default config;
