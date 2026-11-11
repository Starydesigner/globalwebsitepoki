export type HomeMessageKey =
  | "home.learnMore"
  | "home.products.title"
  | "home.products.meta"
  | "home.products.cross.aria"
  | "home.products.cross.title"
  | "home.products.cross.desc"
  | "home.products.cross.import"
  | "home.products.cross.export"
  | "home.products.cross.panelTitle"
  | "home.products.cross.import.aria"
  | "home.products.cross.export.aria"
  | "home.products.cross.import.title"
  | "home.products.cross.import.desc"
  | "home.products.cross.import.tag1"
  | "home.products.cross.import.tag2"
  | "home.products.cross.import.tag3"
  | "home.products.cross.import.tag4"
  | "home.products.cross.export.title"
  | "home.products.cross.export.desc"
  | "home.products.cross.export.tag1"
  | "home.products.cross.export.tag2"
  | "home.products.cross.export.tag3"
  | "home.products.cross.export.tag4"
  | "home.products.overseas.title"
  | "home.products.overseas.desc"
  | "home.products.overseas.asia"
  | "home.products.overseas.africa"
  | "home.products.overseas.warehouse"
  | "home.products.overseas.panelTitle"
  | "home.products.overseas.aria"
  | "home.products.overseas.asia.aria"
  | "home.products.overseas.africa.aria"
  | "home.products.overseas.warehouse.aria"
  | "home.products.overseas.asia.desc"
  | "home.products.overseas.africa.desc"
  | "home.products.overseas.warehouse.desc"
  | "home.news.title"
  | "home.news.meta"
  | "home.mission.learnMore"
  | "home.mission.eyebrow"
  | "home.mission.headline1"
  | "home.mission.headline2"
  | "home.mission.videoAria"
  | "home.mission.feature.diverse.title"
  | "home.mission.feature.diverse.line1"
  | "home.mission.feature.diverse.line2"
  | "home.mission.feature.custom.title"
  | "home.mission.feature.custom.line1"
  | "home.mission.feature.custom.line2"
  | "home.mission.feature.convenient.title"
  | "home.mission.feature.convenient.line1"
  | "home.mission.feature.convenient.line2"
  | "home.mission.feature.secure.title"
  | "home.mission.feature.secure.line1"
  | "home.mission.feature.secure.line2"
  | "home.hero.trackPlaceholder"
  | "home.hero.trackAria"
  | "home.hero.trackSubmit"
  | "home.hero.trackClear"
  | "home.hero.personalShip"
  | "home.hero.enterpriseShip"
  | "home.hero.videoHint";

const zh: Record<HomeMessageKey, string> = {
  "home.learnMore": "了解更多",
  "home.products.title": "国际物流产品",
  "home.products.meta": "Logistics Products",
  "home.products.cross.aria": "查看跨境业务",
  "home.products.cross.title": "跨境业务",
  "home.products.cross.desc":
    "为电商平台、企业、个人提供跨境寄递服务，已覆盖全球220多个国家和地区。",
  "home.products.cross.import": "跨境进口",
  "home.products.cross.export": "跨境出口",
  "home.products.cross.panelTitle": "跨境业务",
  "home.products.cross.import.aria": "查看跨境进口",
  "home.products.cross.export.aria": "查看跨境出口",
  "home.products.cross.import.title": "跨境进口",
  "home.products.cross.import.desc":
    '中通国际依托全球网络与本土资源，为跨境电商平台、品牌方、海外转运商提供从"境外揽收 → 国际干线 → 入境清关 → 保税/直邮仓配 → 境内末端"全链路跨境进口综合物流服务。',
  "home.products.cross.import.tag1": "国际进口",
  "home.products.cross.import.tag2": "进口大件",
  "home.products.cross.import.tag3": "电商小件",
  "home.products.cross.import.tag4": "国际仓配",
  "home.products.cross.export.title": "跨境出口",
  "home.products.cross.export.desc":
    "运用智能仓配系统，配置自动化分拣设备及专业运输车队，为跨境、本土客户提供仓储、配送、物流解决方案等定制化服务。柬埔寨金边市同城配送提速至3小时内达，市外配送最快次日达。",
  "home.products.cross.export.tag1": "国际特快",
  "home.products.cross.export.tag2": "国际集运",
  "home.products.cross.export.tag3": "国际大货",
  "home.products.cross.export.tag4": "电商小包",
  "home.products.overseas.title": "海外本土服务",
  "home.products.overseas.desc":
    "在亚洲7国、非洲5国布局本土运输网络，提供定制化的，安全快捷的物流服务。",
  "home.products.overseas.asia": "亚洲",
  "home.products.overseas.africa": "非洲",
  "home.products.overseas.warehouse": "海外仓",
  "home.products.overseas.panelTitle": "海外本土服务",
  "home.products.overseas.aria": "查看海外本土服务",
  "home.products.overseas.asia.aria": "亚洲本土服务",
  "home.products.overseas.africa.aria": "非洲本土服务",
  "home.products.overseas.warehouse.aria": "海外仓服务",
  "home.products.overseas.asia.desc":
    "涵盖柬埔寨、老挝、韩国布局运输网络，当前柬埔寨金边市同城配送最快3小时内达，市外配送最快次日达。",
  "home.products.overseas.africa.desc":
    "海外合资网络覆盖非洲、中亚、南亚等新兴市场，可为客户提供跨境运输（空海运）、快递、仓储、商业等一体化综合物流服务。",
  "home.products.overseas.warehouse.desc":
    "专为跨境电商打造的海外仓一件代发与仓储配送服务，提供一站式物流解决方案。",
  "home.news.title": "新闻资讯",
  "home.news.meta": "News Information",
  "home.mission.learnMore": "了解更多",
  "home.mission.eyebrow": "中通使命",
  "home.mission.headline1": "用我们的产品",
  "home.mission.headline2": "造就更多人的幸福",
  "home.mission.videoAria": "俯视集装箱货轮航行于海面",
  "home.mission.feature.diverse.title": "多样化",
  "home.mission.feature.diverse.line1": "覆盖多元物流场景，灵活匹配不同业务需求",
  "home.mission.feature.diverse.line2": "一站式响应复杂供应链",
  "home.mission.feature.custom.title": "定制化",
  "home.mission.feature.custom.line1": "按需设计运输方案，贴合企业节奏与成本",
  "home.mission.feature.custom.line2": "专属团队全程协同",
  "home.mission.feature.convenient.title": "更便捷",
  "home.mission.feature.convenient.line1": "简化下单与跟踪环节，减少重复沟通成本",
  "home.mission.feature.convenient.line2": "关键节点一目了然",
  "home.mission.feature.secure.title": "更安全",
  "home.mission.feature.secure.line1": "全程可视可控，风险预警及时触达",
  "home.mission.feature.secure.line2": "稳定交付守护时效",
  "home.hero.trackPlaceholder": "请输入单号(最多支持10条，请使用空格或回车隔开)",
  "home.hero.trackAria": "请输入单号，最多支持10条，请使用空格或回车隔开",
  "home.hero.trackSubmit": "物流查询",
  "home.hero.trackClear": "清空",
  "home.hero.personalShip": "个人寄件",
  "home.hero.enterpriseShip": "企业寄件",
  "home.hero.videoHint": "点击查看完整视频",
};

const en: Record<HomeMessageKey, string> = {
  "home.learnMore": "Learn more",
  "home.products.title": "International Logistics Products",
  "home.products.meta": "Logistics Products",
  "home.products.cross.aria": "View cross-border business",
  "home.products.cross.title": "Cross-border business",
  "home.products.cross.desc":
    "Cross-border shipping for marketplaces, enterprises, and individuals, serving 220+ countries and regions worldwide.",
  "home.products.cross.import": "Cross-Border Import",
  "home.products.cross.export": "Cross-Border Export",
  "home.products.cross.panelTitle": "Cross-border business",
  "home.products.cross.import.aria": "View cross-border import",
  "home.products.cross.export.aria": "View cross-border export",
  "home.products.cross.import.title": "Cross-Border Import",
  "home.products.cross.import.desc":
    "Leveraging our global network and local resources, ZTO Global provides end-to-end import logistics from overseas pickup through international linehaul, customs clearance, bonded/direct-mail warehousing, and last-mile delivery in China.",
  "home.products.cross.import.tag1": "International import",
  "home.products.cross.import.tag2": "Large import parcels",
  "home.products.cross.import.tag3": "E-commerce small parcels",
  "home.products.cross.import.tag4": "Intl. warehousing",
  "home.products.cross.export.title": "Cross-Border Export",
  "home.products.cross.export.desc":
    "Smart warehousing and automated sorting with professional fleets deliver tailored logistics. In Phnom Penh, Cambodia, same-city delivery can arrive within 3 hours; inter-city as fast as next day.",
  "home.products.cross.export.tag1": "International express",
  "home.products.cross.export.tag2": "Consolidated shipping",
  "home.products.cross.export.tag3": "International freight",
  "home.products.cross.export.tag4": "E-commerce parcels",
  "home.products.overseas.title": "Overseas Local Services",
  "home.products.overseas.desc":
    "Local transport networks in 7 Asian and 5 African countries, providing customized, safe, and fast logistics.",
  "home.products.overseas.asia": "Asia",
  "home.products.overseas.africa": "Africa",
  "home.products.overseas.warehouse": "Overseas warehouses",
  "home.products.overseas.panelTitle": "Overseas Local Services",
  "home.products.overseas.aria": "View overseas local services",
  "home.products.overseas.asia.aria": "Asia local services",
  "home.products.overseas.africa.aria": "Africa local services",
  "home.products.overseas.warehouse.aria": "Overseas warehouse services",
  "home.products.overseas.asia.desc":
    "Networks in Cambodia, Laos, and South Korea. In Phnom Penh, same-city delivery within 3 hours; inter-city as fast as next day.",
  "home.products.overseas.africa.desc":
    "Joint ventures across Africa and emerging markets in Central and South Asia offer integrated air/sea freight, express, warehousing, and commercial logistics.",
  "home.products.overseas.warehouse.desc":
    "Overseas warehouse fulfillment and storage for cross-border e-commerce, with one-stop logistics solutions.",
  "home.news.title": "News",
  "home.news.meta": "News Information",
  "home.mission.learnMore": "Learn more",
  "home.mission.eyebrow": "ZTO Mission",
  "home.mission.headline1": "With our products",
  "home.mission.headline2": "we create happiness for more people",
  "home.mission.videoAria": "Aerial view of a container ship sailing at sea",
  "home.mission.feature.diverse.title": "Versatile",
  "home.mission.feature.diverse.line1":
    "Covers diverse logistics scenarios and flexibly matches business needs",
  "home.mission.feature.diverse.line2": "One-stop response for complex supply chains",
  "home.mission.feature.custom.title": "Customized",
  "home.mission.feature.custom.line1":
    "Tailored transport plans aligned with your pace and budget",
  "home.mission.feature.custom.line2": "Dedicated teams collaborate end to end",
  "home.mission.feature.convenient.title": "More convenient",
  "home.mission.feature.convenient.line1":
    "Simpler ordering and tracking with less back-and-forth",
  "home.mission.feature.convenient.line2": "Key milestones at a glance",
  "home.mission.feature.secure.title": "More secure",
  "home.mission.feature.secure.line1": "End-to-end visibility with timely risk alerts",
  "home.mission.feature.secure.line2": "Reliable delivery that protects transit times",
  "home.hero.trackPlaceholder":
    "Enter tracking number(s) (up to 10, separated by space or Enter)",
  "home.hero.trackAria":
    "Enter tracking numbers, up to 10, separated by space or Enter",
  "home.hero.trackSubmit": "Track shipment",
  "home.hero.trackClear": "Clear",
  "home.hero.personalShip": "Personal shipping",
  "home.hero.enterpriseShip": "Business shipping",
  "home.hero.videoHint": "Click to watch full video",
};

export const HOME_MESSAGES = { zh, en } as const;
