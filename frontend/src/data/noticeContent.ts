export interface NoticeForbiddenIcon {
  src: string;
  title: string;
}

/** 顺序与 MasterGo 容器 118405 一致：首行 6 项，次行 3 项（伪造侵权在最后） */
export const NOTICE_FORBIDDEN_ICONS: NoticeForbiddenIcon[] = [
  { src: "asset/images/notice/danyao.png", title: "各类武器弹药" },
  { src: "asset/images/notice/yiran.png", title: "各类易爆炸性物品" },
  { src: "asset/images/notice/chujin.png", title: "各类禁止进出境\n物品" },
  { src: "asset/images/notice/huaxue.png", title: "各类化学危险品" },
  { src: "asset/images/notice/dupin.png", title: "各类毒品" },
  { src: "asset/images/notice/yesheng.png", title: "各类野生动物制品" },
  { src: "asset/images/notice/jinzhipin.png", title: "其它禁止物品" },
  { src: "asset/images/notice/shenghua.png", title: "各类生化制品物质" },
  { src: "asset/images/notice/jia.png", title: "各类非法伪造，\n侵权物品" },
];

export const NOTICE_IMPORT_LIST: string[] = [
  "珍稀、濒危物种及其制品。",
  "毒品、麻醉类化工品。",
  "甘蔗及其他糖蜜。",
  "石棉类易致癌物产品。",
  "污染环境以及危害动植物的农药产品。",
  "含汞类污染环境的商品。",
  "旧机电产品。",
  "无回收利用价值的废物。",
  "文物。",
  "来自疫区的相关动物和动物产品、肉骨粉等动物性饲料和动物源性生物制品。",
  "以任何贸易方式和捐赠方式进口右置方向盘汽车。",
  "枪械及仿真枪。",
  "以氯氟烃为制冷剂的压缩机。",
  "受放射性污染的废旧金属。",
  "带有“DARKIE”文字和其他丑化黑人的文字或图形的商品。",
  "旧麻袋。",
  "氯酸钾、硝酸铵。",
  "国家有关规定禁止出口的音像制品。",
  "进口标有“二战”时期日本零式战斗机和纳粹德国战斗机标记的货物。",
  "其他海关要求禁止进口的货物。",
];

export const NOTICE_EXPORT_LIST: string[] = [
  "珍稀、濒危物种及其制品。",
  "牛黄、麝香、麻黄草、发菜。",
  "毒品、麻醉类化工品。",
  "原木、木炭。",
  "未锻造或粉末状铂、板（片）状铂。",
  "石棉类易致癌物产品。",
  "毒品、麻醉类化工品。",
  "污染环境以及危害动植物的农药产品。",
  "含汞类污染环境的商品。",
  "文物和国家规定禁止出境的其他文物。",
  "野生红豆杉及其部分和产品的商业性出口。",
  "劳改产品。",
  "以氯氟烃为制冷剂的压缩机。",
  "国内生产、经营的中药材天花粉（包括天花粉提取物）。",
  "白氏贝、企鹅贝和白蝶贝等珍稀珍珠贝类。",
  "标有“二战”时期日本零式战斗机和纳粹德国战斗机标记的货物。",
  "原料血浆。",
  "国家有关规定禁止出口的音像制品。",
  "带有“DARKIE”文字和其他丑化黑人的文字或图形的商品。",
];
