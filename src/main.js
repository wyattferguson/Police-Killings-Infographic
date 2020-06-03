// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import "~/styles/styles.scss";
import DefaultLayout from "~/layouts/Default.vue";

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);

  // Add a meta tag
  head.meta.push({
    name: "keywords",
    content: "blm, black lives matter, police stats, murder stats"
  });

  // Add description
  head.meta.push({
    name: "description",
    content: "From Jan. 1, 2015 to June 2, 2020 police killed 5360 people."
  });
}
