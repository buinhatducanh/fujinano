import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  auth: false,
  aiGateway: true,
  buckets: {
    "fujinano-media": { access: "public_read" },
  },
  branch: (branch) => {
    if (branch.isDefault) {
      return {};
    }
    if (!branch.exists) {
      return { ttl: "7d" };
    }
    return {};
  },
});
