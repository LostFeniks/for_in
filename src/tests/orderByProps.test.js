const orderByProps = require('../js/orderByProps');

describe('orderByProps function tests', () => {
  const obj = {
    name: 'мечник',
    health: 10,
    level: 2,
    attack: 80,
    defence: 40
  };

  test('should return properties in custom order with alphabetical sorting for others', () => {
    const order = ['name', 'level'];
    const expected = [
      { key: 'name', value: 'мечник' },
      { key: 'level', value: 2 },
      { key: 'attack', value: 80 },
      { key: 'defence', value: 40 },
      { key: 'health', value: 10 }
    ];
    
    expect(orderByProps(obj, order)).toEqual(expected);
  });

  test('should handle empty order array - sort all alphabetically', () => {
    const order = [];
    const expected = [
      { key: 'attack', value: 80 },
      { key: 'defence', value: 40 },
      { key: 'health', value: 10 },
      { key: 'level', value: 2 },
      { key: 'name', value: 'мечник' }
    ];
    
    expect(orderByProps(obj, order)).toEqual(expected);
  });

  test('should handle order with keys not existing in object', () => {
    const order = ['name', 'nonexistent', 'level'];
    const expected = [
      { key: 'name', value: 'мечник' },
      { key: 'level', value: 2 },
      { key: 'attack', value: 80 },
      { key: 'defence', value: 40 },
      { key: 'health', value: 10 }
    ];
    
    expect(orderByProps(obj, order)).toEqual(expected);
  });

  test('should handle object with different property types', () => {
    const complexObj = {
      id: 1,
      name: 'hero',
      isActive: true,
      score: 100.5,
      tags: ['warrior', 'mage']
    };
    
    const order = ['id', 'score'];
    const expected = [
      { key: 'id', value: 1 },
      { key: 'score', value: 100.5 },
      { key: 'isActive', value: true },
      { key: 'name', value: 'hero' },
      { key: 'tags', value: ['warrior', 'mage'] }
    ];
    
    expect(orderByProps(complexObj, order)).toEqual(expected);
  });

  test('should handle empty object', () => {
    const emptyObj = {};
    const order = ['name', 'level'];
    const expected = [];
    
    expect(orderByProps(emptyObj, order)).toEqual(expected);
  });

  test('should handle object with single property', () => {
    const singleObj = { name: 'мечник' };
    const order = ['name'];
    const expected = [{ key: 'name', value: 'мечник' }];
    
    expect(orderByProps(singleObj, order)).toEqual(expected);
  });

  test('should maintain original values unchanged', () => {
    const originalObj = { a: 1, b: 2 };
    const order = ['a'];
    const result = orderByProps(originalObj, order);
    
    expect(result[0].value).toBe(1);
    expect(result[1].value).toBe(2);
  });

  test('should handle order parameter default value when undefined', () => {
    const defaultObj = { b: 2, a: 1 };
    const expected = [
      { key: 'a', value: 1 },
      { key: 'b', value: 2 }
    ];
    
    expect(orderByProps(defaultObj)).toEqual(expected);
  });

  test('should preserve property order for items in order array', () => {
    const testObj = { z: 1, a: 2, m: 3 };
    const order = ['m', 'z'];
    const expected = [
      { key: 'm', value: 3 },
      { key: 'z', value: 1 },
      { key: 'a', value: 2 }
    ];
    
    expect(orderByProps(testObj, order)).toEqual(expected);
  });

  test('should work with numeric keys', () => {
    const numericObj = { '3': 'three', '1': 'one', '2': 'two' };
    const order = ['2'];
    const expected = [
      { key: '2', value: 'two' },
      { key: '1', value: 'one' },
      { key: '3', value: 'three' }
    ];
    
    expect(orderByProps(numericObj, order)).toEqual(expected);
  });

  test('should use for...in loop (verify iteration over enumerable properties)', () => {
    const testObj = { prop1: 1, prop2: 2 };
    const result = orderByProps(testObj, []);
    
    // Проверяем, что были обработаны все перечисляемые свойства
    expect(result.length).toBe(2);
    expect(result).toContainEqual({ key: 'prop1', value: 1 });
    expect(result).toContainEqual({ key: 'prop2', value: 2 });
  });
});