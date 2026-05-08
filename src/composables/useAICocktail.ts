import { ref } from 'vue'
import type { Cocktail, BaseSpirit, TasteTag } from '../types/cocktail'

export interface AIGenerationOptions {
  bases?: BaseSpirit[]
  tastes?: TasteTag[]
  fruits?: string[]
  softDrinks?: string[]
  customKeywords?: string[]
  moodKeywords?: string[]
}

export function useAICocktail() {
  const isGenerating = ref(false)
  const generatedCocktail = ref<Cocktail | null>(null)
  const error = ref<string | null>(null)

  const baseSpirits: BaseSpirit[] = ['威士忌', '金酒', '朗姆酒', '龙舌兰', '伏特加', '白兰地', '无酒精']
  const tasteTags: TasteTag[] = ['甜', '酸', '苦', '果味', '草本', '奶香', '气泡', '咸', '辣', '茶香', '泥煤味']

  const fruits: string[] = [
    '柠檬', '青柠', '橙子', '西柚', '蓝莓', '草莓', '覆盆子', '芒果',
    '桃子', '梨', '苹果', '菠萝', '百香果', '猕猴桃', '樱桃', '葡萄',
    '石榴', '西瓜', '哈密瓜', '火龙果', '荔枝', '龙眼', '椰子', '香蕉'
  ]

  const softDrinks: string[] = [
    '可乐', '雪碧', '苏打水', '汤力水', '姜汁啤酒', '七喜',
    '橙汁', '苹果汁', '蔓越莓汁', '菠萝汁', '葡萄柚汁', '番茄汁',
    '椰子水', '绿茶', '红茶', '乌龙茶', '茉莉花茶', '伯爵茶',
    '椰奶', '牛奶', '炼乳', '蜂蜜水', '薄荷水'
  ]

  const poeticNames: Record<string, { names: string[], namesEn: string[], descriptions: string[] }> = {
    '威士忌': {
      names: ['烟雨江南', '暮色沉香', '星河长明', '岁月如歌', '云端漫步', '往事如烟', '落日余晖', '夜幕低垂', '流金岁月', '风起云涌', '雾中行者', '暮光之城', '追忆似水', '时光旅人', '午夜飞行'],
      namesEn: ['Misty Jiangnan', 'Dusk Incense', 'Starlit Night', 'Years Like Songs', 'Cloud Walking', 'Past Smoke', 'Sunset Glow', 'Night Falls', 'Golden Years', 'Winds Rise', 'Walker in Mist', 'Twilight City', 'Memory Flow', 'Time Traveler', 'Midnight Flight'],
      descriptions: [
        '如江南烟雨般绵长悠远，回味无穷',
        '沉静的香气中蕴含着时光的醇厚',
        '星河倒映在琥珀色的酒液里',
        '岁月沉淀的味道，每一口都是故事',
        '轻盈中带着深邃，如漫步云端',
        '往事随风，却留下无尽的回味',
        '落日的温暖融入杯中',
        '夜色渐浓，酒意正浓',
        '金色的年华在酒中流淌',
        '风云变幻，尽在一杯',
        '迷雾中前行，方向在自己心中',
        '暮色降临，灯火阑珊',
        '似水年华，尽在杯中',
        '穿越时光的味觉之旅',
        '午夜时分的自由飞翔'
      ]
    },
    '金酒': {
      names: ['伦敦迷雾', '雾都佳人', '琴酒之梦', '杜松晨露', '英伦风情', '月下梅酒', '花园漫步', '晨曦微露', '清雅如兰', '雨后彩虹', '午夜琴声', '梦幻花园', '春夜微风', '芳草萋萋', '绿野仙踪'],
      namesEn: ['London Mist', 'Fog City Lady', 'Gin Dream', 'Juniper Dawn', 'British Charm', 'Plum Moon', 'Garden Walk', 'Morning Dew', 'Orchid Grace', 'Rainbow After Rain', 'Midnight Piano', 'Dream Garden', 'Spring Night Breeze', 'Fragrant Grass', 'Emerald Wonderland'],
      descriptions: [
        '英伦迷雾中的神秘与优雅',
        '雾都的浪漫与神秘并存',
        '琴键般清脆的味觉体验',
        '杜松子的清新如晨露般纯净',
        '来自英伦的经典韵味',
        '月光下的梅香与金酒的碰撞',
        '漫步花园的清新与惬意',
        '清晨的第一缕阳光',
        '兰花的幽香与酒的醇厚',
        '雨后初晴的清新与希望',
        '午夜的琴声悠扬动人',
        '梦境中的花园芬芳四溢',
        '春日夜晚的温柔微风',
        '芳草萋萋中的宁静',
        '绿野仙踪般的奇幻旅程'
      ]
    },
    '朗姆酒': {
      names: ['加勒比海风', '热带雨林', '海盗之歌', '落日海滩', '海浪轻摇', '甜蜜回忆', '阳光海岸', '海岛风情', '椰林树影', '波涛汹涌', '珊瑚礁之梦', '海龟先生', '比基尼少女', '海盗藏宝', '海风轻拂'],
      namesEn: ['Caribbean Breeze', 'Tropical Rainforest', 'Pirate Song', 'Sunset Beach', 'Swaying Waves', 'Sweet Memories', 'Sunny Coast', 'Island Style', 'Coconut Grove', 'Raging Waves', 'Coral Dream', 'Mr. Turtle', 'Bikini Girl', 'Pirate Treasure', 'Sea Breeze Kiss'],
      descriptions: [
        '加勒比的海风拂面而来',
        '热带雨林的神秘与热情',
        '海盗船上的自由与狂野',
        '在落日的海滩上举杯',
        '海浪轻摇中的悠闲时光',
        '甜蜜中带着朗姆的醇香',
        '阳光、海浪与美酒的完美融合',
        '海岛度假的悠闲与惬意',
        '椰林树影下的清凉一夏',
        '波涛汹涌中的激情与力量',
        '珊瑚礁深处的梦幻世界',
        '海龟先生的悠闲生活',
        '比基尼少女的夏日风情',
        '寻找海盗留下的宝藏',
        '海风轻拂面颊的温柔'
      ]
    },
    '龙舌兰': {
      names: ['沙漠绿洲', '墨西哥之魂', '烈日骄阳', '仙人掌日出', '火焰沙漠', '龙舌兰之花', '沙漠星空', '狂野西部', '玛雅预言', '金色沙漠', '沙漠商队', '仙人掌之夜', '烈日风暴', '绿洲之泉', '沙漠玫瑰'],
      namesEn: ['Desert Oasis', 'Soul of Mexico', 'Blazing Sun', 'Cactus Sunrise', 'Flame Desert', 'Agave Flower', 'Desert Stars', 'Wild Wild West', 'Maya Prophecy', 'Golden Desert', 'Desert Caravan', 'Cactus Night', 'Sun Storm', 'Oasis Spring', 'Desert Rose'],
      descriptions: [
        '沙漠中的一抹清凉',
        '墨西哥的热情与豪放',
        '烈日下的激情与活力',
        '仙人掌丛中的日出',
        '火焰般炽热的沙漠夜晚',
        '龙舌兰花开的芬芳',
        '沙漠夜空下的宁静与深邃',
        '狂野西部的自由精神',
        '玛雅文明的神秘传承',
        '金色沙漠中的奇迹',
        '穿越沙漠的商队之旅',
        '仙人掌守护的夜晚',
        '烈日风暴中的坚守',
        '沙漠绿洲中的生命之泉',
        '沙漠中绽放的玫瑰'
      ]
    },
    '伏特加': {
      names: ['冰雪奇缘', '极光之恋', '北国风光', '纯净之心', '冬日恋歌', '冰与火之歌', '雪夜温柔', '极简之美', '冰封往事', '清冽如风', '冰山来客', '极地探险', '冰河世纪', '雪国列车', '冰点浪漫'],
      namesEn: ['Frozen Fantasy', 'Aurora Love', 'Northern Scenery', 'Pure Heart', 'Winter Romance', 'Ice and Fire', 'Snow Night', 'Minimal Beauty', 'Frozen Memories', 'Cold Wind', 'Ice Mountain Guest', 'Polar Expedition', 'Ice Age', 'Snow Train', 'Ice Point Romance'],
      descriptions: [
        '如冰雪般纯净透亮',
        '极光下的浪漫时刻',
        '北国风光的壮美与辽阔',
        '纯净如水，却蕴含力量',
        '冬日里的温暖与浪漫',
        '冰与火的激情碰撞',
        '雪夜的温柔与宁静',
        '极简主义的完美诠释',
        '被冰封住的美好回忆',
        '如风般清冽自由',
        '来自冰山的客人',
        '极地探险的刺激体验',
        '穿越冰河世纪的时光',
        '驶向雪国的浪漫列车',
        '冰点以下的浪漫温度'
      ]
    },
    '白兰地': {
      names: ['法兰西玫瑰', '葡萄夜宴', '香槟之梦', '酒窖深处', '岁月珍酿', '红酒心事', '葡萄园的黄昏', '优雅时光', '贵族气息', '流光溢彩', '宫廷舞会', '伯爵的下午茶', '凡尔赛之梦', '塞纳河畔', '勃艮第的黄昏'],
      namesEn: ['French Rose', 'Grape Night', 'Champagne Dream', 'Deep Cellar', 'Aged Treasure', 'Wine Heart', 'Vineyard Dusk', 'Elegant Time', 'Noble Spirit', 'Flowing Light', 'Palace Ball', 'Earl\'s Tea', 'Versailles Dream', 'Seine River', 'Burgundy Dusk'],
      descriptions: [
        '法兰西的浪漫与优雅',
        '葡萄成熟时的美好夜晚',
        '香槟气泡中的梦幻与欢愉',
        '来自酒窖深处的珍品',
        '岁月沉淀的精华',
        '红酒般醇厚的情感',
        '葡萄园黄昏时分的美好',
        '优雅是一种生活态度',
        '贵族般的品质与格调',
        '流光溢彩的人生',
        '宫廷舞会的华丽篇章',
        '伯爵的精致下午茶时光',
        '凡尔赛宫的梦幻重现',
        '塞纳河畔的浪漫漫步',
        '勃艮第葡萄园的黄昏'
      ]
    },
    '无酒精': {
      names: ['春日花园', '清泉石上流', '雨后森林', '晨露微甜', '彩虹气泡', '柠檬之夏', '薄荷清凉', '果香四溢', '清新如风', '自然之选', '森林精灵', '彩虹之巅', '晨曦微露', '花园派对', '自然呼吸'],
      namesEn: ['Spring Garden', 'Stream Over Stones', 'Rainy Forest', 'Morning Dew', 'Rainbow Bubbles', 'Lemon Summer', 'Mint Fresh', 'Fruit Paradise', 'Fresh Breeze', 'Natural Choice', 'Forest Sprite', 'Top of Rainbow', 'Morning Light', 'Garden Party', 'Nature Breath'],
      descriptions: [
        '春日花园的芬芳与美好',
        '清泉流淌，自然纯净',
        '雨后森林的清新与宁静',
        '清晨露珠的甜蜜与纯净',
        '彩虹般绚丽的梦幻气泡',
        '夏日柠檬的清爽酸甜',
        '薄荷带来的清凉体验',
        '水果的香甜汇聚一杯',
        '如清风般清新自然',
        '来自大自然的馈赠',
        '森林精灵的神秘礼物',
        '站在彩虹之巅俯瞰世界',
        '晨曦中的第一缕微光',
        '花园派对的欢乐时光',
        '与大自然同步呼吸'
      ]
    }
  }

  const ingredients: Record<BaseSpirit, string[]> = {
    '威士忌': ['波本威士忌', '苏格兰威士忌', '爱尔兰威士忌', '黑麦威士忌', '调和威士忌', '单一麦芽威士忌', '裸麦威士忌'],
    '金酒': ['伦敦干金酒', '老汤姆金酒', 'Plymouth金酒', 'Hendrick\'s金酒', '植物学家金酒', '蓝宝石金酒', '添加利金酒'],
    '朗姆酒': ['白朗姆酒', '黑朗姆酒', '金朗姆酒', '151朗姆酒', '香料朗姆酒', '椰子朗姆酒', '菠萝朗姆酒'],
    '龙舌兰': ['银龙舌兰', '金龙舌兰', 'Reposado龙舌兰', 'Añejo龙舌兰', 'Mezcal龙舌兰', '龙舌兰蜜', '咖啡龙舌兰'],
    '伏特加': ['伏特加', '黑俄罗斯伏特加', '黄瓜伏特加', '辣椒伏特加', '柠檬伏特加', '香草伏特加', '伏特加（冷冻）'],
    '白兰地': ['干邑白兰地', '雅文邑白兰地', '苹果白兰地', '樱桃白兰地', '葡萄白兰地', 'VSOP干邑', 'XO干邑'],
    '无酒精': ['蒸馏水', '气泡水', '苏打水', '姜汁啤酒', '椰子水', '花草茶', '鲜榨果汁']
  }

  const commonIngredients: Record<string, string[]> = {
    '甜': ['单糖浆', '蜂蜜', '枫糖浆', '甘蔗糖浆', '香草糖浆', '杏仁糖浆', '焦糖糖浆', '玫瑰糖浆', '桂花糖浆'],
    '酸': ['新鲜柠檬汁', '新鲜青柠汁', '酸橙汁', '葡萄柚汁', '百香果汁', '苹果醋', '石榴汁'],
    '苦': ['苦精', '金巴利', '味美思', '西印度苦精', '艾草苦精', '橙子苦精'],
    '果味': ['蓝莓糖浆', '覆盆子糖浆', '芒果糖浆', '桃子糖浆', '草莓糖浆', '葡萄柚汁', '蔓越莓汁', '菠萝汁', '苹果汁', '梨汁'],
    '草本': ['新鲜薄荷叶', '迷迭香', '罗勒叶', '薰衣草', '柠檬草', '香草精', '马鞭草', '百里香'],
    '奶香': ['淡奶油', '椰奶', '炼乳', '蛋黄', '奶油奶酪', '椰子奶油'],
    '气泡': ['香槟', '普罗塞克', '苏打水', '汤力水', '姜汁啤酒', '七喜', '雪碧'],
    '咸': ['海盐', '盐边', '橄榄', '盐水', '培根', '味噌'],
    '辣': ['辣椒片', '辣椒糖浆', 'jalapeño', 'Tabasco', '新鲜生姜', '生姜糖浆', '黑胡椒'],
    '茶香': ['伯爵茶糖浆', '抹茶', '茉莉花茶', '红茶糖浆', '乌龙茶糖浆', '正山小种', '马黛茶'],
    '泥煤味': ['艾莱岛泥煤威士忌', '拉加维林16年', '泥煤味糖浆', '海盐', '昆布']
  }

  const glasses: string[] = ['古典杯', '马提尼杯', '高球杯', '碟形杯', '香槟杯', '飓风杯', '柯林斯杯', '岩石杯', '朱莉普杯', '铜杯', '球形杯', '花式杯', '扎壶']
  const garnishes: string[] = ['柠檬皮', '青柠角', '橙片', '橙皮', '樱桃', '薄荷叶', '迷迭香', '西柚片', '黄瓜条', '盐边', '糖边', '肉桂棒', '八角', '花瓣', '草莓', '蓝莓', '百香果', '薄荷枝']

  function getRandomElements<T>(arr: T[], count: number): T[] {
    const shuffled = [...arr].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, Math.min(count, arr.length))
  }

  function pickOne<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  function generatePoeticCocktail(options: AIGenerationOptions): Cocktail {
    const selectedFruits = options.fruits && options.fruits.length > 0 
      ? options.fruits 
      : getRandomElements(fruits, Math.floor(Math.random() * 3))
    
    const selectedSoftDrinks = options.softDrinks && options.softDrinks.length > 0 
      ? options.softDrinks 
      : Math.random() > 0.6 ? getRandomElements(softDrinks, Math.floor(Math.random() * 2) + 1) : []

    let selectedTastes = options.tastes && options.tastes.length > 0 
      ? options.tastes 
      : getRandomElements(['甜', '酸', '果味', '气泡', '草本'], Math.floor(Math.random() * 3) + 1) as TasteTag[]

    const primaryBase = options.bases && options.bases.length > 0 
      ? pickOne(options.bases) 
      : pickOne(baseSpirits)

    const customKeywords = options.customKeywords || []
    const moodKeywords = options.moodKeywords || []

    const allKeywords = [...customKeywords, ...moodKeywords]

    const nameData = poeticNames[primaryBase] || poeticNames['威士忌']
    let nameIndex = Math.floor(Math.random() * nameData.names.length)
    
    if (allKeywords.length > 0) {
      const keywordStr = allKeywords.join('')
      nameIndex = Math.abs(keywordStr.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % nameData.names.length
    }

    let name = nameData.names[nameIndex]
    let nameEn = nameData.namesEn[nameIndex]
    let description = nameData.descriptions[nameIndex]

    if (allKeywords.length > 0 && Math.random() > 0.3) {
      const keyword = pickOne(allKeywords)
      if (Math.random() > 0.5) {
        name = `${keyword}${name}`
        nameEn = `${keyword} ${nameEn}`
      }
      description = `${keyword}的意境：${description}`
    }

    if (selectedFruits.length > 0 && Math.random() > 0.5) {
      const fruit = pickOne(selectedFruits)
      name = `${fruit}${name}`
      nameEn = `${fruit} ${nameEn}`
    }

    const mainIngredients: { name: string; amount: string }[] = []
    const modifierIngredients: { name: string; amount: string }[] = []

    const baseName = ingredients[primaryBase][Math.floor(Math.random() * Math.min(3, ingredients[primaryBase].length))]
    mainIngredients.push({ name: baseName, amount: pickOne(['30ml', '45ml', '60ml']) })

    if (Math.random() > 0.6 && selectedSoftDrinks.length > 0) {
      const softDrink = pickOne(selectedSoftDrinks)
      modifierIngredients.push({ name: softDrink, amount: pickOne(['60ml', '90ml', '120ml', '适量']) })
      if (!selectedTastes.includes('气泡')) {
        selectedTastes.push('气泡')
      }
    }

    selectedFruits.forEach(fruit => {
      const fruitJuice = `${fruit}汁`
      if (!modifierIngredients.some(i => i.name.includes(fruit))) {
        modifierIngredients.push({ name: fruitJuice, amount: pickOne(['30ml', '45ml', '60ml']) })
      }
      if (!selectedTastes.includes('果味') && !selectedTastes.includes('酸')) {
        selectedTastes.push(Math.random() > 0.5 ? '果味' : '酸')
      }
    })

    selectedTastes.forEach(taste => {
      if (taste === '果味' || taste === '酸') return
      const available = commonIngredients[taste] || []
      if (available.length > 0) {
        const ing = available[Math.floor(Math.random() * Math.min(3, available.length))]
        if (!modifierIngredients.some(i => i.name.includes(ing.split(' ')[0]))) {
          modifierIngredients.push({ name: ing, amount: pickOne(['10ml', '15ml', '20ml', '25ml']) })
        }
      }
    })

    if (primaryBase !== '无酒精' && Math.random() > 0.4) {
      const sweetOptions = commonIngredients['甜']
      if (sweetOptions.length > 0) {
        const sweet = sweetOptions[Math.floor(Math.random() * Math.min(4, sweetOptions.length))]
        if (!modifierIngredients.some(i => i.name.includes(sweet.split(' ')[0]))) {
          modifierIngredients.push({ name: sweet, amount: pickOne(['10ml', '15ml', '20ml']) })
        }
      }
    }

    const allIngredients = [...mainIngredients, ...modifierIngredients]

    const isLongDrink = selectedSoftDrinks.length > 0 || Math.random() > 0.7
    const stepTemplates = isLongDrink ? [
      ['杯中加满冰块', '依次倒入基酒和配料', '加满软饮', '轻轻搅拌均匀'],
      ['高球杯中放入冰块', '加入基酒', '倒入果汁和糖浆', '加苏打水至满', '搅拌后装饰'],
      ['准备好高球杯和冰块', '将前几种材料依次倒入', '加满冰镇的气泡软饮', '用勺子轻轻搅拌'],
      ['杯中铺满冰块', '先倒入基酒', '加入各种配料', '最后加满苏打水或汤力水'],
    ] : [
      ['将所有材料放入调酒壶', '加冰摇晃15秒', '滤入冰镇的杯中'],
      ['准备好调酒壶', '加入冰块和所有材料', '用力摇晃20秒', '滤入预冷的古典杯'],
      ['在调酒杯中放入大冰块', '倒入基酒和配料', '搅拌30秒', '滤入碟形杯'],
      ['将材料放入调酒壶', '加足量冰块', '快速摇晃15秒', '双重滤入马提尼杯'],
    ]

    const stepsTemplate = pickOne(stepTemplates)
    const steps = stepsTemplate.map(step => {
      if (step.includes('材料') || step.includes('配料')) {
        const ingNames = allIngredients.map(i => i.name)
        if (ingNames.length <= 3) {
          return step.replace(/材料|配料/g, ingNames.join('和'))
        }
        return step.replace(/所有材料/g, ingNames.slice(0, 3).join('、') + '等')
      }
      if (step.includes('软饮')) {
        return step.replace('软饮', selectedSoftDrinks.length > 0 ? pickOne(selectedSoftDrinks) : '苏打水')
      }
      return step
    })

    const difficulty = allIngredients.length <= 3 ? 'easy' : allIngredients.length <= 5 ? 'medium' : 'hard'

    const glass = isLongDrink ? pickOne(['高球杯', '柯林斯杯', '飓风杯', '铜杯']) : pickOne(glasses)
    const garnish = pickOne(garnishes)

    const specialTags = ['AI创作']
    if (selectedFruits.length > 0) specialTags.push('果味')
    if (selectedSoftDrinks.some(s => s.includes('气泡') || s.includes('苏打') || s.includes('汤力') || s.includes('啤酒'))) {
      specialTags.push('气泡')
    }
    if (selectedTastes.includes('草本')) specialTags.push('草本')
    if (allKeywords.length > 0) specialTags.push('意境')

    return {
      id: `ai-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name,
      nameEn,
      base: [primaryBase],
      taste: [...new Set(selectedTastes)],
      difficulty: difficulty as 'easy' | 'medium' | 'hard',
      ingredients: allIngredients,
      steps,
      garnish,
      glass,
      description,
      tags: specialTags,
      isCustom: true,
      createdAt: new Date().toISOString(),
    }
  }

  async function generateCocktail(options: AIGenerationOptions = {}): Promise<Cocktail | null> {
    isGenerating.value = true
    error.value = null
    generatedCocktail.value = null

    try {
      await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 600))

      const cocktail = generatePoeticCocktail(options)
      generatedCocktail.value = cocktail
      return cocktail
    } catch (e) {
      error.value = e instanceof Error ? e.message : '生成调酒时出错'
      return null
    } finally {
      isGenerating.value = false
    }
  }

  function clearGenerated() {
    generatedCocktail.value = null
    error.value = null
  }

  return {
    isGenerating,
    generatedCocktail,
    error,
    generateCocktail,
    clearGenerated,
    baseSpirits,
    tasteTags,
    fruits,
    softDrinks,
  }
}
