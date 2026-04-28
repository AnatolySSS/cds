/** @type {import("prettier").Options} */
module.exports = {
  singleQuote: true, // Использовать одинарные кавычки
  trailingComma: "all", // Добавлять запятую в конце объектов/массивов
  printWidth: 100, // Разбивка строк на ~100 символов
  tabWidth: 2, // Размер отступа
  semi: true, // Точка с запятой в конце строки
  bracketSpacing: true, // Пробелы внутри фигурных скобок
  arrowParens: "always", // Скобки вокруг аргументов стрелочных функций
  plugins: [], // Можно добавить плагины, если нужно

  overrides: [
    {
      files: "*.prisma",
      options: {
        tabWidth: 2, // Prisma schema обычно табуляция 2 пробела
        singleQuote: false, // Prisma использует двойные кавычки в строках
      },
    },
    {
      files: ["*.json", "*.jsonc", "*.md"],
      options: {
        tabWidth: 2,
        parser: "json",
      },
    },
  ],
};
