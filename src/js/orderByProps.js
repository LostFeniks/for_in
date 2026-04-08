/**
 * Функция сортировки свойств объекта
 * @param {Object} obj - исходный объект
 * @param {Array} order - массив с порядком сортировки ключей
 * @returns {Array} массив объектов {key, value} в заданном порядке
 */
function orderByProps(obj, order = []) {
  const result = [];
  const processedKeys = new Set();

  // 1. Добавляем свойства в порядке, указанном в массиве order
  for (const key in order) {
    const orderKey = order[key];
    if (orderKey in obj) {
      result.push({ key: orderKey, value: obj[orderKey] });
      processedKeys.add(orderKey);
    }
  }

  // 2. Собираем оставшиеся свойства
  const remainingProps = [];
  for (const key in obj) {
    if (!processedKeys.has(key)) {
      remainingProps.push({ key, value: obj[key] });
    }
  }

  // 3. Сортируем оставшиеся свойства по алфавиту
  remainingProps.sort((a, b) => {
    if (a.key < b.key) return -1;
    if (a.key > b.key) return 1;
    return 0;
  });

  // 4. Добавляем отсортированные оставшиеся свойства
  for (const prop of remainingProps) {
    result.push(prop);
  }

  return result;
}

// Поддержка обоих форматов модулей
if (typeof module !== 'undefined' && module.exports) {
  module.exports = orderByProps;
  module.exports.default = orderByProps;
}

// Для использования в браузере через глобальную переменную
if (typeof window !== 'undefined') {
  window.orderByProps = orderByProps;
}