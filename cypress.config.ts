import { defineConfig } from "cypress";

const urls = {
  produktiv: 'https://www.iqb-studio.de',
  testServer: 'https://studio.iqb.hu-berlin.de'
}
export default defineConfig({
  e2e: {
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here

    },
    baseUrl: 'https://studio.iqb.hu-berlin.de',
    env: {
      urls
    }
  },
});
