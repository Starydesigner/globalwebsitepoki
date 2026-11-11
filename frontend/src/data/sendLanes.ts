import { enterpriseInquiryReturn, onlineSendHash } from "@/config/sitePaths";

export interface SendLaneAction {
  href: string;
  label: string;
  variant: "primary" | "line";
  external?: boolean;
}

export interface SendLaneItem {
  title: string;
  description: string;
  markSrc?: string;
  markClass?: "send-lane__mark" | "send-lane__device";
  qrSrc?: string;
  qrName?: string;
  inlinePrimary?: { href: string; label: string };
}

export interface SendLaneConfig {
  id: string;
  title: string;
  photoSrc: string;
  photoAlt: string;
  flip?: boolean;
  items: SendLaneItem[];
  actions?: SendLaneAction[];
}

export const SEND_ENTERPRISE_LANE: SendLaneConfig = {
  id: "enterprise",
  title: "企业寄件服务",
  photoSrc: "asset/images/send/southeast.jpg?v=2",
  photoAlt: "中通国际工作人员交接包裹",
  items: [
    {
      title: "进口业务",
      description: "BC直邮、BBC保税等业务",
    },
    {
      title: "出口业务",
      description: "出口专线、代取件等业务",
    },
  ],
  actions: [
    { href: "https://plutus.ztoglobal.com", label: "去下单", variant: "primary", external: true },
    {
      href: enterpriseInquiryReturn(onlineSendHash("enterprise")),
      label: "立即咨询",
      variant: "line",
      external: false,
    },
  ],
};

export const SEND_PERSONAL_LANE: SendLaneConfig = {
  id: "personal",
  title: "个人寄件服务",
  photoSrc: "asset/images/send/personal.jpg?v=2",
  photoAlt: "中通国际快递员递出包裹",
  items: [
    {
      title: "网页版下单平台",
      description: "电脑登录中通国际统一下单平台",
      markSrc: "asset/images/send/web-order.png?v=5",
      markClass: "send-lane__device",
      inlinePrimary: { href: "https://plutus.ztoglobal.com", label: "去下单" },
    },
    {
      title: "移动端快速下单",
      description: "手机扫码进入小程序下单",
      qrSrc: "asset/images/qr-export-wechat.png",
      qrName: "微信小程序扫码下单",
    },
  ],
};
