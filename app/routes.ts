import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("layouts/sidebar.tsx", [
    index("routes/home/home.tsx"),
    route("contacts/:contactId", "routes/contact/contact.tsx"),
  ]),
  route("/about", "routes/about/about.tsx"),
] satisfies RouteConfig;
