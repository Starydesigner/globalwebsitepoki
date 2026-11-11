import {
  SITE,
  crossBorderHash,
  innerLocalHash,
  overseasLocalHash,
} from "@/config/sitePaths";

export interface ProductRichCardItem {
  title: string;
  description: string;
  href: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
}

export interface ProductOverseasCardItem {
  title: string;
  description: string;
  href: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
}

export interface ProductSectionConfig {
  id: string;
  headingId: string;
  title: string;
  metaLabel: string;
  lead: string;
}

export const PRODUCT_CROSS_SECTION: ProductSectionConfig = {
  id: "cross",
  headingId: "sec-cross",
  title: "跨境业务",
  metaLabel: "Cross-border",
  lead: "为电商平台、企业、个人提供跨境进出口与集运仓储服务，已覆盖全球 220 多个国家和地区。",
};

export const PRODUCT_CROSS_CARDS: ProductRichCardItem[] = [
  {
    title: "跨境出口",
    description: "为出口电商平台、企业、个人提供跨境出口寄递服务，已覆盖全球 220 多个国家及地区。",
    href: crossBorderHash("export"),
    image: "asset/images/product-cross-export-banner.jpg",
    imageWidth: 1024,
    imageHeight: 455,
  },
  {
    title: "跨境进口",
    description: "专为电商平台、企业、个人提供境外到中国内地的全链路进口产品服务。",
    href: crossBorderHash("import"),
    image: "asset/images/product-cross-import-banner.jpg",
    imageWidth: 1024,
    imageHeight: 455,
  },
  {
    title: "集运及仓储",
    description: "全球集运专线，为海外华人提供从中国转运至世界各地，可定制化、安全快捷的服务。",
    href: crossBorderHash("consolidate"),
    image: "asset/images/product-cross-consolidate-banner.jpg",
    imageWidth: 1024,
    imageHeight: 455,
  },
];

export const PRODUCT_GTM_SECTION: ProductSectionConfig = {
  id: "gtm",
  headingId: "sec-gtm",
  title: "中国港澳地区本土服务",
  metaLabel: "HK · MO",
  lead: "为全球跨境客户提供港澳地区的本土仓储、派送服务，及进出口转运服务。",
};

export const PRODUCT_GTM_CARDS: ProductOverseasCardItem[] = [
  {
    title: "中国香港地区",
    description: "为全球跨境客户提供中国香港地区的本土仓储、派送服务，及进出口转运服务。",
    href: innerLocalHash("hk"),
    image: "asset/images/product-gtm-hongkong.jpg",
    imageWidth: 800,
    imageHeight: 600,
  },
  {
    title: "中国澳门地区",
    description: "为全球跨境客户提供中国澳门地区的本土仓储、派送服务，及进出口转运服务。",
    href: innerLocalHash("mo"),
    image: "asset/images/product-gtm-macau.jpg",
    imageWidth: 800,
    imageHeight: 600,
  },
];

export const PRODUCT_OVERSEAS_SECTION: ProductSectionConfig = {
  id: "overseas",
  headingId: "sec-overseas",
  title: "海外本土服务",
  metaLabel: "Local delivery",
  lead: "在亚洲 7 国、非洲 5 国布局本土运输网络，定制化、安全、快捷。",
};

export const PRODUCT_OVERSEAS_CARDS: ProductOverseasCardItem[] = [
  {
    title: "亚洲",
    description: "已在东盟 7 国、韩国布局本土运输网络。",
    href: overseasLocalHash("asia"),
    image: "asset/images/product-overseas-asia-cover.png",
    imageWidth: 800,
    imageHeight: 600,
  },
  {
    title: "非洲",
    description: "已在非洲 9 国布局本土运输网络。",
    href: overseasLocalHash("africa"),
    image: "asset/images/product-overseas-africa-cover.png",
    imageWidth: 800,
    imageHeight: 600,
  },
  {
    title: "海外仓",
    description:
      "专为跨境电商打造的海外仓一件代发与仓储配送服务，智能平台全链路可视，订单当天出库，覆盖亚太、欧美等多国仓网。",
    href: overseasLocalHash("warehouse"),
    image: "asset/images/product-overseas-warehouse-cover.png",
    imageWidth: 571,
    imageHeight: 380,
  },
];

// 供锚点跳转（首页产品区）
export const PRODUCTS_PAGE = SITE.products;
