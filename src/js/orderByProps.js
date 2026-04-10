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
  for (let i = 0; i < order.length; i += 1) {
    const orderKey = order[i];
    if (orderKey in obj) {
      result.push({ key: orderKey, value: obj[orderKey] });
      processedKeys.add(orderKey);
    }
  }

  // 2. Собираем оставшиеся свойства
  const remainingProps = [];
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
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
  for (let i = 0; i < remainingProps.length; i += 1) {
    result.push(remainingProps[i]);
  }

  return result;
}

// Экспорт для разных сред
if (typeof module !== 'undefined' && module.exports) {
  module.exports = orderByProps;
}

if (typeof window !== 'undefined') {
  window.orderByProps = orderByProps;
}
