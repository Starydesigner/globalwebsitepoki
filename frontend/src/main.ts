import { createApp } from "vue";
import App from "./App.vue";
import AppLink from "@/components/common/AppLink.vue";
import router from "./router";

import "@repo/css/tokens.css?v=10";
import "@repo/css/base.css?v=10";
import "@repo/css/components/field-clear.css?v=1";
import "@/styles/entry-shell.css?v=18";
import "@/styles/page-layout.css?v=10";

const app = createApp(App);
app.component("AppLink", AppLink);
app.use(router);
app.mount("#app");
