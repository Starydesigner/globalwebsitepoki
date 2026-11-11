/** 关于我们 · 正文（对齐测试站 aboutUs 文案） */

export const ABOUT_INTRO_PARAGRAPHS = [
  "中通快递创建于 2002 年 5 月 8 日，是一家以快递为核心业务，集国际、快运、云仓、金融、冷链、商业（兔喜生活）等生态版块于一体的综合物流服务企业。2016 年 10 月 27 日在美国纽约证券交易所上市，向全世界打开了一扇了解中国快递发展的窗口；2020 年 9 月 29 日在香港上市，成为首家同时在美国、中国香港两地上市的快递企业。",
  "中通国际是中通快递的国际窗口，自 2014 年成立以来，始终围绕中通快递「成为全球一流的综合物流服务商」的发展目标，依托强大的地面服务网络与全球资源整合能力，打造以快递为核心的综合物流体系，通过整合海外仓、海外专线、跨境电商供应链，建立「多渠道、多元化、全方位」的服务模式，推动产品国际化、服务全球化，并可提供定制化的一站式物流供应链服务。",
] as const;

export interface AboutCultureItem {
  id: string;
  title: string;
  /** 收起态底部摘要 */
  tagline: string;
  /** 展开态正文 */
  description: string;
  image: string;
  iconSrc: string;
}

/** 企业文化（中通国际原有表述） */
export const ABOUT_CULTURE_ITEMS: AboutCultureItem[] = [
  {
    id: "mission",
    title: "中通使命",
    tagline: "造就更多人的幸福",
    description: "用我们的产品，造就更多人的幸福。",
    image: "asset/images/10-21-1420.jpg",
    iconSrc: "asset/about/culture/icon-mission.svg",
  },
  {
    id: "vision",
    title: "发展愿景",
    tagline: "成为全球一流的综合物流服务商",
    description: "成为全球一流的综合物流服务商。",
    image: "asset/images/product-cross-scene.png",
    iconSrc: "asset/about/culture/icon-vision.svg",
  },
  {
    id: "values",
    title: "核心价值观",
    tagline: "成就他人，创造社会价值",
    description: "成就他人，创造社会价值。",
    image: "asset/images/product-overseas-team.png",
    iconSrc: "asset/about/culture/icon-values.svg",
  },
];

export interface AboutHistoryItem {
  year: string;
  title?: string;
  description: string;
}

/** 发展历程（中通国际） */
export const ABOUT_HISTORY_ITEMS: AboutHistoryItem[] = [
  {
    year: "2002",
    description: "5月8日，中通快递成立。",
  },
  {
    year: "2014",
    description: "8月15日，中通国际成立，迈出「中通出海」第一步。",
  },
  {
    year: "2015",
    description: "推出跨境进口保税及跨境出口法国专线业务。",
  },
  {
    year: "2016",
    description: "开通跨境出口中国台湾专线；同年与美国邮政达成战略合作。",
  },
  {
    year: "2017",
    description: "自建服务网络，韩国、柬埔寨、老挝、中国香港等地的本土业务先后落地。",
  },
  {
    year: "2018",
    description:
      "自营海外服务区域扩围，新增越南、缅甸本土网络；与土耳其航空、太平洋航空成立合资公司，助力深耕全球电商市场。",
  },
  {
    year: "2019",
    description: "泰国本土网络落地；同年与传音控股成立合资，开始发力非洲市场。",
  },
  {
    year: "2020",
    description: "泰国、马来西亚本土网络落地，东南亚自营网络趋于成熟。",
  },
  {
    year: "2021",
    description:
      "在加纳、乌干达、肯尼亚、尼日利亚及摩洛哥本土网络搭建完成；完成A+轮融资，打造中-非快递领先品牌。",
  },
];

/** 可持续发展（对齐测试站 continueAbout） */
export const ABOUT_SUSTAINABILITY_INTRO =
  "中通快递践行「绿色快递」的可持续发展理念，通过技术创新及设备升级，在包装、运输、办公等方面加快节能、环保、减排的创新应用，加强绿色快递建设，引领行业乃至社会可持续发展。（数据截止 2020 年）";

export interface AboutSustainabilityItem {
  icon: string;
  /** 悬浮态背景图 */
  hoverImage: string;
  title: string;
  /** 主指标数字 */
  metricValue: string;
  /** 主指标单位（如 万+、%） */
  metricUnit?: string;
  /** 主指标说明 */
  metricLabel: string;
  /** 底部补充说明，最多两条 */
  detailLines: string[];
}

export const ABOUT_SUSTAINABILITY_ITEMS: AboutSustainabilityItem[] = [
  {
    icon: "asset/about/sustainability/01-reusable-transit-bag.svg",
    hoverImage: "asset/about/sustainability/hover-green-mailer.jpg",
    title: "绿色循环中转袋",
    metricValue: "900",
    metricUnit: "万+",
    metricLabel: "循环中转袋投入使用",
    detailLines: ["减少产生垃圾约 8.1 万吨"],
  },
  {
    icon: "asset/about/sustainability/02-electronic-waybill.svg",
    hoverImage: "asset/about/sustainability/hover-waybill.jpg",
    title: "电子面单推广",
    metricValue: "21000",
    metricUnit: "个",
    metricLabel: "投入回收装置",
    detailLines: ["覆盖代理点 20943 个"],
  },
  {
    icon: "asset/about/sustainability/03-packaging-recycling.svg",
    hoverImage: "asset/about/sustainability/hover-green-forest.jpg",
    title: "包装废弃物回收",
    metricValue: "12-14",
    metricUnit: "m³",
    metricLabel: "电动厢货车应用",
    detailLines: ["助力「最后一公里」的绿色派送"],
  },
  {
    icon: "asset/about/sustainability/04-linehaul-optimization.svg",
    hoverImage: "asset/images/mission-panel-bg-convenient.jpg",
    title: "优化运输干线",
    metricValue: "99.93",
    metricUnit: "%",
    metricLabel: "全网使用率",
    detailLines: ["相当于减少砍伐速生桉树约 52 万"],
  },
  {
    icon: "asset/about/sustainability/05-new-energy-vehicle.svg",
    hoverImage: "asset/images/mission-panel-bg-secure.jpg",
    title: "使用新能源汽车",
    metricValue: "7900",
    metricUnit: "辆",
    metricLabel: "高运力牵引车投入",
    detailLines: ["提高能源效率，减少污染物排放"],
  },
  {
    icon: "asset/about/sustainability/06-green-channel.svg",
    hoverImage: "asset/images/mission-panel-bg-custom.jpg",
    title: "应用绿色通道",
    metricValue: "339",
    metricUnit: "套",
    metricLabel: "自动化分拣设备",
    detailLines: ["全网 94 个分拨中心上线"],
  },
];

export interface AboutSocialStory {
  image: string;
  title: string;
  /** 对应新闻中心文章 id，用于跳转详情 */
  newsArticleId: string;
  /** 轮播封面；多篇合辑稿时优先于新闻列表封面 */
  coverImage?: string;
}

export interface AboutSocialSection {
  title: string;
  metaLabel: string;
  stories: AboutSocialStory[];
}

/** 社会责任案例（对齐测试站 repoonsebilityAbout） */
export const ABOUT_SOCIAL_SECTIONS: AboutSocialSection[] = [
  {
    title: "援助灾区",
    metaLabel: "DISASTER RELIEF",
    stories: [
      {
        image: "asset/about/social/pic1@2x.png",
        title: "传递温暖 中越情谊深丨越南中通向当地受灾百姓捐赠物资",
        newsArticleId: "66",
      },
      {
        image: "asset/about/social/pic2@2x.png",
        title: "点燃希望 中柬情谊浓丨柬埔寨中通向当地受灾儿童福利院捐赠物资",
        newsArticleId: "66",
      },
      {
        image: "asset/about/social/pic3@2x.png",
        title: "老挝中通积极参与紧急援助慈善活动",
        newsArticleId: "59",
      },
    ],
  },
  {
    title: "爱心助学",
    metaLabel: "EDUCATION AID",
    stories: [
      {
        image: "asset/about/social/pic4@2x.png",
        title: "大爱无疆丨柬埔寨中通开展「送爱天使，爱心传递零距离」助学活动",
        newsArticleId: "88",
      },
      {
        image: "asset/about/social/pic4@2x.png",
        title: "「圆梦1+1」丨中通国际向偏远地区学生捐赠爱心物资",
        newsArticleId: "140",
      },
    ],
  },
  {
    title: "携手战「疫」",
    metaLabel: "FIGHT THE PANDEMIC",
    stories: [
      {
        image: "asset/about/social/pic5@2x.png",
        title: "硬核！中通国际「全球行动」，驰援国内疫情防控",
        newsArticleId: "89",
      },
      {
        image: "asset/about/social/pic6@2x.png",
        title: "心系疫情，柬埔寨中通首批物资起运！",
        newsArticleId: "90",
      },
      {
        image: "asset/about/social/pic7@2x.png",
        title: "携手齐战「疫」！中通国际携手星联航空，驰援国内共抗疫情！",
        newsArticleId: "83",
      },
      {
        image: "asset/about/social/pic8@2x.png",
        title: "缅甸捐赠 200 吨大米，中通快递快运协力驰运",
        newsArticleId: "91",
      },
    ],
  },
];

export interface AboutSocialReport {
  fileName: string;
  label: string;
}

export const ABOUT_SOCIAL_REPORTS: AboutSocialReport[] = [
  { label: "2022 社会责任报告.pdf", fileName: "中通快递集团2022社会责任报告.pdf" },
  { label: "2023 社会责任报告.pdf", fileName: "中通快递集团2023社会责任报告.pdf" },
  { label: "2024 社会责任报告.pdf", fileName: "中通快递集团2024社会责任报告.pdf" },
  { label: "2022 年 ESG 报告（英文版）.pdf", fileName: "中通快递集团2022年ESG报告（英文版）.pdf" },
  { label: "2023 年 ESG 报告（英文版）.pdf", fileName: "中通快递集团2023年ESG报告（英文版）.pdf" },
  { label: "2024 年 ESG 报告（英文版）.pdf", fileName: "中通快递集团2024年ESG报告（英文版）.pdf" },
];
