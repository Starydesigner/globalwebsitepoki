export type LayoutMessageKey =
  | "layout.mega.send"
  | "layout.mega.webTitle"
  | "layout.mega.webDesc"
  | "layout.mega.mobileTitle"
  | "layout.mega.mobileDesc"
  | "layout.mega.qrHint"
  | "layout.mega.query"
  | "layout.mega.customs"
  | "layout.mega.aboutUs"
  | "layout.mega.sustainability"
  | "layout.mega.social"
  | "layout.mega.join"
  | "layout.mega.newsCenter"
  | "layout.mega.corporateVideo"
  | "layout.float.aria"
  | "layout.float.theme"
  | "layout.float.service"
  | "layout.float.jobs"
  | "layout.float.backTop"
  | "layout.footer.addressLabel"
  | "layout.footer.address"
  | "layout.footer.zipLabel"
  | "layout.footer.zip"
  | "layout.footer.hrLabel"
  | "layout.footer.follow"
  | "layout.footer.miniapp"
  | "layout.footer.wechat"
  | "layout.footer.serviceAccount"
  | "layout.footer.video"
  | "layout.footer.weibo"
  | "layout.footer.navService"
  | "layout.footer.navSite"
  | "layout.footer.navEco"
  | "layout.footer.contact"
  | "layout.footer.trademark"
  | "layout.footer.voiceHint"
  | "layout.footer.onlineService"
  | "news.detail.title"
  | "news.detail.notFound"
  | "news.detail.missing"
  | "news.category.corporate"
  | "news.loadMore";

const zh: Record<LayoutMessageKey, string> = {
  "layout.mega.send": "在线寄件",
  "layout.mega.webTitle": "网页版下单平台",
  "layout.mega.webDesc": "您可以通过电脑登录中通国际统一下单平台下单",
  "layout.mega.mobileTitle": "移动端快速下单",
  "layout.mega.mobileDesc": "您可以通过手机扫码进入中通国际小程序下单",
  "layout.mega.qrHint": "小程序扫码下单",
  "layout.mega.query": "寄件查询",
  "layout.mega.customs": "清关服务",
  "layout.mega.aboutUs": "关于我们",
  "layout.mega.sustainability": "可持续发展",
  "layout.mega.social": "社会责任",
  "layout.mega.join": "加入我们",
  "layout.mega.newsCenter": "新闻中心",
  "layout.mega.corporateVideo": "企业视频",
  "layout.float.aria": "快捷入口",
  "layout.float.theme": "方案测试",
  "layout.float.service": "在线客服",
  "layout.float.jobs": "热门招聘",
  "layout.float.backTop": "返回顶部",
  "layout.footer.addressLabel": "地址：",
  "layout.footer.address": "上海市青浦区华新镇华志路1685号",
  "layout.footer.zipLabel": "邮编：",
  "layout.footer.zip": "201708",
  "layout.footer.hrLabel": "简历投递：",
  "layout.footer.follow": "关注我们:",
  "layout.footer.miniapp": "小程序",
  "layout.footer.wechat": "公众号",
  "layout.footer.serviceAccount": "服务号",
  "layout.footer.video": "视频号",
  "layout.footer.weibo": "微博",
  "layout.footer.navService": "服务导航",
  "layout.footer.navSite": "网站导航",
  "layout.footer.navEco": "中通生态",
  "layout.footer.contact": "联系我们",
  "layout.footer.trademark": "商标授权",
  "layout.footer.voiceHint": '95311 语音“国际查询”',
  "layout.footer.onlineService": "在线客服",
  "news.detail.title": "新闻详情",
  "news.detail.notFound": "中通国际 · 新闻未找到",
  "news.detail.missing": "未找到该篇新闻，可能已下线。",
  "news.category.corporate": "企业动态",
  "news.loadMore": "加载更多",
};

const en: Record<LayoutMessageKey, string> = {
  "layout.mega.send": "Ship online",
  "layout.mega.webTitle": "Web ordering",
  "layout.mega.webDesc": "Place orders on the ZTO Global unified platform from your computer",
  "layout.mega.mobileTitle": "Mobile ordering",
  "layout.mega.mobileDesc": "Scan to order via the ZTO Global WeChat mini program",
  "layout.mega.qrHint": "Scan mini program QR code",
  "layout.mega.query": "Shipping tools",
  "layout.mega.customs": "Customs services",
  "layout.mega.aboutUs": "About us",
  "layout.mega.sustainability": "Sustainability",
  "layout.mega.social": "Social responsibility",
  "layout.mega.join": "Careers",
  "layout.mega.newsCenter": "News center",
  "layout.mega.corporateVideo": "Corporate videos",
  "layout.float.aria": "Quick links",
  "layout.float.theme": "Theme preview",
  "layout.float.service": "Live chat",
  "layout.float.jobs": "Hot jobs",
  "layout.float.backTop": "Back to top",
  "layout.footer.addressLabel": "Address: ",
  "layout.footer.address": "1685 Huazhi Rd, Huaxin Town, Qingpu District, Shanghai",
  "layout.footer.zipLabel": "Postal code: ",
  "layout.footer.zip": "201708",
  "layout.footer.hrLabel": "Resumes: ",
  "layout.footer.follow": "Follow us",
  "layout.footer.miniapp": "Mini program",
  "layout.footer.wechat": "WeChat",
  "layout.footer.serviceAccount": "Service account",
  "layout.footer.video": "Video channel",
  "layout.footer.weibo": "Weibo",
  "layout.footer.navService": "Services",
  "layout.footer.navSite": "Regional sites",
  "layout.footer.navEco": "ZTO ecosystem",
  "layout.footer.contact": "Contact us",
  "layout.footer.trademark": "Trademark licensing",
  "layout.footer.voiceHint": '95311, say "International"',
  "layout.footer.onlineService": "Live chat",
  "news.detail.title": "News article",
  "news.detail.notFound": "ZTO Global · Article not found",
  "news.detail.missing": "This article was not found. It may have been removed.",
  "news.category.corporate": "Corporate news",
  "news.loadMore": "Load more",
};

export const LAYOUT_MESSAGES = { zh, en } as const;
