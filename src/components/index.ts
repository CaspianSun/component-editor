
import { defineAsyncComponent } from "vue";
import type { App } from "vue";

const components = import.meta.glob("./layout/**/index.vue") as Record<
  string,
  () => Promise<any>
>;

export default function install(app: App<Element>) {
  for (const [key, value] of Object.entries(components)) {
    const arr = key.split("/");
    const name = arr[arr.length - 2]
    app.component(name, defineAsyncComponent(value));
  }
}
