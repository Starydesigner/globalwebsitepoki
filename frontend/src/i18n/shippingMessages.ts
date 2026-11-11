export type ShippingMessageKey =
  | "ship.banner.title"
  | "ship.banner.line1"
  | "ship.banner.line2"
  | "ship.banner.highlight"
  | "ship.banner.subtitle"
  | "ship.nav.send"
  | "ship.nav.query"
  | "ship.nav.track"
  | "ship.nav.rates"
  | "ship.nav.notice"
  | "ship.nav.customs"
  | "ship.nav.upload"
  | "ship.nav.tw"
  | "ship.nav.aria"
  | "ship.track.aria"
  | "ship.track.placeholder"
  | "ship.track.inputAria"
  | "ship.track.clear"
  | "ship.track.submit"
  | "ship.track.resultAria"
  | "ship.track.resultTip"
  | "ship.track.error.format"
  | "ship.track.error.max"
  | "ship.track.error.empty"
  | "ship.track.removeAria"
  | "ship.track.expandAll"
  | "ship.track.collapse"
  | "ship.track.billHead"
  | "ship.track.subBills"
  | "ship.track.status.delivered"
  | "ship.track.status.agent"
  | "ship.track.status.delivering"
  | "ship.track.status.picked"
  | "ship.track.status.customs"
  | "ship.track.status.transit"
  | "ship.rates.aria"
  | "ship.rates.origin"
  | "ship.rates.dest"
  | "ship.rates.goods"
  | "ship.rates.weight"
  | "ship.rates.volume"
  | "ship.rates.volumeHint"
  | "ship.rates.dimLength"
  | "ship.rates.dimWidth"
  | "ship.rates.dimHeight"
  | "ship.rates.chargeableWeight"
  | "ship.rates.dimPlaceholder"
  | "ship.rates.postcode"
  | "ship.rates.searchPlaceholder"
  | "ship.rates.dialogOrigin"
  | "ship.rates.dialogDest"
  | "ship.rates.selectPlaceholder"
  | "ship.rates.submit"
  | "ship.rates.error.origin"
  | "ship.rates.error.dest"
  | "ship.rates.error.goods"
  | "ship.rates.error.postcode"
  | "ship.rates.error.weight"
  | "ship.rates.deliveryPrefix"
  | "ship.rates.goods.general"
  | "ship.rates.goods.battery"
  | "ship.notice.aria"
  | "ship.notice.tab.forbidden"
  | "ship.notice.tab.tariff"
  | "ship.notice.forbidden.importTitle"
  | "ship.notice.forbidden.exportTitle"
  | "ship.notice.tariff.empty"
  | "ship.notice.tariff.pager"
  | "ship.notice.tariff.fieldError"
  | "ship.clearance.tw.nameError"
  | "ship.clearance.tw.contactError"
  | "ship.clearance.tw.idError"
  | "ship.clearance.tw.success"
  | "ship.clearance.upload.nameError"
  | "ship.clearance.upload.idError"
  | "ship.clearance.upload.frontError"
  | "ship.clearance.upload.backError"
  | "ship.clearance.upload.agreeError"
  | "ship.clearance.upload.success"
  | "ship.send.enterprise.title"
  | "ship.send.enterprise.photoAlt"
  | "ship.send.enterprise.import"
  | "ship.send.enterprise.importDesc"
  | "ship.send.enterprise.export"
  | "ship.send.enterprise.exportDesc"
  | "ship.send.enterprise.order"
  | "ship.send.enterprise.inquiry"
  | "ship.send.personal.title"
  | "ship.send.personal.photoAlt"
  | "ship.send.personal.web"
  | "ship.send.personal.webDesc"
  | "ship.send.personal.mobile"
  | "ship.send.personal.mobileDesc"
  | "ship.send.personal.qrName"
  | "ship.send.personal.order"
  | "common.clear"
  | "common.query"
  | "common.learnMore"
  | "common.select"
  | "common.goOrder"
  | "common.inquireNow";

const zh: Record<ShippingMessageKey, string> = {
  "ship.banner.title": "随时随地，足不出户，就可以购全球",
  "ship.banner.line1": "随时随地，足不出户，",
  "ship.banner.line2": "就可以购全球",
  "ship.banner.highlight": "购",
  "ship.banner.subtitle": "Global shopping anytime, anywhere",
  "ship.nav.send": "在线寄件",
  "ship.nav.query": "寄件查询",
  "ship.nav.track": "运单查询",
  "ship.nav.rates": "运费时效",
  "ship.nav.notice": "寄件须知",
  "ship.nav.customs": "清关服务",
  "ship.nav.upload": "上传清关信息",
  "ship.nav.tw": "中国台湾件实名认证查询",
  "ship.nav.aria": "寄递服务",
  "ship.track.aria": "运单查询",
  "ship.track.placeholder": "请输入单号(多个单号用空格或回车隔开，最多同时查询 10 条运单)",
  "ship.track.inputAria": "运单号",
  "ship.track.clear": "清空",
  "ship.track.submit": "查询",
  "ship.track.resultAria": "运单查询结果",
  "ship.track.resultTip": "注意：部分轨迹由第三方承运商提供，本平台仅作展示，不担保其准确性。",
  "ship.track.error.format": "运单号格式不正确，请输入 8–20 位数字",
  "ship.track.error.max": "最多支持同时查询 10 条运单信息",
  "ship.track.error.empty": "请输入运单号",
  "ship.track.removeAria": "移除运单号",
  "ship.track.expandAll": "展开全部轨迹（共 {n} 条）",
  "ship.track.collapse": "收起轨迹",
  "ship.track.billHead": "运单号:",
  "ship.track.subBills": "子单号",
  "ship.track.status.delivered": "已签收",
  "ship.track.status.agent": "已代收",
  "ship.track.status.delivering": "派件中",
  "ship.track.status.picked": "已揽收",
  "ship.track.status.customs": "清关中",
  "ship.track.status.transit": "运输中",
  "ship.rates.aria": "运费时效",
  "ship.rates.origin": "始发地",
  "ship.rates.dest": "目的地",
  "ship.rates.goods": "物品信息",
  "ship.rates.weight": "总重量",
  "ship.rates.volume": "总体积",
  "ship.rates.volumeHint": "补充体积预估费用更准确",
  "ship.rates.dimLength": "长",
  "ship.rates.dimWidth": "宽",
  "ship.rates.dimHeight": "高",
  "ship.rates.chargeableWeight": "计费重",
  "ship.rates.dimPlaceholder": "请输入",
  "ship.rates.postcode": "目的地邮编",
  "ship.rates.searchPlaceholder": "搜索省或直辖市",
  "ship.rates.dialogOrigin": "选择始发地",
  "ship.rates.dialogDest": "选择目的地",
  "ship.rates.selectPlaceholder": "请选择",
  "ship.rates.submit": "查询",
  "ship.rates.error.origin": "请选择始发地",
  "ship.rates.error.dest": "请选择目的地",
  "ship.rates.error.goods": "请选择物品信息",
  "ship.rates.error.postcode": "请填写目的地邮编",
  "ship.rates.error.weight": "请填写总重量后再查询",
  "ship.rates.deliveryPrefix": "最快",
  "ship.rates.goods.general": "普货",
  "ship.rates.goods.battery": "带电",
  "ship.notice.aria": "寄件须知",
  "ship.notice.tab.forbidden": "禁限寄物品",
  "ship.notice.tab.tariff": "关税查询",
  "ship.notice.forbidden.importTitle": "禁止进口产品",
  "ship.notice.forbidden.exportTitle": "禁止出口产品",
  "ship.notice.tariff.empty": "无符合条件的结果，请更换关键字重试",
  "ship.notice.tariff.pager": "第 {page} / {pages} 页，共 {total} 条",
  "ship.notice.tariff.fieldError": "请输入税号或名称",
  "ship.clearance.tw.nameError": "请填写姓名",
  "ship.clearance.tw.contactError": "手机号和身份证号不能同时为空",
  "ship.clearance.tw.idError": "身份证号格式有误",
  "ship.clearance.tw.success": "身份认证已通过",
  "ship.clearance.upload.nameError": "请填写姓名与身份证号码",
  "ship.clearance.upload.idError": "身份证号格式有误",
  "ship.clearance.upload.frontError": "请上传身份证人像面",
  "ship.clearance.upload.backError": "请上传身份证国徽面",
  "ship.clearance.upload.agreeError": "请先阅读并同意相关协议",
  "ship.clearance.upload.success": "信息已提交，接入清关系统后将完成备案",
  "ship.send.enterprise.title": "企业寄件服务",
  "ship.send.enterprise.photoAlt": "中通国际工作人员交接包裹",
  "ship.send.enterprise.import": "进口业务",
  "ship.send.enterprise.importDesc": "BC直邮、BBC保税等业务",
  "ship.send.enterprise.export": "出口业务",
  "ship.send.enterprise.exportDesc": "出口专线、代取件等业务",
  "ship.send.enterprise.order": "去下单",
  "ship.send.enterprise.inquiry": "立即咨询",
  "ship.send.personal.title": "个人寄件服务",
  "ship.send.personal.photoAlt": "中通国际快递员递出包裹",
  "ship.send.personal.web": "网页版下单平台",
  "ship.send.personal.webDesc": "电脑登录中通国际统一下单平台",
  "ship.send.personal.mobile": "移动端快速下单",
  "ship.send.personal.mobileDesc": "手机扫码进入小程序下单",
  "ship.send.personal.qrName": "微信小程序扫码下单",
  "ship.send.personal.order": "去下单",
  "common.clear": "清空",
  "common.query": "查询",
  "common.learnMore": "了解更多",
  "common.select": "请选择",
  "common.goOrder": "前往寄件",
  "common.inquireNow": "立即咨询",
};

const en: Record<ShippingMessageKey, string> = {
  "ship.banner.title": "Shop the world from home, anytime",
  "ship.banner.line1": "Shop the world from home,",
  "ship.banner.line2": "anytime, anywhere",
  "ship.banner.highlight": "Shop",
  "ship.banner.subtitle": "Global shopping anytime, anywhere",
  "ship.nav.send": "Ship online",
  "ship.nav.query": "Shipping tools",
  "ship.nav.track": "Track shipment",
  "ship.nav.rates": "Rates & transit time",
  "ship.nav.notice": "Shipping guidelines",
  "ship.nav.customs": "Customs services",
  "ship.nav.upload": "Upload clearance info",
  "ship.nav.tw": "Taiwan (China) real-name verification",
  "ship.nav.aria": "Shipping services",
  "ship.track.aria": "Track shipment",
  "ship.track.placeholder":
    "Enter tracking number(s), separated by space or Enter (up to 10 at once)",
  "ship.track.inputAria": "Tracking number",
  "ship.track.clear": "Clear",
  "ship.track.submit": "Track",
  "ship.track.resultAria": "Tracking results",
  "ship.track.resultTip":
    "Note: Some tracking events are provided by third-party carriers. They are shown for reference only; accuracy is not guaranteed.",
  "ship.track.error.format": "Invalid tracking number. Use 8–20 digits.",
  "ship.track.error.max": "You can track up to 10 shipments at once.",
  "ship.track.error.empty": "Please enter a tracking number.",
  "ship.track.removeAria": "Remove tracking number",
  "ship.track.expandAll": "Show all events ({n} total)",
  "ship.track.collapse": "Collapse events",
  "ship.track.billHead": "Tracking No.:",
  "ship.track.subBills": "Sub tracking numbers",
  "ship.track.status.delivered": "Delivered",
  "ship.track.status.agent": "Picked up by agent",
  "ship.track.status.delivering": "Out for delivery",
  "ship.track.status.picked": "Picked up",
  "ship.track.status.customs": "Customs clearance",
  "ship.track.status.transit": "In transit",
  "ship.rates.aria": "Rates and transit time",
  "ship.rates.origin": "Origin",
  "ship.rates.dest": "Destination",
  "ship.rates.goods": "Item type",
  "ship.rates.weight": "Total weight",
  "ship.rates.volume": "Total volume",
  "ship.rates.volumeHint": "Dimensions improve cost estimates",
  "ship.rates.dimLength": "L",
  "ship.rates.dimWidth": "W",
  "ship.rates.dimHeight": "H",
  "ship.rates.chargeableWeight": "Billable wt.",
  "ship.rates.dimPlaceholder": "Enter",
  "ship.rates.postcode": "Destination postal code",
  "ship.rates.searchPlaceholder": "Search province or municipality",
  "ship.rates.dialogOrigin": "Select origin",
  "ship.rates.dialogDest": "Select destination",
  "ship.rates.selectPlaceholder": "Please select",
  "ship.rates.submit": "Search",
  "ship.rates.error.origin": "Please select origin",
  "ship.rates.error.dest": "Please select destination",
  "ship.rates.error.goods": "Please select item type",
  "ship.rates.error.postcode": "Please enter destination postal code",
  "ship.rates.error.weight": "Enter total weight before searching",
  "ship.rates.deliveryPrefix": "Earliest delivery",
  "ship.rates.goods.general": "General cargo",
  "ship.rates.goods.battery": "Contains battery",
  "ship.notice.aria": "Shipping guidelines",
  "ship.notice.tab.forbidden": "Restricted & prohibited items",
  "ship.notice.tab.tariff": "Tariff lookup",
  "ship.notice.forbidden.importTitle": "Prohibited imports",
  "ship.notice.forbidden.exportTitle": "Prohibited exports",
  "ship.notice.tariff.empty": "No results. Try different keywords.",
  "ship.notice.tariff.pager": "Page {page} / {pages}, {total} items",
  "ship.notice.tariff.fieldError": "Enter HS code or product name",
  "ship.clearance.tw.nameError": "Please enter your name",
  "ship.clearance.tw.contactError": "Phone and ID number cannot both be empty",
  "ship.clearance.tw.idError": "Invalid ID number format",
  "ship.clearance.tw.success": "Identity verified",
  "ship.clearance.upload.nameError": "Please enter name and ID number",
  "ship.clearance.upload.idError": "Invalid ID number format",
  "ship.clearance.upload.frontError": "Upload ID portrait side",
  "ship.clearance.upload.backError": "Upload ID emblem side",
  "ship.clearance.upload.agreeError": "Please read and agree to the terms",
  "ship.clearance.upload.success": "Submitted. Filing will complete once connected to customs.",
  "ship.send.enterprise.title": "Business shipping",
  "ship.send.enterprise.photoAlt": "ZTO Global staff handing over parcels",
  "ship.send.enterprise.import": "Import",
  "ship.send.enterprise.importDesc": "BC direct mail, BBC bonded warehouse, and more",
  "ship.send.enterprise.export": "Export",
  "ship.send.enterprise.exportDesc": "Dedicated export lines, pickup services, and more",
  "ship.send.enterprise.order": "Place order",
  "ship.send.enterprise.inquiry": "Contact us",
  "ship.send.personal.title": "Personal shipping",
  "ship.send.personal.photoAlt": "ZTO Global courier delivering a parcel",
  "ship.send.personal.web": "Web ordering",
  "ship.send.personal.webDesc": "Log in to the ZTO Global unified ordering platform on desktop",
  "ship.send.personal.mobile": "Mobile ordering",
  "ship.send.personal.mobileDesc": "Scan to order via mini program",
  "ship.send.personal.qrName": "WeChat mini program",
  "ship.send.personal.order": "Place order",
  "common.clear": "Clear",
  "common.query": "Search",
  "common.learnMore": "Learn more",
  "common.select": "Please select",
  "common.goOrder": "Ship now",
  "common.inquireNow": "Contact us",
};

export const SHIPPING_MESSAGES = { zh, en } as const;

export function formatShipMsg(
  template: string,
  vars: Record<string, string | number>,
): string {
  return Object.entries(vars).reduce(
    (acc, [k, v]) => acc.replace(new RegExp(`\\{${k}\\}`, "g"), String(v)),
    template,
  );
}
