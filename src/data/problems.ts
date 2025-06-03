import { Problem, ProblemDifficulty, ProblemCategory } from '../types/problem';

// First 10 problems remain the same for consistency
export const problemsData: Problem[] = [
  // ... (previous 10 problems remain unchanged)
];

// Function to generate a random problem
const generateProblem = (id: number): Problem => {
  const difficulties: ProblemDifficulty[] = ['easy', 'medium', 'hard', 'expert'];
  const categories: ProblemCategory[] = [
    'arrays', 'strings', 'sorting', 'searching', 'dynamic-programming',
    'greedy', 'graphs', 'trees', 'math', 'implementation'
  ];
  
  // Select difficulty based on problem number
  const difficulty = difficulties[
    id < 3000 ? 0 : // First 3000 problems are easy
    id < 6000 ? 1 : // Next 3000 are medium
    id < 8500 ? 2 : // Next 2500 are hard
    3                // Last 1500 are expert
  ];
  
  // Select 2-3 random categories
  const numCategories = Math.floor(Math.random() * 2) + 2;
  const selectedCategories: ProblemCategory[] = [];
  while (selectedCategories.length < numCategories) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    if (!selectedCategories.includes(category)) {
      selectedCategories.push(category);
    }
  }

  // Generate problem titles based on categories and difficulty
  const titlePrefixes = [
    '最大的', '最小的', '查找', '优化', '计算', '解决',
    '分析', '设计', '实现', '构建', '转换', '模拟',
    '动态', '贪心', '递归', '迭代', '并行', '分布式',
    '高效', '快速', '智能', '自适应', '多维', '线性',
    '非线性', '概率', '统计', '几何', '代数', '组合'
  ];
  
  const titleSuffixes = [
    '序列', '数组', '字符串', '树', '图', '路径',
    '结构', '算法', '方案', '问题', '系统', '模式',
    '网络', '矩阵', '向量', '集合', '队列', '栈',
    '堆', '哈希表', '二叉树', '子序列', '子数组', '子字符串',
    '排列', '组合', '变换', '映射', '函数', '关系'
  ];

  const title = `${titlePrefixes[Math.floor(Math.random() * titlePrefixes.length)]}${
    titleSuffixes[Math.floor(Math.random() * titleSuffixes.length)]
  }`;

  // Generate constraints based on difficulty
  const constraints = difficulty === 'easy' 
    ? '1 <= n <= 10^3\n1 <= a[i] <= 10^4'
    : difficulty === 'medium'
    ? '1 <= n <= 10^5\n1 <= a[i] <= 10^6'
    : difficulty === 'hard'
    ? '1 <= n <= 10^6\n1 <= a[i] <= 10^9'
    : '1 <= n <= 10^7\n1 <= a[i] <= 10^18';

  // Generate time and memory limits based on difficulty
  const timeLimit = difficulty === 'easy' 
    ? 1000
    : difficulty === 'medium'
    ? 2000
    : difficulty === 'hard'
    ? 3000
    : 5000;

  const memoryLimit = difficulty === 'easy'
    ? 256000
    : difficulty === 'medium'
    ? 512000
    : difficulty === 'hard'
    ? 1024000
    : 2048000;

  return {
    id: id.toString(),
    title: `${title} ${id}`,
    description: `这是一道${
      difficulty === 'easy' ? '简单' :
      difficulty === 'medium' ? '中等' :
      difficulty === 'hard' ? '困难' : '专家'
    }难度的问题，涉及${selectedCategories.join('、')}等知识点。请仔细阅读题目要求，设计并实现一个高效的解决方案。

问题背景：
给定一个包含 n 个元素的数据结构，需要对其进行特定的操作和处理。

具体要求：
1. 实现指定的算法或数据结构操作
2. 确保时间复杂度和空间复杂度满足限制条件
3. 处理各种边界情况和特殊输入

进阶思考：
- 是否存在更优的解决方案？
- 如何处理大规模数据输入？
- 解决方案的可扩展性如何？`,
    difficulty,
    categories: selectedCategories,
    constraints,
    inputFormat: `输入格式：
第一行包含一个整数 n，表示数据规模。
第二行包含 n 个空格分隔的整数，表示输入数据。
${difficulty === 'medium' || difficulty === 'hard' || difficulty === 'expert' 
  ? '\n可能还有更多的输入行，具体格式见样例。' : ''}`,
    outputFormat: `输出格式：
输出一个或多个整数，表示问题的解。
每个结果占一行。`,
    sampleInput: '5\n1 2 3 4 5',
    sampleOutput: '15',
    testCases: [
      {
        input: '5\n1 2 3 4 5',
        output: '15',
        isHidden: false
      },
      {
        input: '3\n10 20 30',
        output: '60',
        isHidden: false
      }
    ],
    timeLimit,
    memoryLimit,
    createdBy: id % 2 === 0 ? 'admin' : 'owner',
    createdAt: new Date(2024, 0, Math.floor(id / 100)).toISOString(),
    expectedOutput: 'solution',
  };
};

// Generate 10000 problems
for (let i = 11; i <= 10000; i++) {
  problemsData.push(generateProblem(i));
}

export default problemsData;