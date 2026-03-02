import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("png");
Config.setCodec("h264");
Config.setConcurrency(4);
Config.setEntryPoint("./src/index.ts");
