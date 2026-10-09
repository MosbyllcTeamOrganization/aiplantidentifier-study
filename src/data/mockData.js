/**
 * 前端学习演示数据 - 纯静态模拟数据
 * 无后端调用，无敏感配置
 */

export const PLANT_TYPES = [
  { id: 'all', label: '所有植物类型' },
  { id: 'indoor', label: '室内观叶植物' },
  { id: 'succulent', label: '多肉与仙人掌' },
  { id: 'flower', label: '开花草本花卉' },
  { id: 'tree', label: '灌木与乔木' }
];

export const MOCK_PLANT_RESULTS = [
  {
    id: 1,
    scientificName: "Monstera deliciosa",
    commonName: "龟背竹 (蓬莱蕉)",
    family: "天南星科 (Araceae)",
    genus: "龟背竹属 (Monstera)",
    confidence: 98,
    imageUrl: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&auto=format&fit=crop&q=80",
    matchReason: "叶片呈深绿色羽状深裂，具有标志性的孔洞（fenestrations）与革质光泽。",
    traits: ["耐半阴", "喜高湿", "空气净化", "大型观叶"],
    care: {
      light: "明亮散射光，忌强光暴晒",
      water: "见干见湿，表层土干2-3厘米后浇透",
      temperature: "18°C ~ 28°C，越冬温度不低于10°C",
      soil: "疏松微酸性泥炭珍珠岩混合土"
    },
    safetyTip: "叶片汁液含草酸钙结晶，对猫狗及婴幼儿微毒，避免啃咬。"
  },
  {
    id: 2,
    scientificName: "Sansevieria trifasciata",
    commonName: "虎尾兰 (虎皮兰)",
    family: "天门冬科 (Asparagaceae)",
    genus: "虎尾兰属 (Dracaena)",
    confidence: 94,
    imageUrl: "https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?w=400&auto=format&fit=crop&q=80",
    matchReason: "直立披针形硬革质肉质叶，带有灰白与深绿色波状横带斑纹，金边明显。",
    traits: ["极耐旱", "夜间释放氧气", "新手友好", "强抗逆性"],
    care: {
      light: "耐阴亦耐全日照，光照充足斑纹更艳",
      water: "宁干勿湿，冬季每月浇水一次即可",
      temperature: "15°C ~ 30°C，耐寒性较差",
      soil: "排水极佳的沙质颗粒土"
    },
    safetyTip: "低毒性，仅在大量误食时可能引起宠物肠胃轻微不适。"
  }
];

export const FEATURES = [
  {
    icon: "🌱",
    title: "高精度植物物种识别",
    description: "覆盖数万种室内绿植、野外花草、多肉植物及树木，精准给出学名与俗称。"
  },
  {
    icon: "💧",
    title: "定制化养护指南",
    description: "实时获取浇水频次、适宜温度、光照强度与施肥建议，新手秒变养花达人。"
  },
  {
    icon: "🩺",
    title: "病虫害特征排查",
    description: "黄叶、焦边、落蕾？识别植物病理特征，提供针对性的通风与修剪建议。"
  }
];

export const FAQS = [
  {
    question: "AI 识别植物是通过叶子还是花朵？",
    answer: "多模态 AI 模型能够同时分析花朵颜色结构、叶片脉络走势、茎秆质感以及整体株型，综合特征越明显，识别准确率越高。"
  },
  {
    question: "如果不知道植物名字，该怎么描述？",
    answer: "您可以描述叶片形状（如心形、圆形、带裂纹）、花朵颜色、是否有香味、是水生还是土培等，AI 同样支持特征描述检索。"
  },
  {
    question: "该项目如何向学生展示 Vue 数据驱动视图的特性？",
    answer: "该项目完整展示了响应式数据（植物特征、卡片列表）、计算属性与条件渲染的结合，让学生直观体会数据变化驱动 DOM 自动更新的优雅。"
  }
];
