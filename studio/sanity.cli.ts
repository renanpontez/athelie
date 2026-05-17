import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./env";

export default defineCliConfig({
  api: { projectId, dataset },
  // Pin the Sanity-hosted Studio appId so `sanity deploy` skips the prompt.
  deployment: {
    appId: "tg6i0g4mhdzecffcmf0imggs",
  },
});
