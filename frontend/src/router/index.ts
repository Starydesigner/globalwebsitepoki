import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { applyPageDocumentMeta, loadPageStyles } from "@/config/loadPageStyles";
import { getPageById } from "@/config/pages";
import { EXTERNAL_LINKS, LEGACY_HTML_REDIRECTS, SITE } from "@/config/sitePaths";

const appRoutes: RouteRecordRaw[] = [
  {
    path: SITE.home,
    name: "home",
    component: () => import("@/views/routes/ContentPageRoute.vue"),
    meta: { pageId: "home" },
  },
  {
    path: SITE.onlineSend,
    name: "online-send",
    component: () => import("@/views/routes/ShippingPageRoute.vue"),
    meta: { pageId: "online-send" },
  },
  {
    path: SITE.rates,
    redirect: { path: SITE.onlineSend, hash: "#rates" },
  },
  {
    path: SITE.products,
    name: "products",
    component: () => import("@/views/routes/LandingPageRoute.vue"),
    meta: { pageId: "products" },
  },
  {
    path: SITE.crossBorder,
    name: "cross-border",
    component: () => import("@/views/routes/CrossBorderPageRoute.vue"),
    meta: { pageId: "cross-border" },
  },
  {
    path: SITE.innerLocal,
    name: "inner-local",
    component: () => import("@/views/routes/LandingPageRoute.vue"),
    meta: { pageId: "inner-local" },
  },
  {
    path: SITE.overseasLocal,
    name: "overseas-local",
    component: () => import("@/views/routes/LandingPageRoute.vue"),
    meta: { pageId: "overseas-local" },
  },
  {
    path: SITE.solution,
    name: "solution",
    component: () => import("@/views/routes/LandingPageRoute.vue"),
    meta: { pageId: "solution" },
  },
  {
    path: SITE.enterpriseInquiry,
    name: "enterprise-inquiry",
    component: () => import("@/views/routes/ContentPageRoute.vue"),
    meta: { pageId: "enterprise-inquiry" },
  },
  {
    path: SITE.about,
    name: "about",
    component: () => import("@/views/routes/AboutPageRoute.vue"),
    meta: { pageId: "about" },
  },
  {
    path: SITE.techGlobal,
    name: "tech-global",
    component: () => import("@/views/routes/ContentPageRoute.vue"),
    meta: { pageId: "tech-global" },
  },
  {
    path: `${SITE.news}/:id`,
    name: "news-detail",
    component: () => import("@/views/routes/NewsDetailPageRoute.vue"),
    meta: { pageId: "news-detail" },
  },
  {
    path: SITE.news,
    name: "news",
    component: () => import("@/views/routes/NewsPageRoute.vue"),
    meta: { pageId: "news" },
  },
  {
    path: SITE.placeholder,
    name: "placeholder",
    component: () => import("@/views/routes/ContentPageRoute.vue"),
    meta: { pageId: "placeholder" },
    beforeEnter(to) {
      const nav = to.query.nav;
      if (nav === undefined || nav === "tech") {
        return { path: SITE.techGlobal, hash: to.hash };
      }
    },
  },
  {
    path: SITE.navFrameworkDemo,
    name: "nav-framework-demo",
    component: () => import("@/views/routes/ContentPageRoute.vue"),
    meta: { pageId: "nav-framework-demo" },
  },
];

const legacyRoutes: RouteRecordRaw[] = Object.entries(LEGACY_HTML_REDIRECTS).map(([path, redirect]) => ({
  path,
  redirect: (to) => ({
    path: redirect,
    query: to.query,
    hash: to.hash,
  }),
}));

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...legacyRoutes, ...appRoutes],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }
    return { top: 0 };
  },
});

router.beforeEach(async (to) => {
  if (to.path === SITE.placeholder && to.query.nav === "news") {
    return { path: SITE.news, hash: to.hash || "#news-center" };
  }
  if (to.path === SITE.placeholder && to.query.nav === "about") {
    return { path: SITE.about, hash: "#about-us" };
  }
  if (to.path === SITE.placeholder && to.query.nav === "investor") {
    window.location.assign(EXTERNAL_LINKS.investorRelations);
    return false;
  }

  const pageId = to.meta.pageId as string | undefined;
  if (pageId) {
    await loadPageStyles(pageId);
    applyPageDocumentMeta(getPageById(pageId));
  }

  return true;
});

export default router;
